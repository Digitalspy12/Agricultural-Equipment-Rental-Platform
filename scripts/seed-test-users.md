# Test Users Setup Instructions

This file contains instructions for creating test user accounts for the Agricultural Equipment Rental Platform.

## Creating Test Users in Supabase

Since Supabase handles authentication securely, you need to create test users through the Supabase Dashboard or using the signup pages in the application.

### Method 1: Use the Signup Pages (Recommended)

1. **Create Farmer Account:**
   - Navigate to: `/auth/signup/farmer`
   - Fill in the form with farmer details
   - Use the credentials below for consistency

2. **Create Owner Account:**
   - Navigate to: `/auth/signup/owner`
   - Fill in the form with owner details
   - Use the credentials below for consistency

3. **Create Admin Account:**
   - Navigate to: `/auth/signup/farmer` (or any signup page)
   - After creating the account, manually update the role in Supabase to 'admin'

### Method 2: Supabase Dashboard

Go to your Supabase project dashboard → Authentication → Users → Add User

## Default Test Credentials

### 🌾 Farmer Account
- **Email:** `farmer@test.com`
- **Password:** `farmer123`
- **Full Name:** John Smith
- **Phone:** +1234567890
- **Farm Name:** Green Valley Farm
- **Farm Size:** 150 acres
- **Farm Location:** Iowa, USA
- **Crop Types:** Corn, Soybeans, Wheat

### 🚜 Owner Account
- **Email:** `owner@test.com`
- **Password:** `owner123`
- **Full Name:** Sarah Johnson
- **Phone:** +1987654321
- **Business Name:** Johnson Equipment Rentals
- **Property Address:** 123 Main St, Cedar Rapids, IA
- **Equipment Count:** 25 units
- **Service Area:** Iowa, Nebraska, Kansas

### 🛡️ Admin Account
- **Email:** `admin@test.com`
- **Password:** `admin123`
- **Full Name:** Admin User
- **Phone:** +1555000000
- **Role:** admin

## Important Notes

1. **Email Verification:** By default, Supabase requires email verification. For testing, you can:
   - Disable email confirmation in Supabase Dashboard → Authentication → Settings → Email Auth
   - Or manually confirm emails in Dashboard → Authentication → Users

2. **Updating Admin Role:** After creating an admin account through the signup form, you must update the role in the profiles table:
   ```sql
   UPDATE public.profiles
   SET role = 'admin'
   WHERE email = 'admin@test.com';
   ```

3. **Password Requirements:** Minimum 6 characters

4. **Security Warning:** These are test credentials only. Never use these in production!
