import { invokeAIGeneration } from './ai-client';

export interface CaptionResult {
  caption: string;
  short_description: string;
  keywords: string[];
}

export async function generateCaption(
  courseName: string,
  organization: string,
  imageContext: string
): Promise<CaptionResult> {
  return invokeAIGeneration<CaptionResult>('caption', {
    courseName,
    organization,
    imageContext,
  });
}
