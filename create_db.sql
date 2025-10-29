-- create_db.sql
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_database WHERE datname = 'rag_knowledge_base'
   ) THEN
      CREATE DATABASE rag_knowledge_base;
   END IF;
END
$do$;