// lib/supabase.ts - Real Supabase client
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file.'
  )
}

// Validate URL format
try {
  new URL(supabaseUrl)
} catch (error) {
  throw new Error(`Invalid NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl}`)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Helper function for user verification
export const verifyUserToken = async (token: string) => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token)
    if (error || !user) {
      throw new Error('Invalid token or user not found')
    }
    return user
  } catch (error) {
    console.error('Error verifying user:', error)
    throw error
  }
}

// Export for backward compatibility
export const verifyUser = verifyUserToken

// Test connection on module load (development only)
if (process.env.NODE_ENV === 'development') {
  supabase.auth.getSession().then(({ error }) => {
    if (error) {
      console.error('❌ Supabase connection error:', error.message)
    } else {
      console.log('✅ Supabase connected successfully')
    }
  }).catch((err) => {
    console.error('❌ Supabase connection failed:', err.message)
  })
}