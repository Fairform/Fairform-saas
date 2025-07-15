
CREATE TABLE IF NOT EXISTS user_documents (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  file_name text NOT NULL,
  file_path text,
  document_type text,
  industry text,
  format text CHECK (format IN ('docx', 'pdf', 'xlsx')),
  download_url text,
  download_count integer DEFAULT 0,
  status text DEFAULT 'uploaded' CHECK (status IN ('uploaded', 'queued', 'processing', 'complete', 'failed', 'under_review')),
  file_size bigint,
  metadata jsonb,
  deleted_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS agent_logs (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  agent_id text NOT NULL,
  question text,
  response text,
  context jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS document_logs (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  document_id uuid REFERENCES user_documents(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  action text NOT NULL, -- 'upload', 'ingest', 'process', 'complete', 'error'
  status text NOT NULL,
  message text,
  metadata jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS template_versions (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  industry text NOT NULL,
  document_title text NOT NULL,
  content text,
  file_path text,
  uploaded_by text,
  version integer DEFAULT 1,
  is_active boolean DEFAULT true,
  metadata jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE user_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE template_versions ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_documents' AND policyname = 'Users can view own documents.') THEN
    CREATE POLICY "Users can view own documents." ON user_documents FOR SELECT USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_documents' AND policyname = 'Users can insert own documents.') THEN
    CREATE POLICY "Users can insert own documents." ON user_documents FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_documents' AND policyname = 'Users can update own documents.') THEN
    CREATE POLICY "Users can update own documents." ON user_documents FOR UPDATE USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_documents' AND policyname = 'Users can delete own documents.') THEN
    CREATE POLICY "Users can delete own documents." ON user_documents FOR DELETE USING (auth.uid() = user_id);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'agent_logs' AND policyname = 'Users can view own agent logs.') THEN
    CREATE POLICY "Users can view own agent logs." ON agent_logs FOR SELECT USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'agent_logs' AND policyname = 'Users can insert own agent logs.') THEN
    CREATE POLICY "Users can insert own agent logs." ON agent_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'document_logs' AND policyname = 'Users can view own document logs.') THEN
    CREATE POLICY "Users can view own document logs." ON document_logs FOR SELECT USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'document_logs' AND policyname = 'Users can insert own document logs.') THEN
    CREATE POLICY "Users can insert own document logs." ON document_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'template_versions' AND policyname = 'Anyone can view active templates.') THEN
    CREATE POLICY "Anyone can view active templates." ON template_versions FOR SELECT USING (is_active = true);
  END IF;
END $$;

DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'handle_updated_at') THEN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'handle_updated_at' AND tgrelid = 'user_documents'::regclass) THEN
      CREATE TRIGGER handle_updated_at BEFORE UPDATE ON user_documents
        FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'handle_updated_at' AND tgrelid = 'template_versions'::regclass) THEN
      CREATE TRIGGER handle_updated_at BEFORE UPDATE ON template_versions
        FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
    END IF;
  END IF;
END $$;

-- Create indexes for better performance (only if they don't exist)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'user_documents_user_id_idx') THEN
    CREATE INDEX user_documents_user_id_idx ON user_documents(user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'user_documents_created_at_idx') THEN
    CREATE INDEX user_documents_created_at_idx ON user_documents(created_at);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'user_documents_status_idx') THEN
    CREATE INDEX user_documents_status_idx ON user_documents(status);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'user_documents_document_type_idx') THEN
    CREATE INDEX user_documents_document_type_idx ON user_documents(document_type);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'agent_logs_user_id_idx') THEN
    CREATE INDEX agent_logs_user_id_idx ON agent_logs(user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'agent_logs_agent_id_idx') THEN
    CREATE INDEX agent_logs_agent_id_idx ON agent_logs(agent_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'agent_logs_created_at_idx') THEN
    CREATE INDEX agent_logs_created_at_idx ON agent_logs(created_at);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'document_logs_document_id_idx') THEN
    CREATE INDEX document_logs_document_id_idx ON document_logs(document_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'document_logs_user_id_idx') THEN
    CREATE INDEX document_logs_user_id_idx ON document_logs(user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'document_logs_created_at_idx') THEN
    CREATE INDEX document_logs_created_at_idx ON document_logs(created_at);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'template_versions_industry_idx') THEN
    CREATE INDEX template_versions_industry_idx ON template_versions(industry);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'template_versions_is_active_idx') THEN
    CREATE INDEX template_versions_is_active_idx ON template_versions(is_active);
  END IF;
END $$;
