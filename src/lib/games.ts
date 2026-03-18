export interface Game {
  id: string;
  name: string;
  genre: string;
  maxPlayers: number;
  image: string;
  accent: string;
}

export const GAMES: Game[] = [
  {
    id: 'valheim',
    name: 'Valheim',
    genre: 'Viking Survival',
    maxPlayers: 10,
    image: '/game-saas/games/valheim.jpg',
    accent: '#22c55e',
  },
  {
    id: '7dtd',
    name: '7 Days to Die',
    genre: 'Zombie Survival',
    maxPlayers: 8,
    image: '/game-saas/games/7dtd.jpg',
    accent: '#f97316',
  },
  {
    id: 'project-zomboid',
    name: 'Project Zomboid',
    genre: 'Isometric Survival RPG',
    maxPlayers: 32,
    image: '/game-saas/games/project-zomboid.jpg',
    accent: '#a3e635',
  },
  {
    id: 'enshrouded',
    name: 'Enshrouded',
    genre: 'Action RPG Survival',
    maxPlayers: 16,
    image: '/game-saas/games/enshrouded.png',
    accent: '#a78bfa',
  },
];
