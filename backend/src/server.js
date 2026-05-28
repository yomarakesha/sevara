// ═══════════════════════════════════════════════
//  SILLBRIDGE — EXPRESS SERVER
// ═══════════════════════════════════════════════
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const authRoutes     = require('./routes/auth');
const progressRoutes = require('./routes/progress');
const pool           = require('./db/pool');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────
app.use(cors({
  origin: (origin, callback) => {
    // Allow: no origin (curl, Postman), file:// (string "null"), localhost
    if (!origin || origin === 'null' || origin === 'file://') return callback(null, true);
    // In production, restrict to FRONTEND_URL; in dev allow all origins
    const allowed = process.env.FRONTEND_URL;
    if (!allowed || process.env.NODE_ENV !== 'production') return callback(null, true);
    if (origin === allowed) return callback(null, true);
    callback(new Error('Not allowed by CORS: ' + origin));
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Request logger (dev) ──────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.use((req, _res, next) => {
    console.log(`${new Date().toISOString()}  ${req.method} ${req.path}`);
    next();
  });
}

// ── Routes ────────────────────────────────────
app.use('/api/auth',     authRoutes);
app.use('/api/progress', progressRoutes);

// ── Health check ──────────────────────────────
app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'connected', timestamp: new Date().toISOString() });
  } catch {
    res.status(503).json({ status: 'error', db: 'disconnected' });
  }
});

// ── Serve frontend static files ──────────────
const frontendPath = path.join(__dirname, '../../frontend');
app.use(express.static(frontendPath));

// ── API 404 — must come BEFORE the SPA fallback ──
app.use('/api', (_req, res) => res.status(404).json({ error: 'API route not found' }));

// ── SPA fallback — serve index.html for all non-API routes ──
app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// ── Global error handler ──────────────────────
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ── Start ─────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('  ╔══════════════════════════════════╗');
  console.log(`  ║  SillBridge API  →  :${PORT}        ║`);
  console.log('  ╚══════════════════════════════════╝');
  console.log('');
  console.log(`  App:     http://localhost:${PORT}`);
  console.log(`  Health:  http://localhost:${PORT}/api/health`);
  console.log(`  Auth:    http://localhost:${PORT}/api/auth`);
  console.log(`  Progress:http://localhost:${PORT}/api/progress`);
  console.log('');
});
