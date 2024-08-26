import React from 'react';
import { Message as MessageType } from 'ai';
import MarkdownRender from '../MarkdownRender';

type MessageProps = {
  message: MessageType;
};

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    (<div
      className={`whitespace-pre-wrap flex ${
        message.role === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`p-4 inline-block max-w-xl ${
          message.role === 'user'
            ? 'bg-gray-100 text-black rounded-3xl'
            : 'bg-white text-black rounded-xl'
        }`}
      >
        <MarkdownRender>{message.content}</MarkdownRender>
      </div>
    </div>)
  );
};

export default Message;
