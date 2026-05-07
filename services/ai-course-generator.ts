import { invokeAIGeneration } from './ai-client';

export interface GeneratedCourse {
  title: string;
  description: string;
  why_section: any[];
  how_section: any[];
  what_section: any[];
  objectives: any[];
  long_description: string;
  audience: string;
  duration: string;
}

export async function generateCourseContent(
  courseName: string,
  category: string
): Promise<GeneratedCourse> {
  return invokeAIGeneration<GeneratedCourse>('course', { courseName, category });
}
