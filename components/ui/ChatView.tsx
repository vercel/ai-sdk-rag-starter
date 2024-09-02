import React, { useEffect, useRef } from 'react';
import { Message as MessageType } from 'ai';
import Message from '@/components/ui/Message';
import ChatForm from '@/components/ui/ChatForm';
import NiceCards from '@/components/ui/NiceCards';
import ActivityCards from '@/components/ui/ActivityCards';
import { MiraiIcon } from '@/components/brand/MiraiIcon';

type HandleSubmitType = (e: React.FormEvent<HTMLFormElement>) => void;
type HandleInputChangeType = (
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
) => void;

type ChatViewProps = {
  messages: MessageType[];
  input: string;
  handleInputChange: HandleInputChangeType;
  handleSubmit: HandleSubmitType;
  handleSendMessage: (message: string) => void;
};

export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  handleSendMessage,
}) => {
  const conversationStarted = messages.length > 0;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Define your title and description here
  const subject = "Inteligencia Artificial y Neurociencias";
  const title = "Bienvenido a IA y Neurociencias";
  const description = "Aquí encontrarás varios temas y ejercicios sobre los cuales podrás hacer preguntas.";

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative flex flex-col h-full w-full mx-auto stretch">
      {/* Label with border at the top */}
      {conversationStarted && (
       <div className="flex justify-center mt-10">
       <div className="bg-white rounded-full px-6 py-3 shadow-lg mb-4">
         <div className="flex items-center space-x-2">
           <h2 className="text-lg font-semibold text-gray-900">{subject}</h2>
         </div>
       </div>
     </div>
      )}

      <div className="flex-grow overflow-y-auto pt-10">
        <div className="max-w-[48rem] mx-auto py-10 space-y-4">
        {/* Display title and description */}
          {!conversationStarted && (
            <div className="text-center mt-20">
              {/* <div className="flex justify-center mb-4">
                <MiraiIcon width={64} height={64} />
              </div> */}
              <h1 className="text-4xl font-normal mb-2">{title}</h1>
              <p className="text-lg text-gray-600">{description}</p>
            </div>
          )}

          {/* Messages */}
          {messages.map((message) => (
            !message.toolInvocations ? (
              <Message key={message.id} message={message} />
            ) : (
              null
            )
          ))}
          
          <div ref={messagesEndRef} /> {/* This empty div is used as a scroll target */}
        </div>
      </div>

      {/* Cards */}
      {!conversationStarted && (
        <div className="flex justify-center w-full my-8">
          <NiceCards onCardClick={handleSendMessage} />
        </div>
        // <div className="flex justify-center w-full my-8">
        //   <div className="max-w-4xl w-full pr-4 pl-4">
        //     <ActivityCards handleSendMessage={handleSendMessage} />
        //   </div>
        // </div>
      )}

      {/* Chat Form */}
      <div className="flex-shrink-0 w-full max-w-5xl mx-auto mb-10 px-4">
        <ChatForm
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};