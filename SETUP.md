# Discovari AI - Setup Guide

This guide will help you set up the Discovari AI application for development and production.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git (for version control)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

### Required Environment Variables

#### Next.js Configuration
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### Supabase (Database, Auth, Storage)
1. Create a Supabase project at https://supabase.com
2. Get your project URL and API keys from Settings > API
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

#### Google Cloud Vision API
1. Create a Google Cloud project
2. Enable Vision API
3. Create a service account and download JSON key
4. Set up API key or use service account
```
GOOGLE_CLOUD_PROJECT_ID=your_project_id
GOOGLE_CLOUD_VISION_API_KEY=your_vision_api_key
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account-key.json
```

#### Google Maps API
1. Enable Maps JavaScript API in Google Cloud Console
2. Create API key and restrict it to your domain
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

#### OpenAI API
1. Sign up at https://platform.openai.com
2. Create an API key
```
OPENAI_API_KEY=your_openai_api_key
```

#### JWT Secret
Generate a secure random string for JWT signing:
```
JWT_SECRET=your_secure_random_string_here
```

#### AWS S3 (Optional - for media storage)
```
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=discovari-media
```

## Step 3: Database Setup (Supabase)

### Create Tables

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(20) NOT NULL CHECK (type IN ('client', 'contractor')),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  profile JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Jobs table
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES users(id),
  description TEXT NOT NULL,
  media_url TEXT[] DEFAULT '{}',
  ai_diagnosis JSONB NOT NULL DEFAULT '{}',
  contractor_id UUID REFERENCES users(id),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed', 'disputed')),
  payment_amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('online', 'cash')),
  approval_client BOOLEAN DEFAULT FALSE,
  approval_contractor BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insurance table
CREATE TABLE insurance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  part VARCHAR(20) NOT NULL CHECK (part IN ('roof', 'ceiling', 'bathroom', 'kitchen', 'garage', 'paint')),
  premium DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'claimed')),
  benefits JSONB NOT NULL DEFAULT '{}',
  start_date DATE NOT NULL,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_jobs_client_id ON jobs(client_id);
CREATE INDEX idx_jobs_contractor_id ON jobs(contractor_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_insurance_user_id ON insurance(user_id);
CREATE INDEX idx_users_email ON users(email);
```

### Enable Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your security requirements)
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Clients can view their own jobs" ON jobs
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Contractors can view assigned jobs" ON jobs
  FOR SELECT USING (auth.uid() = contractor_id);
```

## Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 5: Production Build

```bash
npm run build
npm start
```

## API Integration Notes

### Google Cloud Vision API

The current implementation uses mock data. To enable real Vision API:

1. Update `src/lib/ai-integrations.ts` with actual Vision API client
2. Uncomment the production code in `src/app/api/v1/diagnose/route.ts`

### OpenAI API

To enable real OpenAI integration:

1. Update `src/lib/ai-integrations.ts` with actual OpenAI client
2. The API will use GPT-4 for intelligent diagnosis

### Google Maps API

The Maps component is ready but requires:
1. Valid API key in `.env`
2. API restrictions configured in Google Cloud Console

## Troubleshooting

### Common Issues

1. **Module not found errors**: Run `npm install` again
2. **Environment variables not loading**: Restart the dev server
3. **Google Maps not loading**: Check API key and browser console for errors
4. **Database connection issues**: Verify Supabase credentials

### Getting Help

- Check the README.md for general information
- Review API route files in `src/app/api/v1/` for implementation details
- Check TypeScript types in `src/types/index.ts` for data structures

## Next Steps

1. Implement actual Supabase authentication (currently mocked)
2. Connect real Google Cloud Vision API
3. Set up OpenAI API integration
4. Configure AWS S3 for media storage
5. Set up payment processing (Stripe/PayPal)
6. Deploy to production (Vercel/Netlify)

