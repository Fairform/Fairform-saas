// app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServiceRoleClient } from '@/lib/supabase';
import { generateDocumentContent } from '@/lib/openaiDoc';
import { generateDocx } from '@/utils/docxBuilder';
import { generatePdf } from '@/utils/pdfBuilder';
import { BusinessInfo } from '@/types';

export async function POST(req: NextRequest) {
  const supabase = getServiceRoleClient();

  try {
    const body = await req.json();
    const {
      userId,
      documentType,
      industry,
      format = 'docx', // Default to DOCX
      businessInfo
    } = body;

    // Validation
    if (!userId || !documentType || !industry || !businessInfo) {
      return NextResponse.json({
        error: 'Missing required fields',
        details: 'userId, documentType, industry, and businessInfo are required'
      }, { status: 400 });
    }

    // Validate business info
    if (!businessInfo.businessName || !businessInfo.abn) {
      return NextResponse.json({
        error: 'Invalid business info',
        details: 'businessName and abn are required'
      }, { status: 400 });
    }

    // Validate format
    if (!['docx', 'pdf'].includes(format)) {
      return NextResponse.json({
        error: 'Invalid format',
        details: 'Format must be either "docx" or "pdf"'
      }, { status: 400 });
    }

    // Check user access (optional - only if you want to restrict document generation)
    const { data: userAccess } = await supabase
      .from('user_access')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .single();

    // Log the generation request
    await supabase.from('usage').insert({
      user_id: userId,
      action: 'document_generation_started',
      metadata: {
        documentType,
        industry,
        format,
        businessName: businessInfo.businessName
      }
    });

    console.log(`Starting document generation: ${documentType} for ${businessInfo.businessName}`);

    // Generate content using Pocketbook LLM
    const content = await generateDocumentContent(
      documentType,
      businessInfo,
      industry
    );

    if (!content || content.trim().length === 0) {
      throw new Error('Generated content is empty');
    }

    console.log(`Content generated successfully, length: ${content.length} characters`);

    // Generate document file based on format
    let fileBuffer: Buffer;
    let mimeType: string;
    let fileExtension: string;

    if (format === 'pdf') {
      fileBuffer = await generatePdf(documentType, content, businessInfo);
      mimeType = 'application/pdf';
      fileExtension = 'pdf';
    } else {
      fileBuffer = await generateDocx(documentType, content, businessInfo);
      mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      fileExtension = 'docx';
    }

    console.log(`Document file generated successfully: ${fileBuffer.length} bytes`);

    // TODO: Upload to storage (Supabase Storage, AWS S3, etc.)
    // For now, we'll store the content in the database
    // In production, you should upload the file to storage and store the URL
    
    const fileName = `${businessInfo.businessName.replace(/[^a-zA-Z0-9]/g, '_')}_${documentType.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.${fileExtension}`;

    // Save document record to database
    const { data: document, error: dbError } = await supabase
      .from('generated_documents')
      .insert({
        user_id: userId,
        title: `${documentType} - ${businessInfo.businessName}`,
        content: content,
        document_type: documentType,
        industry: industry,
        format: format,
        file_url: null, // Will be updated when file storage is implemented
        business_info: businessInfo,
        metadata: {
          fileName,
          fileSize: fileBuffer.length,
          generatedAt: new Date().toISOString(),
          userAgent: req.headers.get('user-agent'),
        }
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error(`Failed to save document: ${dbError.message}`);
    }

    // Log successful generation
    await supabase.from('usage').insert({
      user_id: userId,
      action: 'document_generation_completed',
      metadata: {
        documentId: document.id,
        documentType,
        industry,
        format,
        fileSize: fileBuffer.length,
        contentLength: content.length
      }
    });

    console.log(`Document generation completed successfully for user ${userId}`);

    // Return the document with the file as base64 for immediate download
    // In production, you might want to return a download URL instead
    return NextResponse.json({
      success: true,
      document: {
        id: document.id,
        title: document.title,
        documentType: document.document_type,
        industry: document.industry,
        format: document.format,
        createdAt: document.created_at,
        fileName: fileName,
        fileSize: fileBuffer.length
      },
      file: {
        data: fileBuffer.toString('base64'),
        mimeType: mimeType,
        fileName: fileName
      }
    });

  } catch (error: any) {
    console.error('Document generation error:', error);

    // Log the error
    try {
      const body = await req.json();
      await supabase.from('usage').insert({
        user_id: body.userId || 'unknown',
        action: 'document_generation_failed',
        metadata: {
          error: error.message,
          documentType: body.documentType,
          industry: body.industry
        }
      });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }

    // Handle specific error types
    if (error.message.includes('Pocketbook LLM')) {
      return NextResponse.json({
        error: 'Document generation service unavailable',
        details: 'Please try again in a few moments'
      }, { status: 503 });
    }

    if (error.message.includes('Failed to generate')) {
      return NextResponse.json({
        error: 'Document formatting failed',
        details: 'There was an issue creating the document file'
      }, { status: 500 });
    }

    return NextResponse.json({
      error: 'Internal Server Error',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    }, { status: 500 });
  }
}

// GET endpoint to retrieve user's generated documents
export async function GET(req: NextRequest) {
  const supabase = getServiceRoleClient();
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
