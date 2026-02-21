# Test Account Credentials

Quick reference for testing the Agricultural Equipment Rental Platform.

---

## 🌾 Farmer Account

```
Email:    farmer@test.com
Password: farmer123
```

**Profile Details:**
- Full Name: John Smith
- Phone: +1234567890
- Farm Name: Green Valley Farm
- Farm Size: 150 acres
- Location: Iowa, USA
- Crops: Corn, Soybeans, Wheat

**Access:**
- Login at `/auth/login`
- Dashboard at `/bookings`
- Create bookings at `/booking/checkout`

---

## 🚜 Owner Account

```
Email:    owner@test.com
Password: owner123
```

**Profile Details:**
- Full Name: Sarah Johnson
- Phone: +1987654321
- Business: Johnson Equipment Rentals
- Address: 123 Main St, Cedar Rapids, IA
- Equipment: 25 units
- Service Area: Iowa, Nebraska, Kansas

**Access:**
- Login at `/auth/login`
- Dashboard at `/owner/dashboard`
- Manage rentals and mark payments as paid

---

## 🛡️ Admin Account

```
Email:    admin@test.com
Password: admin123
```

**Profile Details:**
- Full Name: Admin User
- Phone: +1555000000
- Role: admin

**Access:**
- Login at `/auth/admin/login` (restricted)
- Dashboard at `/admin/dashboard`
- View all users and platform statistics

**Setup Note:** Admin role must be set manually in database:
```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'admin@test.com';
```

---

## Creating These Accounts

### Method 1: Use Signup Pages

1. Go to `/auth/signup/farmer` or `/auth/signup/owner`
2. Fill in the form with the details above
3. Create account
4. For admin: Update role manually in Supabase

### Method 2: Supabase Dashboard

1. Go to Authentication → Users → Add User
2. Enter email and password
3. Create user
4. Profile will be auto-created by database trigger

---

## Quick Test Scenarios

### Test Booking Flow (Farmer)
1. Login as farmer
2. Go to `/booking/checkout`
3. Create a booking
4. View at `/bookings`

### Test Owner Dashboard
1. Login as owner
2. Go to `/owner/dashboard`
3. View bookings
4. Mark payment as paid

### Test Admin Access
1. Login as admin at `/auth/admin/login`
2. View dashboard
3. See user statistics

---

## Important Security Notes

- These are TEST CREDENTIALS only
- Never use in production
- Change all passwords for live deployment
- Keep default admin account disabled in production
- Enable email verification for production

---

**For full setup instructions, see [SETUP.md](SETUP.md)**
