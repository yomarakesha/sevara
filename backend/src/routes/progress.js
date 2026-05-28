// ═══════════════════════════════════════════════
//  SILLBRIDGE — PROGRESS ROUTES
//  POST /api/progress/lesson
//  POST /api/progress/quiz
//  POST /api/progress/project
//  POST /api/progress/badge
//  PATCH /api/progress/profile   (branch, name, lang, darkMode)
//  GET  /api/progress/leaderboard
// ═══════════════════════════════════════════════
const router = require('express').Router();
const pool   = require('../db/pool');
const authMW = require('../middleware/auth');

// All progress routes require a valid JWT
router.use(authMW);

// ── helpers ──────────────────────────────────
// XP thresholds matching the frontend curriculum (10 levels)
const XP_THRESHOLDS = [0, 150, 350, 600, 900, 1150, 1350, 1650, 1950, 2300];

function calcLevel(xp) {
  let level = 1;
  for (let i = XP_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= XP_THRESHOLDS[i]) { level = i + 1; break; }
  }
  return Math.min(level, 10);
}

async function addXP(client, userId, xp) {
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

// ── POST /api/progress/lesson ─────────────────
router.post('/lesson', async (req, res) => {
  const { lessonId, xp = 0 } = req.body;
  if (!lessonId) return res.status(400).json({ error: 'lessonId required' });

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

    const badges = await fetchBadges(req.userId);
    res.json({ success: true, badges });
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
  const { quizId, score, xp = 0 } = req.body;
  if (!quizId || score === undefined)
    return res.status(400).json({ error: 'quizId and score required' });

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const inserted = await client.query(
      `INSERT INTO completed_quizzes (user_id, quiz_id, score, xp_gained)
       VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING RETURNING id`,
      [req.userId, quizId, score, xp]
    );

    if (inserted.rows.length) {
      await addXP(client, req.userId, xp);
      if (score === 100) await awardBadge(client, req.userId, 'perfect_quiz');
      await checkBadges(client, req.userId);
    }

    await client.query('COMMIT');

    const badges = await fetchBadges(req.userId);
    res.json({ success: true, badges });
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
  const { projectId, xp = 0 } = req.body;
  if (!projectId) return res.status(400).json({ error: 'projectId required' });

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

    const badges = await fetchBadges(req.userId);
    res.json({ success: true, badges });
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

  // Map camelCase → snake_case
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

module.exports = router;
