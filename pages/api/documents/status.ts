import { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '../../../lib/supabase-admin'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { documentId } = req.query

    if (!documentId || typeof documentId !== 'string') {
      return res.status(400).json({ error: 'Missing documentId parameter' })
    }

    const { data: document, error } = await supabaseAdmin
      .from('user_documents')
      .select('id, status, updated_at')
      .eq('id', documentId)
      .single()

    if (error) {
      throw error
    }

    res.status(200).json({
      success: true,
      status: document.status,
      lastUpdated: document.updated_at
    })

  } catch (error) {
    console.error('Status API error:', error)
    res.status(500).json({ 
      error: 'Internal server error: ' + (error as Error).message,
      success: false
    })
  }
}
