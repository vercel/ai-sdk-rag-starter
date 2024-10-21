-- Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Function to generate a short ID (similar to nanoid)
CREATE OR REPLACE FUNCTION generate_short_id()
RETURNS TEXT AS $$
DECLARE
  characters TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..21 LOOP
    result := result || substr(characters, floor(random() * length(characters) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Create the resources table
CREATE TABLE resources (
  id TEXT PRIMARY KEY DEFAULT generate_short_id(),
  title TEXT NOT NULL,
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the embeddings table
CREATE TABLE embeddings (
  id TEXT PRIMARY KEY DEFAULT generate_short_id(),
  resource_id TEXT REFERENCES resources(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  embedding vector(1536) NOT NULL
);

-- Create the HNSW index
CREATE INDEX ON embeddings USING hnsw (embedding vector_cosine_ops);