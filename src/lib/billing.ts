export type InvoiceStatus = 'paid' | 'upcoming' | 'failed';

export interface Invoice {
  id: string;
  number: string;
  period: string;
  date: string;
  amount: number;
  status: InvoiceStatus;
}

export interface UsageLine {
  serverId: string;
  serverName: string;
  gameId: string;
  plan: string;
  pricePerMonth: number;
  daysActive: number;
  daysInMonth: number;
}

export interface PaymentMethod {
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
}

export const MOCK_PAYMENT_METHOD: PaymentMethod = {
  brand: 'Visa',
  last4: '4242',
  expMonth: 9,
  expYear: 2028,
};

export const MOCK_USAGE: UsageLine[] = [
  {
    serverId: 'srv-001',
    serverName: 'Viking Nights',
    gameId: 'valheim',
    plan: 'Standard',
    pricePerMonth: 9.99,
    daysActive: 19,
    daysInMonth: 31,
  },
  {
    serverId: 'srv-002',
    serverName: 'Apocalypse Server',
    gameId: '7dtd',
    plan: 'Starter',
    pricePerMonth: 4.99,
    daysActive: 10,
    daysInMonth: 31,
  },
  {
    serverId: 'srv-003',
    serverName: 'Mist & Shadows',
    gameId: 'enshrouded',
    plan: 'Pro',
    pricePerMonth: 19.99,
    daysActive: 2,
    daysInMonth: 31,
  },
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv-006',
    number: 'INV-2026-006',
    period: 'Apr 1 – Apr 30, 2026',
    date: 'Apr 1, 2026',
    amount: 34.97,
    status: 'upcoming',
  },
  {
    id: 'inv-005',
    number: 'INV-2026-005',
    period: 'Mar 1 – Mar 31, 2026',
    date: 'Mar 1, 2026',
    amount: 14.98,
    status: 'paid',
  },
  {
    id: 'inv-004',
    number: 'INV-2026-004',
    period: 'Feb 1 – Feb 28, 2026',
    date: 'Feb 1, 2026',
    amount: 9.99,
    status: 'paid',
  },
  {
    id: 'inv-003',
    number: 'INV-2026-003',
    period: 'Jan 1 – Jan 31, 2026',
    date: 'Jan 1, 2026',
    amount: 9.99,
    status: 'paid',
  },
  {
    id: 'inv-002',
    number: 'INV-2025-002',
    period: 'Dec 1 – Dec 31, 2025',
    date: 'Dec 1, 2025',
    amount: 4.99,
    status: 'paid',
  },
  {
    id: 'inv-001',
    number: 'INV-2025-001',
    period: 'Nov 1 – Nov 30, 2025',
    date: 'Nov 1, 2025',
    amount: 4.99,
    status: 'failed',
  },
];
