// lib/supabase-admin.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export const saveDocumentMetadata = async (metadata: any) => {
  const { data, error } = await supabaseAdmin
    .from('user_documents')
    .insert({
      user_id: metadata.userId,
      file_name: metadata.fileName,
      file_path: metadata.filePath,
      document_type: metadata.documentType,
      industry: metadata.industry,
      format: metadata.format,
      download_url: metadata.downloadUrl
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving document metadata:', error);
    throw error;
  }
  return data;
};

export const uploadFileToStorage = async (
  bucket: string,
  path: string,
  file: Buffer,
  contentType: string
) => {
  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, file, {
      contentType,
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Error uploading file:', error);
    throw error;
  }

  // Get signed URL for download
  const { data: urlData } = await supabaseAdmin.storage
    .from(bucket)
    .createSignedUrl(path, 86400); // 24 hours

  return {
    path: data.path,
    signedUrl: urlData?.signedUrl
  };
};

export const saveAgentLog = async (log: any) => {
  const { data, error } = await supabaseAdmin
    .from('agent_logs')
    .insert({
      user_id: log.userId,
      agent_id: log.agentId,
      question: log.question,
      response: log.response,
      context: log.context
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving agent log:', error);
    throw error;
  }
  return data;
};

export const getUserDocuments = async (userId: string) => {
  const { data, error } = await supabaseAdmin
    .from('user_documents')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user documents:', error);
    throw error;
  }
  return data;
};