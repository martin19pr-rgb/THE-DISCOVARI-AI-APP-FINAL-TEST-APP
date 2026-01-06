# Authentication Testing Guide

This guide will help you test all authentication features after setting up Supabase.

## Prerequisites

✅ Supabase project created  
✅ Database tables set up (run `database/setup.sql`)  
✅ Environment variables configured in `.env.local`  
✅ Development server running (`npm run dev`)

## Test 1: Client Signup (Email/Password)

1. **Navigate to**: `http://localhost:3000/client/signup`

2. **Fill in the form**:
   - Full Name: `John Doe`
   - Email: `john.doe@example.com`
   - Password: `SecurePassword123!`
   - Address: `123 Main St, San Francisco, CA`
   - Phone: `+1 (555) 123-4567`

3. **Click "Sign Up"**

4. **Expected Results**:
   - ✅ Success message: "Account created! Please check your email to verify your account."
   - ✅ Redirects to login page after 2 seconds
   - ✅ Check Supabase dashboard → Authentication → Users (should see new user)
   - ✅ Check Supabase dashboard → Table Editor → users (should see user record with profile)

## Test 2: Contractor Signup (Email/Password)

1. **Navigate to**: `http://localhost:3000/contractor/signup`

2. **Fill in the form**:
   - Business/Name: `ABC Contractors`
   - Email: `contractor@example.com`
   - Password: `SecurePassword123!`
   - Phone: `+1 (555) 987-6543`
   - Specialties: `Painting, Roofing, Plumbing`
   - Service Areas: `San Francisco, Oakland, Berkeley`

3. **Click "Sign Up"**

4. **Expected Results**:
   - ✅ Success message appears
   - ✅ User created in Supabase
   - ✅ User type set to "contractor" in database

## Test 3: Email/Password Login

1. **Navigate to**: `http://localhost:3000/login`

2. **Enter credentials** from Test 1 or 2:
   - Email: `john.doe@example.com`
   - Password: `SecurePassword123!`

3. **Click "Sign In"**

4. **Expected Results**:
   - ✅ Redirects to `/client/dashboard` (for client) or `/contractor/dashboard` (for contractor)
   - ✅ Navigation shows user-specific menu items
   - ✅ No authentication errors in console

## Test 4: Google OAuth Login

**Prerequisites**: Google OAuth must be configured in Supabase (see SUPABASE_SETUP.md)

1. **Navigate to**: `http://localhost:3000/login`

2. **Click "Google" button**

3. **Expected Results**:
   - ✅ Redirects to Google sign-in page
   - ✅ After authentication, redirects back to app
   - ✅ User is logged in
   - ✅ Redirects to appropriate dashboard based on user type

**Note**: First-time Google OAuth users will need to complete signup form to set user type.

## Test 5: OTP (Magic Link) Login

1. **Navigate to**: `http://localhost:3000/login`

2. **Check "Sign in with OTP instead"**

3. **Enter email**: `john.doe@example.com`

4. **Click "Send OTP"**

5. **Expected Results**:
   - ✅ Success message: "OTP sent! Please check your email for the magic link."
   - ✅ Check email inbox for magic link
   - ✅ Click magic link in email
   - ✅ Redirects to app and logs in automatically

## Test 6: Protected Routes

1. **While logged out**, try to access:
   - `http://localhost:3000/client/dashboard`
   - `http://localhost:3000/contractor/dashboard`

2. **Expected Results**:
   - ✅ Redirects to `/login` page
   - ✅ After login, redirects back to requested page

3. **While logged in as client**, try to access:
   - `http://localhost:3000/contractor/dashboard`

4. **Expected Results**:
   - ✅ Redirects to `/client/dashboard` (user's own dashboard)

## Test 7: Sign Out

1. **While logged in**, look for sign out option in navigation

2. **Click "Sign Out"** (or add sign out button if not present)

3. **Expected Results**:
   - ✅ Redirects to home page
   - ✅ Session cleared
   - ✅ Protected routes no longer accessible

## Test 8: Error Handling

### Invalid Credentials
1. Try logging in with wrong password
2. **Expected**: Error message displayed

### Duplicate Email
1. Try signing up with existing email
2. **Expected**: Error message about email already in use

### Missing Fields
1. Try submitting signup/login forms with empty fields
2. **Expected**: Browser validation prevents submission

## Troubleshooting

### "Supabase not configured" error
- Check `.env.local` has correct `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart dev server after changing `.env.local`

### "Relation does not exist" error
- Run `database/setup.sql` in Supabase SQL Editor
- Verify tables exist in Table Editor

### OAuth redirect errors
- Check redirect URLs in Supabase dashboard match exactly
- Verify Google OAuth credentials are correct
- Check browser console for specific error messages

### Email verification not working
- Check Supabase → Authentication → Settings
- Verify email templates are configured
- Check spam folder for verification emails

### RLS (Row Level Security) blocking queries
- Temporarily disable RLS for testing (not recommended for production)
- Check RLS policies in Supabase dashboard
- Ensure user is authenticated before querying

## Verification Checklist

After completing all tests, verify:

- [ ] Client signup creates user in Supabase
- [ ] Contractor signup creates user with correct type
- [ ] Email/password login works
- [ ] Google OAuth works (if configured)
- [ ] OTP login works
- [ ] Protected routes redirect unauthenticated users
- [ ] User type-based routing works correctly
- [ ] Sign out clears session
- [ ] Error messages display correctly
- [ ] User profile data is saved correctly

## Next Steps

Once authentication is working:
1. Test job creation flow
2. Test contractor matching
3. Test insurance purchase
4. Test job tracking
5. Set up production environment






