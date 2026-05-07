export type CoreId = string;
export type ISODateTime = string;

export type CoreStatus =
  | 'draft'
  | 'active'
  | 'inactive'
  | 'archived'
  | 'pending'
  | 'completed'
  | 'failed';

export type ActorRole =
  | 'guest'
  | 'member'
  | 'client'
  | 'editor'
  | 'admin'
  | 'owner'
  | 'system';

export interface CoreActor {
  id: CoreId;
  role: ActorRole;
  email?: string | null;
  name?: string | null;
}

export interface CoreEntity {
  id: CoreId;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface AuditMetadata {
  actor?: CoreActor;
  source?: string;
  requestId?: string;
}

export interface CoreResult<T> {
  data: T | null;
  error: CoreError | null;
}

export interface CoreError {
  code: string;
  message: string;
  cause?: unknown;
}

export const ok = <T>(data: T): CoreResult<T> => ({ data, error: null });

export const fail = <T = never>(
  code: string,
  message: string,
  cause?: unknown
): CoreResult<T> => ({
  data: null,
  error: { code, message, cause },
});
