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
  subject: string | null;
  userName: string;
};

export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  handleSendMessage,
  subject,
  userName,
}) => {
  const conversationStarted = messages.length > 0;
  const messagesEndRef = useRef<HTMLDivElement>(null);

// Use the passed subject prop instead of hardcoding it
const title = subject ? `Bienvenido a ${subject}` : `Bienvenido ${userName}`;
const description = subject
  ? "Aquí encontrarás varios temas y ejercicios sobre los cuales podrás hacer preguntas."
  : "Ninguna materia fue seleccionada para aprender en profundidad, pero puede hacer preguntas en general.";
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative flex flex-col h-full w-full mx-auto stretch">
      {conversationStarted && (
        <div className="sticky top-0 pt-8 z-10 flex justify-center bg-white/80 backdrop-blur-sm py-2 ">
          <div className="bg-white rounded-full px-6 py-3 shadow-lg">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-gray-900">{subject}</h2>
            </div>
          </div>
        </div>
      )}

      <div className="flex-grow overflow-y-auto pt-10">
        <div className="max-w-[48rem] mx-auto space-y-4 pb-40">
          {!conversationStarted && (
            <div className="text-center mt-4 sm:mt-16 md:mt-24 lg:mt-40">
              {/* <div className="flex justify-center mb-4">
                <MiraiIcon width={64} height={64} />
              </div> */}
              <h1 className="text-4xl font-normal mb-2">{title}</h1>
              <p className="text-lg text-gray-600">{description}</p>
            </div>
          )}

          {messages.map((message) => (
            !message.toolInvocations ? (
              <Message key={message.id} message={message} />
            ) : (
              null
            )
          ))}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Cards */}
      {subject && !conversationStarted && (
        <div className="flex justify-center w-full mt-8">
          <NiceCards onCardClick={handleSendMessage} />
        </div>
        // <div className="flex justify-center w-full my-8">
        //   <div className="max-w-4xl w-full pr-4 pl-4">
        //     <ActivityCards handleSendMessage={handleSendMessage} />
        //   </div>
        // </div>
      )}

      {/* Chat Form */}
      {/* <div className="flex-shrink-0 w-full max-w-5xl mx-auto mb-10 px-4">
        <ChatForm
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div> */}
    </div>
  );
};