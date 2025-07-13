import { NextResponse } from 'next/server'
import { getServiceRoleClient } from '@/lib/supabase'
import { generatePolicyDocument } from '@/lib/openai'

export async function POST(req) {
  const body = await req.json()
  const supabase = getServiceRoleClient()
  
  try {
    const content = await generatePolicyDocument(body)
    
    const { data, error } = await supabase
      .from('documents')
      .insert({
        user_id: body.userId, // Assume userId from auth
        title: `${body.industry} Policy`,
        type: 'policy',
        content,
        industry: body.industry,
        status: 'completed',
        metadata: body
      })
      .select()
      .single()
    
    if (error) throw error
    
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}