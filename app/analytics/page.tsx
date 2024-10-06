"use client"

import * as React from "react"
import { TrendingUp, Clock, Users, MessageCircle } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, Pie, PieChart, Legend, ResponsiveContainer,Label } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,

} from "../../components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

// Function to generate a more minimalistic color with less opacity
const generateColor = (index: number) => `hsl(var(--chart-${(index % 5) + 1}))`

const datosTemas = [
  { tema: "Bandidos de K brazos", preguntas: 45 },
  { tema: "Decisiones de Markov", preguntas: 30 },
  { tema: "Value iteration", preguntas: 25 },
  { tema: "Monte Carlo", preguntas: 20 },
  { tema: "Q learning", preguntas: 35 },
].map((tema, index) => ({ ...tema, fill: generateColor(index) }))

const datosFrecuencia = [
  { dia: "Lunes", preguntas: 50 },
  { dia: "Martes", preguntas: 65 },
  { dia: "Miércoles", preguntas: 45 },
  { dia: "Jueves", preguntas: 70 },
  { dia: "Viernes", preguntas: 80 },
  { dia: "Sábado", preguntas: 30 },
  { dia: "Domingo", preguntas: 20 },
]

const chartConfig: ChartConfig = {
  preguntas: {
    label: "Preguntas",
  },
  ...datosFrecuencia.reduce((acc, curr) => {
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

export default function AnalisisEstudiantesIA() {
  const [rangoTiempo, setRangoTiempo] = React.useState("semana")

  const totalPreguntas = React.useMemo(() => {
    return datosTemas.reduce((acc, curr) => acc + curr.preguntas, 0)
  }, [])

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Análisis de Interacción de Estudiantes en IA y Neurociencias</h1>
      
      <div className="flex justify-between items-center">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Preguntas</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPreguntas}</div>
            <p className="text-xs text-muted-foreground">+20.1% desde la semana pasada</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo promedio de interacción por día de cada alumno</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45 min</div>
            <p className="text-xs text-muted-foreground">+5 min desde la semana pasada</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estudiantes Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+49 desde la semana pasada</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Distribución de Preguntas por Tema</CardTitle>
            <CardDescription>Última Semana</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={datosTemas}
                  dataKey="preguntas"
                  nameKey="tema"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalPreguntas.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Preguntas
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Aumento del 5.2% esta semana <TrendingUp className="h-4 w-4" />
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frecuencia de Preguntas</CardTitle>
            <CardDescription>Número de preguntas por día de la semana</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="h-[300px]"
            >
              <LineChart data={datosFrecuencia}>
                  <XAxis dataKey="dia" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="preguntas" 
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={2}
                    dot={{ r: 4, fill: "hsl(var(--chart-1))" }}
                    activeDot={{ r: 6, fill: "hsl(var(--chart-1))" }}
                  />
                </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Aumento del 3.8% en preguntas semanales <TrendingUp className="h-4 w-4" />
            </div>
            </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Insights Adicionales</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li>Hora más activa para preguntas: 2 PM - 4 PM</li>
            <li>85% de las preguntas son respondidas en el primer intento</li>
            <li>Tema con mayor dificultad: Value Iteration (basado en preguntas repetidas)</li>
            <li>20% de aumento en preguntas nocturnas (10 PM - 2 AM) comparado con la semana pasada</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}