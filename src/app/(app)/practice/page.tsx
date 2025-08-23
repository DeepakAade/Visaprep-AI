'use client'

import { useState, useEffect, useRef } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { questionCategories } from "@/lib/data"
import { Play, Pause, RotateCcw, Copy, Check } from "lucide-react"

export default function PracticePage() {
  const [selectedQuestion, setSelectedQuestion] = useState("Select a question from the list to begin.")
  const [time, setTime] = useState(120) // 2 minutes
  const [isActive, setIsActive] = useState(false)
  const [copied, setCopied] = useState(false)
  const timerId = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isActive && time > 0) {
      timerId.current = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (time === 0) {
      setIsActive(false)
    }
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current)
      }
    }
  }, [isActive, time])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTime(120)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Question Bank</CardTitle>
            <CardDescription>Select a category to see questions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {questionCategories.map((category) => (
                <AccordionItem key={category.category} value={category.category}>
                  <AccordionTrigger className="font-semibold">{category.category}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {category.questions.map((q) => (
                        <li key={q}>
                          <button
                            onClick={() => setSelectedQuestion(q)}
                            className="text-left text-sm text-muted-foreground hover:text-primary w-full p-2 rounded-md hover:bg-secondary"
                          >
                            {q}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card className="sticky top-6">
          <CardHeader>
            <CardTitle className="font-headline">Practice Arena</CardTitle>
            <CardDescription>Practice your answer for the selected question under timed conditions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-secondary p-6 rounded-lg min-h-[100px] flex items-center justify-between gap-4">
              <p className="font-semibold text-lg">{selectedQuestion}</p>
              <Button variant="ghost" size="icon" onClick={() => handleCopy(selectedQuestion)}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border p-6">
                <div className="text-6xl font-bold font-mono text-primary tabular-nums">
                    {formatTime(time)}
                </div>
                <div className="flex gap-4">
                    <Button onClick={toggleTimer} size="lg" className="w-32">
                        {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                        {isActive ? 'Pause' : 'Start'}
                    </Button>
                    <Button onClick={resetTimer} variant="outline" size="lg">
                        <RotateCcw className="mr-2" />
                        Reset
                    </Button>
                </div>
            </div>

            <div>
              <label htmlFor="practice-answer" className="block text-sm font-medium mb-2">Your Answer</label>
              <Textarea
                id="practice-answer"
                className="w-full"
                placeholder="Draft your answer here..."
                rows={8}
              />
            </div>
             <Button className="w-full">Save Response</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
