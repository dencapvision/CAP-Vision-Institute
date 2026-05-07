import { supabase } from '../lib/supabaseClient';

export type AIGenerationKind = 'course' | 'article' | 'caption' | 'visual_seo';

export async function invokeAIGeneration<T>(
  kind: AIGenerationKind,
  input: Record<string, unknown>
): Promise<T> {
  const { data, error } = await supabase.functions.invoke('ai-generate', {
    body: { kind, input },
  });

  if (error) {
    throw new Error(error.message || 'AI generation failed');
  }

  if (!data?.result) {
    throw new Error('AI generation returned no result');
  }

  return data.result as T;
}
