'use server';
/**
 * @fileOverview This file defines a Genkit flow for the 'Asesor Virtual Exclusivo' (Exclusive Virtual Advisor) interaction.
 *
 * - asesorVirtualExclusivoInteraction - A function that handles the conversational interaction to understand user car preferences.
 * - AsesorVirtualExclusivoInteractionInput - The input type for the asesorVirtualExclusivoInteraction function.
 * - AsesorVirtualExclusivoInteractionOutput - The return type for the asesorVirtualExclusivoInteraction function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AsesorVirtualExclusivoInteractionInputSchema = z.object({
  userInput: z
    .string()
    .describe(
      "The user's conversational input describing their lifestyle, needs, and car preferences."
    ),
});
export type AsesorVirtualExclusivoInteractionInput = z.infer<
  typeof AsesorVirtualExclusivoInteractionInputSchema
>;

const AsesorVirtualExclusivoInteractionOutputSchema = z.object({
  lifestyleSummary: z
    .string()
    .describe(
      "A concise summary of the user's lifestyle as described in their input."
    ),
  carPreferences: z
    .string()
    .describe(
      "A summary of the user's specific car preferences and requirements."
    ),
  humanExpertRecommendation: z
    .string()
    .describe(
      "A recommendation for the type of human expert best suited to follow up with the user based on their summarized needs (e.g., 'family SUV specialist', 'electric vehicle expert')."
    ),
});
export type AsesorVirtualExclusivoInteractionOutput = z.infer<
  typeof AsesorVirtualExclusivoInteractionOutputSchema
>;

export async function asesorVirtualExclusivoInteraction(
  input: AsesorVirtualExclusivoInteractionInput
): Promise<AsesorVirtualExclusivoInteractionOutput> {
  return asesorVirtualExclusivoInteractionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'asesorVirtualExclusivoPrompt',
  input: { schema: AsesorVirtualExclusivoInteractionInputSchema },
  output: { schema: AsesorVirtualExclusivoInteractionOutputSchema },
  prompt: `You are the 'Asesor Virtual Exclusivo' (Exclusive Virtual Advisor) for Carblau, a personalized car-finding service.
Your primary role is to act as a friendly and intelligent conversational agent that understands the user's lifestyle, specific needs, and car preferences.
You will receive a user's message describing their situation and desires.
Your task is to carefully analyze this input and then generate a structured summary that will be used by our human experts.

The summary should include:
1.  lifestyleSummary: A concise overview of the user's lifestyle (e.g., "young professional living in the city, daily commute, weekend mountain trips, camping").
2.  carPreferences: A clear articulation of the user's explicit and implicit car preferences and requirements (e.g., "fuel-efficient, reliable, spacious enough for camping gear").
3.  humanExpertRecommendation: A suggestion for the most appropriate type of human expert to follow up with the user (e.g., "sports car specialist", "family SUV expert", "eco-friendly commuter specialist").

User's input: "{{{userInput}}}"`,
});

const asesorVirtualExclusivoInteractionFlow = ai.defineFlow(
  {
    name: 'asesorVirtualExclusivoInteractionFlow',
    inputSchema: AsesorVirtualExclusivoInteractionInputSchema,
    outputSchema: AsesorVirtualExclusivoInteractionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
