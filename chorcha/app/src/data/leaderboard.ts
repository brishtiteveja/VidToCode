export type LeagueTier = 'iron' | 'bronze' | 'silver' | 'gold' | 'amethyst';

export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  avatar?: string;
  isPremium?: boolean;
  isOnline?: boolean;
}

export const LEAGUES: { id: LeagueTier; name: string; icon: string; color: string; bgColor: string }[] = [
  { id: 'iron', name: 'Iron', icon: '🛡️', color: '#94A3B8', bgColor: '#F1F5F9' },
  { id: 'bronze', name: 'Bronze', icon: '🥉', color: '#A0522D', bgColor: '#FDF2E9' },
  { id: 'silver', name: 'Silver', icon: '🥈', color: '#C0C0C0', bgColor: '#F8F9FA' },
  { id: 'gold', name: 'Gold', icon: '🥇', color: '#DAA520', bgColor: '#FFF8E1' },
  { id: 'amethyst', name: 'Amethyst', icon: '💎', color: '#9966CC', bgColor: '#F3E8FF' },
];

export interface LeaderboardSummary {
  league: LeagueTier;
  leagueNameBn: string;
  currentPoints: number;
  targetPoints: number;
  topEntries: LeaderboardEntry[];
}

export const leaderboardData: Record<LeagueTier, LeaderboardEntry[]> = {
  iron: [
    { rank: 1, name: 'তানভীর হাসান', points: 320, isOnline: true },
    { rank: 2, name: 'সুমাইয়া আক্তার', points: 290 },
    { rank: 3, name: 'রাকিবুল ইসলাম', points: 275, isOnline: true },
    { rank: 4, name: 'ফারজানা ইয়াসমিন', points: 260 },
    { rank: 5, name: 'মাহমুদুল হক', points: 245 },
    { rank: 6, name: 'নুসরাত জাহান', points: 230 },
  ],
  bronze: [
    { rank: 1, name: 'আবদুল্লাহ আল মামুন', points: 580, isPremium: true, isOnline: true },
    { rank: 2, name: 'তাসনিয়া ফেরদৌস', points: 545 },
    { rank: 3, name: 'শাহরিয়ার কবির', points: 520, isOnline: true },
    { rank: 4, name: 'মিথিলা রহমান', points: 495 },
    { rank: 5, name: 'আরিফুল ইসলাম', points: 470 },
    { rank: 6, name: 'সাদিয়া আফরিন', points: 450 },
    { rank: 7, name: 'জুবায়ের আহমেদ', points: 430 },
  ],
  silver: [
    { rank: 1, name: 'নাফিসা তাবাসসুম', points: 870, isPremium: true, isOnline: true },
    { rank: 2, name: 'রায়হান উদ্দিন', points: 840, isPremium: true },
    { rank: 3, name: 'ফাহিমা আক্তার', points: 810, isOnline: true },
    { rank: 4, name: 'মোস্তাফিজুর রহমান', points: 785 },
    { rank: 5, name: 'তানজিনা সুলতানা', points: 760 },
    { rank: 6, name: 'ইমরান হোসেন', points: 735 },
    { rank: 7, name: 'শারমিন আক্তার', points: 710 },
  ],
  gold: [
    { rank: 1, name: 'আনিসুর রহমান', points: 1250, isPremium: true, isOnline: true },
    { rank: 2, name: 'তাহমিনা খাতুন', points: 1190, isPremium: true },
    { rank: 3, name: 'সাকিব আল হাসান', points: 1140, isPremium: true, isOnline: true },
    { rank: 4, name: 'রুমানা আফরোজ', points: 1095 },
    { rank: 5, name: 'কামরুল ইসলাম', points: 1050, isPremium: true },
    { rank: 6, name: 'ফারহানা মোর্শেদা', points: 1010 },
  ],
  amethyst: [
    { rank: 1, name: 'মাহবুবুর রহমান', points: 1850, isPremium: true, isOnline: true },
    { rank: 2, name: 'সাবরিনা মোস্তফা', points: 1780, isPremium: true, isOnline: true },
    { rank: 3, name: 'আশরাফুল আলম', points: 1720, isPremium: true },
    { rank: 4, name: 'নাজমুন নাহার', points: 1650, isPremium: true },
    { rank: 5, name: 'ফয়সাল আহমেদ', points: 1590, isPremium: true, isOnline: true },
    { rank: 6, name: 'জান্নাতুল ফেরদৌস', points: 1530, isPremium: true },
    { rank: 7, name: 'শফিকুল ইসলাম', points: 1470, isPremium: true },
    { rank: 8, name: 'তাসফিয়া রহমান', points: 1420, isPremium: true },
  ],
};

export const SAMPLE_LEADERBOARD: LeaderboardSummary = {
  league: 'iron',
  leagueNameBn: 'আয়রন লীগ',
  currentPoints: 0,
  targetPoints: 100,
  topEntries: leaderboardData.iron.slice(0, 3),
};
