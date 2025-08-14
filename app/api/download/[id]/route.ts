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

    let fileBuffer: Buffer | null = null
    
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const { createClient } = await import('@/lib/supabase-server')
        const supabase = createClient()
        
        const fileName = `${fileId}.${type}`;
        const { data, error } = await supabase.storage
          .from('documents')
          .download(fileName)
        
        if (error || !data) {
          return NextResponse.json({ error: 'File not found' }, { status: 404 })
        }
        
        fileBuffer = Buffer.from(await data.arrayBuffer())
      } catch (error) {
        console.error('Error accessing Supabase Storage:', error);
        fileBuffer = await getFile(fileId, type)
      }
    } else {
      fileBuffer = await getFile(fileId, type)
    }
    
    if (!fileBuffer) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    const mimeType = type === 'docx' 
      ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      : 'application/pdf'
    
    const filename = `document.${type}`

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': fileBuffer.length.toString(),
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
