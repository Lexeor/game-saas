import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ServerIcon } from 'lucide-react';
import Button from '@/components/ui/Button.tsx';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // auth logic goes here later
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">

      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-sm">

        {/* Logo */}
        <Link to="/" className="mb-8 flex items-center justify-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500/15 text-primary-400">
            <ServerIcon size={18} />
          </div>
          <span className="space-grotesk text-lg font-bold tracking-tight text-foreground">
            Game<span className="text-primary-400">Nest</span>
          </span>
        </Link>

        {/* Card */}
        <div className="rounded-2xl bg-surface p-8 shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
          <h1 className="space-grotesk mb-1 text-xl font-bold text-foreground">Welcome back</h1>
          <p className="mb-6 text-sm text-foreground/40">Log in to manage your servers</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground/50">Email</label>
              <input
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl border border-white/[0.08] bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder-foreground/20 transition-all focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-foreground/50">Password</label>
                <a href="#" className="text-xs text-foreground/40 hover:text-foreground/70 transition-colors">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl border border-white/[0.08] bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder-foreground/20 transition-all focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            <Button type="submit" className="mt-1 w-full py-2.5 text-sm">
              Log in
            </Button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-foreground/35">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary-400 hover:text-primary-300 transition-colors">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}
