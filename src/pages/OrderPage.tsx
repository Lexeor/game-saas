import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, UsersIcon, GlobeIcon, ServerIcon, ShieldCheckIcon } from 'lucide-react';
import { useState } from 'react';
import { GAMES } from '@/lib/games';
import Header from '@/components/Header';

const REGIONS = [
  { id: 'eu-central', label: 'Europe (Frankfurt)' },
  { id: 'us-east', label: 'US East (New York)' },
  { id: 'us-west', label: 'US West (Los Angeles)' },
  { id: 'ap-southeast', label: 'Asia (Singapore)' },
];

const PLANS = [
  {
    id: 'starter',
    label: 'Starter',
    price: 4.99,
    ram: '2 GB',
    cpu: '2 vCPU',
    storage: '20 GB SSD',
    maxPlayers: 4,
  },
  {
    id: 'standard',
    label: 'Standard',
    price: 9.99,
    ram: '4 GB',
    cpu: '4 vCPU',
    storage: '50 GB SSD',
    maxPlayers: 16,
    popular: true,
  },
  {
    id: 'pro',
    label: 'Pro',
    price: 19.99,
    ram: '8 GB',
    cpu: '6 vCPU',
    storage: '100 GB SSD',
    maxPlayers: 64,
  },
];

export default function OrderPage() {
  const { gameId } = useParams<{ gameId: string }>();
  const game = GAMES.find((g) => g.id === gameId);

  const [region, setRegion] = useState(REGIONS[0].id);
  const [plan, setPlan] = useState(PLANS[1].id);
  const [serverName, setServerName] = useState('');

  if (!game) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
          <p className="text-2xl font-bold">Game not found</p>
          <Link to="/" className="text-sm text-primary hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const selectedPlan = PLANS.find((p) => p.id === plan)!;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero banner */}
      <div className="relative h-52 overflow-hidden md:h-64">
        <img
          src={game.image}
          alt={game.name}
          className="h-full w-full object-cover object-center"
          style={{ filter: 'brightness(0.35)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />

        {/* Accent glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${game.accent} 0%, transparent 70%)` }}
        />

        <div className="absolute bottom-6 left-0 right-0 mx-auto w-full max-w-[1280px] px-4">
          <Link
            to="/"
            className="mb-3 inline-flex items-center gap-1.5 text-xs text-foreground/50 transition-colors hover:text-foreground/80"
          >
            <ArrowLeftIcon size={12} /> Back
          </Link>
          <div className="flex items-end gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest" style={{ color: game.accent }}>
                {game.genre}
              </p>
              <h1 className="space-grotesk text-3xl font-bold leading-tight md:text-4xl">{game.name}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto w-full max-w-[1280px] px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">

          {/* Left column — configuration */}
          <div className="flex flex-col gap-8">

            {/* Server name */}
            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-foreground/50">
                Server name
              </h2>
              <input
                type="text"
                placeholder={`My ${game.name} Server`}
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                maxLength={32}
                className="w-full rounded-xl border border-white/[0.08] bg-surface px-4 py-3 text-sm text-foreground placeholder-foreground/25 outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20 md:max-w-md"
              />
            </section>

            {/* Region */}
            <section>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-foreground/50">
                <GlobeIcon size={13} /> Region
              </h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {REGIONS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRegion(r.id)}
                    className="rounded-xl border px-3 py-2.5 text-left text-xs font-medium transition-all"
                    style={{
                      borderColor: region === r.id ? game.accent : 'rgba(255,255,255,0.08)',
                      backgroundColor: region === r.id ? `${game.accent}18` : 'rgba(255,255,255,0.03)',
                      color: region === r.id ? game.accent : 'rgba(221,230,255,0.6)',
                    }}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Plans */}
            <section>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-foreground/50">
                <ServerIcon size={13} /> Plan
              </h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {PLANS.map((p) => {
                  const tooFewPlayers = p.maxPlayers < 2;
                  const active = plan === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPlan(p.id)}
                      className="relative flex flex-col rounded-2xl border p-4 text-left transition-all"
                      style={{
                        borderColor: active ? game.accent : 'rgba(255,255,255,0.08)',
                        backgroundColor: active ? `${game.accent}12` : 'rgba(255,255,255,0.02)',
                      }}
                    >
                      {p.popular && (
                        <span
                          className="absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                          style={{ backgroundColor: `${game.accent}30`, color: game.accent }}
                        >
                          Popular
                        </span>
                      )}
                      <span className="space-grotesk text-base font-bold text-foreground">{p.label}</span>
                      <span className="mt-1 text-2xl font-bold" style={{ color: active ? game.accent : 'rgba(221,230,255,0.8)' }}>
                        ${p.price}
                        <span className="text-sm font-normal text-foreground/40">/mo</span>
                      </span>
                      <ul className="mt-3 flex flex-col gap-1 text-xs text-foreground/50">
                        <li>{p.ram} RAM</li>
                        <li>{p.cpu}</li>
                        <li>{p.storage}</li>
                        <li className="flex items-center gap-1">
                          <UsersIcon size={10} />
                          Up to {p.maxPlayers} players
                        </li>
                      </ul>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right column — order summary */}
          <aside className="flex flex-col gap-4">
            <div className="sticky top-24 rounded-2xl border border-white/[0.07] bg-surface p-5">
              <h2 className="mb-4 space-grotesk text-base font-bold">Order Summary</h2>

              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground/50">Game</span>
                  <span className="font-medium">{game.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/50">Plan</span>
                  <span className="font-medium">{selectedPlan.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/50">Region</span>
                  <span className="font-medium">{REGIONS.find((r) => r.id === region)?.label}</span>
                </div>
                {serverName && (
                  <div className="flex justify-between">
                    <span className="text-foreground/50">Server name</span>
                    <span className="max-w-[140px] truncate text-right font-medium">{serverName}</span>
                  </div>
                )}
              </div>

              <div className="my-4 border-t border-white/[0.07]" />

              <div className="flex items-baseline justify-between">
                <span className="text-sm text-foreground/50">Total</span>
                <span className="space-grotesk text-2xl font-bold">
                  ${selectedPlan.price}
                  <span className="text-sm font-normal text-foreground/40">/mo</span>
                </span>
              </div>

              <Link
                to="/signup"
                className="mt-5 flex w-full items-center justify-center rounded-xl py-3 text-sm font-bold transition-all hover:brightness-110 active:scale-[0.98]"
                style={{ backgroundColor: game.accent, color: '#000' }}
              >
                Create account & continue
              </Link>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-foreground/35">
                <ShieldCheckIcon size={11} />
                Cancel anytime · No hidden fees
              </p>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
