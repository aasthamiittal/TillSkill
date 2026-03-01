require('dotenv').config();

const express = require('express');
const { connectDb } = require('./lib/db');
const app = require('./app');

const stripeWebhookRoutes = require('./routes/stripeWebhook');

// Stripe webhook must receive raw body (only for standalone server)
app.use('/api/webhooks', express.raw({ type: 'application/json' }), stripeWebhookRoutes);

const PORT = process.env.PORT || 4000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Tillskill backend listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Failed to connect to database', err);
    process.exit(1);
  });

