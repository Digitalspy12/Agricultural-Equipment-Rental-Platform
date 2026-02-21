# Agricultural Equipment Rental Platform

## Project Overview

A full-stack web application connecting farmers who need agricultural equipment with equipment owners who provide rental services. Features role-based authentication, booking management, and cash-on-delivery payment tracking.

---

## Quick Links

| Document | Purpose |
|----------|---------|
| **[QUICKSTART.md](QUICKSTART.md)** | Get started in 5 minutes |
| **[README.md](README.md)** | Complete documentation |
| **[SETUP.md](SETUP.md)** | Detailed setup guide |
| **[TEST_CREDENTIALS.md](TEST_CREDENTIALS.md)** | Test account credentials |
| **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** | Fix common issues |
| **[HYDRATION_WARNING.md](HYDRATION_WARNING.md)** | Understand console warnings |

---

## Default Test Credentials

### 🌾 Farmer
```
Email: farmer@test.com
Password: farmer123
```

### 🚜 Owner
```
Email: owner@test.com
Password: owner123
```

### 🛡️ Admin
```
Email: admin@test.com
Password: admin123
(Must set role='admin' manually in database)
```

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI + shadcn/ui
- **Package Manager:** pnpm

---

## Key Features

### Authentication System
- ✅ Separate signup flows for Farmers and Owners
- ✅ Secure admin login with role verification
- ✅ Email/password authentication via Supabase
- ✅ Row Level Security (RLS) for data protection
- ✅ Role-based access control (farmer/owner/admin)

### Booking System
- ✅ Equipment rental checkout flow
- ✅ Date selection and cost calculation
- ✅ Pay on Arrival (Cash on Delivery)
- ✅ Booking status tracking (confirmed/delivered/completed/cancelled)
- ✅ Payment status tracking (pending/paid)

### Dashboard Features
- ✅ Farmer: View bookings and payment status
- ✅ Owner: Manage rentals, mark payments as paid
- ✅ Admin: Platform statistics and user management

### Design
- ✅ Responsive mobile-first design
- ✅ Agricultural-themed color scheme
- ✅ Accessible UI components
- ✅ Dark mode support

---

## Database Schema

### Tables

**profiles** - User information with role-based fields
- Farmer fields: farm_name, farm_size_acres, farm_location, crop_types
- Owner fields: business_name, property_address, equipment_count, service_area
- Admin: role='admin'

**bookings** - Equipment rental bookings
- Equipment details and rental dates
- Booking status and payment tracking
- Renter and owner contact information

---

## Project Structure

```
v0-project/
├── app/
│   ├── auth/
│   │   ├── admin/login/      # Admin-only login
│   │   ├── login/            # General login
│   │   └── signup/
│   │       ├── farmer/       # Farmer signup
│   │       └── owner/        # Owner signup
│   ├── booking/
│   │   ├── checkout/         # Booking flow
│   │   └── success/          # Confirmation
│   ├── owner/dashboard/      # Owner management
│   ├── admin/dashboard/      # Admin panel
│   └── bookings/             # Farmer bookings
├── components/ui/            # shadcn/ui components
├── lib/
│   ├── supabase/            # Database clients
│   └── types/               # TypeScript types
├── scripts/                 # SQL migrations
├── README.md               # Full documentation
├── SETUP.md               # Setup instructions
├── QUICKSTART.md          # 5-minute setup
├── TEST_CREDENTIALS.md    # Test accounts
├── TROUBLESHOOTING.md     # Common issues
└── HYDRATION_WARNING.md   # Console warning explanation
```

---

## Getting Started

### Fastest Way (5 Minutes)
Follow **[QUICKSTART.md](QUICKSTART.md)**

### Detailed Setup
Follow **[SETUP.md](SETUP.md)**

### First Time with Supabase?
Read **[README.md](README.md)** for complete context

---

## Development Commands

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

---

## Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Get these from: Supabase Dashboard → Settings → API

---

## Key Pages & Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Homepage | Public |
| `/auth/login` | General login | Public |
| `/auth/admin/login` | Admin login | Public (verified) |
| `/auth/signup/farmer` | Farmer signup | Public |
| `/auth/signup/owner` | Owner signup | Public |
| `/booking/checkout` | Rental checkout | Public (demo) |
| `/bookings` | Farmer bookings | Farmers |
| `/owner/dashboard` | Owner management | Owners |
| `/admin/dashboard` | Admin panel | Admins only |

---

## Security Features

- ✅ Password hashing via Supabase Auth
- ✅ Row Level Security (RLS) policies
- ✅ Role-based access control
- ✅ Admin role verification
- ✅ Secure session management
- ✅ Email verification support (optional)

---

## Known Issues

### Hydration Warning (Non-Critical)

You may see a console warning about `fdprocessedid` attributes. This is:
- ✅ **Harmless** - Does not affect functionality
- ✅ **Expected** - Caused by browser extensions (password managers, form fillers)
- ✅ **Development Only** - Suppressed in production builds
- ✅ **Well Documented** - See [HYDRATION_WARNING.md](HYDRATION_WARNING.md)

**Action Required:** None. This can be safely ignored.

---

## Deployment

### Deploy to Vercel

1. Push to GitHub
2. Import to Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

**Production Checklist:**
- [ ] Enable email verification in Supabase
- [ ] Update RLS policies for production
- [ ] Change test credentials
- [ ] Configure custom domain
- [ ] Enable database backups
- [ ] Set up monitoring

---

## Testing Scenarios

### Farmer Journey
1. Signup at `/auth/signup/farmer`
2. Login at `/auth/login`
3. Create booking at `/booking/checkout`
4. View bookings at `/bookings`

### Owner Journey
1. Signup at `/auth/signup/owner`
2. Login at `/auth/login`
3. View dashboard at `/owner/dashboard`
4. Mark payment as paid

### Admin Journey
1. Login at `/auth/admin/login`
2. View dashboard at `/admin/dashboard`
3. Monitor platform statistics

---

## Support & Documentation

### Problems?
1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Review browser console for errors
3. Check Supabase logs
4. Verify environment variables

### Questions?
1. Read [README.md](README.md)
2. Check [Next.js docs](https://nextjs.org/docs)
3. Check [Supabase docs](https://supabase.com/docs)

---

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## License

MIT License - See LICENSE file for details

---

## Acknowledgments

Built with:
- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a service
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Radix UI](https://radix-ui.com/) - Primitive components
- [Lucide](https://lucide.dev/) - Icons

---

## Project Status

✅ **Production Ready** (with minor configuration for production use)

**Current Version:** 1.0.0

**Last Updated:** 2026

---

**Happy Farming! 🌾🚜**

*For the fastest setup, start with [QUICKSTART.md](QUICKSTART.md)*
