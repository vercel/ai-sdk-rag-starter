'use client';
import React, { useState } from 'react';
import { useSession,signOut } from "next-auth/react";
import NavBar from '@/components/ui/Navbar';
import { ChatView } from '@/components/ui/ChatView';
import Menu from '@/components/ui/Menu';
import User from '@/components/ui/User';
import SessionWrapper from './components/SessionWrapper';
import Landing from './landing/page';
import { LoadingView } from './LoadingView';
import { useChat } from 'ai/react';

export default function Page() {
  const [currentView, setCurrentView] = useState<string>('learning');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const { messages, input, handleInputChange, handleSubmit, append } = useChat({ maxToolRoundtrips: 2 });
  const session = useSession();

  const handleSendMessage = async (message: string) => {
    try {
      // Only append the message, don't call handleSubmit here
      await append({ role: 'user', content: message });
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleNavbarSubmit = async (message: string) => {
    if (message.trim()) {
      await handleSendMessage(message);
      // Call handleSubmit after appending the message
      await handleSubmit(new Event('submit') as any);
    }
  };

  const handleSelectSubject = (subject: string) => {
    setSelectedSubject(subject);
    setCurrentView('chat');
  };

  const getView = () => {
    switch (currentView) {
      case 'profile':
        return (
          <div className="relative">
            <button
              className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded-lg text-sm"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
            <User
              name={session.data?.user?.name || "Anonymous"}
              image={session.data?.user?.image || "/default-avatar.png"}
              stats={{ questionsAsked: 10, modelExams: 5, doubtsResolved: 7 }}
            />
          </div>
        );
      case 'chat':
        return (
          <ChatView
            messages={messages}
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleSendMessage={handleSendMessage}
            subject={selectedSubject}
            userName={session.data?.user?.name || "Usuario"} // Pass user name
          />
        );
      case 'menu':
      default:
        return <Menu onSelectSubject={handleSelectSubject} />;
    }
  };

  return (
    <SessionWrapper>
      <main className="relative w-full h-screen">
        {session.status === "loading" && (
          <div className="absolute top-0 left-0 w-full h-full bg-cover bg-[url('/no_clouds.png')] object-cover"></div>
        )}
        {session.status === "authenticated" && (
          <>
          <div className="relative z-0 min-h-screen"> {/* Ensures the content container has a relative position and is behind the navbar */}
            {getView()}
          </div>
          <div className="fixed bottom-0 pb-5 left-0 right-0 bg-white z-10"> {/* Fixes the navbar at the bottom with a white background */}
            <NavBar
                onChangeView={setCurrentView}
                handleSendMessage={handleNavbarSubmit}
                currentView={currentView} // Add this line
              />
          </div>
        </>
        )}
        {session.status === "unauthenticated" && <Landing />}
      </main>
    </SessionWrapper>
  );  
}
