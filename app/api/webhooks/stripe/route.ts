import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/lib/supabaseAdmin'
import { generateMultipleDocuments } from '@/lib/openai'
import { generateDOCX, generatePDF } from '@/lib/document-generator'
import Stripe from 'stripe'

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
  } catch (err: any) {
    console.error('[Webhook] ❌ Invalid signature:', err.message)
    return NextResponse.json({ error: 'Invalid Stripe signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      const userId = session.metadata?.userId
      const agentId = session.metadata?.agentId
      const formData = JSON.parse(session.metadata?.formData || '{}')

      if (!userId || !agentId || !formData) {
        throw new Error('Missing required session metadata')
      }

      const { data: document, error: docError } = await supabaseAdmin
        .from('documents')
        .insert({
          user_id: userId,
          business_name: formData.businessName,
          industry: formData.industry,
          doc_type: `${agentId} - Compliance Pack`,
          status: 'processing'
        })
        .select()
        .single()

      if (docError) throw docError

      await supabaseAdmin.from('stripe_sessions').insert({
        user_id: userId,
        session_id: session.id,
        payment_status: session.payment_status,
        price_plan: session.metadata?.pricePlan || 'starter'
      })

      await generateDocuments(document.id, formData)

    } catch (error) {
      console.error('[Webhook] ❌ Error during session processing:', error)
      return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true }, { status: 200 })
}

async function generateDocuments(documentId: string, formData: any) {
  try {
    await supabaseAdmin
      .from('documents')
      .update({ status: 'processing' })
      .eq('id', documentId)

    const documents = await generateMultipleDocuments(
      formData.businessName,
      formData.industry,
      formData.selectedDocuments,
      formData.additionalRequirements
    )

    const businessInfo = {
      businessName: formData.businessName,
      industry: formData.industry,
      abn: formData.abn,
      address: formData.address
    }

    const docxBuffer = await generateDOCX(documents, businessInfo)
    const pdfBuffer = await generatePDF(documents, businessInfo)

    const downloadUrl = await uploadDocuments(documentId, docxBuffer, pdfBuffer)

    await supabaseAdmin
      .from('documents')
      .update({ 
        status: 'completed',
        download_url: downloadUrl
      })
      .eq('id', documentId)

    console.log('[Webhook] ✅ Document generation completed:', documentId)

  } catch (error) {
    console.error('[Document Generator] ❌ Failed:', error)
    await supabaseAdmin
      .from('documents')
      .update({ status: 'failed' })
      .eq('id', documentId)
  }
}

async function uploadDocuments(
  documentId: string, 
  docxBuffer: Buffer, 
  pdfBuffer: Buffer
): Promise<string> {
  try {
    const { error: docxError } = await supabaseAdmin.storage
      .from('documents')
      .upload(`${documentId}/compliance-pack.docx`, docxBuffer, {
        contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        upsert: true
      })

    if (docxError) throw docxError

    const { error: pdfError } = await supabaseAdmin.storage
      .from('documents')
      .upload(`${documentId}/compliance-pack.pdf`, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: true
      })

    if (pdfError) throw pdfError

    const { data } = supabaseAdmin.storage
      .from('documents')
      .getPublicUrl(`${documentId}/compliance-pack.docx`)

    return data.publicUrl || ''

  } catch (error) {
    console.error('[Upload] ❌ Upload failed, fallback triggered:', error)
    return `/api/documents/download/${documentId}`
  }
}