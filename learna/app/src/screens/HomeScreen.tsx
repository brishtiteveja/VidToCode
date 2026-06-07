import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { colors, font, radius, shadow } from "../theme";
import RobotAvatar from "../components/RobotAvatar";
import PathMap from "../components/PathMap";
import TopicSheet from "../components/TopicSheet";
import { lessonSections, type LessonNode } from "../data/lessons";
import type { RootStackParamList } from "../navigation/types";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [target, setTarget] = useState<{ node: LessonNode; color: string } | null>(null);

  const openNode = (node: LessonNode, color: string) => {
    if (node.state === "locked") {
      nav.navigate("Paywall");
      return;
    }
    setTarget({ node, color });
  };

  return (
    <View style={styles.root}>
      {/* Hero header */}
      <LinearGradient colors={[colors.heroFrom, colors.heroTo]} style={[styles.hero, { paddingTop: insets.top + 10 }]}>
        <View style={styles.heroTop}>
          <View style={styles.pillFlag}>
            <Text style={{ fontSize: 14 }}>🇬🇧</Text>
            <Text style={styles.pillFlagText}>EN</Text>
          </View>
          <View style={styles.heroTopRight}>
            <View style={styles.statPill}>
              <Ionicons name="flame" size={15} color={colors.orange} />
              <Text style={styles.statPillText}>0</Text>
            </View>
            <View style={[styles.statPill, { backgroundColor: "rgba(255,255,255,0.16)" }]}>
              <Ionicons name="ribbon" size={15} color="#FFD45E" />
              <Text style={[styles.statPillText, { color: "#FFD45E" }]}>PRO</Text>
            </View>
          </View>
        </View>

        <View style={styles.avatarWrap}>
          <RobotAvatar size={104} />
        </View>

        <View style={styles.heroBottom}>
          <TouchableOpacity style={styles.groupBtn}>
            <Ionicons name="people" size={18} color="#fff" />
            <Ionicons name="chevron-forward" size={14} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.freeTalk} activeOpacity={0.9}>
            <Ionicons name="videocam" size={17} color="#fff" />
            <Text style={styles.freeTalkText}>Free Talk</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
        <PathMap sections={lessonSections} width={width} onPressNode={openNode} />
      </ScrollView>

      <TopicSheet
        node={target?.node ?? null}
        color={target?.color ?? colors.primary}
        onClose={() => setTarget(null)}
        onStart={(mode) => {
          const t = target;
          setTarget(null);
          if (t) nav.navigate("Lesson", { title: t.node.title, mode, tint: t.color });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface },
  hero: {
    paddingHorizontal: 18,
    paddingBottom: 16,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  pillFlag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  pillFlagText: { color: "#fff", fontWeight: font.bold, fontSize: 13 },
  heroTopRight: { flexDirection: "row", gap: 8 },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statPillText: { color: "#fff", fontWeight: font.bold, fontSize: 13 },
  avatarWrap: { alignItems: "center", marginTop: 2 },
  heroBottom: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 },
  groupBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  freeTalk: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingHorizontal: 16,
    paddingVertical: 9,
    ...shadow.button,
  },
  freeTalkText: { color: "#fff", fontWeight: font.bold, fontSize: 14 },
});
