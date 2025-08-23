'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, FileText, Landmark, Calendar as CalendarIcon, Mail } from "lucide-react";
import { Calendar } from '@/components/ui/calendar';
import Link from 'next/link';

const steps = [
  {
    name: "Application Submitted",
    description: "Fill out and submit your DS-160 form online.",
    status: "completed",
    icon: FileText
  },
  {
    name: "Fees Paid",
    description: "Pay the required visa application (MRV) fee.",
    status: "completed",
    icon: Landmark
  },
  {
    name: "Interview Scheduled",
    description: "Your interview is set. See details below.",
    status: "current",
    icon: CalendarIcon
  },
  {
    name: "Interview Attended",
    description: "Attend your interview at the consulate or embassy.",
    status: "upcoming",
    icon: Landmark
  },
  {
    name: "Application Approved",
    description: "Receive the decision on your visa application.",
    status: "upcoming",
    icon: Mail
  },
];

export default function ApplyPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    const getStatusClasses = (stepStatus: string, isLastStep: boolean) => {
        const baseLine = "after:absolute after:top-1/2 after:transform after:-translate-y-1/2 after:w-full after:h-0.5";
        
        if (isLastStep) return "";

        switch(stepStatus) {
            case 'completed':
                return `${baseLine} after:bg-primary`;
            case 'current':
                return `${baseLine} after:bg-gradient-to-r after:from-primary after:to-secondary`;
            case 'upcoming':
            default:
                return `${baseLine} after:bg-secondary`;
        }
    };
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Your Application Journey</CardTitle>
                <CardDescription>Follow your visa application status from submission to approval.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="relative">
                    <ol className="grid grid-cols-5 items-start">
                        {steps.map((step, stepIdx) => (
                        <li key={step.name} className={`relative text-center ${getStatusClasses(step.status, stepIdx === steps.length - 1)}`}>
                            <div className="relative z-10 flex flex-col items-center">
                                <div className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                                    step.status === 'completed' ? 'bg-primary border-primary text-primary-foreground' : 
                                    step.status === 'current' ? 'border-primary bg-background' : 
                                    'border-secondary bg-secondary'
                                }`}>
                                    {step.status === 'completed' ? 
                                        <Check className="h-6 w-6" /> : 
                                        <step.icon className={`h-6 w-6 ${step.status === 'current' ? 'text-primary' : 'text-muted-foreground'}`} />
                                    }
                                </div>
                                <h3 className="mt-4 font-semibold">{step.name}</h3>
                                <p className="mt-1 text-sm text-muted-foreground px-2">{step.description}</p>
                            </div>
                        </li>
                        ))}
                    </ol>
                </div>
                 <div className="mt-12 flex flex-col items-center gap-8">
                    <div className="flex flex-col items-center text-center">
                        <p className="text-lg font-semibold">Your Interview is Scheduled!</p>
                        <p className="text-muted-foreground mt-1 max-w-md">
                            Your appointment is confirmed. The calendar below highlights the date. Make sure you have all your documents ready.
                        </p>
                    </div>

                    <div className="rounded-md border">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="p-0"
                            classNames={{
                                month: "space-y-4 p-4",
                                head_cell: "w-10",
                                cell: "h-10 w-10 text-center",
                                day_selected:
                                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
                            }}
                        />
                    </div>
                    
                    <div className="flex justify-center gap-4">
                        <Button asChild>
                            <Link href="/documents">View Document Checklist</Link>
                        </Button>
                        <Button variant="outline" asChild>
                           <Link href="/practice">Practice Interview Questions</Link>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
