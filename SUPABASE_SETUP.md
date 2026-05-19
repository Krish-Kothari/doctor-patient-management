# Supabase Setup Guide

## Step 1: Create a New Supabase Project (or use existing)

### If you don't have a Supabase account:
1. Go to https://supabase.com
2. Sign up for a free account
3. Confirm your email

### Create a New Project:
1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in:
   - **Project Name**: `doctor-app` (or any name)
   - **Database Password**: Create a strong password
   - **Region**: Select closest region to your users
4. Click "Create new project" and wait for initialization (2-3 minutes)

---

## Step 2: Get Your Credentials

Once your project is ready:

1. **Go to Project Settings:**
   - Click "⚙️ Settings" in the left sidebar
   - Select "API" tab

2. **Copy these values:**
   - **Project URL** → This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Public Key** → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Example:
```
NEXT_PUBLIC_SUPABASE_URL: https://abcdefghijklmno.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Step 3: Update Local Environment

1. Open or create `.env.local` in your project root:
   ```bash
   cd /Users/krishkothari/Documents/doctor-vscode
   ```

2. Create/edit `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. Replace with your actual values from Step 2

---

## Step 4: Set Up Database

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the contents of `schema.sql` from your project
4. Paste into the SQL editor
5. Click **Run** (executes the migration)

---

## Step 5: Test the Connection

1. Make sure Node modules are installed:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000
4. Check browser console (F12) for any connection errors

---

## Step 6: Enable Authentication (Optional)

If you want OAuth login (GitHub, Google, etc.):

1. Go to **Authentication** → **Providers** in Supabase dashboard
2. Enable desired provider (e.g., GitHub)
3. Follow the setup instructions for each provider
4. Update your `.env.local` with provider credentials

---

## Troubleshooting

### Connection Failed Error
- ❌ Wrong URL format: Should be `https://xxx.supabase.co` (not `http://`)
- ❌ Wrong key: Make sure you copied the **Anon Key**, not Service Role Key
- ✅ Solution: Re-copy credentials from Supabase API Settings

### "Table does not exist" Error
- ❌ Database migrations not run
- ✅ Solution: Run `schema.sql` in Supabase SQL Editor (Step 4)

### Environment Variables Not Loading
- ❌ Incorrect file path or wrong format
- ❌ Node server not restarted after creating `.env.local`
- ✅ Solution: 
  1. Check `.env.local` exists in root directory
  2. Restart dev server: `npm run dev`

### CORS or Authentication Errors
- ❌ Anon key permissions too restrictive
- ✅ Solution: In Supabase, go to **Authentication** → **Policies** and ensure the anon role has read/write permissions

---

## Quick Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://abc123.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public authentication key | `eyJhbG...` (long token) |

---

## Useful Supabase Commands

```bash
# View project logs
# In Supabase dashboard: Logs → Project Logs

# Check connected users
# In Supabase dashboard: Database → Authentication

# Reset database (caution!)
# In Supabase dashboard: Settings → Database → Reset database
```

---

## Common Issues & Solutions

**Issue:** "Error: Invalid API key"
- Check that `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- Make sure it's the **Anon Public Key**, not the Service Role Key

**Issue:** "Failed to fetch" in browser
- Verify `NEXT_PUBLIC_SUPABASE_URL` format (must include `https://`)
- Check that Supabase project is in "Active" state
- Check firewall/network settings

**Issue:** Login not working
- Ensure authentication policies are set up correctly
- Check that users table exists (run `schema.sql`)
- Verify redirect URLs in auth settings match your app

---

## Need More Help?

- Supabase Docs: https://supabase.com/docs
- This Project Repo: Check README.md for specific setup
- Contact Supabase Support: https://supabase.com/support
