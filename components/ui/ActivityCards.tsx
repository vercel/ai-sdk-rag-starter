import { BookOpen, Terminal, Code, Bug } from "lucide-react"
import { ActivityCard } from "./ActivityCard" // Adjust the import path as necessary

const activities = [
  {
    icon: <BookOpen className="h-6 w-6 text-amber-400" />, // Represents learning and understanding (e.g., Algorithms and Pseudocode)
    text: "Algoritmo Value Iteration",
    week: 1,
  },
  {
    icon: <Terminal className="h-6 w-6 text-sky-400" />, // Represents programming (e.g., Introduction to C Programming Language)
    text: "Bandidos de k brazos",
    week: 2,
  },
  {
    icon: <Code className="h-6 w-6 text-rose-400" />, // Represents coding (e.g., Writing Your First C Program)
    text: "Writing Your First C Program",
    week: 3,
  },
  {
    icon: <Bug className="h-6 w-6 text-violet-400" />, // Represents debugging (e.g., Problem Solving and Debugging Techniques)
    text: "Problem Solving and Debugging Techniques",
    week: 4,
  },
]

type ActivityCardsProps = {
  handleSendMessage: (message: string) => void;
};

export default function ActivityCards({ handleSendMessage }: ActivityCardsProps) {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-medium text-gray-500">Quick bites</h2>
        <a href="#" className="text-sm text-gray-500 hover:underline flex items-center">
          See more 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {activities.map((activity, index) => (
          <ActivityCard 
            key={index} 
            icon={activity.icon} 
            text={activity.text} 
            week={activity.week}
            handleSendMessage={handleSendMessage}  // Pass handleSendMessage to each card
          />
        ))}
      </div>
    </div>
  )
}
