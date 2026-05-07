import type { ActorRole, CoreActor, CoreId } from '../shared/types';

export type AuthProvider = 'supabase';

export interface AuthSession {
  user: CoreActor;
  expiresAt?: string;
  provider: AuthProvider;
}

export interface PermissionRule {
  action: string;
  resource: string;
  roles: ActorRole[];
}

export interface AuthPolicy {
  rules: PermissionRule[];
}

export const canAccess = (
  actor: Pick<CoreActor, 'role'> | null | undefined,
  action: string,
  resource: string,
  policy: AuthPolicy
) => {
  if (!actor) return false;
  return policy.rules.some(
    (rule) =>
      rule.action === action &&
      rule.resource === resource &&
      rule.roles.includes(actor.role)
  );
};

export interface AdminUser extends CoreActor {
  id: CoreId;
  role: 'admin' | 'owner' | 'editor';
}
