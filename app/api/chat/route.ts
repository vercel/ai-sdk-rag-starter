import { createResource } from '@/lib/actions/resources';
import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText, tool, generateText } from 'ai';
import { z } from 'zod';
import { findRelevantContent } from '@/lib/ai/embedding';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText ({
    model: openai('gpt-4o'),
    messages: convertToCoreMessages(messages),
    system: `You are Mirai, a knowledgeable and helpful assistant. Before answering any question, always consult your knowledge base. Provide responses strictly based on the information retrieved from your tools. If you cannot find relevant information, reply with, "Sorry, I don't know." If the student ask a question or has any doubt you should save it using the addQuestion tool to later make analytics.
            As a teaching assistant, your role is to guide students in developing critical thinking skills. Never give the direct answers despite the student asking it many times; instead, encourage exploration and problem-solving.`,
    tools: {
      // addResource: tool({
      //   description: `add a resource to your knowledge base.
      //     If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
      //   parameters: z.object({
      //     content: z
      //       .string()
      //       .describe('the content or resource to add to the knowledge base'),
      //   }),
      //   execute: async ({ content }) => createResource({ content }),
      // }),
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
      addQuestion: tool({
        description: `add a question the student made to your knowledge base. If the student asks a question that is not in your knowledge base, use this tool to add it. Afterward we will make analytics to show the professor the most asked questions.`,
        parameters: z.object({
          question: z.string().describe('the question from the student to add to the knowledge base'),
        }),
        execute: async ({ question }) => {
          console.log('question', question);
            console.log('addQuestion');
          const { text: topic } = await generateText({
            model: openai('gpt-4o-mini'),
            prompt: `Identify the main topic of this question. Respond with only the topic name, nothing else: "${question}"`,
          });
          console.log('topic', topic);
          return createResource({ content: `Question: ${question}\nTopic: ${topic}` });
        },
      }),

    },
  });

  return result.toDataStreamResponse();
}
