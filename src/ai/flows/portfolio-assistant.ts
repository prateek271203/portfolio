'use server';
/**
 * @fileOverview An AI assistant for Prateek Kumar's portfolio.
 *
 * - askPortfolioAssistantFlow - A function that handles answering questions about Prateek.
 * - PortfolioAssistantInput - The input type for the flow.
 * - PortfolioAssistantOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';
import {
  TIMELINE_DATA,
  SKILLS_DATA,
  PROJECTS_DATA,
} from '@/lib/data';
import wav from 'wav';

const PortfolioAssistantInputSchema = z.object({
  question: z.string().describe('The user question about Prateek Kumar.'),
});
export type PortfolioAssistantInput = z.infer<
  typeof PortfolioAssistantInputSchema
>;

const PortfolioAssistantOutputSchema = z.object({
  answer: z.string().describe("The AI assistant's answer to the question."),
  audioDataUri: z
    .string()
    .nullable()
    .describe(
      'The base64 encoded WAV audio data URI, or null if generation failed.'
    ),
});
export type PortfolioAssistantOutput = z.infer<
  typeof PortfolioAssistantOutputSchema
>;

// Serialize data to be included in the prompt
const stringifiedTimeline = TIMELINE_DATA.map(
  (item) =>
    `- ${item.title} at ${item.company} (${item.date}): ${item.description}`
).join('\n');

const stringifiedSkills = SKILLS_DATA.map(
  (category) =>
    `### ${category.category}\n` +
    category.skills.map((skill) => `- ${skill.name}`).join('\n')
).join('\n\n');

const stringifiedProjects = PROJECTS_DATA.map(
  (project) =>
    `- ${project.title}: ${project.description} (Live at ${project.liveUrl})`
).join('\n');

const assistantAnsweringPrompt = ai.definePrompt({
  name: 'assistantAnsweringPrompt',
  input: { schema: z.object({ question: z.string() }) },
  output: { schema: z.object({ answer: z.string() }) },
  prompt: `You are Prateek Kumar's friendly and professional AI assistant, embedded in his portfolio website. Your goal is to answer questions from visitors about Prateek's skills, experience, and projects.

You must be friendly, concise, and helpful. Base your answers ONLY on the information provided below. Do not make up information. If a question is off-topic, politely decline to answer and steer the conversation back to Prateek's professional life.

Keep your answers brief and to the point. Use markdown for formatting if it helps readability (like lists).

Here is all the information about Prateek Kumar:

## About Prateek
Prateek is a passionate Full Stack Developer with a knack for creating dynamic, user-friendly web applications. With a strong foundation in both front-end and back-end technologies, he specializes in building robust and scalable solutions. His journey in tech is driven by a curiosity for innovation and a desire to solve real-world problems. He enjoys working with modern frameworks and is always eager to learn new things and take on new challenges. His contact email is ps5789542@gmail.com and phone is +91 7545912663.

## Professional Journey & Education
${stringifiedTimeline}

## Technical Skills
${stringifiedSkills}

## Featured Projects
${stringifiedProjects}

---

Now, answer the following user question:
User Question: {{{question}}}
`,
});

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}


export const askPortfolioAssistantFlow = ai.defineFlow(
  {
    name: 'askPortfolioAssistantFlow',
    inputSchema: PortfolioAssistantInputSchema,
    outputSchema: PortfolioAssistantOutputSchema,
  },
  async (input) => {
    // Step 1: Generate the text response.
    const { output: textOutput } = await assistantAnsweringPrompt(input);
    const answer = textOutput?.answer;

    if (!answer) {
      throw new Error('Failed to generate a text answer.');
    }

    // Step 2: Generate the audio for the text response.
    try {
      const { media } = await ai.generate({
        model: googleAI.model('gemini-2.5-flash-preview-tts'),
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Algenib' },
            },
          },
        },
        prompt: answer,
      });

      if (!media) {
        throw new Error('No media returned from TTS model.');
      }

      const audioBuffer = Buffer.from(
        media.url.substring(media.url.indexOf(',') + 1),
        'base64'
      );

      const wavBase64 = await toWav(audioBuffer);
      const audioDataUri = 'data:audio/wav;base64,' + wavBase64;

      return {
        answer: answer,
        audioDataUri: audioDataUri,
      };
    } catch (error) {
      console.error('Text-to-speech generation failed:', error);
      // If TTS fails, return the text answer without audio as a fallback.
      return {
        answer: answer,
        audioDataUri: null,
      };
    }
  }
);
