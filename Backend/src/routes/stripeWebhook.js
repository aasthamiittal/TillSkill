/**
 * Stripe webhook: on successful payment, mark enrollment as active.
 * Must be mounted with express.raw({ type: 'application/json' }) so signature verification works.
 */

const express = require('express');
const Enrollment = require('../models/enrollment');
const { constructWebhookEvent } = require('../lib/stripe');

const router = express.Router();

router.post('/stripe', async (req, res) => {
  const signature = req.headers['stripe-signature'];
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret) {
    return res.status(503).json({ message: 'Webhook secret not configured' });
  }

  let event;
  try {
    event = constructWebhookEvent(req.body, signature, secret);
  } catch (err) {
    return res.status(400).json({ message: `Webhook signature verification failed: ${err.message}` });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const enrollmentId = session.metadata?.enrollmentId;
    if (!enrollmentId) {
      return res.status(200).json({ received: true });
    }

    try {
      const enrollment = await Enrollment.findById(enrollmentId);
      if (enrollment && enrollment.status === 'awaiting_payment') {
        enrollment.status = 'active';
        await enrollment.save();
      }
    } catch (err) {
      console.error('Webhook: failed to activate enrollment', err);
      return res.status(500).json({ message: 'Internal error' });
    }
  }

  return res.status(200).json({ received: true });
});

module.exports = router;
