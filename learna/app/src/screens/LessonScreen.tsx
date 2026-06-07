import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";

import { colors, font, radius, shadow } from "../theme";
import RobotAvatar from "../components/RobotAvatar";
import { lectureTranscript, practiceTranscript, inspireHint, type ChatMessage } from "../data/chat";
import type { RootStackParamList } from "../navigation/types";

function renderBold(msg: ChatMessage, baseColor: string) {
  if (!msg.bold?.length) return <Text style={[styles.bubbleText, { color: baseColor }]}>{msg.text}</Text>;
  const pattern = new RegExp(`(${msg.bold.map((b) => b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  const parts = msg.text.split(pattern);
  return (
    <Text style={[styles.bubbleText, { color: baseColor }]}>
      {parts.map((p, i) =>
        msg.bold!.includes(p) ? (
          <Text key={i} style={{ fontWeight: font.black }}>
            {p}
          </Text>
        ) : (
          <Text key={i}>{p}</Text>
        )
      )}
    </Text>
  );
}

export default function LessonScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "Lesson">>();
  const { title, mode } = route.params;
  const tint = route.params.tint ?? colors.primary;

  const [recording, setRecording] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const messages = mode === "Practice" ? practiceTranscript : lectureTranscript;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Avatar video panel */}
      <LinearGradient colors={["#2B4E86", "#15233F"]} style={styles.video}>
        <View style={styles.videoTop}>
          <TouchableOpacity style={styles.closeBtn} onPress={() => nav.goBack()}>
            <Ionicons name="close" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={styles.timerPill}>
            <Text style={styles.timerText}>04:59</Text>
          </View>
          <TouchableOpacity style={styles.speedPill}>
            <Text style={styles.speedText}>1x</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.stepper}>
          <View style={styles.stepRow}>
            <View style={[styles.stepDot, mode === "Lecture" && styles.stepDotActive]} />
            <Text style={[styles.stepLabel, mode === "Lecture" && styles.stepLabelActive]}>Lecture</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={styles.stepRow}>
            <View style={[styles.stepDot, mode === "Practice" && styles.stepDotActive]} />
            <Text style={[styles.stepLabel, mode === "Practice" && styles.stepLabelActive]}>Practice</Text>
          </View>
        </View>

        <View style={styles.avatarCenter}>
          <RobotAvatar size={92} />
        </View>

        <TouchableOpacity style={styles.expandBtn}>
          <Ionicons name="scan-outline" size={18} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Section banner */}
      <View style={[styles.banner, { backgroundColor: colors.lecture }]}>
        <View style={styles.bannerBadge}>
          <Text style={{ fontSize: 11, fontWeight: font.black, color: colors.lecture }}>Aa</Text>
        </View>
        <Text style={styles.bannerText}>{mode}</Text>
      </View>

      {/* Chat */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.chat}>
        {messages.map((m) =>
          m.role === "ai" ? (
            <View key={m.id} style={styles.aiRow}>
              <View style={styles.aiBubble}>{renderBold(m, colors.navy)}</View>
              <View style={styles.bubbleActions}>
                <View style={styles.bubbleActionBtn}>
                  <Text style={styles.translateGlyph}>文A</Text>
                </View>
                <View style={styles.bubbleActionBtn}>
                  <Ionicons name="play" size={14} color={colors.primary} />
                </View>
              </View>
            </View>
          ) : (
            <View key={m.id} style={styles.userRow}>
              <View style={styles.userBubble}>{renderBold(m, colors.navy)}</View>
            </View>
          )
        )}

        {showHint && (
          <View style={styles.hintCard}>
            <Text style={styles.hintHeader}>Example of what you can say:</Text>
            <Text style={styles.hintBody}>{inspireHint}</Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom dock */}
      <View style={[styles.dock, { paddingBottom: insets.bottom + 10 }]}>
        {recording ? (
          <>
            <TouchableOpacity style={styles.cancelPill} onPress={() => setRecording(false)}>
              <Ionicons name="trash" size={18} color={colors.red} />
              <Ionicons name="chevron-back" size={16} color={colors.red} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.micFab, styles.micRecording]} onPress={() => setRecording(false)}>
              <Ionicons name="mic" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.lockPill}>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
              <Ionicons name="lock-closed" size={16} color={colors.primary} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.dockSide}>
              <Ionicons name="keypad" size={22} color={colors.primary} />
              <Text style={styles.dockSideLabel}>Type</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.micFab, { backgroundColor: tint }]} onPress={() => setRecording(true)}>
              <Ionicons name="mic" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dockSide} onPress={() => setShowHint((s) => !s)}>
              <Ionicons name="bulb" size={22} color={colors.primary} />
              <Text style={styles.dockSideLabel}>Inspire</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface },
  video: { height: 220, paddingHorizontal: 16, paddingTop: 8 },
  videoTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  timerPill: {
    backgroundColor: "rgba(0,0,0,0.28)",
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  timerText: { color: "#fff", fontWeight: font.bold, fontSize: 14 },
  speedPill: {
    width: 38,
    height: 30,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  speedText: { color: "#fff", fontWeight: font.bold, fontSize: 13 },

  stepper: { position: "absolute", left: 16, top: 70, gap: 2 },
  stepRow: { flexDirection: "row", alignItems: "center", gap: 7 },
  stepDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: "rgba(255,255,255,0.4)" },
  stepDotActive: { backgroundColor: "#fff" },
  stepLine: { width: 2, height: 16, backgroundColor: "rgba(255,255,255,0.3)", marginLeft: 3.5 },
  stepLabel: { color: "rgba(255,255,255,0.55)", fontSize: 12, fontWeight: font.semibold },
  stepLabelActive: { color: "#fff", fontWeight: font.bold },

  avatarCenter: { alignItems: "center", marginTop: 6 },
  expandBtn: { position: "absolute", right: 16, bottom: 14 },

  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  bannerBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerText: { color: "#fff", fontWeight: font.bold, fontSize: 15 },

  chat: { padding: 14, gap: 12 },
  aiRow: { flexDirection: "row", alignItems: "flex-end", gap: 6, maxWidth: "88%" },
  aiBubble: { backgroundColor: colors.bubbleAi, borderRadius: 16, borderBottomLeftRadius: 4, padding: 12 },
  bubbleActions: { gap: 6, paddingBottom: 2 },
  bubbleActionBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#ECECEE",
    alignItems: "center",
    justifyContent: "center",
  },
  translateGlyph: { fontSize: 11, fontWeight: font.bold, color: colors.primary },
  userRow: { alignSelf: "flex-end", maxWidth: "82%" },
  userBubble: { backgroundColor: colors.bubbleUser, borderRadius: 16, borderBottomRightRadius: 4, padding: 12 },
  bubbleText: { fontSize: 16, lineHeight: 23 },

  hintCard: {
    alignSelf: "flex-end",
    maxWidth: "90%",
    backgroundColor: colors.amber,
    borderRadius: 16,
    padding: 12,
    marginTop: 2,
  },
  hintHeader: { fontSize: 14, fontWeight: font.bold, color: colors.amberText, marginBottom: 4 },
  hintBody: { fontSize: 14, lineHeight: 20, color: colors.amberText },

  dock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  dockSide: { alignItems: "center", gap: 3, width: 64 },
  dockSideLabel: { fontSize: 12, color: colors.primary, fontWeight: font.semibold },
  micFab: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.button,
  },
  micRecording: { backgroundColor: colors.green },
  cancelPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "#FCE3E3",
    borderRadius: radius.pill,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  lockPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "#DCEBFB",
    borderRadius: radius.pill,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
