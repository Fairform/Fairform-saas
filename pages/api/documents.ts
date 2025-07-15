import { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '../../lib/supabase-admin'
import { supabase } from '../../lib/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid authorization header' })
    }

    const token = authHeader.substring(7)
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid token or user not found' })
    }

    const [userDocsResult, generatedDocsResult] = await Promise.all([
      supabaseAdmin
        .from('user_documents')
        .select('*')
        .eq('user_id', user.id)
        .is('deleted_at', null)
        .order('created_at', { ascending: false }),
      
      supabaseAdmin
        .from('generated_documents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
    ])

    if (userDocsResult.error) throw userDocsResult.error
    if (generatedDocsResult.error) throw generatedDocsResult.error

    const allDocuments = [
      ...(userDocsResult.data || []).map(doc => ({ ...doc, source: 'uploaded' })),
      ...(generatedDocsResult.data || []).map(doc => ({ ...doc, source: 'generated', status: 'complete' }))
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    res.status(200).json({
      success: true,
      documents: allDocuments,
      total: allDocuments.length
    })

  } catch (error) {
    console.error('Documents API error:', error)
    res.status(500).json({ 
      error: 'Internal server error: ' + (error as Error).message,
      success: false
    })
  }
}
