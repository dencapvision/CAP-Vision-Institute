import type { CoreId } from '../shared/types';

export type AnalyticsEventName =
  | 'page_view'
  | 'cta_click'
  | 'lead_created'
  | 'booking_created'
  | 'payment_completed'
  | 'ai_agent_used'
  | 'admin_action';

export interface AnalyticsEvent {
  name: AnalyticsEventName;
  occurredAt: string;
  anonymousId?: string;
  userId?: CoreId | null;
  leadId?: CoreId | null;
  properties?: Record<string, unknown>;
}

export interface FunnelStep {
  name: string;
  count: number;
  conversionRate?: number;
}
