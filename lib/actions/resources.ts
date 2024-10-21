'use server';

import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { generateEmbeddings } from '../ai/embedding';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Define the schema for new resource
const insertResourceSchema = z.object({
  title: z.string(),
  url: z.string().url().optional(),
  content: z.string()
});

type NewResourceParams = z.infer<typeof insertResourceSchema>;

export const createResource = async (input: NewResourceParams) => {
  try {
    const { title, url, content } = insertResourceSchema.parse(input);

    // Insert the resource
    const { data: resource, error: resourceError } = await supabase
      .from('resources')
      .insert({ title, url, content })
      .select()
      .single();

    if (resourceError) throw new Error(resourceError.message);

    // Generate embeddings
    const embeddings = await generateEmbeddings(content);

    // Insert embeddings
    const { error: embeddingsError } = await supabase
      .from('embeddings')
      .insert(
        embeddings.map(embedding => ({
          resource_id: resource.id,
          content: embedding.content,
          embedding: embedding.embedding
        }))
      );

    if (embeddingsError) throw new Error(embeddingsError.message);

    return 'Resource successfully created and embedded.';
  } catch (error) {
    return error instanceof Error && error.message.length > 0
      ? error.message
      : 'Error, please try again.';
  }
};