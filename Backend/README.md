# Tillskill™ Backend (Node.js / MongoDB)

Backend API server for authentication, course subscriptions, invoicing, admin content management,
and blockchain-ready certificates.

## Tech stack

- Node.js (Express)
- MongoDB (connect with Studio 3T using the same database)
- Mongoose for models
- JWT-based auth (students and admins)
- Nodemailer (email integration point)

MongoDB connection:

- Database name defaults to `Tillskill` (matching your Studio 3T database/collection name).
- Configure `MONGO_URI` and (optionally) `MONGO_DB_NAME` in a `.env` file in the `Backend` folder.

```env
MONGO_URI=mongodb://localhost:27017
MONGO_DB_NAME=Tillskill
JWT_SECRET=change-me
FRONTEND_ORIGIN=http://localhost:5173
```

## Running the backend

```bash
cd Backend
npm install
npm run dev
```

The API will listen on `http://localhost:4000` by default.

For the frontend, configure:

```env
VITE_API_BASE_URL=http://localhost:4000
```

in `tillskill/.env` or your Vite environment so that the React app talks to this backend.

## High-level endpoints

- `POST /api/auth/register`, `POST /api/auth/login` – student login & registration.
- `GET /api/courses`, `GET /api/courses/:slug` – public list + course details and active terms.
- `POST /api/courses/:slug/accept-terms` – student accepts T&Cs (long-term flow).
- `POST /api/subscriptions/short/:slug` – create short-term enrollment and hand off to payment.
- `POST /api/subscriptions/long/:slug/initiate` – generate invoice + Wise remittance details (ERP-style).
- `POST /api/subscriptions/:enrollmentId/payment-proof` – upload proof of payment.
- `POST /api/admin/courses`, `PUT /api/admin/courses/:id` – admin manages course metadata, including fees.
- `POST /api/admin/courses/:courseId/terms` – admin manages Terms & Conditions content (versioned).
- `POST /api/admin/enrollments/:id/mark-paid` – admin confirms payment and activates enrollment.
- `POST /api/admin/enrollments/:id/issue-certificate` – issue certificate and stub blockchain anchoring.

## Security considerations

- All sensitive actions go through the backend (never trust the browser for prices or invoices).
- Auth is via signed JWT; use HTTPS in production and keep `JWT_SECRET` safe.
- Express is wrapped with `helmet`, `cors`, and `morgan` for basic hardening, CORS control, and logging.
- Passwords are hashed with `bcryptjs`; never store plain text.
- Admin-only endpoints are protected with role checks in `auth` middleware.

Integrations like payment gateways, ERP systems, email delivery, and blockchain networks should be
implemented in dedicated service modules under `src/lib/` so keys and secrets stay on the server and
not in the frontend.

