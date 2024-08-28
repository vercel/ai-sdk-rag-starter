import React from 'react';
import { Message as MessageType } from 'ai';
import MarkdownRender from '../MarkdownRender';
import { MiraiIcon } from '@/components/brand/MiraiIcon';

type MessageProps = {
  message: MessageType;
};

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div
      className={`whitespace-pre-wrap flex ${
        message.role === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      {message.role === 'assistant' && (
        <div className="w-8 h-8 rounded-full bg-white border-2 flex-shrink-0 mr-3 flex items-center justify-center mt-3">
          <MiraiIcon width={18} height={18} />
        </div>
      )}
      <div
        className={`p-4 inline-block max-w-xl ${
          message.role === 'user'
            ? 'bg-gray-100 text-black rounded-3xl'
            : 'bg-white text-black rounded-xl pl-2'
        }`}
      >
        <MarkdownRender>{message.content}</MarkdownRender>
      </div>
    </div>
  );
};

export default Message;

