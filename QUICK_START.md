# Quick Start Guide - Discovari AI

Get up and running in 5 minutes!

## Step 1: Install Dependencies ✅

```bash
npm install
```

**Status**: ✅ Already completed

## Step 2: Set Up Supabase

### 2.1 Create Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in project details and wait for setup (2-3 minutes)

### 2.2 Get API Keys

1. In Supabase dashboard: **Settings** → **API**
2. Copy these values:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`

### 2.3 Configure Environment

Create `.env.local` file in project root:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# JWT Secret (generate with: openssl rand -base64 32)
JWT_SECRET=your-random-secret-here
```

**Windows PowerShell to generate JWT_SECRET**:
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### 2.4 Set Up Database

1. In Supabase dashboard: **SQL Editor** → **New query**
2. Copy contents of `database/setup.sql`
3. Paste and click **Run**
4. Verify tables created in **Table Editor**

## Step 3: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 4: Test Authentication

1. **Sign Up**: Go to `http://localhost:3000/client/signup`
2. **Fill form** and submit
3. **Check email** for verification (if enabled)
4. **Login**: Go to `http://localhost:3000/login`
5. **Test login** with your credentials

## Step 5: (Optional) Enable Google OAuth

1. **Supabase Dashboard**: Authentication → Providers → Google
2. **Enable Google** provider
3. **Get credentials** from [Google Cloud Console](https://console.cloud.google.com)
4. **Add credentials** to Supabase
5. **Set redirect URL**: `https://your-project-id.supabase.co/auth/v1/callback`

See `SUPABASE_SETUP.md` for detailed Google OAuth setup.

## You're Ready! 🎉

The app is now running with authentication. Test all features:

- ✅ Sign up (client/contractor)
- ✅ Login (email/password, OTP, Google)
- ✅ Protected routes
- ✅ User dashboards

## Need Help?

- **Detailed Setup**: See `SUPABASE_SETUP.md`
- **Testing Guide**: See `TESTING_GUIDE.md`
- **Troubleshooting**: Check console errors and Supabase logs

## What's Next?

1. Configure AI APIs (Google Vision, OpenAI, Maps) - see `SETUP.md`
2. Set up file storage (AWS S3 or Supabase Storage)
3. Test job creation and matching
4. Deploy to production






