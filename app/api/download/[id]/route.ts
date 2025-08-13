import { NextRequest, NextResponse } from 'next/server'
import { getFile } from '@/lib/storage'
import { createClient } from '@/lib/supabase-server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'pdf'
    const fileId = params.id

    const fileBuffer = await getFile(fileId, type)
    if (!fileBuffer) {
      return NextResponse.json(
        { error: 'File not found or expired' },
        { status: 404 }
      )
    }

    const mimeType = type === 'docx' 
      ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      : 'application/pdf'
    
    const filename = `document.${type}`

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        'Expires': '0',
        'Pragma': 'no-cache'
      }
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Failed to download file' },
      { status: 500 }
    )
  }
}
