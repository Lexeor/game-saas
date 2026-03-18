import { motion } from 'motion/react';
import { ZapIcon, ShieldCheckIcon, CloudIcon, LockIcon, SlidersIcon, HeadphonesIcon } from 'lucide-react';
import type { FC, ElementType } from 'react';

const FEATURES: { icon: ElementType; label: string; color: string }[] = [
  { icon: ZapIcon,          label: 'Instant Deploy',    color: '#facc15' },
  { icon: ShieldCheckIcon,  label: '99.9% Uptime',      color: '#34d399' },
  { icon: CloudIcon,        label: 'Auto Backups',       color: '#60a5fa' },
  { icon: LockIcon,         label: 'DDoS Protection',   color: '#f87171' },
  { icon: SlidersIcon,      label: 'Control Panel',     color: '#c084fc' },
  { icon: HeadphonesIcon,   label: '24/7 Support',      color: '#fb923c' },
];

const Features: FC = () => (
  <section id="features" className="relative px-4 py-6">

    {/* Top divider glow */}
    <div
      className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 max-w-lg"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.35), transparent)' }}
    />

    <div className="mx-auto max-w-[1280px]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-x-0 gap-y-0 divide-y divide-border/40 sm:divide-y-0 sm:divide-x rounded-2xl border border-border/40 bg-surface/50 overflow-hidden"
      >
        {FEATURES.map(({ icon: Icon, label, color }) => (
          <div
            key={label}
            className="flex flex-1 min-w-[calc(50%-1px)] sm:min-w-0 items-center justify-center gap-2.5 px-5 py-4"
          >
            <Icon size={15} style={{ color }} className="shrink-0" />
            <span className="text-xs font-medium text-foreground/55 whitespace-nowrap">{label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Features;
