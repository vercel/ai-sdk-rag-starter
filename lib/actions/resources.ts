'use server';

import {
  NewResourceParams,
  insertResourceSchema,
  resources,
} from '@/lib/db/schema/resources';
import { db } from '../db';
import { generateEmbeddings } from '../ai/embedding';
import { embeddings as embeddingsTable } from '../db/schema/embeddings';

export const createResource = async (input: NewResourceParams) => {
  try {
    console.log("Parsing content: ", input.content);
    const { content } = insertResourceSchema.parse(input);
    console.log("content parsed: ", content);

    const [resource] = await db
      .insert(resources)
      .values({ 
        content,
        pageNumber: input.pageNumber,
        fileID: input.fileID,
      })
      .returning(); 

    console.log("resource: ", resource);

    const embeddings = await generateEmbeddings(content);

    await db.insert(embeddingsTable).values(
      embeddings.map(embedding => ({
        resourceId: resource.id,
        ...embedding,
      })),
    );

    return 'Resource successfully created and embedded.';
  } catch (error) {
    console.log("Error in createResource: ", error);
    return error instanceof Error && error.message.length > 0
      ? error.message
      : 'Error, please try again.';
  }
};
