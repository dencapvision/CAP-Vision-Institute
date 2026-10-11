export const PIPELINE: Record<string, string>;
export function pipelineStage(lead: {pipeline_stage?: string | null; status?: string | null}): string;
export function validateContact(data: Record<string, unknown>): Record<string, string>;
export function captureContact(options: {client: import('@supabase/supabase-js').SupabaseClient; data: Record<string, unknown>; onSaved?: () => void}): Promise<{saved: boolean; notified: boolean}>;
