import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { QUICK_ACTIONS, SAMPLE_DAILY_EXAM } from '../data/exams';
import { SAMPLE_LEADERBOARD } from '../data/leaderboard';
import { theme } from '../theme';

const NEWS_ARTICLES = [
  { id: '1', title: '৫১তম বিসিএস প্রিলিমিনারি পরীক্ষার সিলেবাস বিশ্লেষণ', color: '#3B82F6', readTime: '5m' },
  { id: '2', title: 'বাংলাদেশ সরকারের নতুন শিক্ষানীতি ২০২৬ এর মূল বিষয়সমূহ', color: '#EF4444', readTime: '7m' },
];

const CURRENT_AFFAIRS_MCQ = {
  question: 'ইউরোপীয় ইউনিয়নের সদর দপ্তর কোথায়?',
  options: [
    { key: 'ক', text: 'লন্ডন' },
    { key: 'খ', text: 'রোমে' },
    { key: 'গ', text: 'কোপেনহেগেন' },
    { key: 'ঘ', text: 'ব্রাসেলস' },
  ],
};

function useCountdown(targetISO: string) {
  const [remaining, setRemaining] = useState('');
  useEffect(() => {
    function tick() {
      const diff = new Date(targetISO).getTime() - Date.now();
      if (diff <= 0) { setRemaining('Live Now!'); return; }
      const hrs = Math.floor(diff / 3_600_000);
      const mins = Math.floor((diff % 3_600_000) / 60_000);
      const secs = Math.floor((diff % 60_000) / 1_000);
      setRemaining(`Starts in - ${hrs} hrs ${mins} mins ${secs} sec`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetISO]);
  return remaining;
}

function Header() {
  return (
    <View style={s.header}>
      <View style={s.headerLeft}>
        <Text style={s.streakIcon}>🔥</Text>
        <Text style={s.streakCount}>3</Text>
      </View>
      <Text style={s.logo}>চর্চা</Text>
      <View style={s.avatar}><Text style={s.avatarText}>ব</Text></View>
    </View>
  );
}

function DailyExamBanner() {
  const exam = SAMPLE_DAILY_EXAM;
  const countdown = useCountdown(exam.startsAt);
  return (
    <View style={s.card}>
      <Text style={s.examTitle}>{exam.title}</Text>
      <View style={s.chipRow}>
        <Text style={s.chip}>⏱ ১৫ মিনিট</Text>
        <Text style={s.chipDiv}>|</Text>
        <Text style={s.chip}>✏️ ৩০টি প্রশ্ন</Text>
        <Text style={s.chipDiv}>|</Text>
        <Text style={s.chip}>📅 ১০ জুন, ২০২৬</Text>
      </View>
      <View style={s.pill}><Text style={s.pillTxt}>{countdown}</Text></View>
    </View>
  );
}

function QuickActionsRow() {
  return (
    <View style={s.qaRow}>
      {QUICK_ACTIONS.map((a) => (
        <TouchableOpacity key={a.id} style={s.qaItem}>
          <View style={[s.qaIcon, { backgroundColor: a.color + '1A' }]}>
            <Text style={s.qaEmoji}>{a.icon}</Text>
          </View>
          <Text style={s.qaLabel} numberOfLines={1}>{a.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function NewsCards() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}
      contentContainerStyle={s.newsScroll}>
      {NEWS_ARTICLES.map((a) => (
        <TouchableOpacity key={a.id} style={s.newsCard}>
          <View style={[s.newsImg, { backgroundColor: a.color }]} />
          <View style={s.newsBody}>
            <Text style={s.newsTitle} numberOfLines={2}>{a.title}</Text>
            <Text style={s.newsMeta}>New  ⏱ {a.readTime} read</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function LeaderboardWidget() {
  const lb = SAMPLE_LEADERBOARD;
  const pct = lb.targetPoints > 0 ? lb.currentPoints / lb.targetPoints : 0;
  return (
    <View style={s.card}>
      <View style={s.lbHead}>
        <Text style={s.lbTitle}>লিডারবোর্ড | {lb.leagueNameBn}</Text>
        <Text style={s.lbArrow}>{'>'}</Text>
      </View>
      <View style={s.lbProgRow}>
        <Text style={s.lbStar}>⭐ {lb.currentPoints}</Text>
        <View style={s.lbTrack}>
          <View style={[s.lbFill, { flex: pct || 0.001 }]} />
          <View style={{ flex: 1 - pct }} />
        </View>
        <Text style={s.lbTgt}>{lb.targetPoints}</Text>
      </View>
      {lb.topEntries.map((e) => (
        <View key={e.rank} style={s.lbEntry}>
          <View style={s.lbAv}><Text style={s.lbAvTxt}>{e.name.charAt(0)}</Text></View>
          <Text style={s.lbName} numberOfLines={1}>{e.name}</Text>
          <View style={s.lbRt}>
            <Text style={s.lbRank}>#{e.rank}</Text>
            <Text style={s.lbPts}>{e.points} pts</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function CurrentAffairsMCQ() {
  return (
    <View style={s.card}>
      <Text style={s.caHead}>কারেন্ট অ্যাফেয়াস</Text>
      <Text style={s.caQ}>{CURRENT_AFFAIRS_MCQ.question}</Text>
      {CURRENT_AFFAIRS_MCQ.options.map((o) => (
        <TouchableOpacity key={o.key} style={s.caOpt}>
          <Text style={s.caKey}>{o.key}</Text>
          <Text style={s.caTxt}>{o.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export function HomeScreen() {
  return (
    <SafeAreaView style={s.safe}>
      <ScrollView style={s.scroll} contentContainerStyle={s.content}
        showsVerticalScrollIndicator={false}>
        <Header />
        <DailyExamBanner />
        <QuickActionsRow />
        <NewsCards />
        <LeaderboardWidget />
        <CurrentAffairsMCQ />
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const { colors, shadows, spacing } = theme;
const C = colors;

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.background },
  scroll: { flex: 1 },
  content: { paddingHorizontal: spacing.base, paddingTop: spacing.sm },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: spacing.md },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  streakIcon: { fontSize: 20 },
  streakCount: { fontSize: 16, fontWeight: '700', color: C.text, marginLeft: 4 },
  logo: { fontSize: 22, fontWeight: '800', color: C.primary },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.purple, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  // Card
  card: { backgroundColor: C.surface, borderRadius: 18, padding: spacing.base, marginBottom: spacing.base, ...shadows.card },

  // Daily exam
  examTitle: { fontSize: 18, fontWeight: '700', color: C.text, marginBottom: spacing.sm },
  chipRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md, flexWrap: 'wrap' },
  chip: { fontSize: 13, color: C.textMuted },
  chipDiv: { fontSize: 13, color: C.border, marginHorizontal: spacing.sm },
  pill: { alignSelf: 'flex-start', backgroundColor: C.primary, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 16 },
  pillTxt: { color: '#fff', fontSize: 13, fontWeight: '600' },

  // Quick actions
  qaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.base },
  qaItem: { alignItems: 'center', flex: 1 },
  qaIcon: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  qaEmoji: { fontSize: 24 },
  qaLabel: { fontSize: 11, fontWeight: '600', color: C.text, textAlign: 'center' },

  // News
  newsScroll: { paddingBottom: spacing.base },
  newsCard: { width: 220, backgroundColor: C.surface, borderRadius: 16, marginRight: spacing.md, overflow: 'hidden', ...shadows.card },
  newsImg: { height: 110, width: '100%' },
  newsBody: { padding: spacing.md },
  newsTitle: { fontSize: 14, fontWeight: '600', color: C.text, lineHeight: 20, marginBottom: 6 },
  newsMeta: { fontSize: 12, color: C.textMuted },

  // Leaderboard
  lbHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  lbTitle: { fontSize: 16, fontWeight: '700', color: C.text },
  lbArrow: { fontSize: 18, color: C.textMuted },
  lbProgRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.base },
  lbStar: { fontSize: 13, color: C.warning, fontWeight: '600', marginRight: spacing.sm },
  lbTrack: { flex: 1, height: 8, backgroundColor: C.border, borderRadius: 4, flexDirection: 'row', overflow: 'hidden' },
  lbFill: { backgroundColor: C.warning, borderRadius: 4 },
  lbTgt: { fontSize: 13, color: C.textMuted, fontWeight: '600', marginLeft: spacing.sm },
  lbEntry: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: C.border },
  lbAv: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.primary + '22', alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  lbAvTxt: { fontSize: 14, fontWeight: '700', color: C.primary },
  lbName: { flex: 1, fontSize: 14, fontWeight: '600', color: C.text },
  lbRt: { alignItems: 'flex-end' },
  lbRank: { fontSize: 14, fontWeight: '700', color: C.text },
  lbPts: { fontSize: 12, color: C.textMuted, marginTop: 2 },

  // Current affairs
  caHead: { fontSize: 16, fontWeight: '700', color: '#E11D48', marginBottom: spacing.md },
  caQ: { fontSize: 15, fontWeight: '600', color: C.text, lineHeight: 22, marginBottom: spacing.base },
  caOpt: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: C.border, borderRadius: 12, paddingVertical: 12, paddingHorizontal: spacing.base, marginBottom: spacing.sm },
  caKey: { fontSize: 14, fontWeight: '700', color: C.primary, width: 24 },
  caTxt: { fontSize: 14, color: C.text },
});
