'use server';

import {
  NewResourceParams,
  insertResourceSchema,
  resources,
} from '@/lib/db/schema/resources';
import { db } from '../db';
import { generateEmbeddingsFromPdf, generateEmbeddings} from '../ai/embedding'; // Importa la función para generar embeddings desde PDF
import { embeddings as embeddingsTable } from '../db/schema/embeddings';
import * as fs from 'fs';

export const createResource = async (input: NewResourceParams) => {
  try {
    const { content, filePath } = insertResourceSchema.parse(input); // Suponiendo que el schema incluye `filePath`

    let embeddings;

    // Si `filePath` está definido, lee el PDF y genera embeddings desde el PDF
    if (filePath && fs.existsSync(filePath)) {
      embeddings = await generateEmbeddingsFromPdf(filePath);
    } else {
      // Si no hay `filePath`, genera embeddings directamente desde el contenido de texto
      embeddings = await generateEmbeddings(content);
    }

    const [resource] = await db
      .insert(resources)
      .values({ content })
      .returning();

    await db.insert(embeddingsTable).values(
      embeddings.map(embedding => ({
        resourceId: resource.id,
        ...embedding,
      })),
    );

    return 'Resource successfully created and embedded.';
  } catch (error) {
    return error instanceof Error && error.message.length > 0
      ? error.message
      : 'Error, please try again.';
  }
};
