# Discovari AI - On-Demand Repairs Platform

A progressive web app (PWA) that connects homeowners/property managers with vetted contractors for on-demand repairs, featuring AI-powered diagnostics, live tracking, and modular insurance.

## Features

- 🤖 **AI-Powered Diagnostics**: Instant issue assessment using Google Cloud Vision API and OpenAI
- 🚗 **Live Tracking**: Real-time contractor location and ETA via Google Maps API
- 🛡️ **Modular Insurance**: Insure specific home parts (roof, ceiling, bathroom, kitchen, garage, paint)
- ⚡ **Fast Matching**: Connect with contractors in under 2 minutes
- 💰 **Escrow Payments**: Secure payment handling with approval workflow
- 📱 **PWA Ready**: Works offline and installable on mobile devices

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Express (for standalone server)
- **Database**: Supabase (PostgreSQL)
- **Storage**: AWS S3
- **AI Services**:
  - Google Cloud Vision API (photo/video scanning)
  - Google Maps API (geolocation & tracking)
  - OpenAI API (GenAI reasoning)
- **Authentication**: Supabase Auth (Email/OTP/Google)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Google Cloud account (for Vision API and Maps API)
- OpenAI API key
- AWS account (for S3 storage)

### Installation

1. Clone the repository:
```bash
cd "C:\Users\My laptop\Videos\THE DISCOVARI-AI APP"
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your API keys and credentials.

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/v1/            # API routes
│   │   ├── diagnose/      # AI diagnosis endpoint
│   │   ├── match/         # Contractor matching
│   │   ├── insure/        # Insurance policy creation
│   │   ├── jobs/          # Job management
│   │   ├── approve/       # Job approval
│   │   └── track/         # Live tracking
│   ├── client/            # Client-side pages
│   │   ├── dashboard/
│   │   ├── request-repair/
│   │   ├── insurance/
│   │   └── track/
│   ├── contractor/        # Contractor-side pages
│   │   └── dashboard/
│   └── login/
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── lib/                   # Utilities
├── types/                 # TypeScript types and schemas
└── styles/                # Global styles
```

## API Endpoints

### POST `/api/v1/diagnose`
Analyze photos/videos and get AI diagnosis.

**Request:**
- `description` (string): Issue description
- `media` (File): Photo or video file

**Response:**
```json
{
  "category": "roof",
  "estimate": {
    "cost": 500,
    "time": "2-3 hours"
  },
  "suggestions": ["Schedule inspection within 24 hours"],
  "confidence": 0.95
}
```

### POST `/api/v1/match`
Find matching contractor for a job.

**Request:**
```json
{
  "job_id": "job-123"
}
```

**Response:**
```json
{
  "contractor": {
    "id": "contractor-123",
    "name": "John's Painting & Repairs",
    "eta": "15 minutes",
    "rating": 4.8,
    "distance": 2.5
  }
}
```

### POST `/api/v1/insure`
Create insurance policy.

**Request:**
```json
{
  "user_id": "user-123",
  "part": "roof"
}
```

**Response:**
```json
{
  "policy_id": "policy-123",
  "premium": 50,
  "benefits": {
    "discounts": {
      "renovation": 20
    },
    "claims_history": []
  }
}
```

### GET `/api/v1/track?job_id=job-123`
Get live tracking data.

### POST `/api/v1/approve`
Approve job completion.

### GET `/api/v1/jobs?user_type=client`
Get jobs for authenticated user.

## Database Schemas

See `src/types/index.ts` for detailed TypeScript types matching the PRD schemas:

- **Users**: Client/Contractor profiles with team members
- **Jobs**: Repair requests with AI diagnosis and status
- **Insurance**: Modular policies with benefits

## Development

### Adding New Features

1. Create types in `src/types/index.ts`
2. Add API route in `src/app/api/v1/`
3. Create UI components in `src/components/`
4. Add pages in `src/app/`

### Testing

```bash
npm run lint
```

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

3. Deploy to Vercel/Netlify or your preferred platform.

## Environment Variables

See `.env.example` for all required environment variables.

## License

Proprietary - All rights reserved

## Support

For issues and questions, please contact the development team.


