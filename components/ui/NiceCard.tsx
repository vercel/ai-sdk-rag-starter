import React from 'react';

type ColorOption = 'pink' | 'blue' | 'green';

interface NiceCardProps {
  icon: React.ReactNode;
  language: string;
  title: string;
  color: ColorOption;
  onClick: () => void; // Add onClick prop
}

const colorClasses: Record<ColorOption, { background: string; text: string; header: string }> = {
  pink: {
    background: 'bg-pink-100',
    text: 'text-pink-900',
    header: 'bg-pink-500',
  },
  blue: {
    background: 'bg-blue-100',
    text: 'text-blue-900',
    header: 'bg-blue-500',
  },
  green: {
    background: 'bg-green-100',
    text: 'text-green-900',
    header: 'bg-green-500',
  },
  // Add more colors as needed
};

const NiceCard: React.FC<NiceCardProps> = ({
  icon,
  language,
  title,
  color = 'pink', // Default color
  onClick, // Accept onClick prop
}) => {
  const backgroundColor = colorClasses[color].background;
  const textColor = colorClasses[color].text;
  const headerColor = colorClasses[color].header;

  return (
    <div
      className={`${backgroundColor} rounded-3xl overflow-hidden w-60 h-72 cursor-pointer`}
      onClick={onClick} // Attach onClick event
    >
      <div
        className={`relative w-full h-32 ${headerColor} flex items-center justify-center`}
        style={{
          borderBottomLeftRadius: '50% 40%',
          borderBottomRightRadius: '50% 40%',
        }}
      >
        {icon}
      </div>
      <div className="p-4 text-center">
        <div className="inline-block px-2 py-1 mb-2 border border-gray-400 rounded-full text-gray-600 text-sm">
          {language}
        </div>
        <h3 className={`text-3xl font-medium ${textColor}`}>{title}</h3>
      </div>
    </div>
  );
};

export default NiceCard;
