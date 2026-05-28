// ═══════════════════════════════════════════════
//  SILLBRIDGE — DB INIT  (run once: npm run db:init)
// ═══════════════════════════════════════════════
require('dotenv').config();
const pool = require('./pool');

async function init() {
  const client = await pool.connect();
  try {
    console.log('🔧  Creating SillBridge tables...');

    await client.query(`
      -- USERS ──────────────────────────────────────
      CREATE TABLE IF NOT EXISTS users (
        id            SERIAL PRIMARY KEY,
        name          VARCHAR(100)        NOT NULL,
        email         VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255)        NOT NULL,
        branch        VARCHAR(50),
        xp            INTEGER    DEFAULT 0,
        level         INTEGER    DEFAULT 1,
        streak        INTEGER    DEFAULT 0,
        last_login    DATE,
        daily_xp      INTEGER    DEFAULT 0,
        weekly_xp     INTEGER    DEFAULT 0,
        lang          VARCHAR(5) DEFAULT 'en',
        dark_mode     BOOLEAN    DEFAULT false,
        join_date     TIMESTAMPTZ DEFAULT NOW(),
        updated_at    TIMESTAMPTZ DEFAULT NOW()
      );

      -- COMPLETED LESSONS ───────────────────────────
      CREATE TABLE IF NOT EXISTS completed_lessons (
        id         SERIAL PRIMARY KEY,
        user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        lesson_id  VARCHAR(100) NOT NULL,
        xp_gained  INTEGER DEFAULT 0,
        completed_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, lesson_id)
      );

      -- COMPLETED QUIZZES ───────────────────────────
      CREATE TABLE IF NOT EXISTS completed_quizzes (
        id         SERIAL PRIMARY KEY,
        user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        quiz_id    VARCHAR(100) NOT NULL,
        score      INTEGER DEFAULT 0,
        xp_gained  INTEGER DEFAULT 0,
        completed_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, quiz_id)
      );

      -- COMPLETED PROJECTS ──────────────────────────
      CREATE TABLE IF NOT EXISTS completed_projects (
        id         SERIAL PRIMARY KEY,
        user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        project_id VARCHAR(100) NOT NULL,
        xp_gained  INTEGER DEFAULT 0,
        completed_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, project_id)
      );

      -- BADGES ──────────────────────────────────────
      CREATE TABLE IF NOT EXISTS user_badges (
        id         SERIAL PRIMARY KEY,
        user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        badge_id   VARCHAR(50) NOT NULL,
        awarded_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, badge_id)
      );

      -- INDEXES ─────────────────────────────────────
      CREATE INDEX IF NOT EXISTS idx_users_email        ON users(email);
      CREATE INDEX IF NOT EXISTS idx_cl_user            ON completed_lessons(user_id);
      CREATE INDEX IF NOT EXISTS idx_cq_user            ON completed_quizzes(user_id);
      CREATE INDEX IF NOT EXISTS idx_cp_user            ON completed_projects(user_id);
      CREATE INDEX IF NOT EXISTS idx_badges_user        ON user_badges(user_id);
    `);

    console.log('✅  All tables created successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('  1. Copy .env.example → .env and fill in your DB credentials');
    console.log('  2. npm run dev  (start the server)');
    console.log('  3. Open frontend/index.html in a browser or Live Server');
  } catch (err) {
    console.error('❌  DB init failed:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

init();
