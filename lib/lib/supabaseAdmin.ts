import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// Secure env vars (not exposed on frontend)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // use with caution — server only

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Missing Supabase environment variables for admin client')
}

// Admin client used for webhooks, uploads, privileged operations
export const supabaseAdmin: SupabaseClient<Database> = createClient(supabaseUrl, serviceRoleKey)
