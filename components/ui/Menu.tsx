import React from 'react';
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Brain, Briefcase, Lightbulb } from 'lucide-react';
import { MiraiLogo } from "@/components/brand/MiraiLogo";

export default function Menu({ onSelectSubject }: { onSelectSubject: (subject: string) => void }) {
  const classes = [
    { icon: <Users className="w-8 h-8" />, name: "Equipos, Personas y Liderazgo" },
    { icon: <Brain className="w-8 h-8" />, name: "IA y Neurociencia", id: "ia-neurociencia" },
    { icon: <Briefcase className="w-8 h-8" />, name: "Fintech & PE" },
    { icon: <Lightbulb className="w-8 h-8" />, name: "Desarrollo de nuevos negocios" },
  ];

  const handleCardClick = (item: { id?: string; name: string }) => {
    if (item.id === "ia-neurociencia") {
      onSelectSubject(item.name);
    }
  };


  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="flex justify-center items-center py-4">
          <MiraiLogo width={100}/>
          {/* <Avatar className="w-10 h-10">
            <AvatarImage src="/profile.png?height=40&width=40" alt="Profile" />
          </Avatar> */}
        </div>
      </div>
      
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-4xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {classes.map((item, index) => (
        <div key={index} className="flex flex-col items-center" onClick={() => handleCardClick(item)}>
          <Card className={`bg-white rounded-[2rem] shadow-lg overflow-hidden w-full aspect-square mb-4 ${item.id === "ia-neurociencia" ? "cursor-pointer" : ""}`}>
            <CardContent className="p-6 flex items-center justify-center h-full">
              {item.icon}
            </CardContent>
          </Card>
          <span className="text-sm font-semibold text-center">{item.name}</span>
        </div>
      ))}
    </div>
        </div>
      </div>
    </div>
  );
}