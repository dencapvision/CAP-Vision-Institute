export interface ContentResult {status: 200 | 404 | 503; data: any;}
export function isPublicSlug(slug: unknown): boolean;
export function loadPublishedRecord(client: import('@supabase/supabase-js').SupabaseClient, table: string, slug: string, options?: {select?: string; publishedColumn?: string; timeoutMs?: number}): Promise<ContentResult>;
export function normalizeDatabaseArticle(row: any): any;
export function staticArticle(article: any): any;
export function resolveArticle(slug: string, options: {bundled?: Record<string, any>; fallback?: any[]; lookup: (slug: string) => Promise<ContentResult>}): Promise<ContentResult>;
export function plainDescription(value: unknown): string;
export function articleMetadata(article: any): {title: string; description: string};
