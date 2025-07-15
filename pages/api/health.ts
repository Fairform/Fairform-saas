import { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '../../lib/supabase-admin'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data, error } = await supabaseAdmin
      .from('user_profiles')
      .select('id')
      .limit(1)

    if (error) {
      throw error
    }

    let llmStatus = 'unknown'
    if (process.env.POCKETBOOK_LLM_API_URL) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)
        
        const llmResponse = await fetch(process.env.POCKETBOOK_LLM_API_URL.replace('/generate', '/health'), {
          method: 'GET',
          signal: controller.signal
        })
        
        clearTimeout(timeoutId)
        llmStatus = llmResponse.ok ? 'healthy' : 'unhealthy'
      } catch {
        llmStatus = 'unhealthy'
      }
    }

    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'healthy',
        llm: llmStatus,
        api: 'healthy'
      }
    })
  } catch (error: any) {
    console.error('Health check failed:', error)
    res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error?.message || 'Unknown error'
    })
  }
}
