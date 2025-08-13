CREATE INDEX IF NOT EXISTS idx_generated_documents_industry ON generated_documents (industry);
CREATE INDEX IF NOT EXISTS idx_generated_documents_pack ON generated_documents ((metadata->>'pack'));
CREATE INDEX IF NOT EXISTS idx_generated_documents_user_industry ON generated_documents (user_id, industry);
CREATE INDEX IF NOT EXISTS idx_user_documents_industry ON user_documents (industry);
CREATE INDEX IF NOT EXISTS idx_user_documents_type ON user_documents (document_type);

ALTER TABLE generated_documents ADD COLUMN IF NOT EXISTS pack TEXT;

UPDATE generated_documents 
SET pack = metadata->>'pack' 
WHERE pack IS NULL AND metadata->>'pack' IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_generated_documents_pack_direct ON generated_documents (pack);
