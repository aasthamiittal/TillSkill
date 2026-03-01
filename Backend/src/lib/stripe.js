/**
 * Stripe integration for short-term course payments (global).
 * Requires STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET in .env (client credentials).
 */

const Stripe = require('stripe');

let stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
}

function isConfigured() {
  return !!stripe;
}

/**
 * Create a Stripe Checkout Session for a short-term enrollment.
 * @param {Object} enrollment - Mongoose enrollment doc
 * @param {Object} course - Course doc with title, feeAmount, currency, slug
 * @param {string} baseUrl - Frontend origin for success/cancel URLs
 * @returns {Promise<string|null>} checkout URL or null if amount is 0
 */
async function createCheckoutSessionForEnrollment(enrollment, course, baseUrl) {
  if (!stripe) throw new Error('Stripe is not configured');

  const amount = Math.round((course.feeAmount || 0) * 100); // Stripe uses smallest unit (cents for USD)
  const currency = (course.currency || 'usd').toLowerCase().slice(0, 3);

  if (amount <= 0) return null;

  const successUrl = `${baseUrl}/my-courses?payment=success`;
  const cancelUrl = `${baseUrl}/my-courses?payment=cancelled`;

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency,
          unit_amount: amount,
          product_data: {
            name: course.title,
            description: `TillSkill™ – ${course.title}`,
          },
        },
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: enrollment.studentEmail || undefined,
    metadata: {
      enrollmentId: enrollment._id.toString(),
      courseSlug: course.slug,
    },
  });

  return session.url;
}

/**
 * Construct and verify a Stripe webhook event from raw body and signature.
 */
function constructWebhookEvent(payload, signature, secret) {
  if (!secret) throw new Error('Stripe webhook secret not configured');
  return Stripe.webhooks.constructEvent(payload, signature, secret);
}

module.exports = {
  stripe,
  isConfigured,
  createCheckoutSessionForEnrollment,
  constructWebhookEvent,
};
