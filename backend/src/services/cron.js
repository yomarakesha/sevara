// ═══════════════════════════════════════════════
//  SILLBRIDGE — SCHEDULED JOBS
//  Daily and weekly XP reset.
//  Uses node-cron with the server's local time zone
//  (override via CRON_TZ env var, e.g. "UTC" or "Asia/Ashgabat").
// ═══════════════════════════════════════════════
const cron = require('node-cron');
const pool = require('../db/pool');

function tz() {
  return process.env.CRON_TZ || 'UTC';
}

async function resetDailyXP() {
  try {
    const r = await pool.query('UPDATE users SET daily_xp = 0 WHERE daily_xp <> 0');
    console.log(`🕛  [cron] daily_xp reset — ${r.rowCount} users`);
  } catch (err) {
    console.error('❌  [cron] daily reset failed:', err.message);
  }
}

async function resetWeeklyXP() {
  try {
    const r = await pool.query('UPDATE users SET weekly_xp = 0 WHERE weekly_xp <> 0');
    console.log(`📅  [cron] weekly_xp reset — ${r.rowCount} users`);
  } catch (err) {
    console.error('❌  [cron] weekly reset failed:', err.message);
  }
}

async function pruneExpiredResetTokens() {
  try {
    const r = await pool.query("DELETE FROM password_resets WHERE expires_at < NOW() - INTERVAL '1 day'");
    if (r.rowCount) console.log(`🧹  [cron] purged ${r.rowCount} expired reset tokens`);
  } catch (err) {
    console.error('❌  [cron] token prune failed:', err.message);
  }
}

function start() {
  const timezone = tz();

  // Daily — every day at 00:00
  cron.schedule('0 0 * * *', resetDailyXP, { timezone });

  // Weekly — every Monday at 00:00
  cron.schedule('0 0 * * 1', resetWeeklyXP, { timezone });

  // Hourly token cleanup
  cron.schedule('30 * * * *', pruneExpiredResetTokens, { timezone });

  console.log(`⏱  Cron jobs scheduled (tz: ${timezone})`);
  console.log('     · daily_xp   reset 00:00');
  console.log('     · weekly_xp  reset Mon 00:00');
  console.log('     · token prune :30 each hour');
}

module.exports = { start, resetDailyXP, resetWeeklyXP, pruneExpiredResetTokens };
