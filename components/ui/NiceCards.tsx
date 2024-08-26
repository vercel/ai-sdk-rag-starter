import React from 'react';
import NiceCard from '@/components/ui/NiceCard';
import { Puzzle, Code, GitMerge } from 'lucide-react';

type CardsProps = {
  onCardClick: (message: string) => void;
};

const Cards: React.FC<CardsProps> = ({ onCardClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <NiceCard
        icon={<Puzzle className="text-white w-16 h-16" />}
        language="Week 1"
        title="Scratch Programming"
        color="blue"
        onClick={() => onCardClick('Explain to me about Week 1: Scratch Programming.')}
      />
      <NiceCard
        icon={<Code className="text-white w-16 h-16" />}
        language="Week 2"
        title="Basics of C Programming"
        color="green"
        onClick={() => onCardClick('Explain to me about Week 2: Basics of C Programming.')}
      />
      <NiceCard
        icon={<GitMerge className="text-white w-16 h-16" />}
        language="Week 3"
        title="Fundamentals of Algorithms"
        color="pink"
        onClick={() => onCardClick('Explain to me about Week 3: Fundamentals of Algorithms.')}
      />
    </div>
  );
};

export default Cards;
