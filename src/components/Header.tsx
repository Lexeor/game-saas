import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuIcon, XIcon, ServerIcon } from 'lucide-react';
import Button from '@/components/ui/Button.tsx';
import { Link } from 'react-router-dom';
import type { FC } from 'react';

const NAV_LINKS = [
  { label: 'Games', href: '#games' },
  { label: 'Features', href: '#features' },
];

const Header: FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <div className="flex w-full max-w-[1280px] items-center justify-between rounded-2xl bg-surface/80 px-5 py-3 shadow-[0_4px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/15 text-primary-400">
            <ServerIcon size={16} />
          </div>
          <span className="space-grotesk text-base font-bold tracking-tight text-foreground">
            Game<span className="text-primary-400">Nest</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/50 hover:text-foreground transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-foreground/50 hover:text-foreground transition-colors duration-150"
          >
            Log in
          </Link>
          <Button href="#games" className="hidden sm:inline-flex px-4 py-2 text-xs">
            Get Started
          </Button>
          <button
            className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg bg-surface-2 text-foreground/60 hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <XIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-4 right-4 top-20 rounded-2xl bg-surface/95 backdrop-blur-xl px-4 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-foreground/60 hover:bg-surface-2 hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 pt-2 flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-foreground/60 hover:bg-surface-2 hover:text-foreground transition-colors text-center"
                >
                  Log in
                </Link>
                <Button href="#games" className="w-full py-2.5 text-sm">
                  Get Started
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
