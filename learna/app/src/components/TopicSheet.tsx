import React from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, font, radius, shadow } from "../theme";
import type { LessonNode } from "../data/lessons";

type Props = {
  node: LessonNode | null;
  color: string;
  onClose: () => void;
  onStart: (mode: "Lecture" | "Practice") => void;
};

export default function TopicSheet({ node, color, onClose, onStart }: Props) {
  return (
    <Modal visible={!!node} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.scrim} onPress={onClose} />
      {node && (
        <View style={styles.sheet}>
          <View style={[styles.header, { backgroundColor: color }]}>
            <View style={styles.handle} />
            <Text style={styles.title}>{node.title}</Text>
            {!!node.subtitle && <Text style={styles.subtitle}>{node.subtitle}</Text>}
            <View style={styles.chips}>
              <View style={styles.chip}>
                <Text style={styles.chipText}>{node.words?.length ?? 0} Words</Text>
              </View>
              <View style={styles.chip}>
                <Text style={styles.chipText}>{node.grammar ?? 0} Grammar</Text>
              </View>
            </View>
          </View>

          <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: 8 }}>
            <Text style={[styles.section, { color }]}>EXERCISES</Text>
            <View style={styles.exerciseRow}>
              <TouchableOpacity
                style={[styles.exercise, { backgroundColor: "#34A853" }]}
                onPress={() => onStart("Lecture")}
              >
                <Ionicons name="school" size={20} color="#fff" />
                <Text style={styles.exerciseText}>Lecture</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.exercise, { backgroundColor: "#7B57E0" }]}
                onPress={() => onStart("Practice")}
              >
                <Ionicons name="shield-checkmark" size={20} color="#fff" />
                <Text style={styles.exerciseText}>Practice</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.section, { color }]}>WORDS TO PRACTICE</Text>
            <View style={styles.wordGrid}>
              {(node.words ?? []).map((wc) => (
                <View key={wc.word} style={styles.wordCard}>
                  <View style={styles.speaker}>
                    <Ionicons name="volume-medium" size={16} color={colors.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.word} numberOfLines={1}>
                      {wc.word}
                    </Text>
                    <Text style={styles.translation} numberOfLines={1}>
                      {wc.translation}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.cta} onPress={onClose}>
            <Text style={styles.ctaText}>Got it</Text>
          </TouchableOpacity>
        </View>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    maxHeight: "82%",
    overflow: "hidden",
  },
  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 18 },
  handle: {
    alignSelf: "center",
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.6)",
    marginBottom: 14,
  },
  title: { color: "#fff", fontSize: 26, fontWeight: font.black },
  subtitle: { color: "rgba(255,255,255,0.9)", fontSize: 13, marginTop: 6, lineHeight: 18 },
  chips: { flexDirection: "row", gap: 8, marginTop: 14 },
  chip: {
    backgroundColor: "rgba(255,255,255,0.22)",
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  chipText: { color: "#fff", fontSize: 13, fontWeight: font.bold },

  body: { paddingHorizontal: 20, paddingTop: 16 },
  section: { fontSize: 13, fontWeight: font.black, letterSpacing: 0.8, marginBottom: 10 },
  exerciseRow: { flexDirection: "row", gap: 12, marginBottom: 22 },
  exercise: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: radius.md,
    ...shadow.button,
  },
  exerciseText: { color: "#fff", fontSize: 16, fontWeight: font.bold },

  wordGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  wordCard: {
    width: "47.5%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.bgAlt,
    borderRadius: radius.md,
    padding: 10,
  },
  speaker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#EAF2FE",
    alignItems: "center",
    justifyContent: "center",
  },
  word: { fontSize: 15, fontWeight: font.bold, color: colors.navy },
  translation: { fontSize: 12, color: colors.muted, marginTop: 1 },

  cta: {
    margin: 18,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 16,
    alignItems: "center",
    ...shadow.button,
  },
  ctaText: { color: "#fff", fontSize: 17, fontWeight: font.bold },
});
