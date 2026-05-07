import type { CoreEntity, CoreId } from '../shared/types';

export type LeadStage =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'proposal'
  | 'won'
  | 'lost';

export type LeadSource =
  | 'website'
  | 'line'
  | 'facebook'
  | 'referral'
  | 'event'
  | 'manual'
  | 'unknown';

export interface Contact extends CoreEntity {
  name: string;
  email?: string | null;
  phone?: string | null;
  lineId?: string | null;
  company?: string | null;
}

export interface Lead extends CoreEntity {
  contactId?: CoreId;
  name: string;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
  lineId?: string | null;
  interest?: string | null;
  source: LeadSource;
  stage: LeadStage;
  score?: number;
  ownerId?: CoreId | null;
}

export interface Deal extends CoreEntity {
  leadId: CoreId;
  title: string;
  value?: number | null;
  currency: string;
  stage: LeadStage;
  expectedCloseDate?: string | null;
}

export const isOpenLeadStage = (stage: LeadStage) =>
  !['won', 'lost'].includes(stage);
