import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ServerIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853" />
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335" />
    </svg>
  );
}

export default function LoginPage() {
  const { loginWithGoogle, isAuthenticated, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname ?? '/dashboard';

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

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
          <h1 className="space-grotesk mb-1 text-xl font-bold text-foreground">Welcome</h1>
          <p className="mb-6 text-sm text-foreground/40">Sign in to manage your game servers</p>

          {import.meta.env.VITE_MOCK_AUTH === 'true' && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
              <p className="text-xs text-amber-400/80">Mock auth — no backend required</p>
            </div>
          )}

          <button
            onClick={() => loginWithGoogle()}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 py-3 text-sm font-medium text-foreground transition-all hover:bg-white/[0.10] hover:border-white/[0.20] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <GoogleIcon />
            {isLoading ? 'Signing in…' : 'Continue with Google'}
          </button>

          {error && (
            <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-xs text-red-400">
              {error}
            </p>
          )}
        </div>

        <p className="mt-5 text-center text-xs text-foreground/25">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>

      </div>
    </div>
  );
}
