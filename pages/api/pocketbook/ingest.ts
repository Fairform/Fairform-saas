import { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '../../../lib/supabase-admin'
import { callPocketbookLLM } from '../../../lib/pocketbook'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { documentId, filePath, userId } = req.body

    if (!documentId || !filePath || !userId) {
      return res.status(400).json({ 
        error: 'Missing required fields: documentId, filePath, userId' 
      })
    }

    await supabaseAdmin
      .from('user_documents')
      .update({ status: 'processing' })
      .eq('id', documentId)

    await supabaseAdmin.from('document_logs').insert({
      document_id: documentId,
      user_id: userId,
      action: 'ingest',
      status: 'processing',
      message: 'Starting LLM ingestion and analysis'
    })

    const analysisPrompt = `Analyze this uploaded document and extract:
    1. Document type and category
    2. Key policy structures and clauses
    3. Compliance requirements mentioned
    4. Industry-specific elements
    5. Template patterns that could be reused
    
    Provide a structured summary that can be used to improve future document generation.`

    const systemPrompt = `You are a document analysis expert specializing in Australian business compliance documents. Analyze uploaded documents to extract patterns, structures, and compliance requirements that can improve future document generation.`

    try {
      const analysisResult = await callPocketbookLLM(analysisPrompt, systemPrompt, 2000)

      await supabaseAdmin
        .from('user_documents')
        .update({ 
          status: 'complete',
          metadata: {
            analysis: analysisResult.text,
            analyzedAt: new Date().toISOString()
          }
        })
        .eq('id', documentId)

      await supabaseAdmin.from('document_logs').insert({
        document_id: documentId,
        user_id: userId,
        action: 'ingest',
        status: 'complete',
        message: 'LLM analysis completed successfully',
        metadata: {
          analysisLength: analysisResult.text.length,
          tokensUsed: analysisResult.usage?.total_tokens || 0
        }
      })

      res.status(200).json({
        success: true,
        analysis: analysisResult.text,
        message: 'Document ingestion completed successfully'
      })

    } catch (llmError) {
      await supabaseAdmin
        .from('user_documents')
        .update({ status: 'failed' })
        .eq('id', documentId)

      await supabaseAdmin.from('document_logs').insert({
        document_id: documentId,
        user_id: userId,
        action: 'ingest',
        status: 'error',
        message: `LLM analysis failed: ${(llmError as Error).message}`
      })

      throw llmError
    }

  } catch (error) {
    console.error('Ingestion error:', error)
    res.status(500).json({ 
      error: 'Internal server error: ' + (error as Error).message,
      success: false
    })
  }
}
