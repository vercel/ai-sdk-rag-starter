import { BookOpen, Terminal, Code, Bug } from "lucide-react"
import { ActivityCard } from "./ActivityCard" // Adjust the import path as necessary

const activities = [
  {
    icon: <BookOpen className="h-6 w-6 text-amber-400" />, // Represents learning and understanding (e.g., Algorithms and Pseudocode)
    text: "Algorithms and Pseudocode",
  },
  {
    icon: <Terminal className="h-6 w-6 text-sky-400" />, // Represents programming (e.g., Introduction to C Programming Language)
    text: "Introduction to C Programming Language",
  },
  {
    icon: <Code className="h-6 w-6 text-rose-400" />, // Represents coding (e.g., Writing Your First C Program)
    text: "Writing Your First C Program",
  },
  {
    icon: <Bug className="h-6 w-6 text-violet-400" />, // Represents debugging (e.g., Problem Solving and Debugging Techniques)
    text: "Problem Solving and Debugging Techniques",
  },
]

type ActivityCardsProps = {
  handleSendMessage: (message: string) => void;
};

export default function ActivityCards({ handleSendMessage }: ActivityCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4">
      {activities.map((activity, index) => (
        <ActivityCard 
          key={index} 
          icon={activity.icon} 
          text={activity.text} 
          handleSendMessage={handleSendMessage}  // Pass handleSendMessage to each card
        />
      ))}
    </div>
  )
}
