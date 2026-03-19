import { useState } from 'react';
import { PlusIcon, ServerIcon, SearchIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import ServerCard from '@/components/dashboard/ServerCard';
import { MOCK_SERVERS } from '@/lib/servers';
import type { ServerStatus } from '@/lib/servers';

type Filter = 'All' | Capitalize<ServerStatus>;

const FILTERS: Filter[] = ['All', 'Running', 'Stopped'];

export default function ServersPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('All');

  const servers = MOCK_SERVERS.filter((s) => {
    const matchesFilter =
      filter === 'All' || s.status === filter.toLowerCase();
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8 px-6 py-8 md:px-8">

      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="space-grotesk text-2xl font-bold text-foreground">My Servers</h1>
          <p className="mt-1 text-sm text-muted">Manage and monitor your game servers</p>
        </div>
        <Button className="shrink-0 py-2.5 text-sm">
          <PlusIcon size={15} />
          New Server
        </Button>
      </div>

      {/* Filters / search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <SearchIcon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search servers…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/[0.07] bg-surface pl-9 pr-4 py-2.5 text-sm text-foreground placeholder-muted outline-none transition-all focus:border-primary-500/40 focus:ring-2 focus:ring-primary-500/15"
          />
        </div>

        <div className="flex items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={
                filter === f
                  ? 'rounded-lg px-3 py-2 text-xs font-medium bg-primary-500/10 text-primary-400 transition-colors'
                  : 'rounded-lg px-3 py-2 text-xs font-medium text-muted hover:bg-white/[0.05] hover:text-foreground/60 transition-colors'
              }
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Server grid */}
      {servers.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {servers.map((server) => (
            <ServerCard key={server.id} server={server} />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.08] bg-surface/40 px-6 py-20 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-2 text-muted">
            <ServerIcon size={24} />
          </div>
          <h2 className="space-grotesk text-base font-semibold text-foreground/80">No servers found</h2>
          <p className="mt-1.5 max-w-xs text-sm text-muted">
            {search ? 'Try a different search term.' : 'Deploy your first game server and get it running in under 60 seconds.'}
          </p>
          {!search && (
            <Button className="mt-6 py-2.5 text-sm">
              <PlusIcon size={15} />
              Deploy your first server
            </Button>
          )}
        </div>
      )}

    </div>
  );
}
