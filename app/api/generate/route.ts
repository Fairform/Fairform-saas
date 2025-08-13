import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { CatalogTemplateEngine } from '@/lib/catalog-engine'
import { createClient } from '@/lib/supabase-server'
import { validateIndustryPack, getDocumentsForPack } from '@/lib/catalog'
import { rateLimit } from '@/lib/rate-limit'
import { checkDocumentGenerationLimit, trackDocumentGeneration } from '@/lib/access-control'

const generateSchema = z.object({
  businessName: z.string().min(1, 'Business name is required').max(100),
  abn: z.string().optional(),
  address: z.string().optional().transform(val => val?.substring(0, 200)),
  contactEmail: z.string().email('Valid email is required'),
  contactPhone: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  industry: z.string().min(1, 'Industry is required'),
  pack: z.string().min(1, 'Pack is required'),
  format: z.enum(['pdf', 'docx']),
  documents: z.array(z.string()).min(1, 'At least one document is required'),
  additionalInfo: z.string().optional().transform(val => val?.substring(0, 1000))
})

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimit(request)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required. Please log in to generate documents.' },
        { status: 401 }
      )
    }

    const limitCheck = await checkDocumentGenerationLimit(user.id)
    if (!limitCheck.canGenerate) {
      return NextResponse.json({
        error: 'Subscription required or limit exceeded',
        details: limitCheck.limit === 0 
          ? 'Please subscribe to a plan to generate documents.'
          : `Monthly limit of ${limitCheck.limit} documents reached. Used: ${limitCheck.used}/${limitCheck.limit}`,
        limit: limitCheck.limit,
        used: limitCheck.used,
        remaining: limitCheck.remaining
      }, { status: 402 })
    }

    const body = await request.json()
    const validatedData = generateSchema.parse(body)

    if (!validateIndustryPack(validatedData.industry, validatedData.pack)) {
      return NextResponse.json(
        { error: 'Invalid industry or pack combination' },
        { status: 400 }
      )
    }

    const allowedDocuments = getDocumentsForPack(validatedData.industry, validatedData.pack)
    const allowedDocumentIds = allowedDocuments.map(doc => doc.id)
    
    const invalidDocuments = validatedData.documents.filter(docId => !allowedDocumentIds.includes(docId))
    if (invalidDocuments.length > 0) {
      return NextResponse.json(
        { error: 'Some documents are not available in the selected pack' },
        { status: 400 }
      )
    }

    const templateEngine = new CatalogTemplateEngine()
    
    const templateData = {
      businessName: validatedData.businessName,
      abn: validatedData.abn || '',
      address: validatedData.address || '',
      contactEmail: validatedData.contactEmail,
      contactPhone: validatedData.contactPhone || '',
      website: validatedData.website || '',
      industry: validatedData.industry,
      documentType: '',
      additionalInfo: validatedData.additionalInfo || ''
    }

    const files: any[] = []
    
    for (const documentId of validatedData.documents) {
      const document = allowedDocuments.find(doc => doc.id === documentId)
      if (document) {
        const docTemplateData = {
          ...templateData,
          documentType: document.title
        }
        
        const docFiles = await templateEngine.generateCatalogDocument(
          docTemplateData,
          validatedData.format as 'pdf' | 'docx',
          validatedData.industry,
          documentId
        )
        files.push(...docFiles)
      }
    }

    if (user) {
      for (const documentId of validatedData.documents) {
        const document = allowedDocuments.find(doc => doc.id === documentId)
        if (document) {
          const { data: docRecord } = await supabase.from('generated_documents').insert({
            user_id: user.id,
            title: `${document.title} - ${validatedData.businessName}`,
            document_type: documentId,
            industry: validatedData.industry,
            format: validatedData.format,
            business_info: templateData,
            metadata: {
              pack: validatedData.pack,
              additionalInfo: validatedData.additionalInfo
            }
          }).select().single()

          if (docRecord) {
            await trackDocumentGeneration(user.id, docRecord.id)
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      files: files
    })
  } catch (error) {
    console.error('Document generation error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to generate document' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve user's generated documents
export async function GET(req: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({
      error: 'Missing userId parameter'
    }, { status: 400 });
  }

  try {
    const { data: documents, error } = await supabase
      .from('generated_documents')
      .select('id, title, document_type, industry, format, created_at, metadata')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      documents: documents || []
    });

  } catch (error: any) {
    console.error('Error fetching documents:', error);
    return NextResponse.json({
      error: 'Failed to fetch documents',
      details: error.message
    }, { status: 500 });
  }
}
