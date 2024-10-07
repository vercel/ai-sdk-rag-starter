'use client'

import * as React from "react"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Lightbulb, Cpu, Brain, Bot, MessageCircle, Scale } from 'lucide-react';
import Analytics from "@/components/ui/Analytics"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { AvatarImage } from "@radix-ui/react-avatar"

const subjects = [
  { name: "Desarrollo en nuevos negocios", icon: Lightbulb },
  { name: "Tecnología Digital 6", icon: Cpu },
  { name: "IA y neurociencias", icon: Brain },
  { name: "Aprendizaje Automático y Minería de Datos", icon: Bot },
  { name: "Procesamiento del Lenguaje Natural", icon: MessageCircle },
  { name: "Ética y Responsabilidad en la Inteligencia Artificial", icon: Scale },
];

export default function EduDashboard() {
  const [selectedSubject, setSelectedSubject] = useState(null)

  return (
    <div className="min-h-screen bg-white pt-20 p-8">
      <div className="max-w-4xl mx-auto">
        {selectedSubject ? (
          <Analytics 
            subject={selectedSubject} 
            onBack={() => setSelectedSubject(null)} 
          />
        ) : (
          <>
            <div className="flex flex-col items-center">
              <Avatar className="w-20 h-20 border-2 rounded-full">
                <AvatarImage src="/profile.png"/>
                {/* <AvatarFallback>{name[0]}</AvatarFallback> */}
                <AvatarFallback>Chona</AvatarFallback>
              </Avatar>
              <h2 className="mt-2 text-xl font-bold">Chona</h2>
            </div>
            
            <h4 className="text-xl font-semibold pt-10 mb-4">Tus materias</h4>
            <Card className="bg-gray-100 p-6 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjects.map((subject, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto py-4 px-6 text-left shadow-lg hover:shadow-xl transition-shadow flex items-center justify-start w-full"
                    onClick={() => setSelectedSubject(subject)}
                  >
                    <subject.icon className="w-6 h-6 mr-4 flex-shrink-0" />
                    <span className="text-sm">{subject.name}</span>
                  </Button>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}