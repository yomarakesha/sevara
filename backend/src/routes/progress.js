// ═══════════════════════════════════════════════
//  SILLBRIDGE — PROGRESS ROUTES
//  POST /api/progress/lesson
//  POST /api/progress/quiz
//  POST /api/progress/project
//  POST /api/progress/badge
//  PATCH /api/progress/profile
//  GET  /api/progress/leaderboard
//  GET  /api/progress/leaderboard/friends
//  GET  /api/progress/activity         (XP per day, last 365 days)
//  GET  /api/progress/friends          (friend list)
//  POST /api/progress/friends          (add friend by email)
//  PATCH /api/progress/friends/:id     (accept friend request)
//  DELETE /api/progress/friends/:id    (remove friend)
//  GET  /api/progress/friends/requests (incoming requests)
// ═══════════════════════════════════════════════
const router = require('express').Router();
const pool   = require('../db/pool');
const authMW = require('../middleware/auth');
const { calcLevel, xpForLesson, xpForQuiz, xpForProject } = require('../services/xp');

// All progress routes require a valid JWT
router.use(authMW);

// ── helpers ──────────────────────────────────
async function recordDailyXP(client, userId, xp) {
  if (!xp) return;
  const today = new Date().toISOString().split('T')[0];
  await client.query(
    `INSERT INTO xp_history (user_id, day, xp_gained)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id, day)
     DO UPDATE SET xp_gained = xp_history.xp_gained + EXCLUDED.xp_gained`,
    [userId, today, xp]
  );
}

async function addXP(client, userId, xp) {
  if (!xp) return;
  const { rows } = await client.query('SELECT xp FROM users WHERE id=$1', [userId]);
  const newXP = (rows[0]?.xp || 0) + xp;
  const newLevel = calcLevel(newXP);
  await client.query(
    `UPDATE users
     SET xp        = $1,
         level     = $2,
         daily_xp  = daily_xp + $3,
         weekly_xp = weekly_xp + $3,
         updated_at = NOW()
     WHERE id = $4`,
    [newXP, newLevel, xp, userId]
  );
  await recordDailyXP(client, userId, xp);
}

async function awardBadge(client, userId, badgeId) {
  await client.query(
    `INSERT INTO user_badges (user_id, badge_id)
     VALUES ($1, $2) ON CONFLICT DO NOTHING`,
    [userId, badgeId]
  );
}

async function checkBadges(client, userId) {
  const { rows: u } = await client.query(
    'SELECT xp, streak, level FROM users WHERE id=$1',
    [userId]
  );
  if (!u.length) return;
  const { xp, streak, level } = u[0];

  const { rows: lessons }  = await client.query('SELECT COUNT(*) FROM completed_lessons  WHERE user_id=$1', [userId]);
  const { rows: quizzes }  = await client.query('SELECT COUNT(*) FROM completed_quizzes  WHERE user_id=$1', [userId]);
  const { rows: projects } = await client.query('SELECT COUNT(*) FROM completed_projects WHERE user_id=$1', [userId]);

  const lc = parseInt(lessons[0].count);
  const qc = parseInt(quizzes[0].count);
  const pc = parseInt(projects[0].count);

  if (lc >= 1)    await awardBadge(client, userId, 'first_lesson');
  if (qc >= 1)    await awardBadge(client, userId, 'first_quiz');
  if (pc >= 1)    await awardBadge(client, userId, 'first_project');
  if (xp >= 500)  await awardBadge(client, userId, 'xp_500');
  if (xp >= 1000) await awardBadge(client, userId, 'xp_1000');
  if (xp >= 2000) await awardBadge(client, userId, 'xp_2000');
  if (streak >= 7) await awardBadge(client, userId, 'streak_7');
  if (level >= 3)  await awardBadge(client, userId, 'level_3');
  if (level >= 5)  await awardBadge(client, userId, 'level_5');
  if (level >= 10) await awardBadge(client, userId, 'level_10');
}

async function fetchBadges(userId) {
  const { rows } = await pool.query('SELECT badge_id FROM user_badges WHERE user_id=$1', [userId]);
  return rows.map(r => r.badge_id);
}

async function fetchUserXPSummary(userId) {
  const { rows } = await pool.query('SELECT xp, level, daily_xp, weekly_xp FROM users WHERE id=$1', [userId]);
  return rows[0] || null;
}

// ── POST /api/progress/lesson ─────────────────
router.post('/lesson', async (req, res) => {
  const { lessonId } = req.body;
  if (!lessonId) return res.status(400).json({ error: 'lessonId required' });

  // Server-side XP — ignore client-provided value
  const xp = xpForLesson(lessonId);

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const inserted = await client.query(
      `INSERT INTO completed_lessons (user_id, lesson_id, xp_gained)
       VALUES ($1, $2, $3) ON CONFLICT DO NOTHING RETURNING id`,
      [req.userId, lessonId, xp]
    );

    if (inserted.rows.length) {
      await addXP(client, req.userId, xp);
      await checkBadges(client, req.userId);
    }

    await client.query('COMMIT');

    const [badges, summary] = await Promise.all([
      fetchBadges(req.userId),
      fetchUserXPSummary(req.userId),
    ]);
    res.json({ success: true, badges, xpAwarded: inserted.rows.length ? xp : 0, ...summary });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Complete lesson error:', err);
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
});

// ── POST /api/progress/quiz ───────────────────
router.post('/quiz', async (req, res) => {
  const { quizId, score } = req.body;
  if (!quizId || score === undefined)
    return res.status(400).json({ error: 'quizId and score required' });

  const safeScore = Math.max(0, Math.min(100, parseInt(score) || 0));
  const xp = xpForQuiz(quizId, safeScore);

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const inserted = await client.query(
      `INSERT INTO completed_quizzes (user_id, quiz_id, score, xp_gained)
       VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING RETURNING id`,
      [req.userId, quizId, safeScore, xp]
    );

    if (inserted.rows.length) {
      await addXP(client, req.userId, xp);
      if (safeScore === 100) await awardBadge(client, req.userId, 'perfect_quiz');
      await checkBadges(client, req.userId);
    }

    await client.query('COMMIT');

    const [badges, summary] = await Promise.all([
      fetchBadges(req.userId),
      fetchUserXPSummary(req.userId),
    ]);
    res.json({ success: true, badges, xpAwarded: inserted.rows.length ? xp : 0, ...summary });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Complete quiz error:', err);
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
});

// ── POST /api/progress/project ────────────────
router.post('/project', async (req, res) => {
  const { projectId } = req.body;
  if (!projectId) return res.status(400).json({ error: 'projectId required' });

  const xp = xpForProject(projectId);

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const inserted = await client.query(
      `INSERT INTO completed_projects (user_id, project_id, xp_gained)
       VALUES ($1, $2, $3) ON CONFLICT DO NOTHING RETURNING id`,
      [req.userId, projectId, xp]
    );

    if (inserted.rows.length) {
      await addXP(client, req.userId, xp);
      await awardBadge(client, req.userId, 'first_project');
      await checkBadges(client, req.userId);
    }

    await client.query('COMMIT');

    const [badges, summary] = await Promise.all([
      fetchBadges(req.userId),
      fetchUserXPSummary(req.userId),
    ]);
    res.json({ success: true, badges, xpAwarded: inserted.rows.length ? xp : 0, ...summary });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Complete project error:', err);
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
});

// ── POST /api/progress/badge ──────────────────
router.post('/badge', async (req, res) => {
  const { badgeId } = req.body;
  if (!badgeId) return res.status(400).json({ error: 'badgeId required' });
  try {
    await pool.query(
      `INSERT INTO user_badges (user_id, badge_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
      [req.userId, badgeId]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── PATCH /api/progress/profile ───────────────
router.patch('/profile', async (req, res) => {
  const updates = [];
  const values  = [];
  let   idx     = 1;

  const map = { darkMode: 'dark_mode', lang: 'lang', branch: 'branch', name: 'name', level: 'level' };

  for (const [key, col] of Object.entries(map)) {
    if (req.body[key] !== undefined) {
      updates.push(`${col} = $${idx++}`);
      values.push(req.body[key]);
    }
  }

  if (!updates.length)
    return res.status(400).json({ error: 'Nothing to update' });

  values.push(req.userId);
  try {
    await pool.query(
      `UPDATE users SET ${updates.join(', ')}, updated_at=NOW() WHERE id=$${idx}`,
      values
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── GET /api/progress/leaderboard ────────────
router.get('/leaderboard', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT u.id, u.name, u.xp, u.level, u.branch,
             COUNT(DISTINCT ub.badge_id) AS badge_count
      FROM users u
      LEFT JOIN user_badges ub ON ub.user_id = u.id
      GROUP BY u.id
      ORDER BY u.xp DESC
      LIMIT 20
    `);
    res.json({ leaderboard: rows.map(r => ({
      name:   r.name,
      xp:     r.xp,
      level:  r.level,
      branch: r.branch,
      badges: parseInt(r.badge_count),
    }))});
  } catch (err) {
    console.error('Leaderboard error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── GET /api/progress/leaderboard/friends ────
// Private leaderboard for the current user's accepted friends + themselves
router.get('/leaderboard/friends', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      WITH circle AS (
        SELECT $1::int AS id
        UNION
        SELECT friend_id FROM friendships WHERE user_id = $1 AND status = 'accepted'
        UNION
        SELECT user_id   FROM friendships WHERE friend_id = $1 AND status = 'accepted'
      )
      SELECT u.id, u.name, u.xp, u.level, u.branch,
             COUNT(DISTINCT ub.badge_id) AS badge_count
      FROM users u
      JOIN circle c ON c.id = u.id
      LEFT JOIN user_badges ub ON ub.user_id = u.id
      GROUP BY u.id
      ORDER BY u.xp DESC
    `, [req.userId]);
    res.json({ leaderboard: rows.map(r => ({
      name: r.name, xp: r.xp, level: r.level, branch: r.branch,
      badges: parseInt(r.badge_count),
    })) });
  } catch (err) {
    console.error('Friends leaderboard error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── GET /api/progress/activity ───────────────
// Returns XP per day for the last `days` days (default 365)
router.get('/activity', async (req, res) => {
  const days = Math.max(1, Math.min(parseInt(req.query.days) || 365, 730));
  try {
    const { rows } = await pool.query(
      `SELECT to_char(day, 'YYYY-MM-DD') AS day, xp_gained
         FROM xp_history
        WHERE user_id = $1
          AND day >= CURRENT_DATE - ($2::int - 1)
        ORDER BY day ASC`,
      [req.userId, days]
    );
    res.json({ activity: rows.map(r => ({ day: r.day, xp: parseInt(r.xp_gained) })), days });
  } catch (err) {
    console.error('Activity error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── FRIENDS ──────────────────────────────────
router.get('/friends', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT u.id, u.name, u.email, u.xp, u.level, u.branch, f.status,
             CASE WHEN f.user_id = $1 THEN 'outgoing' ELSE 'incoming' END AS direction,
             f.id AS friendship_id
      FROM friendships f
      JOIN users u ON u.id = CASE WHEN f.user_id = $1 THEN f.friend_id ELSE f.user_id END
      WHERE (f.user_id = $1 OR f.friend_id = $1)
      ORDER BY f.created_at DESC
    `, [req.userId]);
    res.json({
      friends:  rows.filter(r => r.status === 'accepted').map(formatFriend),
      incoming: rows.filter(r => r.status === 'pending' && r.direction === 'incoming').map(formatFriend),
      outgoing: rows.filter(r => r.status === 'pending' && r.direction === 'outgoing').map(formatFriend),
    });
  } catch (err) {
    console.error('Friends list error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

function formatFriend(r) {
  return {
    id: r.id, name: r.name, email: r.email,
    xp: r.xp, level: r.level, branch: r.branch,
    friendshipId: r.friendship_id, status: r.status,
  };
}

// POST /api/progress/friends — send a request by email
router.post('/friends', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'email required' });

  try {
    const { rows: target } = await pool.query('SELECT id FROM users WHERE email=$1', [email]);
    if (!target.length) return res.status(404).json({ error: 'No user found with that email' });
    const friendId = target[0].id;
    if (friendId === req.userId) return res.status(400).json({ error: "You can't add yourself" });

    // Block re-sends in either direction
    const { rows: existing } = await pool.query(
      `SELECT id, status FROM friendships
        WHERE (user_id=$1 AND friend_id=$2) OR (user_id=$2 AND friend_id=$1)`,
      [req.userId, friendId]
    );
    if (existing.length) {
      const status = existing[0].status;
      return res.status(409).json({ error: status === 'accepted' ? 'Already friends' : 'Request already pending' });
    }

    await pool.query(
      `INSERT INTO friendships (user_id, friend_id, status) VALUES ($1, $2, 'pending')`,
      [req.userId, friendId]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    console.error('Friend add error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /api/progress/friends/:id — accept (target user only)
router.patch('/friends/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
  try {
    const r = await pool.query(
      `UPDATE friendships SET status='accepted'
        WHERE id=$1 AND friend_id=$2 AND status='pending'
        RETURNING id`,
      [id, req.userId]
    );
    if (!r.rowCount) return res.status(404).json({ error: 'Request not found' });
    res.json({ success: true });
  } catch (err) {
    console.error('Friend accept error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/progress/friends/:id — remove / decline
router.delete('/friends/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
  try {
    const r = await pool.query(
      `DELETE FROM friendships
        WHERE id=$1 AND (user_id=$2 OR friend_id=$2)
        RETURNING id`,
      [id, req.userId]
    );
    if (!r.rowCount) return res.status(404).json({ error: 'Friendship not found' });
    res.json({ success: true });
  } catch (err) {
    console.error('Friend delete error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
