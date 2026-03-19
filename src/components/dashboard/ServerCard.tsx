import {
  PlayIcon,
  SquareIcon,
  TerminalIcon,
  SettingsIcon,
  UsersIcon,
  MapPinIcon,
  CopyIcon,
  LoaderIcon,
  CpuIcon,
  ClockIcon,
  MemoryStickIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { GAMES } from '@/lib/games';
import type { RentedServer, ServerStatus } from '@/lib/servers';

const STATUS_CONFIG: Record<ServerStatus, { label: string; dot: string; text: string; bg: string }> = {
  running:  { label: 'Running',  dot: 'bg-emerald-400',             text: 'text-emerald-400',   bg: 'bg-emerald-500/10' },
  stopped:  { label: 'Stopped',  dot: 'bg-foreground/25',           text: 'text-foreground/40', bg: 'bg-white/[0.05]'   },
  starting: { label: 'Starting', dot: 'bg-amber-400 animate-pulse', text: 'text-amber-400',     bg: 'bg-amber-500/10'   },
  stopping: { label: 'Stopping', dot: 'bg-amber-400 animate-pulse', text: 'text-amber-400',     bg: 'bg-amber-500/10'   },
};

const STATS = (server: RentedServer) => [
  {
    icon: UsersIcon,
    label: 'Players',
    value: server.status === 'running'
      ? `${server.players.current} / ${server.players.max}`
      : `— / ${server.players.max}`,
  },
  {
    icon: MapPinIcon,
    label: 'Region',
    value: server.region,
  },
  {
    icon: MemoryStickIcon,
    label: 'RAM',
    value: server.ram,
  },
  {
    icon: server.status === 'running' ? ClockIcon : CpuIcon,
    label: server.status === 'running' ? 'Uptime' : 'CPU',
    value: server.status === 'running' ? (server.uptime ?? '—') : server.cpu,
  },
];

interface ServerCardProps {
  server: RentedServer;
}

export default function ServerCard({ server }: ServerCardProps) {
  const game = GAMES.find((g) => g.id === server.gameId);
  const status = STATUS_CONFIG[server.status];
  const isTransitioning = server.status === 'starting' || server.status === 'stopping';
  const address = `${server.ip}:${server.port}`;

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast.success('Address copied', { description: address });
  };

  const statusBadge = (
    <div className={cn('flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1', status.bg)}>
      {isTransitioning
        ? <LoaderIcon size={9} className={cn('animate-spin', status.text)} />
        : <span className={cn('h-1.5 w-1.5 rounded-full', status.dot)} />
      }
      <span className={cn('text-[10px] font-semibold', status.text)}>{status.label}</span>
    </div>
  );

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-surface shadow-[0_8px_40px_rgba(0,0,0,0.45)] transition-shadow hover:shadow-[0_12px_48px_rgba(0,0,0,0.55)] sm:flex-row">

      {/* ── Mobile: horizontal banner ── Desktop: vertical strip ───── */}
      <div className="relative h-32 w-full shrink-0 overflow-hidden sm:h-auto sm:w-36">
        {game?.image && (
          <img
            src={game.image}
            alt={game.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            style={{ filter: 'brightness(0.28)' }}
          />
        )}

        {/* Mobile gradient: dark at bottom */}
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            background: `linear-gradient(to bottom, ${game?.accent ?? '#3b82f6'}20 0%, transparent 50%, #0c1220 100%)`,
          }}
        />
        {/* Desktop gradient: dark at right */}
        <div
          className="absolute inset-0 hidden sm:block"
          style={{
            background: `linear-gradient(to right, transparent 55%, #0c1220 100%), linear-gradient(to bottom, ${game?.accent ?? '#3b82f6'}28 0%, transparent 55%)`,
          }}
        />

        {/* Mobile: game name + status in banner */}
        <div className="absolute inset-0 flex items-end justify-between p-4 sm:hidden">
          <p
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: game?.accent }}
          >
            {game?.name}
          </p>
          {statusBadge}
        </div>

        {/* Desktop: rotated game name */}
        <div className="absolute inset-0 hidden items-end p-4 sm:flex">
          <p
            className="text-[10px] font-bold uppercase tracking-widest leading-none"
            style={{ color: game?.accent, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {game?.name}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col gap-4 p-5 min-w-0">

        {/* Header: name + status (status hidden on mobile — shown in banner) */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="space-grotesk text-lg font-bold text-foreground leading-tight truncate">
              {server.name}
            </h3>
            <p className="mt-0.5 text-xs text-muted">{server.plan} plan</p>
          </div>
          <div className="hidden sm:block">{statusBadge}</div>
        </div>

        {/* Stats: 1 col on mobile, 2 cols on desktop */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {STATS(server).map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-xl bg-background/50 px-3 py-2.5"
            >
              <Icon size={13} className="shrink-0 text-muted" />
              <div className="min-w-0 flex flex-1 items-center justify-between gap-2 sm:flex-col sm:items-start sm:justify-start">
                <p className="text-[10px] text-muted">{label}</p>
                <p className="truncate text-xs font-medium text-foreground/70">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* IP */}
        <button
          onClick={copyAddress}
          className="flex items-center justify-between rounded-xl bg-background/50 px-3.5 py-2.5 transition-colors hover:bg-background/80"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted">IP</span>
            <span className="font-mono text-xs text-foreground/55">{address}</span>
          </div>
          <CopyIcon size={12} className="shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
        </button>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            disabled={isTransitioning}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all',
              'disabled:cursor-not-allowed disabled:opacity-40',
              server.status === 'running'
                ? 'bg-red-500/12 text-red-400 hover:bg-red-500/20'
                : 'bg-emerald-500/12 text-emerald-400 hover:bg-emerald-500/20',
            )}
          >
            {server.status === 'running'
              ? <><SquareIcon size={14} />Stop server</>
              : <><PlayIcon size={14} />Start server</>
            }
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-background/50 px-4 py-2.5 text-sm font-medium text-foreground/50 transition-colors hover:bg-background/80 hover:text-foreground/75">
            <TerminalIcon size={14} />
            Console
          </button>

          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background/50 text-muted transition-colors hover:bg-background/80 hover:text-foreground/60">
            <SettingsIcon size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}
