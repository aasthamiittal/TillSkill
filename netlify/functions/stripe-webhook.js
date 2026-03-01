/**
 * Netlify Function: Stripe webhook (needs raw body for signature verification).
 * Proxied via /api/webhooks/stripe -> /.netlify/functions/stripe-webhook
 */

const path = require('path');

const backendPath = path.resolve(__dirname, '../../Backend');
require('dotenv').config({ path: path.join(backendPath, '../.env') });

const Enrollment = require(path.join(backendPath, 'src/models/enrollment'));
const { connectDb } = require(path.join(backendPath, 'src/lib/db'));
const { constructWebhookEvent } = require(path.join(backendPath, 'src/lib/stripe'));

let dbReady = null;

async function ensureDb() {
  if (!dbReady) {
    dbReady = connectDb();
  }
  return dbReady;
}

module.exports.handler = async (event, context) => {
  await ensureDb();

  const signature = event.headers['stripe-signature'] || event.headers['Stripe-Signature'];
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret) {
    return {
      statusCode: 503,
      body: JSON.stringify({ message: 'Webhook secret not configured' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  let payload = event.body;
  if (event.isBase64Encoded) {
    payload = Buffer.from(payload, 'base64');
  } else if (typeof payload === 'string') {
    payload = Buffer.from(payload, 'utf8');
  }

  let evt;
  try {
    evt = constructWebhookEvent(payload, signature, secret);
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `Webhook signature verification failed: ${err.message}` }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  if (evt.type === 'checkout.session.completed') {
    const session = evt.data.object;
    const enrollmentId = session.metadata?.enrollmentId;
    if (enrollmentId) {
      try {
        const enrollment = await Enrollment.findById(enrollmentId);
        if (enrollment && enrollment.status === 'awaiting_payment') {
          enrollment.status = 'active';
          await enrollment.save();
        }
      } catch (err) {
        console.error('Webhook: failed to activate enrollment', err);
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Internal error' }),
          headers: { 'Content-Type': 'application/json' },
        };
      }
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
    headers: { 'Content-Type': 'application/json' },
  };
};
