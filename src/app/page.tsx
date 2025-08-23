'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Plane, Sparkles, Timer } from 'lucide-react';
import { Icons } from '@/components/icons';

const features = [
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: 'AI-Powered Preparation',
    description: 'Leverage AI to generate tailored answers and improve your responses.',
  },
  {
    icon: <Timer className="h-8 w-8 text-primary" />,
    title: 'Realistic Practice',
    description: 'Simulate real interview conditions with our timed practice zone.',
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: 'Comprehensive Checklists',
    description: 'Never miss a document with checklists customized for your visa type.',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center gap-2 mr-6">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">VisaPrep</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="#features" className="text-muted-foreground transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              About
            </Link>
          </nav>
          <div className="flex flex-1 items-center justify-end gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Get Started <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center">
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="Airplane wing against a sunset sky"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 z-0 opacity-20"
            data-ai-hint="airplane travel"
          />
          <div className="relative z-10 container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Your Smooth Journey to Visa Approval Starts Here
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
                VisaPrep is your AI-powered co-pilot, guiding you through every step of the visa interview process with personalized tools and expert insights.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/login">
                    Start Your Preparation
                    <Plane className="ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-12 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Why Choose VisaPrep?</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                We combine cutting-edge AI with proven strategies to make you confident and prepared.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="text-center p-8">
                  <CardContent className="flex flex-col items-center gap-4">
                    {feature.icon}
                    <h3 className="text-xl font-bold font-headline">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container py-8 flex items-center justify-between text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} VisaPrep. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}