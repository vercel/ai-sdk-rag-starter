import { Card, CardContent } from "@/components/ui/card"

interface ActivityCardProps {
  icon: React.ReactNode;
  text: string;
  week: number;
  handleSendMessage: (message: string) => void;
}

export function ActivityCard({ icon, text, week, handleSendMessage }: ActivityCardProps) {
  return (
    <Card 
      className="bg-white cursor-pointer relative"  // Added relative for positioning
      onClick={() => handleSendMessage(`Could you explain the concept we saw on the week ${week} of class: ${text}`)}  
    >
      <CardContent className="flex flex-col items-start space-y-2 p-4">
        <div className="flex justify-between w-full mb-2">
          <div>{icon}</div>
          <div className="text-xs font-bold text-gray-700 border border-gray-300 rounded-full px-2 py-1">
            week {week}
          </div>
        </div>
        <p className="text-sm font-medium text-gray-600">{text}</p>
      </CardContent>
    </Card>
  )
}
