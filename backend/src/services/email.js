// ═══════════════════════════════════════════════
//  SILLBRIDGE — EMAIL SERVICE (Nodemailer)
//  Sends password-reset emails.
//  In development, if SMTP is not configured,
//  the email body is logged to the console instead.
// ═══════════════════════════════════════════════
const nodemailer = require('nodemailer');

let _transporter = null;

function getTransporter() {
  if (_transporter) return _transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    // No SMTP configured — use a "console" transport for dev
    _transporter = {
      sendMail: async (opts) => {
        console.log('\n📧  [EMAIL — dev console transport]');
        console.log('    To:      ', opts.to);
        console.log('    Subject: ', opts.subject);
        console.log('    Body:');
        console.log(String(opts.text || opts.html).replace(/^/gm, '      '));
        console.log('');
        return { messageId: 'dev-' + Date.now() };
      },
    };
    return _transporter;
  }

  _transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT || '587'),
    secure: parseInt(SMTP_PORT || '587') === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return _transporter;
}

async function sendPasswordResetEmail(to, resetUrl, userName = '') {
  const from = process.env.MAIL_FROM || 'SillBridge <no-reply@sillbridge.dev>';
  const subject = 'Reset your SillBridge password';

  const text = `Hi ${userName || 'there'},

We received a request to reset your SillBridge password.

Click the link below to set a new password (valid for 1 hour):
${resetUrl}

If you didn't request this, you can safely ignore this email — your password won't change.

— The SillBridge team`;

  const html = `<!doctype html>
<html><body style="font-family:Arial,sans-serif;background:#F3F4F6;padding:24px;color:#111827;">
  <div style="max-width:560px;margin:auto;background:#fff;border-radius:12px;padding:32px;">
    <h2 style="color:#6366F1;margin-top:0;">Reset your password</h2>
    <p>Hi ${userName || 'there'},</p>
    <p>We received a request to reset your SillBridge password.</p>
    <p style="margin:28px 0;">
      <a href="${resetUrl}"
         style="background:#6366F1;color:#fff;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:600;display:inline-block;">
        Reset Password
      </a>
    </p>
    <p style="color:#6B7280;font-size:14px;">Or copy and paste this link:<br><a href="${resetUrl}">${resetUrl}</a></p>
    <p style="color:#6B7280;font-size:14px;">This link is valid for 1 hour. If you didn't request this, you can ignore this email.</p>
    <hr style="border:none;border-top:1px solid #E5E7EB;margin:24px 0;">
    <p style="color:#9CA3AF;font-size:12px;">— The SillBridge team</p>
  </div>
</body></html>`;

  const transporter = getTransporter();
  return transporter.sendMail({ from, to, subject, text, html });
}

module.exports = { sendPasswordResetEmail };
