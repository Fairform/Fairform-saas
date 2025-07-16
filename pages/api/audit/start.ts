import { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '../../../lib/supabase-admin'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      businessName,
      industry,
      subIndustry,
      city,
      region,
      orgSize,
      abn,
      userEmail
    } = req.body

    if (!businessName || !industry || !city) {
      return res.status(400).json({ 
        error: 'Missing required fields: businessName, industry, city' 
      })
    }

    const sessionToken = uuidv4()

    let businessProfileId: string | null = null
    let userId: string | null = null

    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
      
      if (!authError && user) {
        userId = user.id
      }
    }

    const businessProfileData = {
      user_id: userId,
      business_name: businessName,
      industry,
      sub_industry: subIndustry || null,
      city,
      region: region || null,
      org_size: orgSize || null,
      abn: abn || null,
      metadata: {
        userEmail: userEmail || null,
        createdViaAudit: true,
        sessionToken
      }
    }

    const { data: businessProfile, error: profileError } = await supabaseAdmin
      .from('business_profiles')
      .insert(businessProfileData)
      .select()
      .single()

    if (profileError) {
      console.error('Error creating business profile:', profileError)
      throw new Error(`Failed to create business profile: ${profileError.message}`)
    }

    businessProfileId = businessProfile.id

    const auditSessionData = {
      user_id: userId,
      business_profile_id: businessProfileId,
      session_token: sessionToken,
      status: 'pending',
      uploaded_files: [],
      total_files: 0,
      processed_files: 0,
      metadata: {
        startedAt: new Date().toISOString(),
        userAgent: req.headers['user-agent'] || '',
        ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress
      }
    }

    const { data: auditSession, error: sessionError } = await supabaseAdmin
      .from('audit_sessions')
      .insert(auditSessionData)
      .select()
      .single()

    if (sessionError) {
      console.error('Error creating audit session:', sessionError)
      throw new Error(`Failed to create audit session: ${sessionError.message}`)
    }

    console.log(`Audit session started: ${auditSession.id} for business: ${businessName}`)

    res.status(200).json({
      success: true,
      auditSession: {
        id: auditSession.id,
        sessionToken: sessionToken,
        businessProfileId: businessProfileId,
        status: 'pending'
      },
      message: 'Audit session created successfully'
    })

  } catch (error) {
    console.error('Audit start error:', error)
    res.status(500).json({ 
      error: 'Internal server error: ' + (error as Error).message,
      success: false
    })
  }
}
