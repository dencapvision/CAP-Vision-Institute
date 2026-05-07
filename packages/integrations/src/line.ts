export interface LineMessage {
  to?: string;
  text: string;
  metadata?: Record<string, unknown>;
}

export interface LineFlexAction {
  label: string;
  uri: string;
}

export interface LineLeadAlert {
  leadName: string;
  company?: string | null;
  interest?: string | null;
  phone?: string | null;
  lineId?: string | null;
  adminUrl?: string;
}
