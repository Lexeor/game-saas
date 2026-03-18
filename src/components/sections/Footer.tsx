import { ServerIcon, GithubIcon, TwitterIcon } from 'lucide-react';
import type { FC } from 'react';

const LINKS: Record<string, string[]> = {
  Product: ['Features', 'Games', 'Pricing', 'Changelog'],
  Support: ['Documentation', 'Discord Community', 'Status Page', 'Contact Us'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

const Footer: FC = () => (
  <footer className="relative border-t border-border/50 px-4 pt-16 pb-8">

    <div
      className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 max-w-lg"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.35), transparent)' }}
    />

    <div className="mx-auto max-w-[1280px]">
      <div className="grid grid-cols-2 gap-10 md:grid-cols-5 lg:gap-16">

        {/* Brand */}
        <div className="col-span-2">
          <a href="#" className="mb-4 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/15 text-primary-400">
              <ServerIcon size={16} />
            </div>
            <span className="space-grotesk text-base font-bold text-foreground">
              Game<span className="text-primary-400">Nest</span>
            </span>
          </a>
          <p className="text-sm leading-relaxed text-muted max-w-xs">
            High-performance game server hosting for modern survival games. Deploy in seconds, play immediately.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {[GithubIcon, TwitterIcon].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-surface-2 hover:text-foreground/70 transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Nav columns */}
        {Object.entries(LINKS).map(([group, items]) => (
          <div key={group}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground/40">{group}</p>
            <ul className="flex flex-col gap-2.5">
              {items.map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted hover:text-foreground/70 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-6 text-xs text-muted sm:flex-row">
        <span>© {new Date().getFullYear()} GameNest. All rights reserved.</span>
        <span>Made with ♥ for gamers</span>
      </div>
    </div>
  </footer>
);

export default Footer;
