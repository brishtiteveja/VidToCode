import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, font, radius, shadow } from "../theme";
import RobotAvatar from "../components/RobotAvatar";
import { useAppState } from "../state/AppState";

const RING = 150;
const STROKE = 9;
const R = (RING - STROKE) / 2;
const CIRC = 2 * Math.PI * R;

const messages = [
  "Master 600 more phrases in 30 days with Learna AI than by yourself",
  "From today to fluency, your next level is only 30 days away",
  "95% of the learners see results in the first 7 days",
];

export default function PersonalizingScreen() {
  const insets = useSafeAreaInsets();
  const { profile, completeOnboarding } = useAppState();
  const [pct, setPct] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setPct((p) => {
        if (p >= 100) {
          if (timer.current) clearInterval(timer.current);
          return 100;
        }
        return Math.min(p + 2, 100);
      });
    }, 70);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const ready = pct >= 100;
  const msgIndex = pct < 50 ? 0 : pct < 90 ? 1 : 2;
  const offset = CIRC * (1 - pct / 100);

  const tiles = [
    { label: "COURSE", value: profile.targetLanguage, emoji: "🇬🇧" },
    { label: "YOUR LEVEL", value: profile.level, emoji: "📊" },
    { label: "FOCUS AREA", value: profile.areas[0] ?? "—", emoji: "💼" },
    { label: "DURATION", value: profile.dailyGoal, emoji: "⏱️" },
    { label: "INTERESTS", value: profile.interests.join(", ") || "—", emoji: "✨", wide: true },
  ];

  return (
    <LinearGradient colors={["#EAF4FE", "#FFFFFF"]} style={[styles.root, { paddingTop: insets.top + 24 }]}>
      <View style={styles.ringWrap}>
        <Svg width={RING} height={RING}>
          <Circle cx={RING / 2} cy={RING / 2} r={R} stroke="#DCE9F8" strokeWidth={STROKE} fill="none" />
          <Circle
            cx={RING / 2}
            cy={RING / 2}
            r={R}
            stroke={colors.primary}
            strokeWidth={STROKE}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={CIRC}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${RING / 2} ${RING / 2})`}
          />
        </Svg>
        <View style={styles.ringCenter}>
          <RobotAvatar size={92} />
        </View>
        <Text style={styles.pct}>{pct}%</Text>
      </View>

      <Text style={styles.headline}>
        {ready ? "Your plan is ready!" : "Personalizing your learning plan..."}
      </Text>

      {!ready ? (
        <>
          <View style={styles.msgPill}>
            <Text style={styles.msgText}>{messages[msgIndex]}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.laurel}>🌿</Text>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.badgeRank}>#1</Text>
              <Text style={styles.stars}>★★★★★</Text>
              <Text style={styles.badgeSub}>Language Learning App</Text>
            </View>
            <Text style={[styles.laurel, { transform: [{ scaleX: -1 }] }]}>🌿</Text>
          </View>
          <Text style={styles.users}>50M+ Users</Text>
        </>
      ) : (
        <>
          <View style={styles.planCard}>
            <Text style={styles.planTitle}>{profile.name.toUpperCase()}&rsquo;S PLAN</Text>
            <View style={styles.tileGrid}>
              {tiles.map((t) => (
                <View key={t.label} style={[styles.tile, t.wide && { width: "100%" }]}>
                  <Text style={styles.tileLabel}>
                    {t.emoji} {t.label}
                  </Text>
                  <Text style={styles.tileValue} numberOfLines={1}>
                    {t.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.cta} activeOpacity={0.9} onPress={completeOnboarding}>
            <Text style={styles.ctaText}>Get My Plan</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: "center", paddingHorizontal: 22 },
  ringWrap: { width: RING, height: RING, alignItems: "center", justifyContent: "center" },
  ringCenter: { position: "absolute" },
  pct: { position: "absolute", top: -6, fontSize: 22, fontWeight: font.black, color: colors.primary },

  headline: { fontSize: 22, fontWeight: font.black, color: colors.navy, textAlign: "center", marginTop: 22 },

  msgPill: { borderWidth: 1.5, borderColor: "#CFE0F5", borderRadius: radius.lg, paddingHorizontal: 16, paddingVertical: 12, marginTop: 20 },
  msgText: { fontSize: 15, color: colors.primary, textAlign: "center", fontWeight: font.medium, lineHeight: 21 },
  badge: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 30 },
  laurel: { fontSize: 44 },
  badgeRank: { fontSize: 26, fontWeight: font.black, color: colors.navy },
  stars: { fontSize: 16, color: "#F5A623", letterSpacing: 2 },
  badgeSub: { fontSize: 13, color: colors.navySoft },
  users: { fontSize: 26, fontWeight: font.black, color: colors.navy, marginTop: 18 },

  planCard: { width: "100%", backgroundColor: "#F3F4F6", borderRadius: radius.lg, padding: 16, marginTop: 22 },
  planTitle: { fontSize: 15, fontWeight: font.black, color: colors.navySoft, letterSpacing: 0.6, marginBottom: 12 },
  tileGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  tile: { width: "47%", backgroundColor: "#fff", borderRadius: radius.md, padding: 12 },
  tileLabel: { fontSize: 11, fontWeight: font.bold, color: colors.muted, letterSpacing: 0.4 },
  tileValue: { fontSize: 16, fontWeight: font.semibold, color: colors.navy, marginTop: 4 },

  cta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 17,
    width: "100%",
    marginTop: 24,
    ...shadow.button,
  },
  ctaText: { color: "#fff", fontSize: 19, fontWeight: font.bold },
});
