import pdfParse from 'pdf-parse';
import * as fs from 'fs';
import { embedMany } from 'ai';
import { openai } from '@ai-sdk/openai';

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

export const generateEmbeddings = async (
    value: string,
  ): Promise<Array<{ embedding: number[]; content: string }>> => {
    const chunks = generateChunks(value);
    const { embeddings } = await embedMany({
      model: embeddingModel,
      values: chunks,
    });
    return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
  };

// Función para generar embeddings a partir del texto de un PDF
export const generateEmbeddingsFromPdf = async (
  filePath: string,
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const text = await readPdf(filePath); // Lee el PDF
  const chunks = generateChunks(text); // Genera los chunks del texto
  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });
  return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
};
