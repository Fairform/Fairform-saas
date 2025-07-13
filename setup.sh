#!/bin/bash

# FairForm SaaS Setup Script
echo "🚀 Setting up FairForm SaaS..."

# Create directory structure
mkdir -p components
mkdir -p lib
mkdir -p types
mkdir -p app/api/stripe/checkout
mkdir -p app/api/webhooks/stripe
mkdir -p app/dashboard
mkdir -p app/login
mkdir -p app/products
mkdir -p app/pricing

# Clean up and install dependencies
echo "📦 Installing dependencies..."
rm -rf node_modules package-lock.json
npm install

# Create missing environment file
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from example..."
    cp .env.local.example .env.local
fi

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update your .env.local file with your API keys"
echo "2. Set up your Supabase database using the schema in README.md"
echo "3. Configure your Stripe products and webhooks"
echo "4. Run: npm run dev"
echo ""
echo "🎉 Your FairForm SaaS application is ready!"