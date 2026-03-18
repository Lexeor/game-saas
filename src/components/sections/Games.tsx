import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { UsersIcon, ArrowRightIcon } from 'lucide-react';
import type { FC } from 'react';

interface Game {
  id: string;
  name: string;
  genre: string;
  maxPlayers: number;
  description: string;
  tags: string[];
  gradient: string;
  glowColor: string;
  accentColor: string;
  gridPattern: string;
}

const GAMES: Game[] = [
  {
    id: 'valheim',
    name: 'Valheim',
    genre: 'Viking Survival',
    maxPlayers: 10,
    description: 'Explore a vast procedurally generated Norse world. Build, craft and conquer mythical enemies with your friends in this epic survival adventure.',
    tags: ['Survival', 'Co-op', 'Open World'],
    gradient: 'from-[#0d2018] via-[#0a1a14] to-[#07120e]',
    glowColor: 'rgba(34, 197, 94, 0.15)',
    accentColor: '#22c55e',
    gridPattern: 'rgba(34,197,94,0.08)',
  },
  {
    id: '7dtd',
    name: '7 Days to Die',
    genre: 'Zombie Survival',
    maxPlayers: 8,
    description: 'Survive relentless zombie hordes in a brutal post-apocalyptic world. Mine, craft, build fortifications and endure the deadly 7th night bloodmoon.',
    tags: ['Horror', 'Crafting', 'Tower Defense'],
    gradient: 'from-[#200e04] via-[#180b04] to-[#0f0803]',
    glowColor: 'rgba(234, 88, 12, 0.18)',
    accentColor: '#f97316',
    gridPattern: 'rgba(249,115,22,0.07)',
  },
  {
    id: 'project-zomboid',
    name: 'Project Zomboid',
    genre: 'Isometric Survival RPG',
    maxPlayers: 32,
    description: 'The most realistic zombie apocalypse sim on the market. Scavenge, build and survive with up to 32 players in this deep, unforgiving world.',
    tags: ['RPG', 'Isometric', 'Hardcore'],
    gradient: 'from-[#141e0c] via-[#101808] to-[#0c1207]',
    glowColor: 'rgba(163, 230, 53, 0.12)',
    accentColor: '#a3e635',
    gridPattern: 'rgba(163,230,53,0.06)',
  },
  {
    id: 'enshrouded',
    name: 'Enshrouded',
    genre: 'Action RPG Survival',
    maxPlayers: 16,
    description: 'Reclaim a kingdom consumed by deadly fog. Gather your allies to build, craft, fight and explore the massive open world of Embervale.',
    tags: ['Action RPG', 'Building', 'Fantasy'],
    gradient: 'from-[#150b2a] via-[#0f0820] to-[#090516]',
    glowColor: 'rgba(167, 139, 250, 0.18)',
    accentColor: '#a78bfa',
    gridPattern: 'rgba(167,139,250,0.07)',
  },
];

const GameCard: FC<{ game: Game; index: number }> = ({ game, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.1 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b ${game.gradient} transition-all duration-300 hover:border-border hover:shadow-[0_0_40px_rgba(0,0,0,0.6)]`}
      style={{ '--glow': game.glowColor } as React.CSSProperties}
    >
      {/* Glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${game.glowColor}, transparent)` }}
      />

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${game.gridPattern} 1px, transparent 1px), linear-gradient(90deg, ${game.gridPattern} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Visual area */}
      <div className="relative flex h-36 items-end justify-between px-6 pt-6 pb-0">
        {/* Big game initial */}
        <span
          className="space-grotesk select-none text-8xl font-black leading-none opacity-[0.07] group-hover:opacity-[0.11] transition-opacity duration-300"
          style={{ color: game.accentColor }}
        >
          {game.name[0]}
        </span>

        {/* Players badge */}
        <div
          className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-sm"
          style={{ borderColor: `${game.accentColor}30`, color: game.accentColor, backgroundColor: `${game.accentColor}10` }}
        >
          <UsersIcon size={11} />
          up to {game.maxPlayers} players
        </div>
      </div>

      {/* Content */}
      <div className="relative flex flex-1 flex-col gap-3 p-6 pt-4">
        {/* Name + genre */}
        <div>
          <h3 className="space-grotesk text-xl font-bold text-foreground">{game.name}</h3>
          <p className="text-xs font-medium" style={{ color: game.accentColor }}>{game.genre}</p>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-foreground/45">{game.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {game.tags.map(tag => (
            <span
              key={tag}
              className="rounded-md px-2.5 py-0.5 text-xs font-medium"
              style={{ backgroundColor: `${game.accentColor}12`, color: `${game.accentColor}cc` }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#pricing"
          className="mt-3 flex items-center justify-between rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-200 group/btn"
          style={{
            borderColor: `${game.accentColor}25`,
            color: game.accentColor,
            backgroundColor: `${game.accentColor}08`,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.backgroundColor = `${game.accentColor}15`;
            (e.currentTarget as HTMLElement).style.borderColor = `${game.accentColor}45`;
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
