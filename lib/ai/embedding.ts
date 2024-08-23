import pdfParse from 'pdf-parse';
import * as fs from 'fs';
import { embedMany } from 'ai';
import { openai } from '@ai-sdk/openai';
import { cosineDistance, desc, gt, sql } from "drizzle-orm";
import { embeddings } from "../db/schema/embeddings";
import { db } from "../db";

// Configura el modelo de embeddings
const embeddingModel = openai.embedding('text-embedding-3-small');

// Función para dividir el texto en chunks
const generateChunks = (input: string): string[] => {
  return input
    .trim()
    .split('.')
    .filter(i => i !== '');
};

// Función para leer el PDF y extraer texto
const readPdf = async (filePath: string): Promise<string> => {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
};

// Función unificada para generar embeddings
export const generateEmbeddings = async (
  input: string,
  isFilePath: boolean = false
): Promise<Array<{ embedding: number[]; content: string }>> => {
  let content = input;

  // Si es un archivo PDF, lee su contenido
  if (isFilePath && fs.existsSync(input)) {
    content = await readPdf(input);
  }

  // Genera los chunks del contenido
  const chunks = generateChunks(content);

  // Genera embeddings a partir de los chunks
  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });

  return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
};

export const ResponseToQuery = async (userQuery: string) => {
    const userQueryEmbeddings = await generateEmbeddings(userQuery);
  
    // Tomamos solo el primer embedding generado ya que userQuery se procesa en un solo chunk.
    const userQueryEmbedding = userQueryEmbeddings[0].embedding;
  
    const similarity = sql<number>`1 - (${cosineDistance(
      embeddings.embedding,
      userQueryEmbedding
    )})`;
  
    const similarGuides = await db
      .select({ name: embeddings.content, similarity })
      .from(embeddings)
      .where(gt(similarity, 0.5))
      .orderBy((t) => desc(t.similarity))
      .limit(4);
  
    return similarGuides;
  };
  
  export const getAllEmbeddings = async () => {
    return db
      .select({ name: embeddings.content, embedding: embeddings.embedding })
      .from(embeddings);
  };
