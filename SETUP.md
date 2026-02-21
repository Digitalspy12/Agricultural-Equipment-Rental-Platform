# Quick Setup Guide

This guide will help you get the Agricultural Equipment Rental Platform running locally in under 10 minutes.

## Prerequisites Checklist

- [ ] Node.js 18+ installed ([Download](https://nodejs.org/))
- [ ] pnpm installed (`npm install -g pnpm`)
- [ ] Supabase account ([Sign up free](https://supabase.com))

---

## Step-by-Step Setup

### 1. Install Dependencies (2 minutes)

```bash
# Install all required packages
pnpm install
```

### 2. Create Supabase Project (3 minutes)

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Fill in:
   - **Name:** agricultural-rental (or any name)
   - **Database Password:** Create a strong password (save it!)
   - **Region:** Choose closest to you
4. Click "Create new project"
5. Wait 2-3 minutes for project to initialize

### 3. Get Supabase Credentials (1 minute)

1. In your Supabase project dashboard, click "Settings" (gear icon)
2. Click "API" in the sidebar
3. Copy these two values:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

### 4. Configure Environment Variables (1 minute)

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and replace with your values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 5. Run Database Migrations (2 minutes)

1. In Supabase dashboard, click "SQL Editor" in the left sidebar
2. Click "New query"
3. Run **Migration 1** - Create Profiles Table:

```sql
-- Copy the entire contents from:
-- scripts/002_create_user_profiles_with_roles.sql
-- Or use the SQL below:

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text not null,
  phone text not null,
  role text not null check (role in ('farmer', 'owner', 'admin')),
  farm_name text,
  farm_size_acres numeric(10, 2),
  farm_location text,
  crop_types text,
  business_name text,
  property_address text,
  equipment_count integer,
  service_area text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles 
  for select using (auth.uid() = id);

create policy "profiles_insert_own" on public.profiles 
  for insert with check (auth.uid() = id);

create policy "profiles_update_own" on public.profiles 
  for update using (auth.uid() = id);

create policy "profiles_select_admin" on public.profiles 
  for select using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists profiles_email_idx on public.profiles(email);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, phone, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', 'User'),
    coalesce(new.raw_user_meta_data->>'phone', ''),
    coalesce(new.raw_user_meta_data->>'role', 'farmer')
  )
  on conflict (id) do nothing;
  
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
```

4. Click "Run" (or press Cmd/Ctrl + Enter)
5. Create a new query and run **Migration 2** - Create Bookings Table:

```sql
-- Copy from scripts/001_create_bookings.sql or use:

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  equipment_name text not null,
  equipment_type text not null,
  rental_start_date date not null,
  rental_end_date date not null,
  total_cost numeric(10, 2) not null,
  booking_status text not null default 'confirmed',
  payment_status text not null default 'pending',
  renter_name text not null,
  renter_phone text not null,
  renter_location text not null,
  owner_name text not null,
  owner_phone text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint valid_booking_status check (booking_status in ('confirmed', 'delivered', 'completed', 'cancelled')),
  constraint valid_payment_status check (payment_status in ('pending', 'paid'))
);

alter table public.bookings enable row level security;

create policy "bookings_insert_public" on public.bookings for insert with check (true);
create policy "bookings_select_public" on public.bookings for select using (true);
create policy "bookings_update_public" on public.bookings for update using (true);

create index if not exists bookings_payment_status_idx on public.bookings(payment_status);
create index if not exists bookings_booking_status_idx on public.bookings(booking_status);
create index if not exists bookings_created_at_idx on public.bookings(created_at desc);
```

6. Click "Run"

### 6. Disable Email Confirmation (For Testing Only)

1. In Supabase dashboard, go to "Authentication" → "Providers"
2. Click on "Email"
3. Toggle OFF "Confirm email"
4. Click "Save"

**Important:** Re-enable this in production!

### 7. Start the Development Server (1 minute)

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Create Test Accounts

### Option 1: Use the Signup Pages

1. **Farmer Account:**
   - Go to `http://localhost:3000/auth/signup/farmer`
   - Email: `farmer@test.com`
   - Password: `farmer123`
   - Fill in other fields
   - Click "Create Farmer Account"

2. **Owner Account:**
   - Go to `http://localhost:3000/auth/signup/owner`
   - Email: `owner@test.com`
   - Password: `owner123`
   - Fill in other fields
   - Click "Create Owner Account"

3. **Admin Account:**
   - Create any account (farmer or owner)
   - Go to Supabase → SQL Editor
   - Run:
     ```sql
     UPDATE public.profiles
     SET role = 'admin'
     WHERE email = 'admin@test.com';
     ```

### Option 2: Create in Supabase Dashboard

1. Go to "Authentication" → "Users"
2. Click "Add user" → "Create new user"
3. Enter email and password
4. After creation, manually insert profile in SQL Editor

---

## Testing the Application

### Test the Farmer Flow
1. Login at `/auth/login` with `farmer@test.com`
2. Go to `/booking/checkout`
3. Fill in booking details
4. Confirm booking with "Pay on Arrival"
5. View booking at `/bookings`

### Test the Owner Flow
1. Login at `/auth/login` with `owner@test.com`
2. Go to `/owner/dashboard`
3. View all bookings
4. Click "Mark as Paid" on a pending booking

### Test the Admin Flow
1. Login at `/auth/admin/login` with `admin@test.com`
2. View admin dashboard at `/admin/dashboard`
3. See all users and statistics

---

## Common Issues & Solutions

### Issue: "Invalid API credentials"
**Solution:** Double-check your `.env.local` file has the correct Supabase URL and key.

### Issue: "Email not confirmed"
**Solution:** Disable email confirmation in Supabase (step 6 above).

### Issue: "Cannot insert into profiles table"
**Solution:** Make sure you ran both migrations (step 5).

### Issue: Hydration warnings in console
**Solution:** This is caused by browser extensions. It's harmless and can be ignored. See README.md for details.

### Issue: Port 3000 already in use
**Solution:** 
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
pnpm dev -p 3001
```

---

## Next Steps

- [ ] Customize the design and branding
- [ ] Add more equipment types
- [ ] Implement search and filtering
- [ ] Add image uploads for equipment
- [ ] Set up email notifications
- [ ] Deploy to Vercel

---

## Need Help?

- Read the full [README.md](README.md)
- Check [Supabase Docs](https://supabase.com/docs)
- Check [Next.js Docs](https://nextjs.org/docs)
- Review [scripts/seed-test-users.md](scripts/seed-test-users.md)

---

**You're all set! Start building! 🚀**
