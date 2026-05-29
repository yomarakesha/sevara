// ═══════════════════════════════════════════════
//  SILLBRIDGE — AUTH ROUTES
//  POST /api/auth/register
//  POST /api/auth/login            (rate-limited)
//  GET  /api/auth/me
//  POST /api/auth/forgot-password  (rate-limited)
//  POST /api/auth/reset-password
// ═══════════════════════════════════════════════
const router   = require('express').Router();
const bcrypt   = require('bcryptjs');
const crypto   = require('crypto');
const jwt      = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const pool     = require('../db/pool');
const authMW   = require('../middleware/auth');
const { sendPasswordResetEmail } = require('../services/email');

// ── Rate limiters ─────────────────────────────
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,        // 15 minutes
  max: 5,                          // 5 attempts per IP
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,    // don't count successful logins
  message: { error: 'Too many login attempts. Please wait 15 minutes and try again.' },
});

const forgotLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,        // 1 hour
  max: 5,                          // 5 reset requests per IP per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many reset requests. Please try again later.' },
});

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

function sha256(s) {
  return crypto.createHash('sha256').update(s).digest('hex');
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
router.post('/login', loginLimiter, async (req, res) => {
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

// ── POST /api/auth/forgot-password ────────────
// Generates a one-time reset token and emails the user.
// Always returns success (even for unknown emails) to avoid user enumeration.
router.post('/forgot-password', forgotLimiter, async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const { rows } = await pool.query('SELECT id, name FROM users WHERE email=$1', [email]);

    if (rows.length) {
      const userId = rows[0].id;
      const rawToken = crypto.randomBytes(32).toString('hex');
      const tokenHash = sha256(rawToken);
      const expires  = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      // Invalidate any prior unused tokens
      await pool.query(
        'UPDATE password_resets SET used = true WHERE user_id=$1 AND used = false',
        [userId]
      );
      await pool.query(
        `INSERT INTO password_resets (user_id, token_hash, expires_at)
         VALUES ($1, $2, $3)`,
        [userId, tokenHash, expires]
      );

      // Build the link the user will click.
      // FRONTEND_URL should point to the deployed frontend; default to same host.
      const origin = process.env.FRONTEND_URL
        || (req.headers.origin && req.headers.origin !== 'null' ? req.headers.origin : null)
        || `${req.protocol}://${req.get('host')}`;
      const resetUrl = `${origin.replace(/\/$/, '')}/#reset?token=${rawToken}`;

      try {
        await sendPasswordResetEmail(email, resetUrl, rows[0].name);
      } catch (mailErr) {
        console.error('Email send failed:', mailErr.message);
      }
    }

    // Always identical response
    res.json({ success: true, message: 'If that email exists, a reset link has been sent.' });
  } catch (err) {
    console.error('Forgot-password error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── POST /api/auth/reset-password ─────────────
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) return res.status(400).json({ error: 'Token and new password are required' });
  if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

  try {
    const tokenHash = sha256(token);
    const { rows } = await pool.query(
      `SELECT pr.id, pr.user_id, pr.expires_at, pr.used
       FROM password_resets pr
       WHERE pr.token_hash = $1`,
      [tokenHash]
    );

    if (!rows.length || rows[0].used || new Date(rows[0].expires_at) < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired reset link' });
    }

    const hash = await bcrypt.hash(password, 10);
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('UPDATE users SET password_hash=$1, updated_at=NOW() WHERE id=$2', [hash, rows[0].user_id]);
      await client.query('UPDATE password_resets SET used=true WHERE id=$1', [rows[0].id]);
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }

    res.json({ success: true, message: 'Password has been reset. Please sign in.' });
  } catch (err) {
    console.error('Reset-password error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
