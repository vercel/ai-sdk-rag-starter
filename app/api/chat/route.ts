import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';
import { createClient } from '@supabase/supabase-js';
import { createResource } from '@/lib/actions/resources';
import { generateEmbeddings } from '@/lib/ai/embedding';
import { env } from '@/lib/env.mjs';

// Initialize Supabase client
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Function to search the knowledge base
async function searchKnowledgeBase(query: string) {
  try {
    const embedding = await generateEmbeddings(query);
    const { data, error } = await supabase.rpc('match_documents', {
      query_embedding: embedding[0].embedding,
      match_threshold: 0.78,
      match_count: 10
    });

    if (error) {
      console.error('Error searching knowledge base:', error);
      return [];
    }

    return data;
  } catch (err) {
    console.error('An error occurred during search:', err);
    return [];
  }
}

export async function POST(req: Request) {
  try {
    const { messages }: { messages: Array<{ content: string }> } = await req.json();

    // Search the knowledge base for relevant information
    const lastMessage = messages[messages.length - 1].content;
    const knowledgeBaseResults = await searchKnowledgeBase(lastMessage);

    // Prepare the messages array with the knowledge base results
    const contextMessages = knowledgeBaseResults.map(result => ({
      role: 'system' as const,
      content: `Relevant information: ${result.content}`,
    }));

    // Stream the AI response
    const result = await streamText({
      model: openai('gpt-4'),
      system: `You are a helpful assistant. Check your knowledge base before answering any questions.
      Only respond to questions using information from tool calls.
      If no relevant information is found in the tool calls, respond, "Sorry, I don't know."`,
      messages: [
        ...contextMessages,
        ...convertToCoreMessages(messages),
      ],
    });

    // Collect the full response
    let fullResponse = '';
    for await (const chunk of result.stream) {
      fullResponse += chunk;
    }

    // Create a resource with the full response
    const resourceResult = await createResource({
      title: `AI Response ${new Date().toISOString()}`,
      content: fullResponse,
    });

    // Check if resource creation was successful
    if (typeof resourceResult === 'object' && resourceResult.error) {
      console.error('Failed to create resource:', resourceResult.error);
    }

    // Return the AI result as a response
    return new Response(fullResponse, { status: 200 });
  } catch (err) {
    console.error('An error occurred in POST handler:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
