import { Card, CardContent } from "@/components/ui/card"

interface ActivityCardProps {
  icon: React.ReactNode;
  text: string;
  handleSendMessage: (message: string) => void;
}

export function ActivityCard({ icon, text, handleSendMessage }: ActivityCardProps) {
  return (
    <Card 
      className="bg-white cursor-pointer" 
      onClick={() => handleSendMessage(text)}  // Call handleSendMessage on click
    >
      <CardContent className="flex flex-col items-start space-y-2 p-4">
        {icon}
        <p className="text-sm font-medium text-gray-600">{text}</p>
      </CardContent>
    </Card>
  )
}
