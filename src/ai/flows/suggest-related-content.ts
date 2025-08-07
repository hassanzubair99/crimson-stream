'use server';

/**
 * @fileOverview An AI agent to suggest related content based on a given title or genre.
 *
 * - suggestRelatedContent - A function that suggests related content.
 * - SuggestRelatedContentInput - The input type for the suggestRelatedContent function.
 * - SuggestRelatedContentOutput - The return type for the suggestRelatedContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelatedContentInputSchema = z.object({
  title: z.string().describe('The title of the movie or TV show the user is currently watching.'),
  genre: z.string().describe('The genre of the movie or TV show.'),
});
export type SuggestRelatedContentInput = z.infer<typeof SuggestRelatedContentInputSchema>;

const SuggestRelatedContentOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of titles of movies or TV shows that are similar to the input content.'),
});
export type SuggestRelatedContentOutput = z.infer<typeof SuggestRelatedContentOutputSchema>;

export async function suggestRelatedContent(
  input: SuggestRelatedContentInput
): Promise<SuggestRelatedContentOutput> {
  return suggestRelatedContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelatedContentPrompt',
  input: {schema: SuggestRelatedContentInputSchema},
  output: {schema: SuggestRelatedContentOutputSchema},
  prompt: `You are a movie and TV show expert. Recommend movies or tv shows similar to the following title and genre.

Title: {{{title}}}
Genre: {{{genre}}}

Please provide a list of movie and TV show titles that are similar to the provided title and genre. Limit the list to 5 titles.
`,
});

const suggestRelatedContentFlow = ai.defineFlow(
  {
    name: 'suggestRelatedContentFlow',
    inputSchema: SuggestRelatedContentInputSchema,
    outputSchema: SuggestRelatedContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
