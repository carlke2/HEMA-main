# Hema Platform - Local Setup Guide

Welcome to the Hema Platform! This guide outlines the exact, straight-forward steps required to get the platform running perfectly in your own local environment. 

This project uses Nuxt 3, Prisma ORM, and Supabase (PostgreSQL).

---

## 1. Prerequisites
Ensure you have the following installed on your machine:
*   **Node.js**: v18 or v20+ (LTS recommended)
*   **npm**: Installed automatically with Node.js.

## 2. Install Dependencies
Open your terminal in the root folder of the project (`Hema-main`) and run:
```bash
npm install
```

## 3. Environment Variables (`.env`)
Create a file named `.env` in the root folder (if it doesn't already exist) and paste the following. 

**CRITICAL NOTE**: Your `DATABASE_URL` *must* include `?pgbouncer=true&connection_limit=1` at the end to prevent the server from repeatedly crashing due to Supabase connection pooling drops!

```env
# Database configuration (Supabase)
DATABASE_URL="postgresql://[USER]:[PASSWORD]@[HOST]:5432/postgres?pgbouncer=true&connection_limit=1"

# Required for Nuxt session encryption (must be at least 32 characters)
NUXT_SESSION_PASSWORD="hema-session-secret-key-at-least-32-chars-long"

# OAuth Configuration (for Google Sign-in)
NUXT_OAUTH_GOOGLE_REDIRECT_URL="http://localhost:3000/api/v1/auth/google"
GOOGLE_REDIRECT_URL="http://localhost:3000/api/v1/auth/google"

# AWS S3 (Leave blank if you are not testing file uploads locally)
S3_BUCKET_NAME=
S3_REGION=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_ENDPOINT=
```

## 4. Database Initialization & Seeding
Because this platform uses a strict multi-tenant architecture with specific user roles, you **must** run the database seeders before you log in to avoid being trapped in infinite redirect loops on the dashboards.

Run these exact commands in order:

**1. Generate the Prisma Client:**
```bash
npx prisma generate
```

**2. Push the Schema to the Database:**
```bash
npx prisma db push
```

**3. Seed Standard Users (Families & Au Pairs):**
```bash
npx tsx prisma/seed.ts
```

**4. Seed the Agency & Admin Dashboards:**
*(This step specifically generates the required `Agency` and `AgencyUserProfile` database relationships needed to access the Agency dashboard without errors).*
```bash
npx tsx prisma/add-admin.ts
```

## 5. Run the Server
Once the database is seeded, start your development server:
```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

---

## 🔐 Local Test Accounts
All seeded test accounts share the exact same password: **`Password123!`**

| Role | Email Address | Dashboard Access |
| :--- | :--- | :--- |
| **Admin** | `admin@hema.example.com` | `/admin` |
| **Agency** | `agency@hema.example.com` | `/agency` |
| **Au Pair** | `aupair1@hema.example.com` | `/au-pair/dashboard` |
| **Family** | `family1@hema.example.com` | `/au-pair/family` |

---

## 🛠️ Notable System Patches (Already implemented in this code)
For context, the following critical architecture fixes have already been implemented in this archive so you won't have to deal with them:
1.  **Bcrypt Auth Fix:** Nuxt's default `scrypt` hashing was replaced with `bcrypt` in the login/signup endpoints to perfectly match our Prisma database seeders.
2.  **Infinite Redirect Prevention:** `/pages/agency/index.vue` now actively monitors for missing `agencyId` fields and aggressively clears "stale" cookies, preventing the Vue router from looping infinitely.
3.  **ECONNRESET Server Crash Fix:** We added a global catch in `plugins/error-handler.server.ts` that safely absorbs and ignores idle connection drops triggered by the Supabase pooler, ensuring your local dev server never randomly shuts down.
