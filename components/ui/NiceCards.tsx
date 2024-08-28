import React from 'react';
import NiceCard from '@/components/ui/NiceCard';
import { Puzzle, Code, GitMerge } from 'lucide-react';

// Define the ColorOption type to match the expected colors
type ColorOption = 'blue' | 'green' | 'pink'; // Adjust this based on the actual available options in NiceCard

type CardsProps = {
  onCardClick: (message: string) => void;
};

// Modular data structure for the cards
const cardData: {
  icon: React.ReactNode;
  language: string;
  title: string;
  color: ColorOption;
}[] = [
  {
    icon: <Puzzle className="text-white w-16 h-16" />,
    language: "Semana 1",
    title: "Algoritmo Value Iteration",
    color: 'blue',
  },
  {
    icon: <Code className="text-white w-16 h-16" />,
    language: "Semana 2",
    title: "Bandidos de k brazos",
    color: 'green',
  },
  {
    icon: <GitMerge className="text-white w-16 h-16" />,
    language: "Semana 3",
    title: "Decisión de Markov",
    color: 'pink',
  },
];

const Cards: React.FC<CardsProps> = ({ onCardClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cardData.map((card, index) => (
        <NiceCard
          key={index}
          icon={card.icon}
          language={card.language}
          title={card.title}
          color={card.color}
          onClick={() => onCardClick(`Que vimos en la ${card.language}: ${card.title}`)}
        />
      ))}
    </div>
  );
};

export default Cards;
