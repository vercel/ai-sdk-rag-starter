-- Enable the pgvector extension if not already enabled
CREATE EXTENSION IF NOT EXISTS vector;

-- Drop the function if it exists to ensure clean migration
DROP FUNCTION IF EXISTS match_documents;

-- Create the match_documents function
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id text,
  content text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    e.resource_id,
    e.content,
    1 - (e.embedding <=> query_embedding) as similarity
  FROM embeddings e
  WHERE 1 - (e.embedding <=> query_embedding) > match_threshold
  ORDER BY e.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION match_documents(vector(1536), float, int) TO service_role;
GRANT EXECUTE ON FUNCTION match_documents(vector(1536), float, int) TO authenticated;
GRANT EXECUTE ON FUNCTION match_documents(vector(1536), float, int) TO anon;