import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  ZapIcon,
  ShieldCheckIcon,
  CloudIcon,
  LockIcon,
  SlidersIcon,
  HeadphonesIcon,
} from 'lucide-react';
import type { FC, ElementType } from 'react';

interface Feature {
  icon: ElementType;
  title: string;
  description: string;
  color: string;
  bg: string;
}

const FEATURES: Feature[] = [
  {
    icon: ZapIcon,
    title: 'Instant Deploy',
    description: 'Your server is online in under 60 seconds. Pick a game, choose a plan, and play — no config files, no terminals.',
    color: '#facc15',
    bg: 'rgba(250,204,21,0.08)',
  },
  {
    icon: ShieldCheckIcon,
    title: '99.9% Uptime',
    description: 'Enterprise-grade infrastructure with automatic failover and redundant networks. We keep your world online.',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.08)',
  },
  {
    icon: CloudIcon,
    title: 'Auto Backups',
    description: 'Daily snapshots of your world, configs and player data. Restore any backup with a single click from the dashboard.',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.08)',
  },
  {
    icon: LockIcon,
    title: 'DDoS Protection',
    description: 'Multi-layer DDoS mitigation filters out malicious traffic before it reaches your server, keeping your session smooth.',
    color: '#f87171',
    bg: 'rgba(248,113,113,0.08)',
  },
  {
    icon: SlidersIcon,
    title: 'Full Control Panel',
    description: 'Manage mods, plugins, server settings and player permissions through a clean web dashboard — no SSH needed.',
    color: '#c084fc',
    bg: 'rgba(192,132,252,0.08)',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Real humans respond within minutes. Our game-server specialists are online around the clock to help you.',
    color: '#fb923c',
    bg: 'rgba(251,146,60,0.08)',
  },
];

const FeatureCard: FC<{ feature: Feature; index: number }> = ({ feature, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut', delay: (index % 3) * 0.08 }}
      className="group relative flex flex-col gap-4 rounded-2xl border border-border/50 bg-surface p-6 transition-colors duration-300 hover:border-border"
    >
      {/* Icon */}
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: feature.bg, color: feature.color }}
      >
        <Icon size={20} />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5">
        <h3 className="space-grotesk text-base font-semibold text-foreground">{feature.title}</h3>
        <p className="text-sm leading-relaxed text-foreground/45">{feature.description}</p>
      </div>
    </motion.div>
  );
};

const Features: FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="features" className="relative py-24 px-4">

      {/* Subtle divider glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 max-w-lg"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)' }}
      />

      <div className="mx-auto max-w-[1280px]">

        {/* Section header */}
        <div ref={ref} className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary-400"
          >
            Why GameNest
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="space-grotesk text-4xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            Everything you need
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-3 max-w-lg mx-auto text-base text-foreground/45"
          >
            We handle the infrastructure so your squad can focus on playing.
          </motion.p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
