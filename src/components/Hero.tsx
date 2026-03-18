import { motion } from 'motion/react';
import { UsersIcon, ArrowRightIcon } from 'lucide-react';
import type { FC } from 'react';

const GAMES = [
  {
    id: 'valheim',
    name: 'Valheim',
    genre: 'Viking Survival',
    maxPlayers: 10,
    image: '/game-saas/games/valheim.jpg',
    accent: '#22c55e',
  },
  {
    id: '7dtd',
    name: '7 Days to Die',
    genre: 'Zombie Survival',
    maxPlayers: 8,
    image: '/game-saas/games/7dtd.jpg',
    accent: '#f97316',
  },
  {
    id: 'project-zomboid',
    name: 'Project Zomboid',
    genre: 'Isometric Survival RPG',
    maxPlayers: 32,
    image: '/game-saas/games/project-zomboid.jpg',
    accent: '#a3e635',
  },
  {
    id: 'enshrouded',
    name: 'Enshrouded',
    genre: 'Action RPG Survival',
    maxPlayers: 16,
    image: '/game-saas/games/enshrouded.png',
    accent: '#a78bfa',
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: 'easeOut' as const, delay },
});

const Hero: FC = () => (
  <section id="hero" className="relative overflow-hidden px-4 pt-28 pb-16">

    {/* Background glows */}
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
      />
      <div
        className="absolute right-1/4 top-1/3 h-[350px] w-[350px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.6) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>

    <div className="relative z-10 mx-auto w-full max-w-[1280px] flex flex-col items-center">

      {/* Compact headline block */}
      <div className="mb-10 text-center flex flex-col items-center">
        <motion.h1
          {...fadeUp(0.12)}
          className="space-grotesk text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
        >
          You just{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(135deg, #60a5fa 0%, #06b6d4 100%)' }}
          >
            launch the game.
          </span>
          <br />We handle the rest.
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="mt-4 max-w-lg text-base text-center w-full leading-relaxed text-foreground/45 md:text-lg"
        >
          No port forwarding. No config files. Pick your game below —
          your private server is live in under 60 seconds.
        </motion.p>
      </div>

      {/* Game cards — the main focus */}
      <div className="grid w-full grid-cols-2 gap-4 xl:grid-cols-4">
        {GAMES.map((game, i) => (
          <motion.a
            key={game.id}
            href="#"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.28 + i * 0.09 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-[0_12px_48px_rgba(0,0,0,0.7)] hover:-translate-y-1"
          >
            {/* Cover image */}
            <div className="relative aspect-video overflow-hidden">
              <img
                src={game.image}
                alt={game.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Players badge — top right */}
              <div
                className="absolute top-3 right-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm"
                style={{
                  color: game.accent,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                }}
              >
                <UsersIcon size={10} />
                {game.maxPlayers}p
              </div>

              {/* "Get Server" button — appears on hover, slides up from bottom */}
              <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 px-4 pb-4">
                <div
                  className="flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-bold backdrop-blur-sm"
                  style={{
                    backgroundColor: `${game.accent}28`,
                    color: game.accent,
                  }}
                >
                  Get a Server <ArrowRightIcon size={13} />
                </div>
              </div>
            </div>

            {/* Card footer */}
            <div className="flex flex-col gap-0.5 bg-surface px-4 py-3.5 min-w-0">
              <span className="space-grotesk text-sm font-bold text-foreground leading-tight truncate">{game.name}</span>
              <span className="text-xs font-medium truncate" style={{ color: `${game.accent}bb` }}>{game.genre}</span>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Trust line */}
      <motion.p
        {...fadeUp(0.65)}
        className="mt-6 text-xs text-muted"
      >
        No tech skills needed &nbsp;·&nbsp; Live in under 60s &nbsp;·&nbsp; Cancel anytime
      </motion.p>
    </div>
  </section>
);

export default Hero;
