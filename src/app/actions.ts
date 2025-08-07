'use server';

import { suggestRelatedContent, SuggestRelatedContentInput, SuggestRelatedContentOutput } from '@/ai/flows/suggest-related-content';

export async function getRelatedContent(input: SuggestRelatedContentInput): Promise<SuggestRelatedContentOutput> {
  try {
    const suggestions = await suggestRelatedContent(input);
    return suggestions;
  } catch (error) {
    console.error("Error getting related content from AI:", error);
    // Return a default empty state in case of an error
    return { suggestions: [] };
  }
}
