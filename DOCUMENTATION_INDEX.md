# Documentation Index

Complete guide to all project documentation for the Agricultural Equipment Rental Platform.

---

## 📚 Start Here

| Document | When to Use | Time Needed |
|----------|------------|-------------|
| **[PROJECT_INFO.md](PROJECT_INFO.md)** | First overview of the project | 5 minutes |
| **[QUICKSTART.md](QUICKSTART.md)** | Fastest way to get running | 5 minutes |
| **[SETUP.md](SETUP.md)** | Detailed setup instructions | 10 minutes |
| **[README.md](README.md)** | Complete documentation | 20 minutes |

---

## 🔑 Test Accounts

| Document | Purpose |
|----------|---------|
| **[TEST_CREDENTIALS.md](TEST_CREDENTIALS.md)** | All test account details and setup |
| `scripts/seed-test-users.md` | How to create test users in Supabase |

### Quick Reference

```
Farmer:  farmer@test.com  / farmer123
Owner:   owner@test.com   / owner123
Admin:   admin@test.com   / admin123
```

---

## 🔧 Troubleshooting

| Document | What It Covers |
|----------|---------------|
| **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** | Common issues and solutions |
| **[HYDRATION_WARNING.md](HYDRATION_WARNING.md)** | Console warning about fdprocessedid (harmless) |

---

## 📖 Full Documentation

### [README.md](README.md)
Complete project documentation including:
- Features overview
- Tech stack details
- Getting started guide
- Database schema
- Authentication system
- Project structure
- Deployment instructions
- Security best practices

### [PROJECT_INFO.md](PROJECT_INFO.md)
Quick project overview with:
- Quick links to all docs
- Key features summary
- Tech stack
- Project structure
- Testing scenarios

---

## 🚀 Setup Guides

### [QUICKSTART.md](QUICKSTART.md)
**Get running in 5 minutes**

1. Install dependencies
2. Setup Supabase
3. Configure environment
4. Run migrations
5. Start server

**Best for:** Developers who want to start immediately

### [SETUP.md](SETUP.md)
**Detailed step-by-step setup**

- Prerequisites checklist
- Detailed Supabase configuration
- Complete migration scripts
- Test account creation
- Common issues & solutions

**Best for:** First-time setup or comprehensive guide

---

## 🗄️ Database

### Migration Scripts

Located in `scripts/` directory:

| Script | Purpose |
|--------|---------|
| `001_create_bookings.sql` | Creates bookings table for rentals |
| `002_create_user_profiles_with_roles.sql` | Creates profiles with farmer/owner/admin roles |
| `seed-test-users.md` | Instructions for creating test users |

### Schema Documentation

See [README.md - Database Schema](#database-schema) section for:
- Table structures
- Column descriptions
- Row Level Security policies
- Indexes

---

## 🔐 Authentication

### Login Pages

| Route | User Type | Document Reference |
|-------|-----------|-------------------|
| `/auth/login` | Farmer & Owner | [README.md](README.md#authentication) |
| `/auth/admin/login` | Admin only | [README.md](README.md#authentication) |

### Signup Pages

| Route | User Type | Fields |
|-------|-----------|--------|
| `/auth/signup/farmer` | Farmers | Farm details (name, size, location, crops) |
| `/auth/signup/owner` | Owners | Business details (name, address, equipment) |
| `/auth/signup` | Selection | Choose farmer or owner |

### Authentication Flow

See [README.md - Authentication](#authentication) for:
- Signup flow
- Login flow
- Role-based routing
- Protected routes
- Session management

---

## 🎯 Features

### For Farmers
- Browse equipment
- Create bookings
- View booking history
- Track payment status

**See:** [README.md - Features](#features)

### For Owners
- Dashboard with all rentals
- Mark payments as paid
- Track revenue
- Manage equipment

**See:** [README.md - Features](#features)

### For Admins
- User management
- Platform statistics
- Booking oversight

**See:** [README.md - Features](#features)

---

## 🐛 Troubleshooting

### [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

Covers all common issues:

**Authentication Issues:**
- Invalid API credentials
- Email not confirmed
- Admin access denied
- Session not persisting

**Database Issues:**
- Missing tables
- RLS policy errors
- Foreign key violations

**Build Issues:**
- Port already in use
- Module not found
- TypeScript errors

**Supabase Issues:**
- Failed to fetch
- Project paused
- Connection errors

### [HYDRATION_WARNING.md](HYDRATION_WARNING.md)

**Everything you need to know about the console warning:**

- What it is (browser extension attributes)
- Why it happens (password managers, form fillers)
- Is it a problem? (No!)
- Should you fix it? (No!)
- Proof it's harmless
- How to verify it's extension-related

**TLDR:** The hydration warning about `fdprocessedid` is completely harmless and can be ignored. It's caused by browser extensions, not your code.

---

## 📦 Project Structure

### Application Routes

```
app/
├── auth/
│   ├── admin/login/         # Admin-only login
│   ├── login/              # General login (farmers & owners)
│   ├── signup/
│   │   ├── farmer/         # Farmer registration
│   │   ├── owner/          # Owner registration
│   │   ├── success/        # Email verification page
│   │   └── page.tsx        # Role selection
│   └── layout.tsx
├── booking/
│   ├── checkout/           # Booking creation flow
│   └── success/            # Booking confirmation
├── bookings/               # Farmer: View all bookings
├── owner/
│   └── dashboard/          # Owner: Manage rentals
├── admin/
│   └── dashboard/          # Admin: Platform management
├── dashboard/              # General user dashboard
└── page.tsx               # Homepage
```

### Component Structure

```
components/
├── ui/                    # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ... (50+ components)
└── logout-button.tsx      # Custom logout component
```

### Library Files

```
lib/
├── supabase/
│   ├── client.ts          # Browser Supabase client
│   ├── server.ts          # Server Supabase client
│   └── proxy.ts           # Session proxy handler
├── types/
│   └── booking.ts         # TypeScript types
└── utils.ts              # Utility functions (cn, etc.)
```

---

## 🚢 Deployment

### Vercel Deployment

**See:** [README.md - Deployment](#deployment)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Production Checklist

**See:** [README.md - Environment Setup](#environment-setup)

- [ ] Enable email verification
- [ ] Update RLS policies
- [ ] Change test credentials
- [ ] Configure domain
- [ ] Enable backups
- [ ] Set up monitoring

---

## 🧪 Testing

### Test Credentials

**See:** [TEST_CREDENTIALS.md](TEST_CREDENTIALS.md)

```
Farmer: farmer@test.com / farmer123
Owner:  owner@test.com  / owner123
Admin:  admin@test.com  / admin123
```

### Test Scenarios

**See:** [PROJECT_INFO.md - Testing Scenarios](#testing-scenarios)

1. Farmer booking flow
2. Owner payment management
3. Admin dashboard access

---

## 🛠️ Development

### Commands

```bash
pnpm install    # Install dependencies
pnpm dev        # Start dev server (localhost:3000)
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

### Environment Variables

**See:** [README.md - Environment Setup](#environment-setup) and `.env.example`

Required:
```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

## 📚 External Resources

### Framework Documentation
- [Next.js 16](https://nextjs.org/docs)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Backend & Database
- [Supabase](https://supabase.com/docs)
- [PostgreSQL](https://www.postgresql.org/docs/)

### Styling & Components
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

---

## 📋 Cheat Sheet

### Most Common Tasks

| Task | Command/Action |
|------|---------------|
| Start dev server | `pnpm dev` |
| Create farmer account | Go to `/auth/signup/farmer` |
| Create owner account | Go to `/auth/signup/owner` |
| Login as farmer/owner | Go to `/auth/login` |
| Login as admin | Go to `/auth/admin/login` |
| View bookings | `/bookings` (farmer) or `/owner/dashboard` (owner) |
| Test booking flow | `/booking/checkout` |
| Make user admin | `UPDATE profiles SET role='admin' WHERE email='...'` |

### Most Common Issues

| Issue | Solution | Doc Link |
|-------|----------|----------|
| Hydration warning | Ignore (browser extensions) | [HYDRATION_WARNING.md](HYDRATION_WARNING.md) |
| Email not confirmed | Disable in Supabase | [TROUBLESHOOTING.md](TROUBLESHOOTING.md) |
| Invalid credentials | Check .env.local | [TROUBLESHOOTING.md](TROUBLESHOOTING.md) |
| Port 3000 in use | `lsof -ti:3000 \| xargs kill -9` | [TROUBLESHOOTING.md](TROUBLESHOOTING.md) |
| Table doesn't exist | Run migrations | [SETUP.md](SETUP.md) |

---

## 🎓 Learning Path

### New to the Project?

1. **Start:** [PROJECT_INFO.md](PROJECT_INFO.md) - Get the big picture
2. **Setup:** [QUICKSTART.md](QUICKSTART.md) - Get it running
3. **Understand:** [README.md](README.md) - Learn the details
4. **Test:** [TEST_CREDENTIALS.md](TEST_CREDENTIALS.md) - Try features
5. **Customize:** Start building!

### Having Issues?

1. **Check:** [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. **Console warning?** [HYDRATION_WARNING.md](HYDRATION_WARNING.md)
3. **Still stuck?** Browser console + Supabase logs

---

## 📞 Need Help?

1. Check the relevant documentation above
2. Review browser console (F12 → Console)
3. Check Supabase logs (Dashboard → Logs)
4. Search the docs for keywords
5. Review Next.js/Supabase documentation

---

## ✅ Quick Checklist

### First Time Setup
- [ ] Read [QUICKSTART.md](QUICKSTART.md)
- [ ] Install dependencies
- [ ] Create Supabase project
- [ ] Run migrations
- [ ] Create test accounts
- [ ] Test all features

### Before Deployment
- [ ] Read [README.md - Deployment](#deployment)
- [ ] Enable email verification
- [ ] Update RLS policies
- [ ] Remove test credentials
- [ ] Set environment variables
- [ ] Test production build

---

**This documentation index provides quick access to everything you need. Start with QUICKSTART.md and refer back here as needed!**
