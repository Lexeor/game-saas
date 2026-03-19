import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  ServerIcon,
  CreditCardIcon,
  SettingsIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { to: '/dashboard/servers', icon: ServerIcon, label: 'Servers' },
  { to: '/dashboard/billing', icon: CreditCardIcon, label: 'Billing' },
  { to: '/dashboard/settings', icon: SettingsIcon, label: 'Settings' },
];

function Sidebar({ onClose }: { onClose?: () => void }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className="flex h-full w-56 flex-col border-r border-white/[0.06] bg-surface">
      {/* Logo */}
      <div className="flex h-14 shrink-0 items-center gap-2.5 px-5 border-b border-white/[0.06]">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-500/15 text-primary-400">
          <ServerIcon size={14} />
        </div>
        <span className="space-grotesk text-sm font-bold tracking-tight text-foreground">
          Game<span className="text-primary-400">Nest</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
        <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted">
          Management
        </p>
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-500/10 text-primary-400'
                  : 'text-foreground/50 hover:bg-white/[0.05] hover:text-foreground/80',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={15} className={isActive ? 'text-primary-400' : 'text-current'} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User card */}
      <div className="shrink-0 border-t border-white/[0.06] p-3">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
          {/* Avatar */}
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-500/20 text-xs font-bold text-primary-400">
            {user?.name?.charAt(0).toUpperCase() ?? '?'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground/80">{user?.name}</p>
            <p className="truncate text-[11px] text-muted">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="shrink-0 rounded-lg p-1.5 text-muted transition-colors hover:bg-white/[0.06] hover:text-foreground/60"
            title="Log out"
          >
            <LogOutIcon size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 z-50 flex">
            <Sidebar onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Mobile topbar */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b border-white/[0.06] px-4 md:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground/50 hover:text-foreground transition-colors"
          >
            {mobileOpen ? <XIcon size={18} /> : <MenuIcon size={18} />}
          </button>
          <span className="space-grotesk text-sm font-bold tracking-tight text-foreground">
            Game<span className="text-primary-400">Nest</span>
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
