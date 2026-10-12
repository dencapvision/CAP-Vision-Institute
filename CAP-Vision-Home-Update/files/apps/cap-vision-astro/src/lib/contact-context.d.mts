export const SERVICE_LABELS: Record<string, string>;
export function readContactContext(search?: string): {service: string; intent: string; source: string};
export function contactHref(service?: string, intent?: string): string;
export function contactSource(data: Record<string, unknown>): string;
