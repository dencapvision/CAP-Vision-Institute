export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type SupabaseTableName =
  | 'leads'
  | 'courses'
  | 'speakers'
  | 'portfolio'
  | 'events'
  | 'contents'
  | 'payments'
  | 'ai_chat_logs';

export interface DatabaseTableRef {
  schema: 'public';
  table: SupabaseTableName;
}
