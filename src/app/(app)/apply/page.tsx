'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Circle, FileText, Landmark, Calendar, Mail } from "lucide-react";

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
    description: "Schedule your visa interview and biometrics appointments.",
    status: "current",
    icon: Calendar
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
    const [currentStep, setCurrentStep] = useState(2); // 0-indexed, so 2 is "Interview Scheduled"

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
                 <div className="mt-12 text-center">
                    <p className="text-lg font-semibold">Next Step: Attend Your Interview</p>
                    <p className="text-muted-foreground mt-1">
                        Your interview is scheduled. Make sure you have all your documents ready.
                    </p>
                    <div className="mt-6 flex justify-center gap-4">
                        <Button>View Document Checklist</Button>
                        <Button variant="outline">Practice Interview Questions</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
