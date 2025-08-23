'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { suggestResponseImprovements, SuggestResponseImprovementsInput } from '@/ai/flows/suggest-response-improvements';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { visaTypes, questionCategories } from '@/lib/data';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  draftResponse: z.string().min(20, 'Please provide a more detailed draft response.'),
  visaType: z.string({ required_error: 'Please select a visa type.' }),
  question: z.string({ required_error: 'Please select a question.' }),
});

type ImprovedResponse = {
  improvedResponse: string;
  explanation: string;
}

export default function ResponseImproverPage() {
  const [improvedResponse, setImprovedResponse] = useState<ImprovedResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      draftResponse: '',
      visaType: '',
      question: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setImprovedResponse(null);
    try {
      const result = await suggestResponseImprovements(values as SuggestResponseImprovementsInput);
      setImprovedResponse(result);
    } catch (error) {
      console.error('Error improving response:', error);
      setImprovedResponse({ improvedResponse: 'Sorry, I was unable to improve the response. Please try again.', explanation: '' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Response Improver</CardTitle>
          <CardDescription>
            Enter your drafted answer and our AI will suggest improvements for clarity and impact.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="visaType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visa Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a visa type" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {visaTypes.map((visa) => <SelectItem key={visa.value} value={visa.value}>{visa.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interview Question</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select the question you're answering" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {questionCategories.map((cat) => (
                          <React.Fragment key={cat.category}>
                            <div className="px-2 py-1.5 text-sm font-semibold">{cat.category}</div>
                            {cat.questions.map((q) => <SelectItem key={q} value={q}>{q}</SelectItem>)}
                          </React.Fragment>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="draftResponse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Drafted Answer</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Type or paste your answer here..." className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Improving...</> : <><Sparkles className="mr-2 h-4 w-4" /> Improve My Response</>}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline">AI-Powered Feedback</CardTitle>
          <CardDescription>Here's the improved version and why it's better.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full space-y-4 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Analyzing your response...</p>
            </div>
          )}
          {!isLoading && !improvedResponse && (
             <div className="flex flex-col items-center justify-center h-full space-y-4 text-center text-muted-foreground bg-secondary/50 rounded-lg p-8">
              <Wand2 className="h-10 w-10" />
              <p className="font-medium">Feedback will appear here.</p>
              <p className="text-sm">Fill out the form and let our AI work its magic.</p>
            </div>
          )}
          {improvedResponse && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold font-headline mb-2">Suggested Improvement</h3>
                <div className="prose prose-sm max-w-none rounded-md border bg-background p-4 min-h-[120px] whitespace-pre-wrap font-body">
                  {improvedResponse.improvedResponse}
                </div>
              </div>
              {improvedResponse.explanation && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold font-headline mb-2">Explanation</h3>
                    <div className="prose prose-sm max-w-none rounded-md border bg-background/50 p-4 whitespace-pre-wrap font-body">
                      {improvedResponse.explanation}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
