
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'business_profiles') THEN
    CREATE TABLE business_profiles (
      id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id uuid REFERENCES auth.users ON DELETE CASCADE,
      business_name text NOT NULL,
      industry text NOT NULL,
      sub_industry text,
      city text NOT NULL,
      region text,
      org_size text,
      abn text,
      metadata jsonb DEFAULT '{}',
      created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
      updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
    );
    
    ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Users can manage own business profiles" ON business_profiles
      FOR ALL USING (auth.uid() = user_id);
    
    CREATE INDEX business_profiles_user_id_idx ON business_profiles(user_id);
    CREATE INDEX business_profiles_industry_idx ON business_profiles(industry);
    
    RAISE NOTICE 'Created business_profiles table';
  ELSE
    RAISE NOTICE 'business_profiles table already exists';
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'audit_sessions') THEN
    CREATE TABLE audit_sessions (
      id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id uuid REFERENCES auth.users ON DELETE CASCADE,
      business_profile_id uuid REFERENCES business_profiles(id) ON DELETE CASCADE,
      session_token text UNIQUE NOT NULL,
      status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
      uploaded_files jsonb DEFAULT '[]',
      total_files integer DEFAULT 0,
      processed_files integer DEFAULT 0,
      compliance_score integer,
      audit_results jsonb DEFAULT '{}',
      recommendations jsonb DEFAULT '[]',
      missing_policies jsonb DEFAULT '[]',
      outdated_documents jsonb DEFAULT '[]',
      completed_checks jsonb DEFAULT '[]',
      processing_logs jsonb DEFAULT '[]',
      metadata jsonb DEFAULT '{}',
      created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
      updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
      completed_at timestamp with time zone
    );
    
    ALTER TABLE audit_sessions ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Users can view own audit sessions" ON audit_sessions
      FOR SELECT USING (auth.uid() = user_id);
    
    CREATE POLICY "Users can update own audit sessions" ON audit_sessions
      FOR UPDATE USING (auth.uid() = user_id);
    
    CREATE POLICY "Anonymous access via session token" ON audit_sessions
      FOR ALL USING (session_token IS NOT NULL AND user_id IS NULL);
    
    CREATE INDEX audit_sessions_user_id_idx ON audit_sessions(user_id);
    CREATE INDEX audit_sessions_session_token_idx ON audit_sessions(session_token);
    CREATE INDEX audit_sessions_status_idx ON audit_sessions(status);
    CREATE INDEX audit_sessions_created_at_idx ON audit_sessions(created_at);
    
    RAISE NOTICE 'Created audit_sessions table';
  ELSE
    RAISE NOTICE 'audit_sessions table already exists';
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'compliance_benchmarks') THEN
    CREATE TABLE compliance_benchmarks (
      id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
      industry text NOT NULL,
      sub_industry text,
      region text DEFAULT 'australia',
      required_policies jsonb NOT NULL DEFAULT '[]',
      scoring_criteria jsonb NOT NULL DEFAULT '{}',
      benchmark_version text DEFAULT '1.0',
      is_active boolean DEFAULT true,
      metadata jsonb DEFAULT '{}',
      created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
      updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
    );
    
    ALTER TABLE compliance_benchmarks ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Public read access to active benchmarks" ON compliance_benchmarks
      FOR SELECT USING (is_active = true);
    
    CREATE INDEX compliance_benchmarks_industry_idx ON compliance_benchmarks(industry);
    CREATE INDEX compliance_benchmarks_active_idx ON compliance_benchmarks(is_active);
    
    RAISE NOTICE 'Created compliance_benchmarks table';
  ELSE
    RAISE NOTICE 'compliance_benchmarks table already exists';
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'audit_file_uploads') THEN
    CREATE TABLE audit_file_uploads (
      id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
      audit_session_id uuid REFERENCES audit_sessions(id) ON DELETE CASCADE NOT NULL,
      file_name text NOT NULL,
      file_path text,
      file_size bigint,
      file_type text,
      mime_type text,
      analysis_status text DEFAULT 'pending' CHECK (analysis_status IN ('pending', 'processing', 'completed', 'failed')),
      analysis_results jsonb DEFAULT '{}',
      document_type_detected text,
      compliance_issues jsonb DEFAULT '[]',
      quality_score integer,
      metadata jsonb DEFAULT '{}',
      created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
      updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
    );
    
    ALTER TABLE audit_file_uploads ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Access via audit session" ON audit_file_uploads
      FOR ALL USING (
        EXISTS (
          SELECT 1 FROM audit_sessions 
          WHERE audit_sessions.id = audit_file_uploads.audit_session_id 
          AND (audit_sessions.user_id = auth.uid() OR audit_sessions.session_token IS NOT NULL)
        )
      );
    
    CREATE INDEX audit_file_uploads_session_id_idx ON audit_file_uploads(audit_session_id);
    CREATE INDEX audit_file_uploads_status_idx ON audit_file_uploads(analysis_status);
    
    RAISE NOTICE 'Created audit_file_uploads table';
  ELSE
    RAISE NOTICE 'audit_file_uploads table already exists';
  END IF;
END $$;

DO $$ 
BEGIN
  INSERT INTO compliance_benchmarks (industry, required_policies, scoring_criteria, metadata) VALUES (
    'ndis',
    '[
      "Privacy Policy",
      "Code of Conduct", 
      "Incident Management Policy",
      "Work Health & Safety Policy",
      "Child Protection Policy",
      "Complaints Handling Procedure",
      "Quality Management System",
      "NDIS Practice Standards Compliance",
      "Risk Management Framework",
      "Staff Training & Development Policy"
    ]',
    '{
      "policy_presence_weight": 40,
      "content_quality_weight": 30,
      "compliance_alignment_weight": 20,
      "document_currency_weight": 10,
      "minimum_passing_score": 70
    }',
    '{"description": "NDIS disability services compliance requirements", "regulatory_framework": "NDIS Practice Standards"}'
  ) ON CONFLICT DO NOTHING;

  INSERT INTO compliance_benchmarks (industry, required_policies, scoring_criteria, metadata) VALUES (
    'aged-care',
    '[
      "Privacy Policy",
      "Code of Conduct",
      "Incident Management Policy", 
      "Work Health & Safety Policy",
      "Medication Management Policy",
      "Infection Control Policy",
      "Complaints Handling Procedure",
      "Quality & Safety Management",
      "Aged Care Quality Standards Compliance",
      "Staff Training & Competency Framework"
    ]',
    '{
      "policy_presence_weight": 35,
      "content_quality_weight": 35,
      "compliance_alignment_weight": 20,
      "document_currency_weight": 10,
      "minimum_passing_score": 75
    }',
    '{"description": "Aged care services compliance requirements", "regulatory_framework": "Aged Care Quality Standards"}'
  ) ON CONFLICT DO NOTHING;

  INSERT INTO compliance_benchmarks (industry, required_policies, scoring_criteria, metadata) VALUES (
    'healthcare',
    '[
      "Privacy Policy",
      "Code of Conduct",
      "Clinical Governance Policy",
      "Work Health & Safety Policy", 
      "Infection Control Policy",
      "Patient Safety & Quality Policy",
      "Complaints Handling Procedure",
      "Professional Development Policy",
      "Risk Management Framework",
      "Medical Records Management Policy"
    ]',
    '{
      "policy_presence_weight": 35,
      "content_quality_weight": 30,
      "compliance_alignment_weight": 25,
      "document_currency_weight": 10,
      "minimum_passing_score": 80
    }',
    '{"description": "Healthcare services compliance requirements", "regulatory_framework": "Australian Health Practitioner Regulation Agency"}'
  ) ON CONFLICT DO NOTHING;

  INSERT INTO compliance_benchmarks (industry, required_policies, scoring_criteria, metadata) VALUES (
    'construction',
    '[
      "Work Health & Safety Policy",
      "Safety Management System",
      "Risk Assessment Procedures",
      "Emergency Response Plan",
      "Environmental Management Policy",
      "Quality Assurance Policy",
      "Subcontractor Management Policy",
      "Incident Reporting Procedures",
      "Training & Competency Framework",
      "Equipment & Plant Safety Policy"
    ]',
    '{
      "policy_presence_weight": 45,
      "content_quality_weight": 25,
      "compliance_alignment_weight": 20,
      "document_currency_weight": 10,
      "minimum_passing_score": 75
    }',
    '{"description": "Construction industry compliance requirements", "regulatory_framework": "Work Health and Safety Act"}'
  ) ON CONFLICT DO NOTHING;

  INSERT INTO compliance_benchmarks (industry, required_policies, scoring_criteria, metadata) VALUES (
    'childcare',
    '[
      "Child Protection Policy",
      "Educational Program Policy",
      "Health & Safety Policy",
      "Nutrition & Food Safety Policy",
      "Behaviour Guidance Policy",
      "Family Communication Policy",
      "Staff Recruitment & Training Policy",
      "Incident & Emergency Procedures",
      "Privacy & Confidentiality Policy",
      "Quality Improvement Plan"
    ]',
    '{
      "policy_presence_weight": 40,
      "content_quality_weight": 30,
      "compliance_alignment_weight": 20,
      "document_currency_weight": 10,
      "minimum_passing_score": 80
    }',
    '{"description": "Early childhood education and care compliance requirements", "regulatory_framework": "National Quality Framework"}'
  ) ON CONFLICT DO NOTHING;

  RAISE NOTICE 'Inserted default compliance benchmarks for major industries';
END $$;

DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'handle_updated_at') THEN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'handle_updated_at' AND tgrelid = 'business_profiles'::regclass) THEN
      CREATE TRIGGER handle_updated_at BEFORE UPDATE ON business_profiles
        FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
      RAISE NOTICE 'Created updated_at trigger for business_profiles';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'handle_updated_at' AND tgrelid = 'audit_sessions'::regclass) THEN
      CREATE TRIGGER handle_updated_at BEFORE UPDATE ON audit_sessions
        FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
      RAISE NOTICE 'Created updated_at trigger for audit_sessions';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'handle_updated_at' AND tgrelid = 'compliance_benchmarks'::regclass) THEN
      CREATE TRIGGER handle_updated_at BEFORE UPDATE ON compliance_benchmarks
        FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
      RAISE NOTICE 'Created updated_at trigger for compliance_benchmarks';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'handle_updated_at' AND tgrelid = 'audit_file_uploads'::regclass) THEN
      CREATE TRIGGER handle_updated_at BEFORE UPDATE ON audit_file_uploads
        FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
      RAISE NOTICE 'Created updated_at trigger for audit_file_uploads';
    END IF;
  ELSE
    RAISE NOTICE 'handle_updated_at function does not exist, skipping triggers';
  END IF;
END $$;

DO $$ 
BEGIN
  RAISE NOTICE 'Smart Upload & Audit Engine migration completed successfully';
  RAISE NOTICE 'Tables created: business_profiles, audit_sessions, compliance_benchmarks, audit_file_uploads';
  RAISE NOTICE 'Default compliance benchmarks inserted for: NDIS, Aged Care, Healthcare, Construction, Childcare';
END $$;
