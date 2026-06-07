import React, { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, font, radius, shadow } from "../theme";
import { useAppState } from "../state/AppState";

const nativeOptions = [
  { flag: "🇧🇩", name: "বাংলা" },
  { flag: "🇪🇸", name: "Español" },
  { flag: "🇨🇳", name: "中文" },
  { flag: "🇬🇧", name: "English" },
  { flag: "🇻🇳", name: "Tiếng Việt" },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { profile, setProfile } = useAppState();
  const [studyNative, setStudyNative] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selected, setSelected] = useState(profile.nativeLanguage);

  const interestsLabel = profile.interests.length
    ? profile.interests.join(", ").slice(0, 14) + (profile.interests.join(", ").length > 14 ? "…" : "")
    : "—";

  const rows = [
    { key: "target", emoji: "🎯", label: "Target Language", value: profile.targetLanguage },
    { key: "level", emoji: "🇬🇧", label: "Language Level", value: profile.level },
    { key: "native", emoji: "👶", label: "Native Language", value: profile.nativeLanguage },
    { key: "interests", emoji: "🧺", label: "Interests", value: interestsLabel },
    { key: "goal", emoji: "🚩", label: "Daily Goal", value: profile.dailyGoal },
    { key: "reminder", emoji: "🔔", label: "Daily Reminder", value: profile.reminder },
  ];

  const saveNative = () => {
    setProfile({ nativeLanguage: selected });
    setSheetOpen(false);
  };

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 30, paddingTop: insets.top + 8 }}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarLetter}>{profile.name.charAt(0).toUpperCase() || "A"}</Text>
          <View style={styles.avatarBadge}>
            <Ionicons name="add" size={12} color="#fff" />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{profile.name}</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </View>
          <Text style={styles.email}>brishtiteveja@gmail.com</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color={colors.navy} />
        </TouchableOpacity>
      </View>

      <View style={styles.toggleCard}>
        <Text style={styles.toggleLabel}>Study in Native Language</Text>
        <Switch
          value={studyNative}
          onValueChange={setStudyNative}
          trackColor={{ true: colors.primary, false: "#D1D5DB" }}
          thumbColor="#fff"
        />
      </View>

      <View style={styles.listCard}>
        {rows.map((r, i) => (
          <TouchableOpacity
            key={r.key}
            style={[styles.row, i < rows.length - 1 && styles.rowDivider]}
            activeOpacity={0.7}
            onPress={() => r.key === "native" && setSheetOpen(true)}
          >
            <Text style={styles.rowEmoji}>{r.emoji}</Text>
            <Text style={styles.rowLabel}>{r.label}</Text>
            <Text style={styles.rowValue}>{r.value}</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </TouchableOpacity>
        ))}
      </View>

      <Modal visible={sheetOpen} transparent animationType="slide" onRequestClose={() => setSheetOpen(false)}>
        <Pressable style={styles.scrim} onPress={() => setSheetOpen(false)} />
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.handle} />
          <Text style={styles.sheetTitle}>👶 Native Language</Text>
          <View style={styles.chipWrap}>
            {nativeOptions.map((o) => {
              const active = o.name === selected;
              return (
                <TouchableOpacity
                  key={o.name}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => setSelected(o.name)}
                >
                  <Text style={{ fontSize: 15 }}>{o.flag}</Text>
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{o.name}</Text>
                </TouchableOpacity>
              );
            })}
            <View style={[styles.chip, styles.chipMore]}>
              <Text style={[styles.chipText, { color: colors.primary }]}>More…</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.saveBtn} onPress={saveNative}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: colors.surface,
    marginHorizontal: 14,
    borderRadius: radius.lg,
    padding: 16,
    ...shadow.card,
  },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" },
  avatarLetter: { color: "#fff", fontSize: 24, fontWeight: font.black },
  avatarBadge: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  name: { fontSize: 22, fontWeight: font.black, color: colors.navy },
  email: { fontSize: 14, color: colors.muted, marginTop: 2 },

  toggleCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surface,
    marginHorizontal: 14,
    marginTop: 14,
    borderRadius: radius.lg,
    padding: 16,
    ...shadow.card,
  },
  toggleLabel: { fontSize: 16, fontWeight: font.bold, color: colors.navy },

  listCard: { backgroundColor: colors.surface, marginHorizontal: 14, marginTop: 14, borderRadius: radius.lg, paddingHorizontal: 16, ...shadow.card },
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 16 },
  rowDivider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  rowEmoji: { fontSize: 20 },
  rowLabel: { flex: 1, fontSize: 16, fontWeight: font.bold, color: colors.navy },
  rowValue: { fontSize: 15, color: colors.muted },

  scrim: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  sheet: { backgroundColor: colors.surface, borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl, padding: 20 },
  handle: { alignSelf: "center", width: 44, height: 5, borderRadius: 3, backgroundColor: "#D1D5DB", marginBottom: 16 },
  sheetTitle: { fontSize: 22, fontWeight: font.black, color: colors.navy, marginBottom: 16 },
  chipWrap: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  chipActive: { backgroundColor: colors.primary },
  chipMore: { borderColor: "transparent", backgroundColor: "#DCEBFB" },
  chipText: { fontSize: 15, fontWeight: font.semibold, color: colors.navy },
  chipTextActive: { color: "#fff" },
  saveBtn: { backgroundColor: colors.primary, borderRadius: radius.md, paddingVertical: 16, alignItems: "center", marginTop: 22, ...shadow.button },
  saveText: { color: "#fff", fontSize: 17, fontWeight: font.bold },
});
