# Agricultural Equipment Rental Platform

A comprehensive web application connecting farmers who need agricultural equipment with equipment owners who provide rental services. Built with Next.js 16, React 19, Supabase, and Tailwind CSS.

---

## 🚀 Quick Start

**Want to get started in 5 minutes?** → See **[QUICKSTART.md](QUICKSTART.md)**

**First time setting up?** → See **[SETUP.md](SETUP.md)** for detailed instructions

**Need test credentials?** → See **[TEST_CREDENTIALS.md](TEST_CREDENTIALS.md)**

**Console warnings?** → See **[HYDRATION_WARNING.md](HYDRATION_WARNING.md)** (it's harmless!)

**Having issues?** → See **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)**

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Test Credentials](#test-credentials)
- [Deployment](#deployment)
- [Known Issues](#known-issues)
- [Contributing](#contributing)

---

## Features

### For Farmers (Equipment Renters)
- Browse available agricultural equipment
- Book equipment with flexible date selection
- Pay on arrival (Cash on Delivery)
- View booking history and status
- Track payment status (Pending/Paid)
- Manage farm profile with details (farm size, location, crops)

### For Equipment Owners
- Dashboard to manage all equipment rentals
- View all bookings with status tracking
- Mark payments as paid upon delivery
- Track revenue and booking analytics
- Manage business profile

### For Administrators
- Secure admin-only access
- View all users (Farmers and Owners)
- Monitor platform statistics
- Manage bookings and payments
- Platform oversight and analytics

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **React:** 19.2.4
- **Database & Auth:** Supabase (PostgreSQL + Auth)
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI + shadcn/ui
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **Language:** TypeScript
- **Package Manager:** pnpm

---

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- Supabase account (free tier works)

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd v0-project
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up Supabase:**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Run the database migrations (see Database Setup below)

4. **Configure environment variables:**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Run database migrations:**
   
   Go to your Supabase project dashboard → SQL Editor and run these scripts in order:

   **Migration 1: Create Profiles Table**
   ```sql
   -- See scripts/002_create_user_profiles_with_roles.sql
   -- Creates profiles table with role-based fields for farmers, owners, and admins
   ```

   **Migration 2: Create Bookings Table**
   ```sql
   -- See scripts/001_create_bookings.sql
   -- Creates bookings table for equipment rentals
   ```

6. **Disable email confirmation (for local testing):**
   
   Supabase Dashboard → Authentication → Providers → Email → Disable "Confirm email"

7. **Start the development server:**
   ```bash
   pnpm dev
   ```

8. **Open your browser:**
   ```
   http://localhost:3000
   ```

---

## Database Schema

### Tables

#### `public.profiles`
Stores user profile information with role-based fields.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key, references auth.users(id) |
| `email` | text | User email (unique) |
| `full_name` | text | User's full name |
| `phone` | text | Contact phone number |
| `role` | text | User role: 'farmer', 'owner', or 'admin' |
| `farm_name` | text | Farmer: Name of the farm |
| `farm_size_acres` | numeric | Farmer: Farm size in acres |
| `farm_location` | text | Farmer: Geographic location |
| `crop_types` | text | Farmer: Types of crops grown |
| `business_name` | text | Owner: Business/company name |
| `property_address` | text | Owner: Business address |
| `equipment_count` | integer | Owner: Number of equipment units |
| `service_area` | text | Owner: Geographic service area |
| `created_at` | timestamp | Account creation date |
| `updated_at` | timestamp | Last update timestamp |

#### `public.bookings`
Stores equipment rental bookings with payment tracking.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `equipment_name` | text | Name of rented equipment |
| `equipment_type` | text | Category of equipment |
| `rental_start_date` | date | Rental period start |
| `rental_end_date` | date | Rental period end |
| `total_cost` | numeric | Total rental cost |
| `booking_status` | text | Status: confirmed/delivered/completed/cancelled |
| `payment_status` | text | Payment: pending/paid |
| `renter_name` | text | Farmer's name |
| `renter_phone` | text | Farmer's contact |
| `renter_location` | text | Delivery location |
| `owner_name` | text | Equipment owner's name |
| `owner_phone` | text | Owner's contact |
| `created_at` | timestamp | Booking creation date |
| `updated_at` | timestamp | Last update timestamp |

### Row Level Security (RLS)

Both tables have RLS enabled with policies for secure data access:
- Users can view/update their own profiles
- Admins can view all profiles
- All authenticated users can create and view bookings (demo mode)

---

## Authentication

The platform implements role-based authentication with three user types:

### Signup Pages

1. **Farmer Signup:** `/auth/signup/farmer`
   - Collects farm-specific information
   - Role automatically set to 'farmer'
   
2. **Owner Signup:** `/auth/signup/owner`
   - Collects business and equipment details
   - Role automatically set to 'owner'

3. **Signup Selection:** `/auth/signup`
   - Landing page to choose account type

### Login Pages

1. **General Login:** `/auth/login`
   - For Farmers and Owners
   - Redirects based on user role after login
   
2. **Admin Login:** `/auth/admin/login`
   - Restricted access for administrators
   - Validates admin role before granting access
   - Non-admin users are logged out immediately

### Protected Routes

- `/dashboard` - General user dashboard
- `/bookings` - Farmer booking management
- `/owner/dashboard` - Owner equipment management
- `/admin/dashboard` - Admin platform management

### Authentication Flow

1. User signs up through role-specific form
2. Supabase creates auth user
3. Database trigger auto-creates profile with role
4. Email verification required (can be disabled for testing)
5. User logs in and is redirected based on role

---

## Project Structure

```
v0-project/
├── app/
│   ├── actions/
│   │   └── auth.ts              # Server actions for auth
│   ├── admin/
│   │   └── dashboard/           # Admin dashboard
│   ├── auth/
│   │   ├── admin/
│   │   │   └── login/          # Admin login page
│   │   ├── login/              # General login page
│   │   ├── signup/
│   │   │   ├── farmer/         # Farmer signup
│   │   │   ├── owner/          # Owner signup
│   │   │   ├── success/        # Email verification notice
│   │   │   └── page.tsx        # Signup type selection
│   │   └── layout.tsx
│   ├── booking/
│   │   ├── checkout/           # Booking checkout flow
│   │   └── success/            # Booking confirmation
│   ├── bookings/               # Booking list (Farmer view)
│   ├── dashboard/              # User dashboard
│   ├── owner/
│   │   └── dashboard/          # Owner equipment dashboard
│   ├── globals.css             # Global styles + Tailwind config
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── components/
│   ├── ui/                     # shadcn/ui components
│   └── logout-button.tsx       # Logout component
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser Supabase client
│   │   ├── server.ts           # Server Supabase client
│   │   └── proxy.ts            # Session proxy handler
│   ├── types/
│   │   └── booking.ts          # TypeScript types
│   └── utils.ts                # Utility functions
├── scripts/
│   ├── 001_create_bookings.sql           # Bookings table migration
│   ├── 002_create_user_profiles.sql      # Profiles table migration
│   └── seed-test-users.md                # Test user creation guide
├── middleware.ts               # Next.js middleware for auth
├── package.json
├── tsconfig.json
└── README.md
```

---

## Key Features

### 1. Pay on Arrival (Cash on Delivery)

The platform supports rural users who prefer cash transactions:

- **Booking Flow:**
  1. Farmer selects equipment and dates
  2. Reviews total cost at checkout
  3. Confirms booking (no payment required)
  4. System creates booking with `payment_status: 'pending'`

- **Payment Flow:**
  1. Equipment is delivered to farmer's location
  2. Farmer pays cash to owner on arrival
  3. Owner marks payment as paid via dashboard
  4. System updates to `payment_status: 'paid'`

### 2. Role-Based Dashboards

Each user type has a customized dashboard:

- **Farmers:** View their bookings and payment status
- **Owners:** Manage all rentals, mark payments as paid
- **Admins:** Platform-wide statistics and user management

### 3. Secure Authentication

- Supabase authentication with email/password
- Row Level Security for data protection
- Role-based access control
- Admin verification on sensitive routes

### 4. Responsive Design

- Mobile-first approach
- Works on all devices (phones, tablets, desktops)
- Accessible UI components
- Clean, agricultural-themed design

---

## Test Credentials

### 🌾 Farmer Account
```
Email: farmer@test.com
Password: farmer123

Profile:
- Name: John Smith
- Phone: +1234567890
- Farm: Green Valley Farm
- Size: 150 acres
- Location: Iowa, USA
- Crops: Corn, Soybeans, Wheat
```

### 🚜 Owner Account
```
Email: owner@test.com
Password: owner123

Profile:
- Name: Sarah Johnson
- Phone: +1987654321
- Business: Johnson Equipment Rentals
- Address: 123 Main St, Cedar Rapids, IA
- Equipment: 25 units
- Service Area: Iowa, Nebraska, Kansas
```

### 🛡️ Admin Account
```
Email: admin@test.com
Password: admin123

Profile:
- Name: Admin User
- Phone: +1555000000
- Role: admin (must be set manually)
```

**Creating Test Users:**

See `scripts/seed-test-users.md` for detailed instructions on creating these accounts.

**Quick Setup:**
1. Use the signup pages to create farmer and owner accounts
2. For admin: Create any account, then update the role in Supabase:
   ```sql
   UPDATE public.profiles
   SET role = 'admin'
   WHERE email = 'admin@test.com';
   ```

---

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Deploy:**
   - Vercel automatically builds and deploys
   - Your app will be live at `https://your-app.vercel.app`

### Environment Variables (Production)

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## Known Issues

### Hydration Warning (Non-Critical)

You may see a hydration mismatch warning in the browser console:

```
A tree hydrated but some attributes of the server rendered HTML didn't match...
```

**Cause:** Browser extensions (like form fillers, password managers) add attributes (`fdprocessedid`) to form inputs before React hydrates.

**Impact:** This is cosmetic only and does not affect functionality.

**Solutions:**
- Ignore the warning (recommended - it's harmless)
- Disable browser extensions temporarily
- Test in incognito mode

**Why it happens:**
- Extensions modify the DOM before React takes control
- React detects the mismatch between server HTML and client HTML
- The app continues to work perfectly despite the warning

---

## API Routes

The application uses Supabase for all backend operations. No custom API routes are needed.

**Data Operations:**
- Authentication: Supabase Auth
- Database queries: Supabase JavaScript client
- Real-time updates: Supabase Realtime (optional)

---

## Environment Setup

### Development
```bash
pnpm dev        # Start dev server at localhost:3000
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

### Production Checklist

- [ ] Enable email verification in Supabase
- [ ] Update RLS policies for production security
- [ ] Change test credentials
- [ ] Configure custom domain
- [ ] Enable database backups
- [ ] Set up monitoring and analytics
- [ ] Review and tighten Row Level Security policies
- [ ] Add rate limiting for auth endpoints

---

## Security Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore` by default
2. **Use strong passwords** - Minimum 8 characters in production
3. **Enable email verification** - Required for production
4. **Review RLS policies** - Current policies are for demo purposes
5. **Monitor auth logs** - Check for suspicious activity
6. **Update dependencies** - Keep packages up to date
7. **Restrict admin access** - Manually verify admin role changes

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Support

For issues or questions:
- Check existing issues on GitHub
- Review Supabase documentation
- Check Next.js documentation

---

## License

This project is licensed under the MIT License.

---

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database by [Supabase](https://supabase.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)

---

**Happy Farming! 🌾🚜**
