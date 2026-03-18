import { motion } from 'motion/react';
import { ArrowRightIcon, ZapIcon, ShieldCheckIcon, HeadphonesIcon, GamepadIcon } from 'lucide-react';
import Button from '@/components/ui/Button.tsx';
import type { FC } from 'react';

const STATS = [
  { icon: ShieldCheckIcon, value: '99.9%', label: 'Uptime SLA' },
  { icon: ZapIcon,         value: '<60s',  label: 'Server Deploy' },
  { icon: GamepadIcon,     value: '4',     label: 'Games Supported' },
  { icon: HeadphonesIcon,  value: '24/7',  label: 'Expert Support' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' as const, delay },
});

const Hero: FC = () => (
  <section id="hero" className="relative flex min-h-screen flex-col overflow-hidden">

    {/* Background glows */}
    <div className="pointer-events-none absolute inset-0">
      {/* Center-left blue glow */}
      <div
        className="absolute left-1/4 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
      />
      {/* Right purple glow */}
      <div
        className="absolute right-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>

    {/* Content */}
    <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col px-4">
      <div className="flex flex-1 flex-col items-center justify-center pt-28 pb-8 text-center">

        {/* Badge */}
        <motion.div {...fadeUp(0.05)} className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/25 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-400">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-400 animate-pulse" />
            Next-gen game server hosting
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.12)}
          className="space-grotesk max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight md:text-6xl lg:text-7xl"
        >
          Deploy your{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(135deg, #60a5fa 0%, #06b6d4 100%)' }}
          >
            game server
          </span>
          <br />in seconds
        </motion.h1>

        {/* Description */}
        <motion.p
          {...fadeUp(0.22)}
          className="mt-6 max-w-xl text-base leading-relaxed text-foreground/50 md:text-lg"
        >
          High-performance dedicated servers for your favourite survival games.
          One-click setup, instant deployment, full control — no IT skills required.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.32)} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="#pricing" className="px-6 py-3 text-sm">
            Start Hosting
            <ArrowRightIcon size={15} />
          </Button>
          <Button href="#games" variant="outline" className="px-6 py-3 text-sm">
            Browse Games
          </Button>
        </motion.div>

        {/* Trust line */}
        <motion.p {...fadeUp(0.4)} className="mt-5 text-xs text-muted">
          No credit card required &nbsp;·&nbsp; Cancel anytime &nbsp;·&nbsp; Free trial available
        </motion.p>
      </div>

      {/* Stats bar */}
      <motion.div
        className="mb-6 overflow-hidden rounded-2xl border border-border/60 bg-surface/60 backdrop-blur-md"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
      >
        <div className="grid grid-cols-2 divide-x divide-border/50 lg:grid-cols-4">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 px-6 py-5 text-center">
              <Icon size={16} className="text-primary-400 mb-0.5" />
              <span className="space-grotesk text-2xl font-bold text-foreground lg:text-3xl">{value}</span>
              <span className="text-xs text-muted">{label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>

  </section>
);

export default Hero;
