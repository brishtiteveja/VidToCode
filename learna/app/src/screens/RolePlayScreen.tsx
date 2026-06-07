import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { colors, font, radius, shadow } from "../theme";
import LevelBadge from "../components/LevelBadge";
import { collections, levelCards, roleplaySections, type Scenario } from "../data/roleplay";
import type { RootStackParamList } from "../navigation/types";

const typeIcon: Record<Scenario["type"], keyof typeof Ionicons.glyphMap> = {
  Task: "options",
  Scenario: "document-text",
  Discussion: "chatbubbles",
  "English Test": "school",
};

export default function RolePlayScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 30, paddingTop: insets.top + 8 }}>
      <Text style={styles.h1}>Language Level</Text>
      <View style={styles.levelRow}>
        {levelCards.map((l) => (
          <TouchableOpacity key={l.id} style={styles.levelCard} activeOpacity={0.9}>
            <Text style={{ fontSize: 30 }}>{l.emoji}</Text>
            <Text style={styles.levelTitle}>{l.title}</Text>
            <Text style={styles.levelScenes}>{l.scenes} Scenes</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sectionHead}>
        <Text style={styles.h1}>Collection</Text>
        <TouchableOpacity style={styles.randomPill}>
          <Ionicons name="dice" size={15} color={colors.primary} />
          <Text style={styles.randomText}>Random</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
        {collections.map((c) => (
          <TouchableOpacity key={c.id} style={styles.collectionCard} activeOpacity={0.9}>
            <View style={styles.collectionArt}>
              <Text style={{ fontSize: 44 }}>{c.icon}</Text>
            </View>
            <Text style={styles.collectionTitle}>{c.title}</Text>
            <Text style={styles.collectionScenes}>{c.scenes} Scenes</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.createBanner} activeOpacity={0.9}>
        <View style={styles.createIcon}>
          <Ionicons name="add" size={22} color="#fff" />
        </View>
        <Text style={styles.createText}>Create your own scenario!</Text>
        <Ionicons name="chevron-forward" size={20} color={colors.muted} />
      </TouchableOpacity>

      {roleplaySections.map((section) => (
        <View key={section.title}>
          <View style={styles.sectionHead}>
            <Text style={styles.h2}>{section.title}</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
            {section.items.map((s) => (
              <TouchableOpacity
                key={s.id}
                style={styles.scenarioCard}
                activeOpacity={0.9}
                onPress={() => nav.navigate("ScenarioDetail", { title: s.title, level: s.level })}
              >
                <View style={[styles.scenarioArt, { backgroundColor: s.tint }]}>
                  <Text style={{ fontSize: 34 }}>{s.icon}</Text>
                </View>
                <Text style={styles.scenarioTitle} numberOfLines={2}>
                  {s.title}
                </Text>
                <View style={styles.typeRow}>
                  <Ionicons name={typeIcon[s.type]} size={13} color={colors.muted} />
                  <Text style={styles.typeText}>{s.type}</Text>
                </View>
                <LevelBadge level={s.level} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  h1: { fontSize: 24, fontWeight: font.black, color: colors.navy, paddingHorizontal: 18, marginTop: 14 },
  h2: { fontSize: 21, fontWeight: font.black, color: colors.navy },
  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    marginTop: 18,
  },
  seeAll: { color: colors.muted, fontWeight: font.semibold, fontSize: 14 },
  randomPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    ...shadow.card,
  },
  randomText: { color: colors.primary, fontWeight: font.bold, fontSize: 13 },

  levelRow: { flexDirection: "row", gap: 12, paddingHorizontal: 18, marginTop: 12 },
  levelCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 16,
    gap: 4,
    ...shadow.card,
  },
  levelTitle: { fontSize: 16, fontWeight: font.bold, color: colors.navy, marginTop: 4 },
  levelScenes: { fontSize: 13, color: colors.muted },

  hScroll: { paddingHorizontal: 18, paddingTop: 12, gap: 14 },
  collectionCard: { width: 150 },
  collectionArt: {
    height: 110,
    borderRadius: radius.lg,
    backgroundColor: "#A9D4F5",
    alignItems: "center",
    justifyContent: "center",
  },
  collectionTitle: { fontSize: 16, fontWeight: font.bold, color: colors.navy, marginTop: 8 },
  collectionScenes: { fontSize: 13, color: colors.muted },

  createBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.surface,
    marginHorizontal: 18,
    marginTop: 18,
    borderRadius: radius.lg,
    padding: 14,
    ...shadow.card,
  },
  createIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  createText: { flex: 1, fontSize: 16, fontWeight: font.bold, color: colors.navy },

  scenarioCard: { width: 180, backgroundColor: colors.surface, borderRadius: radius.lg, padding: 12, gap: 6, ...shadow.card },
  scenarioArt: { height: 96, borderRadius: radius.md, alignItems: "center", justifyContent: "center" },
  scenarioTitle: { fontSize: 16, fontWeight: font.bold, color: colors.navy, minHeight: 40 },
  typeRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  typeText: { fontSize: 13, color: colors.muted, fontWeight: font.medium },
});
