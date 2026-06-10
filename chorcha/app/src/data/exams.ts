export interface DailyExam {
  id: string;
  title: string;
  subject: string;
  questionCount: number;
  durationMinutes: number;
  date: string;
  startsAt: string;
  isLive: boolean;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  color: string;
  route: string;
}

export const quickActions: QuickAction[] = [
  { id: 'question-bank', label: 'প্রশ্নব্যাংক', icon: '📦', color: '#F97316', route: '/question-bank' },
  { id: 'quick-practice', label: 'দ্রুত প্র্যাকটিস', icon: '⚡', color: '#F59E0B', route: '/quick-practice' },
  { id: 'mock-exam', label: 'মক পরীক্ষা', icon: '📝', color: '#22A05B', route: '/mock-exam' },
  { id: 'chorcha-ai', label: 'চর্চা AI', icon: '🌙', color: '#7C3AED', route: '/ai' },
];

export const QUICK_ACTIONS = quickActions;

export const dailyExams: DailyExam[] = [
  {
    id: 'daily-92',
    title: '51st BCS Daily Exam-92',
    subject: 'general',
    questionCount: 30,
    durationMinutes: 15,
    date: '2026-06-10',
    startsAt: '2026-06-10T20:00:00+06:00',
    isLive: false,
  },
  {
    id: 'daily-91',
    title: '51st BCS Daily Exam-91',
    subject: 'bangla-literature',
    questionCount: 20,
    durationMinutes: 15,
    date: '2026-06-09',
    startsAt: '2026-06-09T20:00:00+06:00',
    isLive: false,
  },
  {
    id: 'daily-90',
    title: '51st BCS Daily Exam-90',
    subject: 'english-language',
    questionCount: 20,
    durationMinutes: 15,
    date: '2026-06-08',
    startsAt: '2026-06-08T20:00:00+06:00',
    isLive: false,
  },
];

export const SAMPLE_DAILY_EXAM = dailyExams[0];
