# Making TillSkill.com Live – DNS & Deployment Guide

This document gives you the **DNS records and deployment steps** so you (or your registrar/host) can make TillSkill.com point to this app. You can use it in a call or share it with whoever manages the domain.

**Frontend is already on Netlify.** Use the [Netlify DNS section](#netlify-tillskillcom---replace-squarespace) below for exact records to add at your DNS provider.

---

## Netlify – TillSkill.com (replace Squarespace)

Use these values **at your current DNS provider** (where TillSkill.com is registered). This will point TillSkill.com and www to your Netlify site instead of Squarespace.

### 1. In Netlify first (one-time)

1. In Netlify: **Domain management** → **Add domain** → **Add a domain you already own**.
2. Add **TillSkill.com** and **www.TillSkill.com**.
3. Netlify will show “Pending DNS verification” and may show you the exact target for **www**. Note your site’s Netlify URL (e.g. `tillskill.netlify.app` or whatever your site name is) — you’ll use it for the **www** CNAME below.

### 2. DNS records to change at your registrar

**Do not remove or change:** MX, _dmarc, squarespace._domainkey, or the Google verification CNAME (`53oxqixc5gyo`). Those are for email and verification.

**Remove these (Squarespace):**

- All **four A records** for **@** (host `@`, values `198.49.23.144`, `198.185.159.145`, `198.49.23.145`, `198.185.159.144`).
- The **CNAME** for **www** that points to `ext-cust.squarespace.com`.

**Add these (Netlify):**

| Record type | Host / Name | Value / Data |
|-------------|-------------|--------------|
| **A**       | `@`         | `75.2.60.5`  |
| **CNAME**   | `www`       | `tillskill.netlify.app` |

- **A record:** One record only. Host = `@` (or “TillSkill.com” / “root” depending on your provider). Value = **75.2.60.5** (Netlify’s load balancer).
- **CNAME record:** Host = `www`. Value = **tillskill.netlify.app**.

After saving, DNS can take up to 24–48 hours to propagate. Netlify will then issue HTTPS for TillSkill.com and www.

---

## Current setup (from your DNS)

- **TillSkill.com** and **www** → currently point to **Squarespace** (A records + www CNAME).
- **Email** → Google Workspace (MX, DMARC, etc.). **Do not change** these if you want to keep email on Google.

---

## Two ways to go live

### Option A: Replace the main site with this app

Point **TillSkill.com** and **www.TillSkill.com** to where this app is hosted.  
Squarespace will no longer serve the site; this React + Node app will be the main website.  
**→ Use the [Netlify section above](#netlify-tillskillcom---replace-squarespace) for exact records.**

### Option B: Keep Squarespace and add this app on a subdomain

- Keep **TillSkill.com** and **www** on Squarespace.
- Use a subdomain for this app, e.g. **app.TillSkill.com**.
- Add one **CNAME**: Host = `app`, Value = `<your-netlify-site>.netlify.app`. Do not touch A records, www, MX, or email records.

---

## What you need to deploy first

1. **Frontend (this Vite/React app)** – **Already on Netlify.**
2. **Backend (Node/Express in `Backend/`)** – Host on Railway, Render, Fly.io, or a VPS. Set **VITE_API_BASE_URL** in Netlify to your backend URL (e.g. `https://api.tillskill.com`).
3. **Database** – MongoDB (e.g. Atlas) as-is; backend needs connection string in production env.

---

## DNS records to add (after you choose a host)

Once the frontend and backend are deployed, the host will give you either:

- A **hostname** (e.g. `tillskill.vercel.app`, `your-app.onrender.com`), or  
- An **IP address** (e.g. for a VPS).

Use that in the DNS below. **Do not remove or change** your existing **MX**, **_dmarc**, or **squarespace._domainkey** (or other email) records.

---

### If you use a subdomain (e.g. app.TillSkill.com) – Option B

| Record type | Host / Name | Value / Data | Notes |
|-------------|-------------|--------------|--------|
| **CNAME**   | `app`       | *(value from your frontend host)* | e.g. `cname.vercel-dns.com` for Vercel, or the host’s target. |

- **Host** = `app` means **app.TillSkill.com**.
- Replace **Value** with the exact target your frontend host tells you (e.g. Vercel/Netlify “custom domain” instructions).

If the backend gets its own subdomain (e.g. api.TillSkill.com):

| Record type | Host / Name | Value / Data |
|-------------|-------------|--------------|
| **CNAME**   | `api`       | *(target hostname from your backend host)* |

---

### If you replace the main site – Option A

You will **replace** the current A records and the **www** CNAME for TillSkill.com.

**Root domain (TillSkill.com):**

- If your **frontend host gives you an IP**: add an **A** record, **Host** = `@`, **Value** = that IP (you may have 1–2 IPs; add one A record per IP).
- If your **frontend host gives you a CNAME target** (e.g. Vercel/Netlify): many registrars allow a CNAME on `@` (ALIAS/ANAME/Flattened CNAME); **Host** = `@`, **Value** = that target. If your registrar does not support CNAME on root, they will tell you to use A records (they’ll give you the IPs).

**www:**

| Record type | Host / Name | Value / Data |
|-------------|-------------|--------------|
| **CNAME**   | `www`       | *(target from your frontend host, e.g. `cname.vercel-dns.com` or your host’s given target)* |

You **remove or replace** the existing **A** records for `@` and the **www** CNAME that currently point to Squarespace, so the new app is used instead.

---

## Checklist for your side

- [ ] Choose where to host **frontend** (e.g. Vercel) and **backend** (e.g. Railway/Render).
- [ ] Deploy frontend and backend; get the **exact** CNAME target(s) or A record IP(s) from the host.
- [ ] **Leave all MX, _dmarc, and email-related records unchanged.**
- [ ] Add only the new records above (CNAME for `app` and optionally `api`, or A + CNAME for `@` and `www` if replacing the main site).
- [ ] Set production env for the frontend: **VITE_API_BASE_URL** = your backend URL (e.g. `https://api.tillskill.com` or the host’s URL).
- [ ] Backend: set **MongoDB connection string**, **JWT_SECRET**, **Stripe keys**, **CORS origin** (e.g. `https://tillskill.com` or `https://app.tillskill.com`) in the host’s environment variables.

---

## Summary for a quick call

- **Option B (subdomain)**  
  - Add **CNAME**: Host = `app`, Value = **tillskill.netlify.app**. Do not touch MX, _dmarc, or other email records.

- **Option A (replace main site)**  
  - Replace A records for `@` and CNAME for `www` with the new host’s values; leave MX and email records as they are.

**Netlify quick reference:** Remove the four Squarespace A records for @ and the www CNAME. Add: **A** @ → **75.2.60.5**; **CNAME** www → **tillskill.netlify.app**. Do not remove MX, _dmarc, or email-related records. If you tell me the host (e.g. Vercel + Railway), I can fill in the exact “Value” examples for TillSkill.com.
