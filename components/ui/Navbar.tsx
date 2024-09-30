import React, { useState, useEffect,useRef } from 'react';
import Image from 'next/image';
import { MessageSquare, Send } from 'lucide-react';

interface IconButtonProps {
  onClick: () => void;
  ariaLabel: string;
  children: React.ReactNode;
  className: string;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, ariaLabel, children, className }) => (
  <button
    type="button"
    onClick={onClick}
    className={`h-14 w-14 text-black rounded-full border-4 flex items-center justify-center transition-all duration-300 ease-in-out p-0 overflow-hidden relative ${className} hover:bg-gray-100`}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

interface NavBarProps {
  onChangeView: (view: string) => void;
  handleSendMessage: (message: string) => void;
  currentView: string;
}

const NavBar: React.FC<NavBarProps> = ({
  onChangeView,
  handleSendMessage,
  currentView,
}) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isChatView = currentView === 'chat';

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to calculate the new scrollHeight correctly
      textarea.style.height = 'auto';
    }
  }, [input]);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        handleSendMessage(input);
        setInput('');
      }
    }
  };

  const handleMenuClick = () => {
    onChangeView('menu');
  };

  const handleProfileClick = () => {
    onChangeView('profile');
  };

  const handleMessageClick = () => {
    onChangeView('chat');
  };

  const handleNavbarSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      handleSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex items-center justify-center w-full px-4 gap-4">
      <IconButton
        onClick={handleMenuClick}
        ariaLabel="Menu"
        className={`border-gray-100 ${currentView === 'menu' ? 'bg-gray-100' : 'bg-white'}`}
      >
        <Image src="/menu-icon.svg" alt="Menu" width={36} height={36} />
      </IconButton>

      <div className={`relative transition-all duration-300 ease-in-out flex items-center ${isChatView ? 'w-1/2' : 'w-14'}`}>
        {isChatView ? (
          <form onSubmit={handleNavbarSubmit} className="flex-grow flex items-center">
            <div className="h-14 text-black rounded-full border-4 border-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out overflow-hidden relative w-full px-4">
              <textarea
                ref={textareaRef}
                className="flex-grow h-14 bg-transparent text-black text-lg font-normal placeholder-gray-400 focus:outline-none border-none pr-10 resize-none py-3 height-auto"
                value={input}
                placeholder="Preguntale a Mirai"
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                rows={1}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim()}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 bg-white text-black border-2 rounded-full border border-gray-300 flex items-center justify-center transition-all shadow-md ${!input.trim() ? 'opacity-50' : 'hover:bg-gray-100'}`}
            >
              <Send className="h-6 w-6 rotate fill-black mt-0.5 mr-0.5" />
            </button>
          </form>
        ) : (
          <IconButton
            onClick={handleMessageClick}
            ariaLabel="Message"
            className="border-gray-100 bg-white"
          >
            <MessageSquare className="h-6 w-6 text-gray-400 fill-gray-400" />
          </IconButton>
        )}
      </div>

      <IconButton
        onClick={handleProfileClick}
        ariaLabel="Profile"
        className={`border-gray-100 ${currentView === 'profile' ? 'bg-gray-100' : 'bg-white'}`}
      >
        <Image src="/profile.png" alt="Profile" layout="fill" objectFit="cover" />
      </IconButton>
    </div>
  );
};

export default NavBar;