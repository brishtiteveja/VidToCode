import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { colors, font, radius, shadow } from "../theme";
import LevelBadge from "../components/LevelBadge";
import type { RootStackParamList } from "../navigation/types";

const tasks = [
  "Suggest a location for the clean-up event and ask if it works for everyone.",
  "Ask the group what supplies are needed.",
  "Suggest a date and time that the group will meet for the event.",
];

export default function ScenarioDetailScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { params } = useRoute<RouteProp<RootStackParamList, "ScenarioDetail">>();

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        <View style={styles.hero}>
          <TouchableOpacity style={[styles.back, { top: insets.top + 8 }]} onPress={() => nav.goBack()}>
            <Ionicons name="chevron-back" size={22} color={colors.navy} />
          </TouchableOpacity>
          <Text style={{ fontSize: 60 }}>🧹</Text>
        </View>

        <View style={styles.body}>
          <LevelBadge level={params.level} />
          <Text style={styles.title}>{params.title}</Text>

          <View style={styles.sectionRow}>
            <Text style={styles.sectionLabel}>CASE</Text>
            <View style={styles.translateBtn}>
              <Text style={styles.translateGlyph}>文A</Text>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              You and a group of volunteers want to organize a clean-up day for a local park or beach to improve the environment.
            </Text>
          </View>

          <View style={styles.sectionRow}>
            <Text style={styles.sectionLabel}>TASKS</Text>
            <View style={styles.translateBtn}>
              <Text style={styles.translateGlyph}>文A</Text>
            </View>
          </View>
          <View style={styles.card}>
            {tasks.map((t, i) => (
              <View key={i} style={[styles.taskRow, i < tasks.length - 1 && styles.taskDivider]}>
                <Ionicons name="ellipse-outline" size={20} color={colors.muted} />
                <Text style={styles.taskText}>{t}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <TouchableOpacity
          style={styles.cta}
          activeOpacity={0.9}
          onPress={() => nav.navigate("Lesson", { title: params.title, mode: "Practice" })}
        >
          <Text style={styles.ctaText}>Start Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgAlt },
  hero: { height: 220, backgroundColor: "#CDEAD6", alignItems: "center", justifyContent: "center" },
  back: {
    position: "absolute",
    left: 16,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
    ...shadow.card,
  },
  body: { padding: 20 },
  title: { fontSize: 24, fontWeight: font.black, color: colors.navy, marginTop: 12 },
  sectionRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 22, marginBottom: 8 },
  sectionLabel: { fontSize: 15, fontWeight: font.black, color: colors.primary, letterSpacing: 0.6 },
  translateBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: "#ECECEE", alignItems: "center", justifyContent: "center" },
  translateGlyph: { fontSize: 12, fontWeight: font.bold, color: colors.primary },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: 16, ...shadow.card },
  cardText: { fontSize: 16, lineHeight: 23, color: colors.navySoft },
  taskRow: { flexDirection: "row", alignItems: "flex-start", gap: 12, paddingVertical: 12 },
  taskDivider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  taskText: { flex: 1, fontSize: 15, lineHeight: 21, color: colors.navySoft },

  footer: { position: "absolute", left: 0, right: 0, bottom: 0, paddingHorizontal: 20, paddingTop: 10, backgroundColor: "rgba(242,244,247,0.96)" },
  cta: { backgroundColor: colors.primary, borderRadius: radius.md, paddingVertical: 17, alignItems: "center", ...shadow.button },
  ctaText: { color: "#fff", fontSize: 18, fontWeight: font.bold },
});
