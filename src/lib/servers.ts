export type ServerStatus = 'running' | 'stopped' | 'starting' | 'stopping';

export interface RentedServer {
  id: string;
  name: string;
  gameId: string;
  status: ServerStatus;
  region: string;
  plan: string;
  ram: string;
  cpu: string;
  players: { current: number; max: number };
  ip: string;
  port: number;
  createdAt: string;
}

export const MOCK_SERVERS: RentedServer[] = [
  {
    id: 'srv-001',
    name: 'Viking Nights',
    gameId: 'valheim',
    status: 'running',
    region: 'Europe (Frankfurt)',
    plan: 'Standard',
    ram: '4 GB',
    cpu: '4 vCPU',
    players: { current: 3, max: 16 },
    ip: '94.130.112.77',
    port: 2456,
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'srv-002',
    name: 'Apocalypse Server',
    gameId: '7dtd',
    status: 'stopped',
    region: 'US East (New York)',
    plan: 'Starter',
    ram: '2 GB',
    cpu: '2 vCPU',
    players: { current: 0, max: 4 },
    ip: '45.56.88.213',
    port: 26900,
    createdAt: '2026-03-10T14:30:00Z',
  },
  {
    id: 'srv-003',
    name: 'Mist & Shadows',
    gameId: 'enshrouded',
    status: 'starting',
    region: 'Europe (Frankfurt)',
    plan: 'Pro',
    ram: '8 GB',
    cpu: '6 vCPU',
    players: { current: 0, max: 16 },
    ip: '178.63.44.91',
    port: 15636,
    createdAt: '2026-03-18T09:15:00Z',
  },
];
