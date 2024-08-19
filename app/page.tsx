'use client';

import MarkdownRender from '@/components/MarkdownRender';
import { Message, useChat } from 'ai/react';
import { useEffect, useState } from 'react';


type HandleSubmitType = (e: React.FormEvent<HTMLFormElement>) => void;
type HandleInputChangeType = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;

type ChatViewProps = {
  messages: Message[];
  input: string;
  handleInputChange: HandleInputChangeType;
  handleSubmit: HandleSubmitType;
}

const ChatView = ({ messages, input, handleInputChange, handleSubmit }: ChatViewProps) => {
  return (
    <div className="flex flex-col h-full w-3/4 max-w-xl mx-auto stretch">
      <div className="flex-grow-8 space-y-4 py-24 h-full">
        {messages.map(m => (
          <div key={m.id} className="whitespace-pre-wrap">
            <div>
              <div className="font-bold">{m.role}</div>
              <>
                {m.content.length > 0 ? (
                  <MarkdownRender>{m.content}</MarkdownRender>
                ) : (
                  <span className="italic font-light">
                    {'calling tool: ' + m?.toolInvocations?.[0].toolName}
                  </span>
                )}
              </>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-grow-1">
        <form onSubmit={handleSubmit}>
          <input
            className="w-full max-w-xl h-16 p-4 mb-8 border border-gray-300 rounded-full shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange} />
        </form>
      </div>
    </div>
  );
}

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxToolRoundtrips: 2,
  });

  const [messagesWithOverhead, setMessagesWithOverhead] = useState<Message[]>();

  type MessageWithOverhead = {
    messages: Message[];
    timestamp: number;
    title: string;
  }
  

  useEffect(() => {
    // Load messages from local storage
    const storedMessages = localStorage.getItem('messages');
    const storedMessagesArray = storedMessages ? JSON.parse(storedMessages) : [];
    
    if (!storedMessagesArray) return;
    setMessagesWithOverhead(storedMessagesArray);

    console.log('storedMessagesArray', storedMessagesArray);
  }, []);

  useEffect(() => {
    setMessagesWithOverhead(messages.map(m => ({
      ...m,
      content: m.content + ' overhead',
    })));
  }, [messages]);

  // Save current messages to local storage
  useEffect(() => {

    // Read array of messages from local storage
    const storedMessages = localStorage.getItem('messages');
    const storedMessagesArray = storedMessages ? JSON.parse(storedMessages) : [];

    if (messages.length === 0) return;

    const newMessages = {
      messages,
      title: 'Chat',
    };

    if (!storedMessagesArray) {
      localStorage.setItem('messages', JSON.stringify([newMessages]));
      return;
    }

    // Append new messages to the array
    // Save the array back to local storage
    localStorage.setItem('messages', JSON.stringify([...storedMessagesArray, newMessages]));

  }, [messages]);

  useEffect(() => {
    console.log('messagesWithOverhead', messagesWithOverhead);
  }, [messagesWithOverhead]);
    
  return (
    <>
    <main className="flex flex-row items-center justify-center w-lvw h-lvh bg-zinc-100">

      {/* MessageHistory SideBar */}
        {/* Sidebar */}
      <div className="flex flex-col w-1/4 h-lvh bg-zinc-200 shadow-lg border p-4">
        {
          messagesWithOverhead?.map((m: any, i) => (
            <div key={i} className="flex flex-col items-center justify-center h-16 p-4 border-b border-gray-300">
              <div>{m.title}</div>
              <div>{new Date(m.createdAt).toLocaleTimeString()}</div>
            </div>
          ))
        }      
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
