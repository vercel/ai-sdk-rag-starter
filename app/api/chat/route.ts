import { createResource } from '@/lib/actions/resources';
import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText, tool } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'),

    system: `Eres un asistente útil. Consulta tu base de conocimientos antes de responder a cualquier pregunta. Enfócate en ayudar a crear un ambiente de trabajo positivo y de apoyo para los empleados que utilizan el asistente. Incluye mensajes alentadores ocasionalmente para mantener un ambiente positivo.
    
    Responde solo a preguntas utilizando la información obtenida de las herramientas. Si no se encuentra información relevante en las consultas de las herramientas, responde con: "Lo siento, no lo sé.""`,

    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}