'use server';
/**
 * @fileOverview An AI agent that generates tailored example answers for visa interview questions.
 *
 * - generateTailoredAnswers - A function that generates tailored example answers for visa interview questions.
 * - GenerateTailoredAnswersInput - The input type for the generateTailoredAnswers function.
 * - GenerateTailoredAnswersOutput - The return type for the generateTailoredAnswers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTailoredAnswersInputSchema = z.object({
  applicantDetails: z
    .string()
    .describe('Detailed information about the applicant, including personal history, travel history, education, and employment.'),
  visaType: z.string().describe('The type of visa the applicant is applying for.'),
  interviewQuestion: z.string().describe('The specific visa interview question to answer.'),
});
export type GenerateTailoredAnswersInput = z.infer<typeof GenerateTailoredAnswersInputSchema>;

const GenerateTailoredAnswersOutputSchema = z.object({
  tailoredAnswer: z
    .string()
    .describe('An AI-generated example answer tailored to the applicant details and visa type.'),
});
export type GenerateTailoredAnswersOutput = z.infer<typeof GenerateTailoredAnswersOutputSchema>;

export async function generateTailoredAnswers(input: GenerateTailoredAnswersInput): Promise<GenerateTailoredAnswersOutput> {
  return generateTailoredAnswersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTailoredAnswersPrompt',
  input: {schema: GenerateTailoredAnswersInputSchema},
  output: {schema: GenerateTailoredAnswersOutputSchema},
  prompt: `You are an expert visa interview coach. You will generate an example answer for the applicant based on their details and the visa type they are applying for.

Applicant Details: {{{applicantDetails}}}
Visa Type: {{{visaType}}}
Interview Question: {{{interviewQuestion}}}

Tailored Answer:`, // Removed 'strictly' since the user specified to tailor
});

const generateTailoredAnswersFlow = ai.defineFlow(
  {
    name: 'generateTailoredAnswersFlow',
    inputSchema: GenerateTailoredAnswersInputSchema,
    outputSchema: GenerateTailoredAnswersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
