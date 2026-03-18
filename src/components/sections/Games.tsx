import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { UsersIcon, ArrowRightIcon } from 'lucide-react';
import type { FC } from 'react';

interface Game {
  id: string;
  name: string;
  genre: string;
  maxPlayers: number;
  image: string;
  accentColor: string;
}

const GAMES: Game[] = [
  {
    id: 'valheim',
    name: 'Valheim',
    genre: 'Viking Survival',
    maxPlayers: 10,
    image: '/game-saas/games/valheim.jpg',
    accentColor: '#22c55e',
  },
  {
    id: '7dtd',
    name: '7 Days to Die',
    genre: 'Zombie Survival',
    maxPlayers: 8,
    image: '/game-saas/games/7dtd.jpg',
    accentColor: '#f97316',
  },
  {
    id: 'project-zomboid',
    name: 'Project Zomboid',
    genre: 'Isometric Survival RPG',
    maxPlayers: 32,
    image: '/game-saas/games/project-zomboid.jpg',
    accentColor: '#a3e635',
  },
  {
    id: 'enshrouded',
    name: 'Enshrouded',
    genre: 'Action RPG Survival',
    maxPlayers: 16,
    image: '/game-saas/games/enshrouded.png',
    accentColor: '#a78bfa',
  },
];

const GameCard: FC<{ game: Game; index: number }> = ({ game, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 transition-all duration-300 hover:border-border hover:shadow-[0_8px_40px_rgba(0,0,0,0.7)]"
    >
      {/* Cover image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={game.image}
          alt={game.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Dark gradient overlay so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Players badge — top right */}
        <div
          className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold backdrop-blur-sm"
          style={{
            borderColor: `${game.accentColor}40`,
            color: game.accentColor,
            backgroundColor: 'rgba(0,0,0,0.55)',
          }}
        >
          <UsersIcon size={10} />
          {game.maxPlayers} players
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 bg-surface p-5">
        <div>
          <h3 className="space-grotesk text-lg font-bold text-foreground leading-tight">{game.name}</h3>
          <p className="text-xs font-medium mt-0.5" style={{ color: game.accentColor }}>{game.genre}</p>
        </div>

        {/* CTA */}
        <a
          href="#"
          className="flex items-center justify-between rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-200 group/btn"
          style={{
            borderColor: `${game.accentColor}25`,
            color: game.accentColor,
            backgroundColor: `${game.accentColor}08`,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.backgroundColor = `${game.accentColor}18`;
            (e.currentTarget as HTMLElement).style.borderColor = `${game.accentColor}50`;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.backgroundColor = `${game.accentColor}08`;
            (e.currentTarget as HTMLElement).style.borderColor = `${game.accentColor}25`;
          }}
        >
          Get a Server
          <ArrowRightIcon size={14} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />
        </a>
      </div>
    </motion.div>
  );
};

const Games: FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="games" className="relative py-24 px-4">
      <div className="mx-auto max-w-[1280px]">

        {/* Section header */}
        <div ref={ref} className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary-400"
          >
            Supported Games
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="space-grotesk text-4xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            Pick your world
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-3 text-base text-foreground/45"
          >
            More games are on the way. Request yours in our Discord.
          </motion.p>
        </div>

        {/* Game cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {GAMES.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Games;
