'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, BookOpen, Users, MessageCircle, Clock, TrendingUp, BarChart as AnalyticsIcon } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Pie, PieChart, ResponsiveContainer, Label } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import FileUploadComponent from '@/components/ui/FileUpload'

// Define the ExtendedViewBox interface to include 'cx' and 'cy'
interface ExtendedViewBox {
  cx: number
  cy: number
  x: number
  y: number
  width: number
  height: number
}

// Function to generate colors based on index
const generateColor = (index: number) => `hsl(var(--chart-${(index % 5) + 1}))`

// Data for "Preguntas por Tema"
const datosTemas = [
  { tema: "Bandidos de K brazos", preguntas: 45 },
  { tema: "Decisiones de Markov", preguntas: 30 },
  { tema: "Value iteration", preguntas: 25 },
  { tema: "Monte Carlo", preguntas: 20 },
  { tema: "Q learning", preguntas: 35 },
].map((tema, index) => ({ ...tema, fill: generateColor(index) }))

// Data for "Frecuencia de Preguntas"
const datosFrecuencia = [
  { dia: "Lunes", preguntas: 50 },
  { dia: "Martes", preguntas: 65 },
  { dia: "Miércoles", preguntas: 45 },
  { dia: "Jueves", preguntas: 70 },
  { dia: "Viernes", preguntas: 80 },
  { dia: "Sábado", preguntas: 30 },
  { dia: "Domingo", preguntas: 20 },
]

// Chart configuration
const chartConfig: ChartConfig = {
  preguntas: {
    label: "Preguntas",
  },
  ...datosFrecuencia.reduce((acc: Record<string, { label: string }>, curr) => {
    acc[curr.dia] = {
      label: curr.dia,
    }
    return acc
  }, {}),
  ...datosTemas.reduce((acc, curr, index) => {
    acc[curr.tema] = {
      label: curr.tema,
      color: generateColor(index),
    }
    return acc
  }, {} as ChartConfig),
}

interface SubjectDetailProps {
  subject: { name: string; icon: React.ElementType }
  onBack: () => void
}

export default function Analytics({ subject, onBack }: SubjectDetailProps) {
  const [rangoTiempo, setRangoTiempo] = useState("semana")
  const [showFileUpload, setShowFileUpload] = useState(false)

  const totalPreguntas = datosTemas.reduce((acc, curr) => acc + curr.preguntas, 0)

  return (
    <div className="max-w-[100rem] mx-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <Button variant="outline" onClick={onBack} className="mr-4">
            <ArrowLeft className="mr-4 h-4 w-4" /> Volver
          </Button>
          <h1 className="text-3xl font-bold">{subject.name}</h1>
          <Button 
            variant="outline" 
            onClick={() => setShowFileUpload(!showFileUpload)}
            className={showFileUpload ? "bg-black text-white hover:bg-zinc-800 hover:text-white" : ""}          >
            {showFileUpload ? <AnalyticsIcon className="mr-2 h-4 w-4" /> : <BookOpen className="mr-2 h-4 w-4" />}
            {showFileUpload ? "Analíticas" : "Contenidos"}
          </Button>
        </div>

        {showFileUpload ? (
          <div className="pt-20">
            <FileUploadComponent />
          </div>
        ) : (
          <Card className="bg-gray-100 p-8 rounded-2xl">
            {/* Summary Section */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Resumen</h2>
              <Select value={rangoTiempo} onValueChange={setRangoTiempo}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccionar rango de tiempo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semana">Última Semana</SelectItem>
                  <SelectItem value="mes">Último Mes</SelectItem>
                  <SelectItem value="año">Último Año</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Total de Preguntas */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Total de Preguntas</p>
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold mt-2">{totalPreguntas}</div>
                  <p className="text-xs text-muted-foreground">+20.1% desde la semana pasada</p>
                </CardContent>
              </Card>

              {/* Tiempo Promedio de Interacción */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Tiempo promedio de interacción</p>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold mt-2">45 min</div>
                  <p className="text-xs text-muted-foreground">+5 min desde la semana pasada</p>
                </CardContent>
              </Card>

              {/* Estudiantes Activos */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Estudiantes Activos</p>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold mt-2">573</div>
                  <p className="text-xs text-muted-foreground">+49 desde la semana pasada</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Frecuencia de Preguntas */}
              <Card className="flex flex-col">
                <CardContent className="flex-1 pt-6">
                  <h3 className="text-lg font-semibold mb-2">Frecuencia de Preguntas</h3>
                  <ChartContainer config={chartConfig} className="w-full h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={datosFrecuencia}>
                        <XAxis dataKey="dia" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="preguntas" fill="hsl(var(--chart-1))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="flex items-center justify-center mt-4 text-sm">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Aumento del 3.8% en preguntas semanales
                  </div>
                </CardContent>
              </Card>

              {/* Distribución de Preguntas por Tema */}
              <Card className="flex flex-col">
                <CardContent className="flex-1 pt-6">
                  <h3 className="text-lg font-semibold mb-2">Distribución de Preguntas por Tema</h3>
                  <ChartContainer config={chartConfig} className="w-full h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie
                          data={datosTemas}
                          dataKey="preguntas"
                          nameKey="tema"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                        >
                          <Label
                            content={({ viewBox }) => {
                              // Cast viewBox to ExtendedViewBox
                              const extendedViewBox = viewBox as ExtendedViewBox
                              const { cx, cy } = extendedViewBox

                              if (cx === undefined || cy === undefined) {
                                return null // Ensure cx and cy are defined
                              }

                              return (
                                <text
                                  x={cx}
                                  y={cy}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                >
                                  <tspan x={cx} y={cy} className="text-2xl font-bold">
                                    {totalPreguntas}
                                  </tspan>
                                  <tspan x={cx} y={cy + 20} className="text-sm">
                                    Preguntas
                                  </tspan>
                                </text>
                              )
                            }}
                          />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="flex items-center justify-center mt-4 text-sm">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Aumento del 5.2% esta semana
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Insights Adicionales */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Insights Adicionales</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Hora más activa para preguntas: 2 PM - 4 PM</li>
                  <li>85% de las preguntas son respondidas en el primer intento</li>
                  <li>Tema con mayor dificultad: Value Iteration (basado en preguntas repetidas)</li>
                  <li>20% de aumento en preguntas nocturnas (10 PM - 2 AM) comparado con la semana pasada</li>
                </ul>
              </CardContent>
            </Card>
          </Card>
        )}
      </div>
    </div>
  )
}
