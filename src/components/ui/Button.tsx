import { cn } from '@/lib/utils.ts';
import type { FC, PropsWithChildren } from 'react';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'outline' | 'ghost';
}

const VARIANTS = {
  primary: {
    base: 'bg-primary-500 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.3),0_0_20px_rgba(59,130,246,0.35)] hover:bg-primary-600 active:bg-primary-700 hover:shadow-[0_0_28px_rgba(59,130,246,0.5)]',
    stitch: 'border-primary-400/40',
  },
  outline: {
    base: 'bg-transparent text-foreground border border-border hover:border-primary-500/60 hover:text-primary-400 hover:bg-primary-500/5',
    stitch: null,
  },
  ghost: {
    base: 'bg-white/5 text-foreground/70 hover:bg-white/10 hover:text-foreground',
    stitch: null,
  },
};

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  href,
  onClick,
  className,
  type = 'button',
  variant = 'primary',
  children,
}) => {
  const v = VARIANTS[variant];

  const base = cn(
    'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3',
    'text-sm font-semibold',
    'transition-all duration-200',
    variant === 'primary' && 'grainy',
    v.base,
    className,
  );

  const content = (
    <>
      {v.stitch && (
        <span
          className={cn('pointer-events-none absolute inset-[3px] rounded-lg border border-dashed', v.stitch)}
          aria-hidden
        />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) return <a href={href} className={base}>{content}</a>;

  return (
    <button type={type} onClick={onClick} className={base}>
      {content}
    </button>
  );
};

export default Button;
