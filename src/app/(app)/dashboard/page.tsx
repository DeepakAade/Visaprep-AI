import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, BotMessageSquare, Sparkles, Timer, ListTodo } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"

const features = [
  {
    title: "AI Answer Generator",
    description: "Get tailored example answers for any interview question.",
    icon: BotMessageSquare,
    href: "/answer-generator",
  },
  {
    title: "Response Improver",
    description: "Refine your drafted answers for clarity and impact.",
    icon: Sparkles,
    href: "/response-improver",
  },
  {
    title: "Practice Zone",
    description: "Simulate interview conditions with our timed practice mode.",
    icon: Timer,
    href: "/practice",
  },
  {
    title: "Document Checklist",
    description: "Ensure you have all necessary documents for your visa type.",
    icon: ListTodo,
    href: "/documents",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2">
            <div className="p-6 md:p-8 flex flex-col justify-center">
                <h2 className="font-headline text-3xl font-bold text-primary">Welcome Back, Applicant!</h2>
                <p className="text-muted-foreground mt-2">
                    Your journey to a successful visa interview starts here. Let's get you prepared and confident.
                </p>
                <div className="mt-6 flex gap-4">
                    <Button asChild>
                        <Link href="/practice">Start Practicing <ArrowRight className="ml-2" /></Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/documents">View Documents</Link>
                    </Button>
                </div>
            </div>
            <div className="hidden md:block">
                <Image
                    src="https://placehold.co/600x400.png"
                    alt="Visa interview preparation"
                    width={600}
                    height={400}
                    className="object-cover h-full w-full"
                    data-ai-hint="visa interview"
                />
            </div>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                    <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
            <div className="p-6 pt-0">
                <Button variant="outline" className="w-full" asChild>
                    <Link href={feature.href}>Go to {feature.title.split(' ')[0]} <ArrowRight className="ml-2" /></Link>
                </Button>
            </div>
          </Card>
        ))}
      </div>

       <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Progress</CardTitle>
          <CardDescription>You've practiced 5 out of 20 common questions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={25} />
        </CardContent>
      </Card>
    </div>
  )
}
