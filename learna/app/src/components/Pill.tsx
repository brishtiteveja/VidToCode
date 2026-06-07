import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors, radius, font } from "../theme";

type Props = {
  children: React.ReactNode;
  color?: string;
  bg?: string;
  style?: ViewStyle;
};

export default function Pill({ children, color = colors.navy, bg = "rgba(255,255,255,0.18)", style }: Props) {
  return (
    <View style={[styles.pill, { backgroundColor: bg }, style]}>
      {typeof children === "string" ? (
        <Text style={[styles.text, { color }]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  text: { fontSize: 13, fontWeight: font.bold },
});
