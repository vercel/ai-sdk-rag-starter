// app/api/chat/route.ts
import OpenAI from 'openai';
import { Message } from 'ai';
import { createClient } from '@supabase/supabase-js';

// Create OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Function to search the knowledge base
async function searchKnowledgeBase(query: string) {
  try {
    const { data: embedding } = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: query,
    });

    const { data, error } = await supabase.rpc('match_documents', {
      query_embedding: embedding.data[0].embedding,
      match_threshold: 0.78,
      match_count: 10
    });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Error searching knowledge base:', err);
    return [];
  }
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    // Search knowledge base for context
    const documents = await searchKnowledgeBase(lastMessage);
    const context = documents.map(doc => doc.content).join('\n');

    // Create the messages array for OpenAI
    const completionMessages = [
      {
        role: 'system',
        content: `You are a helpful assistant that only answers based on the provided context. 
        If you cannot find the answer in the context, say "I don't have enough information to answer that."
        
        Context:
        ${context}`,
      },
      ...messages,
    ];

    // Create the completion with streaming
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: completionMessages,
      stream: true,
    });

    // Transform the response into a readable stream
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    // Return a standard Response object with the stream
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });

  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}