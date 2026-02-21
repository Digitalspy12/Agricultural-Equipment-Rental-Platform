# Quick Start Guide

Get the Agricultural Equipment Rental Platform running in 5 minutes.

---

## Prerequisites

- [ ] Node.js 18+ installed
- [ ] pnpm installed: `npm install -g pnpm`
- [ ] Supabase account (free): [supabase.com](https://supabase.com)

---

## 1. Install Dependencies (1 minute)

```bash
pnpm install
```

---

## 2. Setup Supabase (2 minutes)

### Create Project
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Create project (takes 2 minutes)

### Get Credentials
1. Click "Settings" → "API"
2. Copy "Project URL" and "anon public" key

---

## 3. Configure Environment (1 minute)

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## 4. Run Migrations (1 minute)

In Supabase Dashboard → SQL Editor, run these two scripts:

### Migration 1: Profiles Table
```sql
-- Copy from scripts/002_create_user_profiles_with_roles.sql
-- Creates user profiles with farmer/owner/admin roles
```

### Migration 2: Bookings Table
```sql
-- Copy from scripts/001_create_bookings.sql
-- Creates equipment rental bookings table
```

### Disable Email Verification (Testing Only)
1. Authentication → Providers → Email
2. Toggle OFF "Confirm email"
3. Save

---

## 5. Start Development Server (30 seconds)

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Test the Application

### Create Test Accounts

**Farmer Account:**
1. Go to `/auth/signup/farmer`
2. Email: `farmer@test.com` | Password: `farmer123`
3. Fill in farm details and signup

**Owner Account:**
1. Go to `/auth/signup/owner`
2. Email: `owner@test.com` | Password: `owner123`
3. Fill in business details and signup

**Admin Account:**
1. Create any account first
2. In Supabase SQL Editor:
   ```sql
   UPDATE public.profiles
   SET role = 'admin'
   WHERE email = 'admin@test.com';
   ```

### Test Features

**Farmer Flow:**
- Login → `/auth/login`
- Book equipment → `/booking/checkout`
- View bookings → `/bookings`

**Owner Flow:**
- Login → `/auth/login`
- Manage rentals → `/owner/dashboard`
- Mark payments as paid

**Admin Flow:**
- Login → `/auth/admin/login`
- View dashboard → `/admin/dashboard`

---

## Common Issues

### "Invalid API credentials"
Check `.env.local` has correct values and restart: `pnpm dev`

### "Email not confirmed"
Disable email confirmation in Supabase (step 4)

### Hydration warning in console
Ignore it. Caused by browser extensions. See [HYDRATION_WARNING.md](HYDRATION_WARNING.md)

### Port 3000 in use
```bash
lsof -ti:3000 | xargs kill -9
```

---

## Next Steps

- [ ] Read [README.md](README.md) for full documentation
- [ ] Check [TEST_CREDENTIALS.md](TEST_CREDENTIALS.md) for all test accounts
- [ ] Review [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues
- [ ] Customize design and features
- [ ] Deploy to Vercel

---

## Documentation Index

| File | Description |
|------|-------------|
| [README.md](README.md) | Complete project documentation |
| [SETUP.md](SETUP.md) | Detailed setup instructions |
| [QUICKSTART.md](QUICKSTART.md) | This file - 5 minute setup |
| [TEST_CREDENTIALS.md](TEST_CREDENTIALS.md) | All test account details |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Common issues and fixes |
| [HYDRATION_WARNING.md](HYDRATION_WARNING.md) | Explains the hydration warning |
| `scripts/seed-test-users.md` | How to create test users |

---

**You're ready to start building! 🚀**

Need help? Check the documentation files above or visit the Supabase/Next.js docs.
