'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { generateTailoredAnswers, GenerateTailoredAnswersInput } from '@/ai/flows/generate-tailored-answers';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { visaTypes, questionCategories } from '@/lib/data';
import { Lightbulb, Loader2, Sparkles } from 'lucide-react';

const formSchema = z.object({
  applicantDetails: z.string().min(50, 'Please provide more details about your background.'),
  visaType: z.string({ required_error: 'Please select a visa type.' }),
  interviewQuestion: z.string({ required_error: 'Please select a question.' }),
});

export default function AnswerGeneratorPage() {
  const [generatedAnswer, setGeneratedAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicantDetails: '',
      visaType: '',
      interviewQuestion: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedAnswer('');
    try {
      const result = await generateTailoredAnswers(values as GenerateTailoredAnswersInput);
      setGeneratedAnswer(result.tailoredAnswer);
    } catch (error) {
      console.error('Error generating answer:', error);
      setGeneratedAnswer('Sorry, I was unable to generate an answer. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">AI Answer Generator</CardTitle>
          <CardDescription>
            Fill in your details and let our AI craft a tailored sample answer for your interview.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="applicantDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Profile Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., I am a recent graduate with a degree in business... I have worked at XYZ company for 2 years... My family lives in..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="visaType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visa Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a visa type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {visaTypes.map((visa) => (
                          <SelectItem key={visa.value} value={visa.value}>
                            {visa.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interviewQuestion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interview Question</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a question to answer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {questionCategories.map((cat) => (
                          <React.Fragment key={cat.category}>
                            <div className="px-2 py-1.5 text-sm font-semibold">{cat.category}</div>
                            {cat.questions.map((q) => (
                              <SelectItem key={q} value={q}>
                                {q}
                              </SelectItem>
                            ))}
                          </React.Fragment>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Answer
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline">Generated Answer</CardTitle>
          <CardDescription>Here is a sample answer based on your profile.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full space-y-4 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Our AI is thinking...</p>
            </div>
          )}
          {!isLoading && !generatedAnswer && (
             <div className="flex flex-col items-center justify-center h-full space-y-4 text-center text-muted-foreground bg-secondary/50 rounded-lg p-8">
              <Lightbulb className="h-10 w-10" />
              <p className="font-medium">Your AI-generated answer will appear here.</p>
              <p className="text-sm">Fill out the form on the left and click "Generate Answer" to start.</p>
            </div>
          )}
          {generatedAnswer && (
            <div className="prose prose-sm max-w-none rounded-md border bg-background p-4 min-h-[200px] whitespace-pre-wrap font-body">
              {generatedAnswer}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
