# Formative SaaS - AI-Powered Compliance Policy Generator

Formative is a comprehensive SaaS platform that generates audit-ready compliance policy documents in 60 seconds using AI. Built for small and medium businesses in regulated industries like NDIS, construction, childcare, and more.

## Dual Pricing Model

### Subscription Plans
- **Starter**: $129/month - Generate up to 3 documents/month
- **Pro**: $179/month - Unlimited document generation
- **Agency**: $499/month - Enterprise solution for agencies
- **Enterprise**: Custom pricing - Dedicated support and features

### One-Time Industry Packs
- **Lite Pack**: $79 - Essential documents (PDF only)
- **Pro Pack**: $189 - Comprehensive documents (PDF & DOCX)
- **NDIS Full Pack**: $499 - Complete NDIS compliance suite (PDF & DOCX)
- **Construction Compliance Pack**: $349 - Full construction industry suite (PDF & DOCX)

## 🚀 Features

- **Unified Navigation** - Consistent navbar across all pages with "Formative" branding (no logo display)
- **AI-Powered Document Generation v2** - Create industry-specific compliance packs instantly with advanced templating
- **Multi-Format Support** - Generate both PDF and DOCX documents simultaneously with letterhead options
- **Template Engine** - Industry-specific content blocks with dynamic placeholders and fallback support
- **Storage Abstraction** - Supports local, Vercel Blob, and Supabase storage providers
- **Multi-Industry Support** - NDIS, Construction, Childcare, Healthcare, and 20+ sectors
- **Professional Branding** - Embed logos, ABN, and business details with customizable letterhead
- **Stripe Payments** - One-time purchases and subscription billing
- **User Authentication** - Secure login and document history
- **Document Management** - Enhanced DOCX and PDF generation with download tracking

## 🛠 Tech Stack

- **Frontend**: Next.js 15, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, Supabase
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Payments**: Stripe
- **AI**: OpenAI GPT-4
- **Document Generation**: docx, pdf-lib
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account
- OpenAI API key

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd formative-saas
npm install
```

### 2. Environment Setup

Create a `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

1. Create a new Supabase project
2. Run the following SQL to create required tables:

```sql
-- Users table (automatically created by Supabase Auth)

-- Documents table
CREATE TABLE documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  doc_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  download_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stripe sessions table
CREATE TABLE stripe_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT UNIQUE NOT NULL,
  payment_status TEXT NOT NULL,
  price_plan TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agent activity table
CREATE TABLE agent_activity (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  agent_name TEXT NOT NULL,
  inputs JSONB,
  outputs JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_activity ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own documents" ON documents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own documents" ON documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own sessions" ON stripe_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own activity" ON agent_activity
  FOR SELECT USING (auth.uid() = user_id);
```

### 4. Stripe Setup

1. Create products in Stripe Dashboard:
   - Starter Pack: $199 one-time payment
   - Pro Plan: $119/month subscription
   - Enterprise: $149/month subscription

2. Set up webhook endpoint: `your-domain.com/api/webhooks/stripe`
3. Listen for: `checkout.session.completed`

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

```
 User dashboard
│   ├── document-engine/   # Document generator
│   └── api/               # API routes
│       ├── generate/      # Document generation
│       ├── stripe/        # Payment handling
│       └── webhooks/      # Webhook handlers
├── components/            # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── AgentCard.tsx
│   └── ...
├── lib/                   # Utility functions
│   ├── supabase.ts
│   ├── stripe.ts
│   └── openai.ts
└── types/                 # TypeScript types
```

## 🔧 Configuration

### Supabase Configuration

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Stripe Configuration

```typescript
// lib/stripe.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})
```

### OpenAI Configuration

```typescript
// lib/openai.ts
import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
```

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Deploy Database

1. Supabase project is automatically deployed
2. Set up production environment variables
3. Configure RLS policies

### Set up Stripe Webhooks

1. Add production webhook URL
2. Update environment variables
3. Test payment flows

## 🧪 Testing

```bash
# Run unit tests
npm test

# Watch mode for development
npm run test:watch

# End-to-end test scenarios
npm run test:e2e

# Test Stripe payments (requires Stripe CLI)
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## 📚 API Endpoints

### Document Generation
- `POST /api/generate/policy` - Generate policy document
- `GET /api/documents/[id]` - Get document details
- `GET /api/documents/download/[id]` - Download document

### Payments
- `POST /api/stripe/checkout` - Create checkout session
- `POST /api/webhooks/stripe` - Handle Stripe webhooks

### Authentication
- `POST /api/auth/login` - Userformative-saas/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── products/          # Products pages
│   ├── pricing/           # Pricing page
│   ├── login/             # Authentication
│   ├── dashboard/         # login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout

## 🎨 Design System

The application follows a clean, modern design inspired by V7Labs:

- **Colors**: White base with blue accents (#3b82f6)
- **Typography**: Inter and Space Grotesk fonts
- **Components**: Glass morphism cards with hover effects
- **Layout**: Generous whitespace and bold headings

## 🔒 Security

- Row Level Security (RLS) on all database tables
- JWT authentication via Supabase
- API route protection with middleware
- Input validation with Zod
- Secure document storage with signed URLs

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📞 Support

For support, email support@formative.com or create an issue in the repository.

---

**Disclaimer**: Formative is not a law firm. Our documents are templates and should be reviewed by qualified legal professionals before use.
