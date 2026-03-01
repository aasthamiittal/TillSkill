# Payment & Enrollment Flow – Plan (Client Requirements)

## Client requirements (summary)

### a. Short-term courses (CPE, single-session)
- **Payment can be made online on the website** (global: cards and other methods).

### b. Long-term courses (ERP integration)
1. Student attends introductory webinar (understands requirements).
2. Student registers on website with basic details (name, email, address, phone, etc.).
3. Student goes through terms & conditions, understands fee structure, and accepts.
4. **On acceptance, ERP auto-generates invoice with remittance details.**
5. Student remits money and sends proof of payment.
6. Enrolment is complete when money is received.
7. Login details issued within 24 hours (operational).

---

## Current implementation vs requirements

| Requirement | Current state | Gap / note |
|-------------|---------------|------------|
| **Short: Online payment on website** | Enrollment created with `status: awaiting_payment`. No gateway. Backend comment: "create payment session (Stripe, Razorpay)". | **Gap:** Need to integrate a payment gateway so the student can pay online and status moves to `paid` (or equivalent). |
| **Long: Intro webinar** | Not in app (marketing / external). | No change needed in this codebase. |
| **Long: Register with basic details** | ✅ Registration form (name, email, phone, etc.) + login. | Done. |
| **Long: Terms + fee + accept** | ✅ Terms step with fee structure and accept checkbox; then backend creates enrollment + invoice. | Done. |
| **Long: ERP auto-generates invoice** | ✅ Backend generates invoice (number, amount, remittance details) on accept. Invoice stored in DB. | Done in-app. **Clarify with client:** Is "ERP" an external system we must sync with (e.g. Tally, Zoho), or is our backend the "ERP" that generates the invoice? If external sync is required, add an "ERP integration" phase. |
| **Long: Remit + send proof** | ✅ Student can remit (remittance details shown). Proof upload API exists (`POST /:enrollmentId/payment-proof`). | Backend done. **Optional:** Frontend UI on My Courses to upload proof. |
| **Long: Enrolment complete when money received** | ✅ Admin can mark invoice as paid and enrollment as `active` (`POST /enrollments/:id/mark-paid`). | Done. |
| **Long: Login details within 24 hours** | Operational (manual/email). | No app change. |

---

## Recommended phases

### Phase 1 – Short-term: Online payment on the website (priority)

**Goal:** For short-term enrollments, students worldwide can pay online; status moves from `awaiting_payment` to `paid` without manual admin step.

**Gateway: Stripe (global payments)**

Payment will be **global**, so the plan uses **Stripe** as the primary gateway (cards and local payment methods in 46+ countries, single integration).

- **Backend:** Create a [Checkout Session](https://stripe.com/docs/checkout) or [PaymentIntent](https://stripe.com/docs/payments/payment-intents) for the enrollment amount; return `sessionId` (redirect URL) or `clientSecret` to the frontend.
- **Frontend:** Redirect to Stripe Checkout (hosted page) or embed Stripe Elements and confirm the PaymentIntent. On success, redirect to a success page and/or refresh My Courses.
- **Webhook:** Subscribe to `checkout.session.completed` or `payment_intent.succeeded`; verify signature, find enrollment (and invoice if created), set invoice `status: paid`, `paidAt`, and enrollment `status: active`.

*Optional later:* Add a regional gateway (e.g. Razorpay for India-specific UPI/wallets) alongside Stripe if needed.

**Backend changes (conceptual):**
- Env: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`; optionally `STRIPE_PUBLISHABLE_KEY` for frontend.
- After creating short-term enrollment (and optionally a small invoice/order record), create Stripe Checkout Session or PaymentIntent (amount in smallest currency unit, e.g. cents), store `stripePaymentIntentId` or `stripeSessionId` on enrollment or a payment record.
- New webhook route (e.g. `POST /api/webhooks/stripe`): verify `Stripe-Signature`, parse event, on success event find enrollment and mark paid + active.

**Frontend changes (conceptual):**
- After "Enrol in this course" for short-term, call backend to create enrollment + Stripe session; redirect to `session.url` (Checkout) or show Stripe Elements with `clientSecret`.
- Success: redirect to `/my-courses?payment=success` or dedicated success page.
- My Courses: for enrollments with `awaiting_payment`, show "Pay now" button that creates a new Stripe session and redirects.

**Data model:**
- Enrollment (and optional Invoice for short-term) as today. Add optional field e.g. `stripePaymentIntentId` or `stripeSessionId` for idempotency and reconciliation.

---

### Phase 2 – Long-term: Clarify "ERP" and optional proof upload UI

**ERP:**
- **If "ERP" = our backend:** Current flow (auto-generate invoice on accept) already meets "ERP auto-generates invoice." Document it as such.
- **If "ERP" = external system (Tally, Zoho, etc.):** Add a separate integration: on invoice creation (and maybe on mark-paid), call external API to create/sync invoice. Keep TillSkill as source of truth; ERP as mirror for accounting.

**Proof of payment (long-term):**
- Backend already has `POST /api/subscriptions/:enrollmentId/payment-proof` (body: `proofUrl`).
- Add in **My Courses** (or enrollment detail): for enrollments with `status: awaiting_payment` and type `long`, show "Upload proof of payment" (file upload or URL). Frontend uploads file (to storage or existing endpoint), then calls `payment-proof` with the URL.

---

### Phase 3 – Optional improvements

- **Invoice PDF:** Generate PDF for long-term (and short-term if you create an invoice) and allow download from My Courses.
- **Email:** Send email on enrollment creation, on invoice generated, and when payment is confirmed (optional; needs SMTP/config).
- **Admin:** List enrollments with filters (by status, course, date); bulk "mark paid" or "send reminder."

---

## Summary

| Item | Action |
|------|--------|
| **Short-term: online payment** | Phase 1: **Stripe** (global). Add create-session + webhook; frontend redirect to Checkout or Elements; optional "Pay now" in My Courses. |
| **Long-term: flow** | Already aligned with client (register → terms → accept → auto-invoice → remit + proof → mark paid → active). |
| **Long-term: ERP** | Confirm with client: our backend only vs sync to external ERP; if sync, add Phase 2 ERP integration. |
| **Proof upload (long)** | Backend done; add Phase 2 UI for "Upload proof" on My Courses for awaiting_payment long enrollments. |

Once Stripe keys and webhook are configured, the next step is to implement Phase 1 (short-term online payment with Stripe), then Phase 2 (ERP sync if needed + proof upload UI).

---

## Stripe setup (client credentials)

Phase 1 is **implemented**. To enable live payments:

1. **Get from client (Stripe Dashboard):** Secret key (`sk_...`) and webhook signing secret (`whsec_...`) for endpoint `https://your-backend-url/api/webhooks/stripe` (event `checkout.session.completed`).
2. **Add to `Backend/.env`:** `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `FRONTEND_ORIGIN` for success/cancel redirects.
3. **Without credentials:** Short-term enrollment still works; no checkout URL is returned until keys are set. Then "Pay now" and post-enrol redirect use Stripe Checkout.
