'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxToolRoundtrips: 2,
  });

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen" style={{ backgroundColor: '#1E1E1E' }}>
      {/* Chat container */}
      <div className="flex flex-col w-full max-w-3xl h-full">
        {/* Messages display */}
        <div className="flex-1 p-6 overflow-y-auto text-white">
          <div className="space-y-4">
            {messages.map(m => (
              <div
                key={m.id}
                className={`whitespace-pre-wrap flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-lg shadow-lg ${
                    m.role === 'user' ? 'bg-gray-800 text-white' : 'bg-green-500 text-white'
                  }`}
                  style={{
                    maxWidth: '80%',
                    minWidth: '150px',
                    minHeight: '50px',
                    borderRadius: '15px',
                  }}
                >
                  <div className={`font-bold ${m.role === 'user' ? 'text-green-400' : 'text-white'}`}>
                    {m.role === 'user' ? 'You' : 'Sasha'}
                  </div>
                  <p className="mt-1">
                    {m.content.length > 0 ? (
                      m.content
                    ) : (
                      <span className="italic font-light">
                        {'calling tool: ' + m?.toolInvocations?.[0]?.toolName}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="p-4">
          <input
            className="w-full p-3 bg-gray-800 text-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-offset-2 transition-all duration-300 ease-in-out"
            value={input}
            placeholder="Type your message here..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}
