DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'policy_insights') THEN
    CREATE TABLE policy_insights (
      id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
      industry text NOT NULL,
      document_type text NOT NULL,
      insight_type text NOT NULL CHECK (insight_type IN ('best_practice', 'common_gap', 'regulatory_requirement', 'effective_clause', 'industry_pattern')),
      insight_content text NOT NULL,
      confidence_score integer DEFAULT 0 CHECK (confidence_score >= 0 AND confidence_score <= 100),
      source_file_count integer DEFAULT 1,
      business_size_context text,
      region_context text DEFAULT 'australia',
      metadata jsonb DEFAULT '{}',
      created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
      updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
    );
    
    ALTER TABLE policy_insights ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Public read access to policy insights" ON policy_insights
      FOR SELECT USING (true);
    
    CREATE INDEX policy_insights_industry_idx ON policy_insights(industry);
    CREATE INDEX policy_insights_document_type_idx ON policy_insights(document_type);
    CREATE INDEX policy_insights_insight_type_idx ON policy_insights(insight_type);
    CREATE INDEX policy_insights_confidence_idx ON policy_insights(confidence_score);
    
    RAISE NOTICE 'Created policy_insights table';
  ELSE
    RAISE NOTICE 'policy_insights table already exists';
  END IF;
END $$;

DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'handle_updated_at') THEN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'handle_updated_at' AND tgrelid = 'policy_insights'::regclass) THEN
      CREATE TRIGGER handle_updated_at BEFORE UPDATE ON policy_insights
        FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
      RAISE NOTICE 'Created updated_at trigger for policy_insights';
    END IF;
  ELSE
    RAISE NOTICE 'handle_updated_at function does not exist, skipping trigger';
  END IF;
END $$;

DO $$ 
BEGIN
  RAISE NOTICE 'Policy insights migration completed successfully';
  RAISE NOTICE 'Table created: policy_insights with RLS and indexes';
END $$;
