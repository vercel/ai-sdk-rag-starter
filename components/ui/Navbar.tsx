import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageSquare, Send } from 'lucide-react';

const NavBar: React.FC = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const toggleInputVisibility = () => {
    setIsInputVisible(true); // Always show the input field after clicking the message button
  };

  const handleProfileClick = () => {
    setIsInputVisible(false); // Hide input field and show message button when profile button is clicked
  };

  const handleMenuClick = () => {
    setIsInputVisible(false); // Hide input field and show message button when menu button is clicked
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      console.log("Message sent:", input);
      setInput(''); // Clear the input field after sending a message
    }
  };

  return (
    <div className="flex items-center justify-center w-full px-4 gap-4">
      <IconButton onClick={handleMenuClick} ariaLabel="Menu" className="border-gray-100 hover:bg-gray-100">
        <Image src="/menu-icon.svg" alt="Menu" width={36} height={36} />
      </IconButton>

      <div
        className={`relative transition-all duration-300 ease-in-out flex items-center ${
          isInputVisible ? 'w-1/2' : 'w-14'
        }`}
      >
        <form onSubmit={handleSubmit} className="flex-grow flex items-center">
          <div
            className={`h-14 bg-white text-black rounded-full border-4 border-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out overflow-hidden relative ${
              isInputVisible ? 'w-full px-4' : 'w-14'
            }`}
          >
            {isInputVisible ? (
              <input
                className="flex-grow h-14 bg-transparent text-black text-lg font-normal placeholder-gray-400 focus:outline-none border-none pr-10"
                value={input}
                placeholder="Ask Mirai"
                onChange={handleInputChange}
                style={{ border: 'none' }} // Keep the original border style for input
              />
            ) : (
              <button
                type="button"
                onClick={toggleInputVisibility}
                className="flex items-center justify-center w-full h-full"
              >
                <MessageSquare className="h-6 w-6 text-gray-400 fill-gray-400" />
              </button>
            )}
          </div>
          {isInputVisible && (
            <button
              type="submit"
              disabled={!input.trim()}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 bg-white text-black rounded-full border border-gray-300 flex items-center justify-center transition-all ${
                !input.trim() ? 'opacity-50' : 'hover:bg-gray-100'
              }`}
            >
              <Send className="h-6 w-6 rotate fill-black mt-0.5 mr-0.5" />
            </button>
          )}
        </form>
      </div>

      <Link href="/profile" passHref>
          <IconButton ariaLabel="Profile" className="border-gray-100 hover:bg-gray-100" onClick={handleProfileClick}>
            <Image src="/profile.png" alt="Profile" layout="fill" objectFit="cover" />
          </IconButton>
      </Link>
    </div>
  );
};

// Reusable IconButton Component
const IconButton: React.FC<{
  onClick?: () => void;
  ariaLabel: string;
  children: React.ReactNode;
  className?: string;
}> = ({ onClick, ariaLabel, children, className }) => (
  <button
    type="button"
    onClick={onClick}
    className={`h-14 w-14 bg-white text-black rounded-full border-4 flex items-center justify-center transition-all duration-300 ease-in-out p-0 overflow-hidden relative ${className} hover:bg-gray-100`}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

export default NavBar;
