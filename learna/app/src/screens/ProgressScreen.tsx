import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, font, radius, shadow } from "../theme";

const feedback = [
  { label: "Grammar", icon: "book", color: "#1FC5D8" },
  { label: "Better to Say", icon: "glasses", color: "#7BC043" },
];

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const barData = [0, 0, 0, 0, 0, 0, 5];

const history = [
  { title: "Organizing a Local Clean-Up Event", time: "6 Jun 2026, 9:27 AM", tint: "#F4D6DC", icon: "people" as const },
  { title: "Catching Up", time: "6 Jun 2026, 9:25 AM", tint: "#FCE2D3", icon: "hand-left" as const },
];

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 30, paddingTop: insets.top + 8 }}>
      <Text style={styles.h1}>Feedback Center</Text>
      <View style={styles.fbRow}>
        {feedback.map((f) => (
          <View key={f.label} style={[styles.fbCard, { backgroundColor: f.color }]}>
            <View style={styles.fbTop}>
              <Ionicons name={f.icon as any} size={26} color="#fff" />
              <View style={styles.fbArrow}>
                <Ionicons name="chevron-forward" size={16} color={f.color} />
              </View>
            </View>
            <Text style={styles.fbLabel}>{f.label}</Text>
            <Text style={styles.fbCount}>
              0 <Text style={styles.fbTimes}>times</Text>
            </Text>
          </View>
        ))}
      </View>
      <View style={[styles.fbCardWide, { backgroundColor: "#4733C9" }]}>
        <View style={styles.fbTop}>
          <Ionicons name="mic" size={26} color="#fff" />
          <View style={styles.fbArrow}>
            <Ionicons name="chevron-forward" size={16} color="#4733C9" />
          </View>
        </View>
        <Text style={styles.fbLabel}>Pronunciation</Text>
        <Text style={styles.fbCount}>
          0 <Text style={styles.fbTimes}>times</Text>
        </Text>
      </View>

      {/* Vocabulary */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Vocabulary Practice</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: "1%" }]} />
        </View>
        <View style={styles.statRow}>
          <View>
            <Text style={styles.statValue}>6</Text>
            <Text style={styles.statLabel}>New Words</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.statValue}>1613</Text>
            <Text style={styles.statLabel}>Upcoming Words</Text>
          </View>
        </View>
      </View>

      {/* Streak */}
      <Text style={styles.h1}>Your Streak</Text>
      <View style={styles.streakRow}>
        <View style={[styles.streakCard, { backgroundColor: "#FDF1E0" }]}>
          <Ionicons name="flame" size={26} color={colors.orange} />
          <Text style={[styles.streakValue, { color: colors.orange }]}>0</Text>
          <Text style={styles.streakLabel}>Daily Streak</Text>
        </View>
        <View style={[styles.streakCard, { backgroundColor: "#FCEBEA" }]}>
          <Ionicons name="flame" size={26} color="#E8504F" />
          <Text style={[styles.streakValue, { color: "#E8504F" }]}>0</Text>
          <Text style={styles.streakLabel}>Longest Streak</Text>
        </View>
      </View>

      {/* Call time */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Call Time Spent</Text>
        <View style={styles.callStats}>
          <Stat value="5m 9s" label="Total Spent" />
          <Stat value="44 s" label="Daily Average" />
          <Stat value="10 m" label="Daily Goal" />
        </View>
        <View style={styles.chart}>
          {barData.map((v, i) => (
            <View key={i} style={styles.barCol}>
              <View style={[styles.bar, { height: Math.max(v * 8, 4) }]} />
              <Text style={styles.barDay}>{days[i]}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* History */}
      <View style={styles.sectionHead}>
        <Text style={styles.h1NoPad}>Call History</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>
      {history.map((h) => (
        <TouchableOpacity key={h.title} style={styles.historyCard} activeOpacity={0.9}>
          <View style={[styles.historyIcon, { backgroundColor: h.tint }]}>
            <Ionicons name={h.icon} size={20} color="#E8703A" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.historyTitle} numberOfLines={1}>
              {h.title}
            </Text>
            <Text style={styles.historyTime}>{h.time}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.muted} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.callStatValue}>{value}</Text>
      <Text style={styles.callStatLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  h1: { fontSize: 24, fontWeight: font.black, color: colors.navy, paddingHorizontal: 18, marginTop: 16 },
  h1NoPad: { fontSize: 24, fontWeight: font.black, color: colors.navy },

  fbRow: { flexDirection: "row", gap: 12, paddingHorizontal: 18, marginTop: 12 },
  fbCard: { flex: 1, borderRadius: radius.lg, padding: 14, ...shadow.card },
  fbCardWide: { marginHorizontal: 18, marginTop: 12, borderRadius: radius.lg, padding: 14, ...shadow.card },
  fbTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  fbArrow: { width: 26, height: 26, borderRadius: 13, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  fbLabel: { color: "#fff", fontSize: 16, fontWeight: font.bold, marginTop: 18 },
  fbCount: { color: "#fff", fontSize: 24, fontWeight: font.black, marginTop: 2 },
  fbTimes: { fontSize: 14, fontWeight: font.medium },

  card: { backgroundColor: colors.surface, marginHorizontal: 18, marginTop: 16, borderRadius: radius.lg, padding: 16, ...shadow.card },
  cardTitle: { fontSize: 18, fontWeight: font.bold, color: colors.navy, marginBottom: 12 },
  progressTrack: { height: 8, borderRadius: 4, backgroundColor: "#E4ECF6", overflow: "hidden" },
  progressFill: { height: 8, backgroundColor: "#8FC0F5" },
  statRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 14 },
  statValue: { fontSize: 18, fontWeight: font.black, color: colors.navy },
  statLabel: { fontSize: 13, color: colors.muted },

  streakRow: { flexDirection: "row", gap: 12, paddingHorizontal: 18, marginTop: 12 },
  streakCard: { flex: 1, borderRadius: radius.lg, padding: 16, gap: 4 },
  streakValue: { fontSize: 28, fontWeight: font.black, marginTop: 4 },
  streakLabel: { fontSize: 13, color: colors.muted, fontWeight: font.medium },

  callStats: { flexDirection: "row", justifyContent: "space-between", marginBottom: 14 },
  callStatValue: { fontSize: 17, fontWeight: font.bold, color: colors.navy },
  callStatLabel: { fontSize: 12, color: colors.muted, marginTop: 2 },
  chart: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", height: 80, paddingTop: 8 },
  barCol: { alignItems: "center", gap: 6, flex: 1 },
  bar: { width: 18, borderRadius: 5, backgroundColor: "#6C8FE8" },
  barDay: { fontSize: 11, color: colors.muted },

  sectionHead: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 18, marginTop: 18 },
  seeAll: { color: colors.muted, fontWeight: font.semibold, fontSize: 14 },
  historyCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.surface,
    marginHorizontal: 18,
    marginTop: 12,
    borderRadius: radius.lg,
    padding: 12,
    ...shadow.card,
  },
  historyIcon: { width: 42, height: 42, borderRadius: 21, alignItems: "center", justifyContent: "center" },
  historyTitle: { fontSize: 15, fontWeight: font.bold, color: colors.navy },
  historyTime: { fontSize: 13, color: colors.muted, marginTop: 2 },
});
