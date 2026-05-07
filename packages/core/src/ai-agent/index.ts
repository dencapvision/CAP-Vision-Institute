import type { CoreId } from '../shared/types';

export type AgentCapability =
  | 'lead-qualification'
  | 'course-recommendation'
  | 'content-generation'
  | 'sales-assistant'
  | 'admin-assistant'
  | 'analytics-insight';

export interface AgentContext {
  sessionId: string;
  userId?: CoreId | null;
  leadId?: CoreId | null;
  locale: 'th' | 'en';
  metadata?: Record<string, unknown>;
}

export interface AgentRequest {
  capability: AgentCapability;
  message: string;
  context: AgentContext;
}

export interface AgentResponse {
  reply: string;
  suggestedAction?: string;
  confidence?: number;
  metadata?: Record<string, unknown>;
}
