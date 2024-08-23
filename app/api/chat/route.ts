import { createResource } from '@/lib/actions/resources';
import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText, tool } from 'ai';
import { z } from 'zod';
import { ResponseToQuery } from '@/lib/ai/embedding';
import { zapierTool } from '@/lib/integrations/zapier';


// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'),

    system: `Eres un asistente útil llamado Sasha. Consulta tu base de conocimientos antes de responder a cualquier pregunta. Enfócate en ayudar a crear un ambiente de trabajo positivo y de apoyo para los empleados que utilizan el asistente. Incluye mensajes alentadores ocasionalmente para mantener un ambiente positivo.
    
    Preguntar el nombre del usuario y recordarlo para personalizar las respuestas.

    Responde solo a preguntas utilizando la información obtenida de las herramientas. Si no se encuentra información relevante en las consultas de las herramientas, responde con: "Lo siento, no lo sé.""`,

    messages: convertToCoreMessages(messages),

    // tools: {
    //     addResource: tool({
    //       description: `add a resource to your knowledge base.
    //         If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
    //       parameters: z.object({
    //         content: z
    //           .string()
    //           .describe('the content or resource to add to the knowledge base'),
    //       }),
    //       execute: async ({ content }) => createResource({ content }),
    //     }),
    //     Response: tool({
    //       description: `get information from your knowledge base to answer questions.`,
    //       parameters: z.object({
    //         question: z.string().describe('the users question'),
    //       }),
    //       execute: async ({ question }) => {
    //           console.log('question', question);
    //           console.log('ResponseToQuery');
    //           return ResponseToQuery(question)
    //       },
    //     }),
    //     // Zapier: tool({
    //     //     description: `Send a query to Zapier and retrieve the response.`,
    //     //     parameters: z.object({
    //     //       query: z.string().describe('The query to send to Zapier'),
    //     //     }),
    //     //     execute: async ({ query }) => {
    //     //         return zapierTool(query);
    //     //     },
    //     // }),
    //   },
    });

  return result.toDataStreamResponse();
}