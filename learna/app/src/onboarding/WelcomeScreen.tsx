import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { colors, font, radius, shadow } from "../theme";
import RobotAvatar from "../components/RobotAvatar";
import type { OnboardingParamList } from "./OnboardingNavigator";

const greetings = [
  { text: "Hallo!", top: 12, left: 8 },
  { text: "Hi!", top: 40, right: 6 },
  { text: "Hola!", bottom: 60, left: 0 },
  { text: "Salut!", bottom: 24, right: 12 },
];

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.laurel}>🌿</Text>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
      <Text style={[styles.laurel, styles.laurelFlip]}>🌿</Text>
    </View>
  );
}

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<OnboardingParamList>>();

  return (
    <LinearGradient colors={["#EAF3FD", "#FFFFFF"]} style={styles.root}>
      <View style={{ paddingTop: insets.top + 16, flex: 1 }}>
        <View style={styles.statsRow}>
          <Stat value="4.6" label="Store Rating" />
          <Stat value="50M+" label="Downloads" />
        </View>

        <View style={styles.hero}>
          <View style={styles.glow} />
          <RobotAvatar size={150} />
          {greetings.map((g) => (
            <View
              key={g.text}
              style={[
                styles.bubble,
                {
                  top: g.top,
                  left: g.left,
                  right: g.right,
                  bottom: g.bottom,
                },
              ]}
            >
              <Text style={styles.bubbleText}>{g.text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.onlineRow}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>132,143 online learners</Text>
        </View>

        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
        </View>

        <Text style={styles.headline}>Welcome to Learna!</Text>
        <Text style={styles.subcopy}>
          Boost your language skills with Learna effortlessly anytime, anywhere.
        </Text>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity style={styles.loginRow}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLink}>Log in</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cta} activeOpacity={0.9} onPress={() => nav.navigate("Features")}>
          <Text style={styles.ctaText}>Let&rsquo;s Go</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.legal}>
          By continuing, you agree to our <Text style={styles.legalLink}>Privacy Policy</Text> and{" "}
          <Text style={styles.legalLink}>Terms of Service</Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  statsRow: { flexDirection: "row", justifyContent: "space-around", paddingHorizontal: 20 },
  stat: { flexDirection: "row", alignItems: "center", gap: 6 },
  laurel: { fontSize: 30 },
  laurelFlip: { transform: [{ scaleX: -1 }] },
  statValue: { fontSize: 22, fontWeight: font.black, color: colors.orange },
  statLabel: { fontSize: 12, color: colors.navySoft, fontWeight: font.medium },

  hero: { height: 240, alignItems: "center", justifyContent: "center", marginTop: 10 },
  glow: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#BBD9FB",
    opacity: 0.5,
  },
  bubble: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
    ...shadow.card,
  },
  bubbleText: { fontSize: 14, fontWeight: font.bold, color: colors.primary },

  onlineRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, marginTop: 6 },
  onlineDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: "#36C759" },
  onlineText: { fontSize: 14, color: colors.navySoft, fontWeight: font.semibold },

  dots: { flexDirection: "row", justifyContent: "center", gap: 7, marginTop: 22 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#C5D6E8" },
  dotActive: { width: 20, backgroundColor: colors.primary },

  headline: { fontSize: 30, fontWeight: font.black, color: colors.navy, textAlign: "center", marginTop: 18 },
  subcopy: { fontSize: 16, color: colors.navySoft, textAlign: "center", marginTop: 10, paddingHorizontal: 36, lineHeight: 22 },

  footer: { paddingHorizontal: 22 },
  loginRow: { alignItems: "center", marginBottom: 14 },
  loginText: { fontSize: 14, color: colors.muted },
  loginLink: { color: colors.primary, fontWeight: font.bold },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 17,
    ...shadow.button,
  },
  ctaText: { color: "#fff", fontSize: 19, fontWeight: font.bold },
  legal: { fontSize: 12, color: colors.muted, textAlign: "center", marginTop: 14, lineHeight: 17 },
  legalLink: { color: colors.navySoft, textDecorationLine: "underline" },
});
