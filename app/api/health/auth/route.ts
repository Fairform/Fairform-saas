import { NextResponse } from 'next/server'

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  
  const checks = {
    supabaseUrl: !!supabaseUrl && !supabaseUrl.includes('your'),
    supabaseKey: !!supabaseKey && !supabaseKey.includes('your'),
    siteUrl: !!siteUrl,
    urlFormat: supabaseUrl?.includes('.supabase.co') || false
  }
  
  const ok = Object.values(checks).every(Boolean)
  
  return NextResponse.json({ ok, details: checks })
}
