import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { levelColors, radius, font } from "../theme";

export default function LevelBadge({ level }: { level: string }) {
  const c = levelColors[level] ?? "#8A94A6";
  return (
    <View style={[styles.badge, { borderColor: c }]}>
      <Text style={[styles.text, { color: c }]}>{level}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    borderWidth: 1.5,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  text: { fontSize: 12, fontWeight: font.bold },
});
