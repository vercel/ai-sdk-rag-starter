'use client';

import { Message, useChat } from 'ai/react';
import { useEffect, useState } from 'react';
import { ChatView } from '@/components/ui/ChatView';
import { SessionProvider, useSession } from "next-auth/react"
import SessionWrapper from './components/SessionWrapper';
import Landing from './landing/page';

interface PageProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}

export default function Page() {


  const { messages, input, handleInputChange, handleSubmit, append } = useChat({
    maxToolRoundtrips: 2,
  });

  const session = useSession();

  // Function to handle sending a message
  const handleSendMessage = async (message: string) => {
    try {
      await append({ role: 'user', content: message });
      handleSubmit(); // Trigger the form submission to get the AI's response
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <SessionWrapper>
      {
        session.status == "loading" && (
          <main className="flex flex-row items-center justify-center w-lvw h-lvh bg-white">
            <p>Loading...</p>
          </main>
        )
      }

      {
        session.status == "authenticated" && (
          <main className="flex flex-row items-center justify-center w-lvw h-lvh bg-white">
            <ChatView
              messages={messages}
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              handleSendMessage={handleSendMessage}
            />
          </main>
        )
      }
      {
        session.status == "unauthenticated" && (
          <Landing />
        )
      }
    </SessionWrapper>
  );
}
