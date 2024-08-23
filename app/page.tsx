'use client';

import { Message, useChat } from 'ai/react';
import { useEffect, useState } from 'react';

import { MiraiLogo } from '@/components/brand/MiraiLogo';
import { ChatView } from '@/components/ui/ChatView';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxToolRoundtrips: 2,
  });
  return (
    <>
    <main className="flex flex-row items-center justify-center w-lvw h-lvh bg-zinc-100">

      {/* MessageHistory SideBar */}
        {/* Sidebar */}
      <div className="flex flex-col w-1/4 h-lvh bg-zinc-200 shadow-lg border p-4">
        <div className="flex items-center justify-center h-16 p-4 border-b border-gray-300">
          <MiraiLogo width={261/2} height={54/2} fill="black" />
        </div>
      </div>

      <ChatView
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </main>
    </>
  );
}
