# Deployment Guide

This is a Next.js healthcare application integrated with Supabase. Follow the steps below to deploy successfully.

## Prerequisites

- Node.js 18+ installed
- Git repository initialized
- Supabase account and project
- Vercel account (for deployment)

## Local Setup

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd doctor-vscode
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` with your Supabase credentials:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

4. Run development server:
   ```bash
   npm run dev
   ```
   
   Open http://localhost:3000

## Build & Test

```bash
# Build the project
npm run build

# Start production server (local)
npm start

# Run linting
npm run lint
```

## Deployment on Vercel

### Option 1: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Set environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Option 2: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Create a new project and import your Git repository
3. Select "Next.js" as framework preset
4. Add environment variables in the settings
5. Deploy

## Environment Variables for Production

Ensure the following environment variables are set in your production environment:

```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

## Database Setup

Run the migrations in your Supabase project:

```bash
# Connect to your Supabase project and run schema.sql
# Via Supabase dashboard: SQL Editor > Run SQL
```

## Deployment Checklist

- [ ] Build completes without errors
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] All dependencies installed
- [ ] Linting passes (`npm run lint`)
- [ ] Testing passes (if tests exist)
- [ ] Git repository ready for deployment
- [ ] Vercel project linked
- [ ] Production environment variables set

## Post-Deployment

1. Test the deployed application
2. Monitor logs in Vercel dashboard
3. Set up monitoring and error tracking (e.g., Sentry)
4. Configure custom domain (optional)

## Troubleshooting

- **Build fails**: Check `npm run build` output for errors
- **Environment variables missing**: Verify all `NEXT_PUBLIC_*` variables are set
- **Database errors**: Check Supabase connection and ensure migrations are applied
- **Middleware warnings**: These are informational and don't affect deployment

## Support

For more information:
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
