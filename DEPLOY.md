# Deployment Guide

## Quick Deploy to Vercel

1. **Connect Repository**
   ```bash
   vercel --prod
   ```

2. **Set Environment Variables**
   Add these in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `STORAGE_PROVIDER=vercel`
   - `ADMIN_SECRET_KEY`

3. **Deploy**
   ```bash
   git push origin main
   ```

## Local Development

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

3. **Run Development Server**
   ```bash
   pnpm dev
   ```

## Production Checklist

- [ ] All environment variables set
- [ ] Supabase database tables created
- [ ] Stripe products configured
- [ ] OpenAI API key valid
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Error monitoring setup

## Testing

```bash
# Type check
pnpm run type-check

# Lint
pnpm run lint

# Build
pnpm run build

# Start production server
pnpm start
```

## Troubleshooting

### Build Issues
- Ensure all environment variables are set
- Check TypeScript errors with `pnpm run type-check`
- Verify all imports are correct

### Runtime Issues
- Check browser console for errors
- Verify API endpoints are accessible
- Ensure database connections are working

### Performance
- Use `pnpm run build` to check bundle size
- Monitor Core Web Vitals in production
- Optimize images and assets as needed
