'use server';

/**
 * @fileOverview A flow for converting speech audio to text.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SpeechToTextInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "Audio data as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

const SpeechToTextOutputSchema = z.object({
  text: z.string().describe('The transcribed text from the audio.'),
});

export const speechToTextFlow = ai.defineFlow(
  {
    name: 'speechToTextFlow',
    inputSchema: SpeechToTextInputSchema,
    outputSchema: SpeechToTextOutputSchema,
  },
  async ({ audioDataUri }) => {
    const { text } = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: [
        { text: 'Transcribe the following audio:' },
        { media: { url: audioDataUri } },
      ],
    });
    return { text };
  }
);
