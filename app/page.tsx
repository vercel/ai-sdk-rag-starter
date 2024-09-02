'use client';

import { Message, useChat } from 'ai/react';
import { useEffect, useState } from 'react';
import { ChatView } from '@/components/ui/ChatView';
import { SessionProvider, useSession } from "next-auth/react"
import SessionWrapper from './components/SessionWrapper';
import Landing from './landing/page';
import { LoadingView } from './LoadingView';

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
      <main className="relative w-full h-full">

      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-[url('/no_clouds.png')] object-cover">        {
          session.status == "authenticated" && (
            <div className="flex flex-row items-center justify-center w-lvw h-lvh bg-white">
              <ChatView
                messages={messages}
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                handleSendMessage={handleSendMessage}
              />
            </div>
          )
        }
        {
          session.status == "unauthenticated" && (
            <Landing />
          )
        }
        </div>
      </main>
    </SessionWrapper>
  );
}
