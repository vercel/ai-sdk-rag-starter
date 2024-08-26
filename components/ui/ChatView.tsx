import React from 'react';
import { Message as MessageType } from 'ai';
import Message from '@/components/ui/Message';
import ChatForm from '@/components/ui/ChatForm';
import ActivityCards from '@/components/ui/ActivityCards';

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

  // Define your title and description here
  const title = "Welcome to Programming 1";
  const description = "Here you'll find various programming topics and exercises. Select a topic to get started.";

  return (
    <div className="flex flex-col h-full w-full mx-auto stretch">
      <div className="flex-grow overflow-y-auto">
        <div className="max-w-3xl mx-auto py-24 space-y-4">
          {/* Display title and description */}
          {!conversationStarted && (
            <div className="text-center mb-8 mt-20">
              <h1 className="text-4xl font-normal mb-2">{title}</h1>
              <p className="text-lg text-gray-600">{description}</p>
            </div>
          )}

          {/* Messages */}
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
      </div>

      {/* Cards */}
      {!conversationStarted && (
        // <div className="flex justify-center w-full my-8">
        //   <Cards onCardClick={handleSendMessage} />
        // </div>
        <div className="flex justify-center w-full my-8">
          <div className="max-w-4xl w-full pr-4 pl-4">
            <ActivityCards handleSendMessage={handleSendMessage} />
          </div>
        </div>
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
