import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Basic auth user
export async function getUser() {
  const { data, error } = await supabase.auth.getUser()
  if (error) throw error
  return data.user
}

// Extended user details
export async function getUserDetails() {
  const { data, error } = await supabase.auth.getUser()
  if (error) throw error
  return data.user
}

// Check admin role
export async function isAdmin() {
  const user = await getUserDetails()
  return user?.user_metadata?.role === 'admin'
}
