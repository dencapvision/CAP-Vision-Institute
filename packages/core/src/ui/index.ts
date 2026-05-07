export type ComponentSize = 'sm' | 'md' | 'lg';
export type ComponentTone = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';

export interface UIThemeToken {
  name: string;
  value: string;
  usage: 'color' | 'spacing' | 'radius' | 'shadow' | 'font';
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  requiredRole?: string;
  children?: NavigationItem[];
}

export interface DataTableColumn<TRecord> {
  key: keyof TRecord | string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
}

export const coreUiPrinciples = [
  'Use shared components before page-specific UI.',
  'Keep admin surfaces dense, readable, and workflow-first.',
  'Use stable responsive dimensions for repeated tools, tables, and cards.',
] as const;
