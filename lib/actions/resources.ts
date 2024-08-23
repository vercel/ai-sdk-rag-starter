'use server';

import {
  NewResourceParams,
  insertResourceSchema,
  resources,
} from '@/lib/db/schema/resources';
import { db } from '../db';
import { generateEmbeddings} from '../ai/embedding'; // Importa la función para generar embeddings desde PDF
import { embeddings as embeddingsTable } from '../db/schema/embeddings';
import * as fs from 'fs';

export const createResource = async (input: NewResourceParams) => {
    try {
      const { content, filePath } = insertResourceSchema.parse(input);
  
      let finalContent = content || ''; // Inicializa el contenido como vacío si no se proporciona
      let embeddings;
  
      if (filePath && fs.existsSync(filePath)) {
        // Genera embeddings utilizando el archivo PDF
        embeddings = await generateEmbeddings(filePath, true);
        finalContent = embeddings.map(e => e.content).join(' '); // Junta el contenido de los chunks
      } else {
        // Genera embeddings directamente desde el contenido de texto
        embeddings = await generateEmbeddings(finalContent);
      }
  
      // Inserta el recurso en la base de datos
      const [resource] = await db
        .insert(resources)
        .values({ content: finalContent, filePath }) // Guarda el contenido y el filePath
        .returning();
  
      // Inserta los embeddings en la base de datos
      await db.insert(embeddingsTable).values(
        embeddings.map(embedding => ({
            resourceId: resource.id,
            content: embedding.content,
            embedding: embedding.embedding,
        })),
      );
  
      return 'Resource successfully created and embedded.';
    } catch (error) {
      return error instanceof Error && error.message.length > 0
        ? error.message
        : 'Error, please try again.';
    }
  };
  
