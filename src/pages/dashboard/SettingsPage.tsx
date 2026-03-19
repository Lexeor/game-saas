import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  MonitorIcon,
  BellIcon,
  ShieldIcon,
  LogOutIcon,
  Trash2Icon,
  CheckIcon,
  ChromeIcon,
  LaptopIcon,
  SmartphoneIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

// ─── schemas ─────────────────────────────────────────────────────────────────

const profileSchema = z.object({
  displayName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(32, 'Name must be 32 characters or less'),
});

const notificationsSchema = z.object({
  serverOnline:  z.boolean(),
  serverOffline: z.boolean(),
  serverCrash:   z.boolean(),
  billing:       z.boolean(),
  newsletter:    z.boolean(),
});

type ProfileValues       = z.infer<typeof profileSchema>;
type NotificationsValues = z.infer<typeof notificationsSchema>;

// ─── mock sessions ────────────────────────────────────────────────────────────

const MOCK_SESSIONS = [
  { id: 's1', device: 'Chrome on macOS',  icon: ChromeIcon,     location: 'Frankfurt, DE', lastActive: 'Now',          current: true  },
  { id: 's2', device: 'Chrome on Windows', icon: LaptopIcon,    location: 'Moscow, RU',    lastActive: '2 days ago',   current: false },
  { id: 's3', device: 'Safari on iPhone',  icon: SmartphoneIcon, location: 'Moscow, RU',   lastActive: '5 days ago',   current: false },
];

// ─── helpers ──────────────────────────────────────────────────────────────────

function SectionHeader({ icon: Icon, title, description }: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-foreground/40">
        <Icon size={15} />
      </div>
      <div>
        <h2 className="space-grotesk text-sm font-bold text-foreground">{title}</h2>
        <p className="mt-0.5 text-xs text-muted">{description}</p>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200',
        checked ? 'bg-primary-500' : 'bg-white/[0.1]',
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200',
          checked ? 'translate-x-4' : 'translate-x-0',
        )}
      />
    </button>
  );
}

function SaveButton({ isSubmitting, saved }: { isSubmitting: boolean; saved: boolean }) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={cn(
        'flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold transition-all',
        saved
          ? 'bg-emerald-500/15 text-emerald-400'
          : 'bg-primary-500/15 text-primary-400 hover:bg-primary-500/25 disabled:opacity-50',
      )}
    >
      {saved ? <><CheckIcon size={13} /> Saved</> : isSubmitting ? 'Saving…' : 'Save changes'}
    </button>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileSaved, setProfileSaved]   = useState(false);
  const [notifSaved,   setNotifSaved]     = useState(false);
  const [deleteInput,  setDeleteInput]    = useState('');
  const [sessions,     setSessions]       = useState(MOCK_SESSIONS);

  // ── profile form ──
  const profile = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { displayName: user?.name ?? '' },
  });

  const onProfileSubmit = async (_data: ProfileValues) => {
    await new Promise((r) => setTimeout(r, 600));
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  // ── notifications form ──
  const notif = useForm<NotificationsValues>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: {
      serverOnline:  true,
      serverOffline: true,
      serverCrash:   true,
      billing:       true,
      newsletter:    false,
    },
  });

  const onNotifSubmit = async (_data: NotificationsValues) => {
    await new Promise((r) => setTimeout(r, 600));
    setNotifSaved(true);
    setTimeout(() => setNotifSaved(false), 2500);
  };

  const revokeSession = (id: string) => setSessions((s) => s.filter((x) => x.id !== id));

  const handleDeleteAccount = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col gap-6 px-6 py-8 md:px-8 max-w-2xl">

      <div>
        <h1 className="space-grotesk text-2xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted">Manage your account preferences</p>
      </div>

      {/* ── Profile ─────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-5 rounded-2xl border border-white/[0.07] bg-surface p-6">
        <SectionHeader
          icon={MonitorIcon}
          title="Profile"
          description="Your public display name shown on server dashboards"
        />

        {/* Google account pill */}
        <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-background/50 px-4 py-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500/20 text-sm font-bold text-primary-400">
            {user?.name?.charAt(0).toUpperCase() ?? '?'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground/80">{user?.email}</p>
            <p className="text-xs text-muted">Connected via Google</p>
          </div>
        </div>

        <form onSubmit={profile.handleSubmit(onProfileSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-foreground/50">Display name</label>
            <input
              {...profile.register('displayName')}
              className={cn(
                'rounded-xl border bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder-muted outline-none transition-all',
                profile.formState.errors.displayName
                  ? 'border-red-500/40 focus:ring-2 focus:ring-red-500/20'
                  : 'border-white/[0.08] focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20',
              )}
              placeholder="Your name"
            />
            {profile.formState.errors.displayName && (
              <p className="text-xs text-red-400">{profile.formState.errors.displayName.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <SaveButton
              isSubmitting={profile.formState.isSubmitting}
              saved={profileSaved}
            />
          </div>
        </form>
      </section>

      {/* ── Notifications ────────────────────────────────────────────── */}
      <section className="flex flex-col gap-5 rounded-2xl border border-white/[0.07] bg-surface p-6">
        <SectionHeader
          icon={BellIcon}
          title="Notifications"
          description="Choose which events trigger email notifications"
        />

        <form onSubmit={notif.handleSubmit(onNotifSubmit)} className="flex flex-col gap-1">
          {(
            [
              { name: 'serverOnline',  label: 'Server comes online',     desc: 'When a server finishes starting up'  },
              { name: 'serverOffline', label: 'Server goes offline',      desc: 'When a server stops or shuts down'   },
              { name: 'serverCrash',   label: 'Server crash or error',    desc: 'When a server crashes unexpectedly'  },
              { name: 'billing',       label: 'Billing & invoices',       desc: 'New invoices and payment activity'   },
              { name: 'newsletter',    label: 'Product updates',          desc: 'New features and announcements'      },
            ] as const
          ).map(({ name, label, desc }, i, arr) => (
            <div
              key={name}
              className={cn(
                'flex items-center justify-between gap-4 py-3.5',
                i < arr.length - 1 && 'border-b border-white/[0.05]',
              )}
            >
              <div>
                <p className="text-sm font-medium text-foreground/80">{label}</p>
                <p className="text-xs text-muted">{desc}</p>
              </div>
              <Controller
                control={notif.control}
                name={name}
                render={({ field }) => (
                  <Toggle checked={field.value} onChange={field.onChange} />
                )}
              />
            </div>
          ))}

          <div className="flex justify-end pt-2">
            <SaveButton
              isSubmitting={notif.formState.isSubmitting}
              saved={notifSaved}
            />
          </div>
        </form>
      </section>

      {/* ── Sessions ─────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-5 rounded-2xl border border-white/[0.07] bg-surface p-6">
        <SectionHeader
          icon={ShieldIcon}
          title="Active sessions"
          description="Devices currently logged into your account"
        />

        <div className="flex flex-col gap-1">
          {sessions.map((s, i) => (
            <div
              key={s.id}
              className={cn(
                'flex items-center gap-3 py-3',
                i < sessions.length - 1 && 'border-b border-white/[0.05]',
              )}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-muted">
                <s.icon size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground/80">{s.device}</p>
                  {s.current && (
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted">{s.location} · {s.lastActive}</p>
              </div>
              {!s.current && (
                <button
                  onClick={() => revokeSession(s.id)}
                  className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-muted transition-colors hover:bg-red-500/10 hover:text-red-400"
                >
                  <LogOutIcon size={12} />
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Delete account ───────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 rounded-2xl border border-red-500/15 bg-red-500/5 p-6">
        <div>
          <p className="text-sm font-semibold text-foreground/80">Delete account</p>
          <p className="mt-0.5 text-xs text-muted">
            All servers will be terminated and all data permanently deleted. This cannot be undone.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-foreground/40">
            Type <span className="font-mono text-red-400/70">delete my account</span> to confirm
          </label>
          <input
            value={deleteInput}
            onChange={(e) => setDeleteInput(e.target.value)}
            placeholder="delete my account"
            className="rounded-xl border border-red-500/20 bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder-muted/50 outline-none transition-all focus:border-red-500/40 focus:ring-2 focus:ring-red-500/10"
          />
        </div>

        <button
          onClick={handleDeleteAccount}
          disabled={deleteInput !== 'delete my account'}
          className="flex items-center gap-2 self-start rounded-xl bg-red-500/10 px-4 py-2.5 text-xs font-semibold text-red-400 transition-all hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Trash2Icon size={13} />
          Delete account permanently
        </button>
      </div>

    </div>
  );
}
