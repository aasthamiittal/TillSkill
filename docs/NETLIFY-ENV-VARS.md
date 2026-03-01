# Netlify Environment Variables

Set these in **Netlify Dashboard → Site settings → Environment variables** for the app to work with functions.

## Required

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `JWT_SECRET` | Secret for signing JWTs | A long random string |
| `STRIPE_SECRET_KEY` | Stripe secret key (sk_live_...) | From Stripe Dashboard |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (whsec_...) | From Stripe webhook config |

## Optional

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_DB_NAME` | MongoDB database name | `Tillskill` |
| `FRONTEND_ORIGIN` | Origin for CORS and Stripe redirect URLs | Netlify sets `URL` automatically; use this to override (e.g. `https://tillskill.com`) |

## Stripe Webhook

In Stripe Dashboard → Webhooks → Add endpoint:

- **URL:** `https://tillskill.netlify.app/api/webhooks/stripe` (or `https://tillskill.com/api/webhooks/stripe` when using custom domain)
- **Events:** `checkout.session.completed`
- Copy the **Signing secret** (whsec_...) and set it as `STRIPE_WEBHOOK_SECRET` in Netlify.

## Note

- `VITE_API_BASE_URL` is **not** needed for production. The frontend uses same-origin requests (`/api/...`) when deployed.
- For local dev with `netlify dev`, the backend runs as functions; the frontend still uses `http://localhost:8888` (or similar) and API calls go to same origin.
