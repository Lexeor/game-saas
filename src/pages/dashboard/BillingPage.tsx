import {
  CreditCardIcon,
  DownloadIcon,
  AlertCircleIcon,
  CalendarIcon,
  ReceiptIcon,
  ServerIcon,
  TrendingUpIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GAMES } from '@/lib/games';
import {
  MOCK_INVOICES,
  MOCK_PAYMENT_METHOD,
  MOCK_USAGE,
  type InvoiceStatus,
} from '@/lib/billing';

// ─── helpers ────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function proRate(price: number, days: number, total: number) {
  return (price / total) * days;
}

const currentMonthTotal = MOCK_USAGE.reduce(
  (sum, l) => sum + proRate(l.pricePerMonth, l.daysActive, l.daysInMonth),
  0,
);

const nextInvoiceAmount = MOCK_INVOICES.find((i) => i.status === 'upcoming')?.amount ?? 0;

const INVOICE_STATUS: Record<InvoiceStatus, { label: string; className: string }> = {
  paid:     { label: 'Paid',     className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  upcoming: { label: 'Upcoming', className: 'bg-primary-500/10 text-primary-400 border-primary-500/20' },
  failed:   { label: 'Failed',   className: 'bg-red-500/10 text-red-400 border-red-500/20' },
};

const CARD_BRAND_COLOR: Record<string, string> = {
  Visa:       '#1a1f71',
  Mastercard: '#eb001b',
};

// ─── sub-components ─────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-surface p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted">{label}</p>
        <div
          className="flex h-7 w-7 items-center justify-center rounded-lg"
          style={{ backgroundColor: accent ? `${accent}18` : 'rgba(255,255,255,0.05)' }}
        >
          <Icon size={14} style={{ color: accent ?? 'rgba(221,230,255,0.4)' }} />
        </div>
      </div>
      <div>
        <p className="space-grotesk text-2xl font-bold text-foreground">{value}</p>
        {sub && <p className="mt-0.5 text-xs text-muted">{sub}</p>}
      </div>
    </div>
  );
}

// ─── page ────────────────────────────────────────────────────────────────────

export default function BillingPage() {
  const failed = MOCK_INVOICES.find((i) => i.status === 'failed');

  return (
    <div className="flex flex-col gap-8 px-6 py-8 md:px-8">

      {/* Page header */}
      <div>
        <h1 className="space-grotesk text-2xl font-bold text-foreground">Billing</h1>
        <p className="mt-1 text-sm text-muted">Invoices, usage, and payment details</p>
      </div>

      {/* Failed payment banner */}
      {failed && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/8 px-5 py-4">
          <AlertCircleIcon size={16} className="mt-0.5 shrink-0 text-red-400" />
          <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-red-400">Payment failed</p>
              <p className="text-xs text-red-400/70">
                Invoice {failed.number} for {fmt(failed.amount)} could not be charged. Please update your payment method.
              </p>
            </div>
            <button className="mt-2 shrink-0 rounded-xl bg-red-500/15 px-4 py-2 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/25 sm:mt-0">
              Retry payment
            </button>
          </div>
        </div>
      )}

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={CalendarIcon}
          label="Next invoice"
          value={fmt(nextInvoiceAmount)}
          sub="Due Apr 1, 2026"
          accent="#3b82f6"
        />
        <StatCard
          icon={TrendingUpIcon}
          label="Current period"
          value={fmt(currentMonthTotal)}
          sub="Mar 1 – Mar 19, 2026"
          accent="#22d3ee"
        />
        <StatCard
          icon={ServerIcon}
          label="Active servers"
          value="3"
          sub={`${fmt(34.97)} / month`}
          accent="#a78bfa"
        />
      </div>

      {/* Middle row: Usage + Payment method */}
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">

        {/* Current usage breakdown */}
        <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-surface p-5">
          <div className="flex items-center justify-between">
            <h2 className="space-grotesk text-sm font-bold text-foreground">Usage this period</h2>
            <span className="text-xs text-muted">Mar 1 – Mar 19, 2026</span>
          </div>

          <div className="flex flex-col divide-y divide-white/[0.05]">
            {MOCK_USAGE.map((line) => {
              const game = GAMES.find((g) => g.id === line.gameId);
              const cost = proRate(line.pricePerMonth, line.daysActive, line.daysInMonth);
              const pct = (line.daysActive / line.daysInMonth) * 100;

              return (
                <div key={line.serverId} className="flex items-center gap-4 py-3.5">
                  {/* Game accent bar */}
                  <div
                    className="h-8 w-1 shrink-0 rounded-full"
                    style={{ backgroundColor: game?.accent ?? '#3b82f6' }}
                  />

                  <div className="flex flex-1 flex-col gap-1.5 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground/80">{line.serverName}</p>
                        <p className="text-xs text-muted">{game?.name} · {line.plan}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-semibold text-foreground">{fmt(cost)}</p>
                        <p className="text-xs text-muted">
                          {line.daysActive}d · {fmt(line.pricePerMonth)}/mo
                        </p>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, backgroundColor: game?.accent ?? '#3b82f6' }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subtotal */}
          <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
            <p className="text-sm text-muted">Period subtotal</p>
            <p className="space-grotesk text-lg font-bold text-foreground">{fmt(currentMonthTotal)}</p>
          </div>
        </div>

        {/* Payment method */}
        <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-surface p-5">
          <h2 className="space-grotesk text-sm font-bold text-foreground">Payment method</h2>

          <div className="flex flex-col gap-3">
            {/* Card visual */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-surface-2 to-background p-4 border border-white/[0.07]">
              <div className="flex items-start justify-between">
                <div
                  className="flex h-8 w-11 items-center justify-center rounded-md text-xs font-bold text-white"
                  style={{ backgroundColor: CARD_BRAND_COLOR[MOCK_PAYMENT_METHOD.brand] ?? '#1a1f71' }}
                >
                  {MOCK_PAYMENT_METHOD.brand.toUpperCase()}
                </div>
                <CreditCardIcon size={16} className="text-muted" />
              </div>
              <p className="mt-4 font-mono text-sm tracking-widest text-foreground/60">
                •••• •••• •••• {MOCK_PAYMENT_METHOD.last4}
              </p>
              <p className="mt-1 text-xs text-muted">
                Expires {String(MOCK_PAYMENT_METHOD.expMonth).padStart(2, '0')}/{MOCK_PAYMENT_METHOD.expYear}
              </p>
            </div>

            <button className="w-full rounded-xl border border-white/[0.07] py-2.5 text-xs font-medium text-foreground/50 transition-colors hover:border-white/[0.14] hover:text-foreground/80">
              Update card
            </button>
          </div>

          {/* Billing info */}
          <div className="flex flex-col gap-2 rounded-xl border border-white/[0.06] bg-background/40 p-3.5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">Billing info</p>
            <div className="flex flex-col gap-1 text-xs text-foreground/60">
              <span>Dev User</span>
              <span>dev@gamenest.io</span>
            </div>
            <button className="mt-1 text-left text-xs text-primary-400 transition-colors hover:text-primary-300">
              Edit billing info
            </button>
          </div>
        </div>
      </div>

      {/* Invoice history */}
      <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-surface p-5">
        <div className="flex items-center justify-between">
          <h2 className="space-grotesk text-sm font-bold text-foreground">Invoice history</h2>
          <ReceiptIcon size={14} className="text-muted" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['Invoice', 'Period', 'Date', 'Amount', 'Status', ''].map((h) => (
                  <th
                    key={h}
                    className="pb-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted last:text-right"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {MOCK_INVOICES.map((inv) => {
                const st = INVOICE_STATUS[inv.status];
                return (
                  <tr key={inv.id} className="group">
                    <td className="py-3.5 pr-4 font-mono text-xs text-foreground/50">{inv.number}</td>
                    <td className="py-3.5 pr-4 text-xs text-foreground/60">{inv.period}</td>
                    <td className="py-3.5 pr-4 text-xs text-muted">{inv.date}</td>
                    <td className="py-3.5 pr-4 font-semibold text-foreground/80">{fmt(inv.amount)}</td>
                    <td className="py-3.5 pr-4">
                      <span className={cn('rounded-full border px-2.5 py-1 text-[10px] font-semibold', st.className)}>
                        {st.label}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      {inv.status === 'paid' && (
                        <button className="flex items-center gap-1.5 ml-auto text-xs text-muted opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground/60">
                          <DownloadIcon size={11} />
                          PDF
                        </button>
                      )}
                      {inv.status === 'failed' && (
                        <button className="text-xs text-red-400 hover:text-red-300 transition-colors">
                          Retry
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
