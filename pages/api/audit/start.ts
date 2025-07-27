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

    let businessProfile
    let profileError
    let retryCount = 0
    const maxRetries = 3

    while (retryCount < maxRetries) {
      try {
        const result = await supabaseAdmin
          .from('business_profiles')
          .insert(businessProfileData)
          .select()
          .single()
        
        businessProfile = result.data
        profileError = result.error
        
        if (!profileError) {
          break // Success, exit retry loop
        }
        
        retryCount++
        if (retryCount < maxRetries) {
          console.log(`Retry ${retryCount}/${maxRetries} for business profile creation`)
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount)) // Exponential backoff
        }
      } catch (error) {
        console.error(`Database connection attempt ${retryCount + 1} failed:`, error)
        retryCount++
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount))
        } else {
          profileError = { message: `Database connection failed after ${maxRetries} attempts: ${(error as Error).message}` }
        }
      }
    }

    if (profileError) {
      console.error('Error creating business profile after retries:', profileError)
      
      console.log('Using fallback mode - creating session without database persistence')
      const fallbackSession = {
        id: sessionToken,
        sessionToken: sessionToken,
        businessProfileId: 'fallback-profile-' + sessionToken,
        status: 'pending'
      }
      
      return res.status(200).json({
        success: true,
        auditSession: fallbackSession,
        message: 'Audit session created in fallback mode (database connectivity issues)',
        fallbackMode: true
      })
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

    let auditSession
    let sessionError
    retryCount = 0

    while (retryCount < maxRetries) {
      try {
        const result = await supabaseAdmin
          .from('audit_sessions')
          .insert(auditSessionData)
          .select()
          .single()
        
        auditSession = result.data
        sessionError = result.error
        
        if (!sessionError) {
          break // Success, exit retry loop
        }
        
        retryCount++
        if (retryCount < maxRetries) {
          console.log(`Retry ${retryCount}/${maxRetries} for audit session creation`)
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount))
        }
      } catch (error) {
        console.error(`Audit session creation attempt ${retryCount + 1} failed:`, error)
        retryCount++
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount))
        } else {
          sessionError = { message: `Audit session creation failed after ${maxRetries} attempts: ${(error as Error).message}` }
        }
      }
    }

    if (sessionError) {
      console.error('Error creating audit session after retries:', sessionError)
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
