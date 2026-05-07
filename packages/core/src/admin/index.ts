import type { ActorRole, CoreId } from '../shared/types';

export interface AdminModule {
  id: string;
  label: string;
  href: string;
  requiredRoles: ActorRole[];
  order: number;
}

export interface AdminActionLog {
  id: CoreId;
  actorId: CoreId;
  action: string;
  resource: string;
  resourceId?: CoreId;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

export const defaultAdminModules: AdminModule[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', requiredRoles: ['admin', 'owner', 'editor'], order: 10 },
  { id: 'crm', label: 'CRM', href: '/crm', requiredRoles: ['admin', 'owner'], order: 20 },
  { id: 'content', label: 'Content', href: '/contents', requiredRoles: ['admin', 'owner', 'editor'], order: 30 },
  { id: 'payments', label: 'Payments', href: '/payments', requiredRoles: ['admin', 'owner'], order: 40 },
  { id: 'automation', label: 'Automation', href: '/automation', requiredRoles: ['admin', 'owner'], order: 50 },
];
