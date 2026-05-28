// ═══════════════════════════════════════════════
//  SILLBRIDGE — AUTH ROUTES
//  POST /api/auth/register
//  POST /api/auth/login
//  GET  /api/auth/me
// ═══════════════════════════════════════════════
const router   = require('express').Router();
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const pool     = require('../db/pool');
const authMW   = require('../middleware/auth');

// ── helpers ──────────────────────────────────
function makeToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

async function fetchFullUser(userId) {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
  if (!rows.length) return null;
  const u = rows[0];

  const [lessons, quizzes, projects, badges] = await Promise.all([
    pool.query('SELECT lesson_id FROM completed_lessons WHERE user_id=$1', [userId]),
    pool.query('SELECT quiz_id, score FROM completed_quizzes WHERE user_id=$1', [userId]),
    pool.query('SELECT project_id FROM completed_projects WHERE user_id=$1', [userId]),
    pool.query('SELECT badge_id FROM user_badges WHERE user_id=$1', [userId]),
  ]);

  return {
    id:               u.id,
    name:             u.name,
    email:            u.email,
    branch:           u.branch,
    xp:               u.xp,
    level:            u.level,
    streak:           u.streak,
    lastLogin:        u.last_login,
    dailyXP:          u.daily_xp,
    weeklyXP:         u.weekly_xp,
    lang:             u.lang,
    darkMode:         u.dark_mode,
    joinDate:         u.join_date,
    completedLessons: lessons.rows.map(r => r.lesson_id),
    completedQuizzes: quizzes.rows.map(r => ({ id: r.quiz_id, score: r.score })),
    completedProjects:projects.rows.map(r => r.project_id),
    badges:           badges.rows.map(r => r.badge_id),
  };
}

// ── POST /api/auth/register ───────────────────
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: 'Name, email and password are required' });
  if (password.length < 6)
    return res.status(400).json({ error: 'Password must be at least 6 characters' });

  try {
    const existing = await pool.query('SELECT id FROM users WHERE email=$1', [email]);
    if (existing.rows.length)
      return res.status(409).json({ error: 'Email already exists' });

    const hash  = await bcrypt.hash(password, 10);
    const today = new Date().toISOString().split('T')[0];

    const { rows } = await pool.query(
      `INSERT INTO users (name, email, password_hash, streak, last_login)
       VALUES ($1, $2, $3, 1, $4)
       RETURNING id`,
      [name, email, hash, today]
    );

    const user  = await fetchFullUser(rows[0].id);
    const token = makeToken(rows[0].id);

    res.status(201).json({ success: true, token, user });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// ── POST /api/auth/login ──────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required' });

  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (!rows.length)
      return res.status(401).json({ error: 'No account found with this email' });

    const u   = rows[0];
    const ok  = await bcrypt.compare(password, u.password_hash);
    if (!ok)
      return res.status(401).json({ error: 'Wrong password' });

    // Streak logic
    const today = new Date().toISOString().split('T')[0];
    let streak  = u.streak || 0;
    if (u.last_login) {
      const diff = Math.floor(
        (new Date(today) - new Date(u.last_login)) / 86400000
      );
      if (diff === 1) streak += 1;
      else if (diff > 1) streak = 1;
    } else {
      streak = 1;
    }

    await pool.query(
      'UPDATE users SET streak=$1, last_login=$2, updated_at=NOW() WHERE id=$3',
      [streak, today, u.id]
    );

    const user  = await fetchFullUser(u.id);
    const token = makeToken(u.id);

    res.json({ success: true, token, user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// ── GET /api/auth/me ──────────────────────────
router.get('/me', authMW, async (req, res) => {
  try {
    const user = await fetchFullUser(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
