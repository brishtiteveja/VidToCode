const colors = {
  primary: '#1B7A4A',
  accent: '#22A05B',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  text: '#1A1A1A',
  textMuted: '#6B7280',
  border: '#E5E7EB',
  danger: '#EF4444',
  warning: '#F59E0B',
  success: '#22C55E',
  purple: '#7C3AED',
  league: {
    iron: '#94A3B8',
    bronze: '#A0522D',
    silver: '#C0C0C0',
    gold: '#DAA520',
    amethyst: '#9966CC',
  },
  leagueCardBg: {
    iron: '#F1F5F9',
    bronze: '#FDF2E9',
    silver: '#F8F9FA',
    gold: '#FFF8E1',
    amethyst: '#F3E8FF',
  },
};

const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
} as const;

export const theme = { colors, shadows, spacing };
