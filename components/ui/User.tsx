import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StarIcon, ZapIcon, TrophyIcon, ShieldIcon, HelpCircleIcon } from "lucide-react"

interface UserProps {
  name: string;
  image: string;
  stats: {
    questionsAsked: number;
    modelExams: number;
    doubtsResolved: number;
  };
}
const User = ({ name, image, stats }: UserProps) => {
  return (
    <div className="h-screen flex items-center justify-center p-4 pb-20 overflow-hidden">
      <div className="w-full max-w-xl space-y-4">
        <div className="flex flex-col items-center">
          <Avatar className="w-20 h-20 border-2">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <h2 className="mt-2 text-xl font-bold">{name}</h2>
        </div>

      <div className="bg-gray-100 p-6 rounded-2xl">
        <div className="bg-white p-4 rounded-xl mb-6">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1 mx-5">
              <p className="text-3xl font-bold">{stats.questionsAsked}</p>
              <p className="text-sm text-muted-foreground">Preguntas hechas</p>
            </div>
            <div className="h-12 w-px bg-gray-200"></div>
            <div className="text-center flex-1 mx-5">
              <p className="text-3xl font-bold">{stats.modelExams}</p>
              <p className="text-sm text-muted-foreground">Exámenes modelo</p>
            </div>
            <div className="h-12 w-px bg-gray-200"></div>
            <div className="text-center flex-1 mx-5">
              <p className="text-3xl font-bold">{stats.doubtsResolved}</p>
              <p className="text-sm text-muted-foreground">Dudas resueltas</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Logros</h3>
          <div className="flex justify-between">
            <div className="w-12 h-12 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center">
              <StarIcon className="w-6 h-6 text-gray-500" />
            </div>
            <div className="w-12 h-12 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center">
              <ZapIcon className="w-6 h-6 text-gray-500" />
            </div>
            <div className="w-12 h-12 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center">
              <TrophyIcon className="w-6 h-6 text-gray-500" />
            </div>
            <div className="w-12 h-12 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center">
              <ShieldIcon className="w-6 h-6 text-gray-500" />
            </div>
            <div className="w-12 h-12 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center">
              <HelpCircleIcon className="w-6 h-6 text-gray-500" />
            </div>
            <div className="w-12 h-12 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center">
              <HelpCircleIcon className="w-6 h-6 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      <Card className="border border-gray-200 rounded-2xl">
        <CardHeader>
          <CardTitle>Amigos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
              <Avatar className="w-12 h-12 mb-1">
                <AvatarImage src="/placeholder.svg?height=48&width=48&color=6366f1" alt="Nicolás" />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
              <span className="text-xs">Nicolás</span>
            </div>
            <div className="flex flex-col items-center">
              <Avatar className="w-12 h-12 mb-1">
                <AvatarImage src="/placeholder.svg?height=48&width=48&color=f97316" alt="Luisa" />
                <AvatarFallback>L</AvatarFallback>
              </Avatar>
              <span className="text-xs">Luisa</span>
            </div>
            <div className="flex flex-col items-center">
              <Avatar className="w-12 h-12 mb-1">
                <AvatarImage src="/placeholder.svg?height=48&width=48&color=ef4444" alt="Natalia" />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
              <span className="text-xs">Natalia</span>
            </div>
            <div className="flex flex-col items-center">
              <Avatar className="w-12 h-12 mb-1">
                <AvatarImage src="/placeholder.svg?height=48&width=48&color=22c55e" alt="Tomás" />
                <AvatarFallback>T</AvatarFallback>
              </Avatar>
              <span className="text-xs">Tomás</span>
            </div>
            <div className="flex flex-col items-center">
              <Avatar className="w-12 h-12 mb-1 border-2 border-dashed border-gray-300 flex items-center justify-center">
                <span className="text-2xl text-gray-300">+</span>
              </Avatar>
              <span className="text-xs">Invitar</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
  )
}

export default User