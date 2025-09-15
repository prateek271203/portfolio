'use server';

import { askPortfolioAssistantFlow, PortfolioAssistantOutput } from './flows/portfolio-assistant';
import { speechToTextFlow } from './flows/speech-to-text';

export async function askPortfolioAssistant(
  question: string
): Promise<PortfolioAssistantOutput> {
    try {
        const response = await askPortfolioAssistantFlow({ question });
        return response;
    } catch (error) {
        console.error('Error asking portfolio assistant:', error);
        return {
          answer: 'Sorry, something went wrong. I am unable to answer right now.',
          audioDataUri: null,
        };
    }
}

export async function transcribeAudio(audioDataUri: string): Promise<string> {
  try {
    const { text } = await speechToTextFlow({ audioDataUri });
    return text;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    return '';
  }
}
