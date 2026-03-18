import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { CheckIcon, ZapIcon } from 'lucide-react';
import Button from '@/components/ui/Button.tsx';
import type { FC } from 'react';

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

const PLANS: Plan[] = [
  {
    name: 'Starter',
    price: '$6',
    period: '/ month',
    description: 'Perfect for a small group of friends getting started.',
    features: [
      '4 vCPU cores',
      '8 GB RAM',
      '30 GB NVMe SSD',
      'Up to 10 players',
      'Daily backups',
      'Basic DDoS protection',
      'Community support',
    ],
    cta: 'Get Starter',
  },
  {
    name: 'Pro',
    price: '$14',
    period: '/ month',
    description: 'For larger communities that need reliable performance.',
    features: [
      '8 vCPU cores',
      '16 GB RAM',
      '80 GB NVMe SSD',
      'Up to 32 players',
      'Hourly backups',
      'Advanced DDoS protection',
      'Priority support',
      'Custom domain',
      'Mod manager',
    ],
    cta: 'Get Pro',
    popular: true,
  },
  {
    name: 'Max',
    price: '$28',
    period: '/ month',
    description: 'Maximum power for large communities and streamers.',
    features: [
      '16 vCPU cores',
      '32 GB RAM',
      '200 GB NVMe SSD',
      'Unlimited players',
      'Real-time backups',
      'Premium DDoS protection',
      '24/7 dedicated support',
      'Custom domain',
      'Mod manager',
      'Multiple server instances',
    ],
    cta: 'Get Max',
  },
];

const PricingCard: FC<{ plan: Plan; index: number }> = ({ plan, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.1 }}
      className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-300 ${
        plan.popular
          ? 'border-primary-500/50 bg-gradient-to-b from-surface-2 to-surface shadow-[0_0_50px_rgba(59,130,246,0.12)]'
          : 'border-border/50 bg-surface hover:border-border'
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-500 px-3.5 py-1 text-xs font-bold text-white shadow-[0_0_16px_rgba(59,130,246,0.5)]">
            <ZapIcon size={10} />
            Most Popular
          </span>
        </div>
      )}

      {/* Plan name + price */}
      <div className="mb-6">
        <p className="space-grotesk text-sm font-semibold text-foreground/50 uppercase tracking-widest mb-1">{plan.name}</p>
        <div className="flex items-end gap-1 mb-2">
          <span className="space-grotesk text-4xl font-bold text-foreground">{plan.price}</span>
          <span className="text-sm text-muted pb-1">{plan.period}</span>
        </div>
        <p className="text-sm text-foreground/45">{plan.description}</p>
      </div>

      {/* CTA */}
      <Button
        href="#"
        variant={plan.popular ? 'primary' : 'outline'}
        className="w-full py-2.5 mb-6"
      >
        {plan.cta}
      </Button>

      {/* Features */}
      <ul className="flex flex-col gap-2.5">
        {plan.features.map(feature => (
          <li key={feature} className="flex items-center gap-2.5 text-sm text-foreground/60">
            <CheckIcon size={14} className={plan.popular ? 'text-primary-400 shrink-0' : 'text-foreground/30 shrink-0'} />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Pricing: FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="pricing" className="relative py-24 px-4">

      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 max-w-lg"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)' }}
      />

      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-[1280px]">

        {/* Section header */}
        <div ref={ref} className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary-400"
          >
            Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="space-grotesk text-4xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-3 text-base text-foreground/45"
          >
            No hidden fees. No contracts. Scale up or down anytime.
          </motion.p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        {/* Money back note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-8 text-center text-sm text-muted"
        >
          All plans include a <span className="text-foreground/60">3-day free trial</span>. 30-day money-back guarantee. No questions asked.
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
