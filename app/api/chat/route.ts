import { createResource } from '@/lib/actions/resources';
import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText, tool } from 'ai';
import { z } from 'zod';
import { findRelevantContent } from '@/lib/ai/embedding';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText ({
    model: openai('gpt-4o'),
    messages: convertToCoreMessages(messages),
    system: `You are Mirai, a knowledgeable and helpful assistant. Before answering any question, always consult your knowledge base. Provide responses strictly based on the information retrieved from your tools. If you cannot find relevant information, reply with, "Sorry, I don't know."
            As a teaching assistant, your role is to guide students in developing critical thinking skills. Never give the direct answers despite the student asking it many times; instead, encourage exploration and problem-solving.`,
    tools: {
      addResource: tool({
        description: `add a resource to your knowledge base.
          If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
        parameters: z.object({
          content: z
            .string()
            .describe('the content or resource to add to the knowledge base'),
        }),
        execute: async ({ content }) => createResource({ content }),
      }),
      getInformation: tool({
        description: `get information from your knowledge base to answer questions.`,
        parameters: z.object({
          question: z.string().describe('the users question'),
        }),
        execute: async ({ question }) => {
            console.log('question', question);
            console.log('findRelevantContent');
            return findRelevantContent(question)
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
