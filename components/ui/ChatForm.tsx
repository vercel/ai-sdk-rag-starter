import React from 'react';
import { Send, Home, User } from 'lucide-react';
import Image from 'next/image';

type HandleSubmitType = (e: React.FormEvent<HTMLFormElement>) => void;
type HandleInputChangeType = (
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
) => void;

type FormProps = {
  input: string;
  handleInputChange: HandleInputChangeType;
  handleSubmit: HandleSubmitType;
};

const ChatForm: React.FC<FormProps> = ({ input, handleInputChange, handleSubmit }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center w-full px-4 gap-4"
    >
      <button
        type="button"
        className="h-14 w-14 bg-white text-black rounded-full border border-gray-100 border-4 flex items-center justify-center transition-all hover:bg-gray-100 flex-shrink-0"
      >
        <Image src="/menu-icon.svg" alt="Menu" width={36} height={36} />
      </button>
      <div className="relative flex-grow">
        <input
          className="w-full h-14 px-4 border rounded-full pr-20 bg-gray-100 text-black text-lg font-normal placeholder-gray-400 focus:outline-none"
          value={input}
          placeholder="Ask Mirai"
          onChange={handleInputChange}
        />
        <button
          type="submit"
          disabled={!input.trim()} // Disable if input is empty or only whitespace
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 bg-white text-black rounded-full border border-gray-300 flex items-center justify-center transition-all ${
            !input.trim() ? 'opacity-50' : 'hover:bg-gray-100'
          }`}
        >
          <Send className="h-6 w-6 rotate fill-black mt-0.5 mr-0.5" />
        </button>
      </div>
      <button
        type="button"
        className="h-14 w-14 bg-white text-black rounded-full border-4 border-gray-100 flex items-center justify-center transition-all hover:bg-gray-100 flex-shrink-0 p-0 overflow-hidden relative"
      >
        <Image src="/profile.png" alt="Profile" layout="fill" objectFit="cover" />
      </button>
    </form>
  );
};

export default ChatForm;
