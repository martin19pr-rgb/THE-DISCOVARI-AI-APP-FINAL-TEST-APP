# Supabase Setup Guide for Discovari AI

This guide will walk you through setting up Supabase for the Discovari AI application.

## Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: Discovari AI (or your preferred name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose the closest region to your users
   - **Pricing Plan**: Free tier is fine for development

5. Click "Create new project" and wait for it to be ready (2-3 minutes)

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll find:
   - **Project URL**: Copy this to `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key**: Copy this to `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key**: Copy this to `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

## Step 3: Configure Environment Variables

1. Copy `.env.local` to `.env` (or edit `.env.local` directly)
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

3. Generate a JWT secret:
   ```bash
   # On Windows PowerShell:
   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
   
   # Or use an online generator: https://generate-secret.vercel.app/32
   ```
   Add it to `.env`:
   ```env
   JWT_SECRET=your-generated-secret-here
   ```

## Step 4: Set Up Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the contents of `database/setup.sql`
4. Click "Run" (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

## Step 5: Enable Google OAuth (Optional but Recommended)

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Google** and click to enable it
3. You'll need:
   - **Google Client ID**: Get from [Google Cloud Console](https://console.cloud.google.com)
   - **Google Client Secret**: Get from Google Cloud Console
4. Set **Redirect URL** in Google Cloud Console:
   ```
   https://your-project-id.supabase.co/auth/v1/callback
   ```
5. Add your app's URL to **Authorized JavaScript origins**:
   ```
   http://localhost:3000
   https://your-production-domain.com
   ```

### Getting Google OAuth Credentials:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth client ID**
5. Choose **Web application**
6. Add authorized redirect URIs:
   - `https://your-project-id.supabase.co/auth/v1/callback`
7. Copy the **Client ID** and **Client Secret** to Supabase

## Step 6: Configure Authentication Settings

1. In Supabase dashboard, go to **Authentication** → **URL Configuration**
2. Set **Site URL**: `http://localhost:3000` (for development)
3. Add **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/**` (for development)
   - Your production URLs (when deploying)

## Step 7: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Test signup:
   - Go to `http://localhost:3000/client/signup`
   - Fill in the form and submit
   - Check your email for verification link (if email confirmation is enabled)

3. Test login:
   - Go to `http://localhost:3000/login`
   - Try email/password login
   - Try Google OAuth (if configured)
   - Try OTP login

4. Check Supabase dashboard:
   - Go to **Authentication** → **Users**
   - You should see your test user
   - Go to **Table Editor** → **users**
   - You should see the user record with profile data

## Troubleshooting

### "Invalid API key" error
- Double-check your `.env` file has the correct keys
- Make sure there are no extra spaces or quotes
- Restart your dev server after changing `.env`

### "Relation does not exist" error
- Make sure you ran the `database/setup.sql` script
- Check that tables exist in **Table Editor**

### OAuth not working
- Verify redirect URLs match exactly
- Check Google Cloud Console credentials are correct
- Ensure Google+ API is enabled

### RLS (Row Level Security) blocking queries
- Check your RLS policies in **Authentication** → **Policies**
- Temporarily disable RLS for testing (not recommended for production)
- Make sure user is authenticated before querying

### Email verification not working
- Check **Authentication** → **Settings** → **Email Templates**
- Verify SMTP settings if using custom email
- Check spam folder for verification emails

## Next Steps

Once authentication is working:
1. Test protected routes (client/contractor dashboards)
2. Set up real API integrations (Google Vision, OpenAI, Maps)
3. Configure file storage for media uploads
4. Set up production environment variables
5. Deploy to production (Vercel, Netlify, etc.)

## Security Notes

- Never commit `.env` or `.env.local` to git (already in `.gitignore`)
- Keep `SUPABASE_SERVICE_ROLE_KEY` secret - it bypasses RLS
- Use RLS policies to secure your data
- Regularly rotate API keys
- Use environment-specific credentials for production






