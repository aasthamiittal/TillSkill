/**
 * Express app for API routes (used by both standalone server and Netlify Functions).
 * Stripe webhook is excluded - it runs as a separate Netlify Function with raw body.
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const adminRoutes = require('./routes/admin');
const subscriptionRoutes = require('./routes/subscriptions');
const meRoutes = require('./routes/me');

const app = express();

const isNetlify = !!process.env.NETLIFY;

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || process.env.URL || 'http://localhost:5173',
    credentials: true,
  })
);

if (!isNetlify) {
  app.use(require('morgan')('dev'));
}

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' });
});

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/me', meRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
});

module.exports = app;
