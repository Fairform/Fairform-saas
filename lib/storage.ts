import { randomUUID } from 'crypto';

interface StoredFile {
  id: string;
  url: string;
  expiresAt: string;
}

export async function storeFile(
  buffer: Buffer, 
  mimeType: string, 
  extension: string
): Promise<StoredFile> {
  const id = randomUUID();
  const fileName = `${id}.${extension}`;
  
  if (process.env.NODE_ENV === 'development') {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const tmpDir = path.join('/tmp', 'formative');
    await fs.mkdir(tmpDir, { recursive: true });
    
    const filePath = path.join(tmpDir, fileName);
    await fs.writeFile(filePath, buffer);
    
    return {
      id,
      url: `/api/download/${id}?type=${extension}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
  }
  
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { createClient } = await import('@/lib/supabase-server')
      const supabase = createClient()
      
      const { data, error } = await supabase.storage
        .from('documents')
        .upload(fileName, buffer, {
          contentType: mimeType,
          upsert: false
        })
      
      if (error) throw error
      
      return {
        id,
        url: `/api/download/${id}?type=${extension}`,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      }
    } catch (error) {
      console.warn('Supabase Storage not available, falling back to data URI:', (error as Error).message);
    }
  }
  
  return {
    id,
    url: `data:${mimeType};base64,${buffer.toString('base64')}`,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };
}

export async function getFile(id: string, extension?: string): Promise<Buffer | null> {
  if (process.env.NODE_ENV === 'development') {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    try {
      const fileName = extension ? `${id}.${extension}` : `${id}.pdf`;
      const filePath = path.join('/tmp', 'formative', fileName);
      return await fs.readFile(filePath);
    } catch (error) {
      console.error('Error reading file:', error);
      return null;
    }
  }
  
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { createClient } = await import('@/lib/supabase-server')
      const supabase = createClient()
      
      const fileName = extension ? `${id}.${extension}` : `${id}.pdf`;
      const { data, error } = await supabase.storage
        .from('documents')
        .download(fileName)
      
      if (error || !data) {
        console.error('Error downloading from Supabase Storage:', error);
        return null;
      }
      
      return Buffer.from(await data.arrayBuffer());
    } catch (error) {
      console.error('Error accessing Supabase Storage:', error);
      return null;
    }
  }
  
  return null;
}
