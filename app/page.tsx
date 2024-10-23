// app/page.tsx
'use client';

import { useChat } from 'ai/react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '../components/ui/card';  // Using relative path

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto p-4 h-[calc(100vh-2rem)]">
      <Card className="flex-1 overflow-hidden">
        <CardContent className="h-full overflow-y-auto space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                'flex w-full',
                m.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'rounded-lg px-4 py-2 max-w-[80%]',
                  m.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100'
                )}
              >
                <p className="whitespace-pre-wrap">{m.content}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <input
          className="flex-1 p-2 border rounded-md"
          value={input}
          placeholder="Ask a question..."
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}