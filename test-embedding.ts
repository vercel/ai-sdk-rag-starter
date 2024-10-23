// test-embedding.ts (create this file in your project root)
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

// Verify required environment variables
const requiredEnvVars = [
  'OPENAI_API_KEY',
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY'
] as const;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function testEmbedding() {
  try {
    // Test embedding generation
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: 'test query',
      encoding_format: 'float',
    });

    console.log('Embedding generated successfully:', {
      dimensions: embeddingResponse.data[0].embedding.length,
      firstFewValues: embeddingResponse.data[0].embedding.slice(0, 5)
    });

    // Test Supabase connection
    const { data, error } = await supabase
      .from('embeddings')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Supabase error:', error);
    } else {
      console.log('Supabase connection successful:', data);
    }

  } catch (error) {
    console.error('Test failed:', error);
  }
}

testEmbedding();