import type { CoreEntity, CoreId } from '../shared/types';

export type PaymentProvider = 'manual-transfer' | 'stripe' | 'omise' | 'other';
export type PaymentStatus = 'draft' | 'pending' | 'paid' | 'failed' | 'refunded' | 'cancelled';

export interface Money {
  amount: number;
  currency: 'THB' | 'USD';
}

export interface Order extends CoreEntity {
  customerId?: CoreId | null;
  leadId?: CoreId | null;
  title: string;
  total: Money;
  status: PaymentStatus;
}

export interface PaymentRecord extends CoreEntity {
  orderId: CoreId;
  provider: PaymentProvider;
  status: PaymentStatus;
  amount: Money;
  transactionRef?: string | null;
  proofUrl?: string | null;
  paidAt?: string | null;
}

export const isPaid = (payment: Pick<PaymentRecord, 'status'>) =>
  payment.status === 'paid';
