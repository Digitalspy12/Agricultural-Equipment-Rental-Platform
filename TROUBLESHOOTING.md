# Troubleshooting Guide

Common issues and their solutions for the Agricultural Equipment Rental Platform.

---

## Hydration Mismatch Warning

### The Warning

You may see this warning in your browser console:

```
Warning: A tree hydrated but some attributes of the server rendered HTML didn't match the client properties.
```

Followed by details about `fdprocessedid` attribute mismatches on form inputs.

### Is This a Problem?

**No, this is completely harmless.** Your application works perfectly despite this warning.

### What Causes It?

Browser extensions (password managers, form fillers, accessibility tools) add custom attributes to form inputs before React finishes hydrating the page. Common extensions that cause this:

- Password managers (LastPass, 1Password, Bitwarden, etc.)
- Form fillers
- Grammar checkers (Grammarly)
- Accessibility tools

The `fdprocessedid` attribute is added by these extensions to track which forms they've processed.

### Why Does React Warn About It?

React expects the HTML from the server to exactly match what it renders on the client. When browser extensions modify the DOM before React takes control, React detects a mismatch and warns you. However, React still works correctly and reconciles the differences.

### Solutions (Pick One)

#### Option 1: Ignore It (Recommended)

This is the best option because:
- The warning doesn't affect functionality
- It only appears in development mode
- It's caused by user-installed extensions, not your code
- Production builds won't show this in the console

#### Option 2: Test Without Extensions

To verify it's extension-related:
1. Open an incognito/private window
2. Navigate to your site
3. The warning should disappear

#### Option 3: Disable Specific Extensions

Temporarily disable browser extensions:
1. Open browser extension settings
2. Disable password managers and form fillers
3. Refresh the page
4. Warning should disappear

#### Option 4: Suppress the Warning (Development Only)

You can suppress React hydration warnings in development by adding this to your root layout:

```tsx
// app/layout.tsx
useEffect(() => {
  // Suppress hydration warnings caused by browser extensions
  const originalError = console.error;
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('hydrat')) {
      return;
    }
    originalError(...args);
  };
}, []);
```

**Note:** We don't recommend this because it might hide actual hydration issues in your code.

---

## Authentication Issues

### "Invalid API credentials"

**Cause:** Incorrect or missing Supabase credentials.

**Solution:**
1. Check `.env.local` exists and has correct values
2. Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Restart dev server after changing env variables: `pnpm dev`

### "Email not confirmed"

**Cause:** Supabase requires email verification by default.

**Solution for Testing:**
1. Go to Supabase Dashboard → Authentication → Providers
2. Click "Email"
3. Disable "Confirm email"
4. Save changes

**Solution for Production:**
Keep email verification enabled and either:
- Check the email inbox for confirmation link
- Manually confirm in Supabase Dashboard → Authentication → Users

### "Access denied. Admin credentials required."

**Cause:** Trying to access admin login without admin role.

**Solution:**
1. Create a user account first
2. Update their role in Supabase SQL Editor:
   ```sql
   UPDATE public.profiles
   SET role = 'admin'
   WHERE email = 'your-email@example.com';
   ```
3. Try logging in again

### Session Not Persisting

**Cause:** Missing middleware or proxy configuration.

**Solution:**
1. Verify `middleware.ts` exists in root directory
2. Verify `lib/supabase/proxy.ts` exists
3. Restart dev server

---

## Database Issues

### "relation 'public.profiles' does not exist"

**Cause:** Database migrations haven't been run.

**Solution:**
Run the migrations in Supabase SQL Editor (see SETUP.md step 5).

### "insert or update on table 'profiles' violates foreign key constraint"

**Cause:** Trying to create a profile for a user that doesn't exist in auth.users.

**Solution:**
Always create users through Supabase signup, which creates both the auth user and triggers the profile creation.

### RLS Policy Errors

**Cause:** Row Level Security policies blocking access.

**Solution:**
1. Make sure you're authenticated
2. Check if the policy allows your role to access the data
3. Review policies in Supabase Dashboard → Database → Tables → Select table → Policies

---

## Build & Development Issues

### Port 3000 Already in Use

**Cause:** Another process is using port 3000.

**Solution:**

**Option 1 - Kill the process:**
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Option 2 - Use different port:**
```bash
pnpm dev -p 3001
```

### Module Not Found Errors

**Cause:** Missing dependencies.

**Solution:**
```bash
# Remove node_modules and reinstall
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

### TypeScript Errors

**Cause:** Type mismatches or missing types.

**Solution:**
1. Check the error message carefully
2. Ensure all packages are installed: `pnpm install`
3. Restart TypeScript server in VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

---

## Supabase Issues

### "Failed to fetch"

**Cause:** Network issues or incorrect Supabase URL.

**Solution:**
1. Check your internet connection
2. Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
3. Check if Supabase project is paused (free tier pauses after 7 days of inactivity)

### Supabase Project Paused

**Cause:** Free tier projects pause after 7 days of inactivity.

**Solution:**
1. Go to Supabase Dashboard
2. Click "Restore" on your project
3. Wait 2-3 minutes for restoration

---

## Login/Signup Not Working

### Form Submits But Nothing Happens

**Cause:** Check browser console for errors.

**Solution:**
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for failed requests
4. Look for authentication errors

### User Created But Can't Login

**Cause:** Email verification required.

**Solution:**
See "Email not confirmed" section above.

---

## Performance Issues

### Slow Page Loads

**Cause:** Development mode is slower than production.

**Solution:**
Test production build:
```bash
pnpm build
pnpm start
```

### Database Queries Slow

**Cause:** Missing indexes or large datasets.

**Solution:**
1. Check if indexes exist (they're in the migration scripts)
2. Monitor queries in Supabase Dashboard → Database → Query Performance

---

## Deployment Issues (Vercel)

### Build Fails

**Cause:** Various reasons - check build logs.

**Common Solutions:**
1. Ensure all dependencies are in `package.json`
2. Check for TypeScript errors locally: `pnpm build`
3. Verify environment variables are set in Vercel dashboard

### Environment Variables Not Working

**Cause:** Variables not configured in Vercel.

**Solution:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Redeploy

---

## Browser-Specific Issues

### Safari Issues

**Cause:** Safari has stricter security settings.

**Solution:**
1. Disable "Prevent cross-site tracking" in Safari preferences
2. Allow cookies from Supabase domain

### Mobile Browser Issues

**Cause:** Different rendering on mobile browsers.

**Solution:**
1. Test in Chrome DevTools mobile emulation
2. Check responsive design breakpoints
3. Verify touch interactions work

---

## Getting More Help

If your issue isn't listed here:

1. **Check the logs:**
   - Browser console (F12 → Console)
   - Server logs (terminal where `pnpm dev` is running)
   - Supabase logs (Dashboard → Logs)

2. **Common debugging steps:**
   - Restart dev server
   - Clear browser cache
   - Try incognito mode
   - Check network requests in DevTools

3. **Review documentation:**
   - [README.md](README.md) - Full project documentation
   - [SETUP.md](SETUP.md) - Setup instructions
   - [Supabase Docs](https://supabase.com/docs)
   - [Next.js Docs](https://nextjs.org/docs)

4. **Enable debug mode:**
   Add console.log statements to track execution:
   ```tsx
   console.log('[v0] Debug info:', variableName)
   ```

---

## Reporting Bugs

When reporting issues, include:
- Description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS version
- Console errors (if any)
- Network errors (if any)

---

**Most issues have simple solutions. Start with the basics: restart, check logs, verify environment variables!**
