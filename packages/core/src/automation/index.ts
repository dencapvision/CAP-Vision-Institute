import type { CoreId } from '../shared/types';

export type AutomationTrigger =
  | 'lead.created'
  | 'booking.created'
  | 'payment.paid'
  | 'content.published'
  | 'agent.recommended'
  | 'manual';

export type AutomationAction =
  | 'send.email'
  | 'send.line'
  | 'create.task'
  | 'update.lead'
  | 'enqueue.job'
  | 'call.webhook';

export interface AutomationRule {
  id: CoreId;
  name: string;
  enabled: boolean;
  trigger: AutomationTrigger;
  actions: AutomationAction[];
  conditions?: Record<string, unknown>;
}

export interface AutomationJob {
  id: CoreId;
  ruleId: CoreId;
  status: 'queued' | 'running' | 'completed' | 'failed';
  payload: Record<string, unknown>;
  createdAt: string;
  completedAt?: string | null;
}
