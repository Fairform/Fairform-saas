# Environment Variables Setup

## Issue
The application throws a runtime error: "Missing Supabase environment variables. Please check your .env.local file."

## Solution
Create a `.env.local` file in the project root with the required environment variables.

## Steps to Fix

1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update the Supabase URL in `.env.local` to use a valid URL format:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   ```

3. Replace placeholder values with your actual credentials when setting up a real environment.

## Required Environment Variables

The following environment variables must be configured in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key

## Note
The `.env.local` file is ignored by git for security reasons and should not be committed to the repository.
