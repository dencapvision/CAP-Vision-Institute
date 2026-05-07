import type { CoreId } from '../shared/types';

export type NotificationChannel = 'resend-email' | 'line' | 'in-app' | 'webhook';
export type NotificationStatus = 'queued' | 'sent' | 'failed' | 'skipped';

export interface NotificationRecipient {
  id?: CoreId;
  name?: string | null;
  email?: string | null;
  lineUserId?: string | null;
}

export interface NotificationMessage {
  channel: NotificationChannel;
  recipient: NotificationRecipient;
  subject?: string;
  body: string;
  metadata?: Record<string, unknown>;
}

export interface NotificationReceipt {
  channel: NotificationChannel;
  status: NotificationStatus;
  providerMessageId?: string;
  error?: string;
}
