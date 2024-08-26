'use client';

import { Message, useChat } from 'ai/react';
import { useEffect, useState } from 'react';
import { ChatView } from '@/components/ui/ChatView';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, append } = useChat({
    maxToolRoundtrips: 2,
  });

  // Function to handle sending a message
  const handleSendMessage = async (message: string) => {
    try {
      await append({ role: 'user', content: message });
      handleSubmit(); // Trigger the form submission to get the AI's response
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <main className="flex flex-row items-center justify-center w-lvw h-lvh bg-white">
      <ChatView
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleSendMessage={handleSendMessage}
      />
    </main>
  );
}
