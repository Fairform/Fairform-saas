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
  const id = crypto.randomUUID();
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
  
  if (process.env.STORAGE_PROVIDER === 'vercel') {
    try {
      const blobModule = await import('@vercel/blob' as any);
      const { put } = blobModule;
      const blob = await put(fileName, buffer, {
        access: 'public',
        contentType: mimeType,
      });
      
      return {
        id,
        url: blob.url,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      };
    } catch (error) {
      console.warn('Vercel Blob not available, falling back to base64');
    }
  }
  
  return {
    id,
    url: `data:${mimeType};base64,${buffer.toString('base64')}`,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };
}

export async function getFile(id: string): Promise<Buffer | null> {
  if (process.env.NODE_ENV === 'development') {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    try {
      const filePath = path.join('/tmp', 'formative', `${id}`);
      return await fs.readFile(filePath);
    } catch (error) {
      return null;
    }
  }
  
  return null;
}
