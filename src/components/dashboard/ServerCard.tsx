import {
  PlayIcon,
  SquareIcon,
  TerminalIcon,
  SettingsIcon,
  UsersIcon,
  MapPinIcon,
  CopyIcon,
  LoaderIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { GAMES } from '@/lib/games';
import type { RentedServer, ServerStatus } from '@/lib/servers';

const STATUS_CONFIG: Record<ServerStatus, { label: string; dot: string; text: string }> = {
  running:  { label: 'Running',  dot: 'bg-emerald-400',             text: 'text-emerald-400' },
  stopped:  { label: 'Stopped',  dot: 'bg-foreground/20',           text: 'text-foreground/40' },
  starting: { label: 'Starting', dot: 'bg-amber-400 animate-pulse', text: 'text-amber-400' },
  stopping: { label: 'Stopping', dot: 'bg-amber-400 animate-pulse', text: 'text-amber-400' },
};

interface ServerCardProps {
  server: RentedServer;
}

export default function ServerCard({ server }: ServerCardProps) {
  const game = GAMES.find((g) => g.id === server.gameId);
  const status = STATUS_CONFIG[server.status];
  const address = `${server.ip}:${server.port}`;

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast.success('Address copied', { description: address });
  };

  const isTransitioning = server.status === 'starting' || server.status === 'stopping';

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-surface transition-colors hover:border-white/[0.12]">

      {/* Game banner */}
      <div className="relative h-24 overflow-hidden">
        {game?.image && (
          <img
            src={game.image}
            alt={game.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            style={{ filter: 'brightness(0.3)' }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, ${game?.accent ?? '#3b82f6'}18 0%, transparent 60%, #0c1220 100%)` }}
        />

        {/* Game label */}
        <div className="absolute bottom-3 left-4">
          <p
            className="text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: game?.accent }}
          >
            {game?.name}
          </p>
        </div>

        {/* Status badge */}
        <div className="absolute right-3 top-3">
          <div className={cn(
            'flex items-center gap-1.5 rounded-full border px-2.5 py-1',
            'bg-background/70 backdrop-blur-sm',
            server.status === 'running'
              ? 'border-emerald-500/25'
              : server.status === 'stopped'
              ? 'border-white/[0.08]'
              : 'border-amber-500/25',
          )}>
            {isTransitioning ? (
              <LoaderIcon size={9} className={cn('animate-spin', status.text)} />
            ) : (
              <span className={cn('h-1.5 w-1.5 rounded-full', status.dot)} />
            )}
            <span className={cn('text-[10px] font-semibold', status.text)}>{status.label}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-4">

        {/* Server name */}
        <div>
          <h3 className="space-grotesk text-base font-bold text-foreground leading-tight">
            {server.name}
          </h3>
          <p className="mt-0.5 text-xs text-muted">{server.plan} · {server.ram} RAM · {server.cpu}</p>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <UsersIcon size={11} />
            <span>
              {server.status === 'running'
                ? <><span className="text-foreground/70">{server.players.current}</span>/{server.players.max}</>
                : <span>—/{server.players.max}</span>
              }
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <MapPinIcon size={11} />
            {server.region}
          </span>
        </div>

        {/* IP address */}
        <button
          onClick={copyAddress}
          className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-background/60 px-3 py-2 transition-colors hover:border-white/[0.14] hover:bg-background/80"
        >
          <span className="font-mono text-xs text-foreground/50">{address}</span>
          <CopyIcon size={12} className="shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
        </button>

      </div>

      {/* Footer actions */}
      <div className="flex items-center gap-2 border-t border-white/[0.06] px-4 py-3">
        {/* Start / Stop */}
        <button
          disabled={isTransitioning}
          className={cn(
            'flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-xs font-semibold transition-all',
            'disabled:cursor-not-allowed disabled:opacity-40',
            server.status === 'running'
              ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
              : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20',
          )}
        >
          {server.status === 'running'
            ? <><SquareIcon size={12} /> Stop</>
            : <><PlayIcon size={12} /> Start</>
          }
        </button>

        {/* Console */}
        <button className="flex items-center gap-1.5 rounded-xl border border-white/[0.07] px-3 py-2 text-xs font-medium text-foreground/50 transition-colors hover:border-white/[0.14] hover:text-foreground/80">
          <TerminalIcon size={12} />
          Console
        </button>

        {/* Settings */}
        <button className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.07] text-muted transition-colors hover:border-white/[0.14] hover:text-foreground/60">
          <SettingsIcon size={13} />
        </button>
      </div>

    </div>
  );
}
