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
  
  return null;
}
