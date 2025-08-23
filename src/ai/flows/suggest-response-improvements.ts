'use server';

/**
 * @fileOverview AI flow to suggest improvements to drafted visa interview responses.
 *
 * - suggestResponseImprovements - Analyzes a response and suggests improvements.
 * - SuggestResponseImprovementsInput - Input type for the function.
 * - SuggestResponseImprovementsOutput - Return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestResponseImprovementsInputSchema = z.object({
  visaType: z.string().describe('The type of visa the applicant is applying for.'),
  question: z.string().describe('The interview question the applicant is answering.'),
  draftResponse: z.string().describe('The applicant\'s drafted response to the question.'),
});
export type SuggestResponseImprovementsInput = z.infer<typeof SuggestResponseImprovementsInputSchema>;

const SuggestResponseImprovementsOutputSchema = z.object({
  improvedResponse: z.string().describe('The improved response suggested by the AI.'),
  explanation: z.string().describe('An explanation of why the response was improved.'),
});
export type SuggestResponseImprovementsOutput = z.infer<typeof SuggestResponseImprovementsOutputSchema>;

export async function suggestResponseImprovements(input: SuggestResponseImprovementsInput): Promise<SuggestResponseImprovementsOutput> {
  return suggestResponseImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestResponseImprovementsPrompt',
  input: {schema: SuggestResponseImprovementsInputSchema},
  output: {schema: SuggestResponseImprovementsOutputSchema},
  prompt: `You are an AI assistant expert in helping people prepare for visa interviews. You will analyze the applicant's drafted response to an interview question and suggest improvements for clarity, accuracy, and persuasiveness, based on insights from successful visa applications.

Visa Type: {{{visaType}}}
Question: {{{question}}}
Draft Response: {{{draftResponse}}}

Suggest an improved response and explain why the changes were made. Be concise and specific.

{{#json outputSchema=SuggestResponseImprovementsOutputSchema}}
`,
});

const suggestResponseImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestResponseImprovementsFlow',
    inputSchema: SuggestResponseImprovementsInputSchema,
    outputSchema: SuggestResponseImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

