import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { colors, font, radius, shadow } from "../theme";
import RobotAvatar from "../components/RobotAvatar";

const steps = [
  { icon: "lock-closed", title: "Start your free trial", desc: "Accessible anytime, anywhere for flexible learning.", active: true },
  { icon: "notifications", title: "Get a reminder", desc: "We will remind you when your trial will end", active: false },
  { icon: "star", title: "Start your subscription", desc: "$17.99 per week starting Jun 13", active: false },
];

export default function PaywallScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation();

  return (
    <View style={styles.root}>
      <LinearGradient colors={["#CDE6FB", "#FFFFFF"]} style={StyleSheet.absoluteFill} />
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 110 }}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.closeBtn} onPress={() => nav.goBack()}>
            <Ionicons name="close" size={20} color={colors.muted} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.restore}>Restore</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.heroWrap}>
          <RobotAvatar size={130} />
        </View>
        <Text style={styles.eyebrow}>Learna Pro</Text>
        <Text style={styles.headline}>Get Unlimited Access</Text>
        <Text style={styles.subtitle}>Accessible anytime, anywhere for flexible learning.</Text>

        <View style={styles.timeline}>
          {steps.map((s, i) => (
            <View key={s.title} style={styles.step}>
              <View style={styles.stepIconCol}>
                <View style={[styles.stepIcon, s.active && styles.stepIconActive]}>
                  <Ionicons name={s.icon as any} size={18} color={s.active ? "#fff" : colors.muted} />
                </View>
                {i < steps.length - 1 && <View style={styles.stepConnector} />}
              </View>
              <View style={{ flex: 1, paddingBottom: 18 }}>
                <Text style={[styles.stepTitle, s.active && { color: colors.primary }]}>{s.title}</Text>
                <Text style={styles.stepDesc}>{s.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.trialBar}>
          <Text style={styles.trialText}>Free Trial Enabled</Text>
        </View>

        <View style={styles.priceRow}>
          <View>
            <Text style={styles.priceLabel}>Due today</Text>
            <Text style={styles.priceLabelSub}>Due June 13, 2026</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.freeTrial}>7 days free · $0.00</Text>
            <Text style={styles.priceValue}>$17.99</Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <TouchableOpacity style={styles.cta} activeOpacity={0.9} onPress={() => nav.goBack()}>
          <Text style={styles.ctaText}>Try Free</Text>
        </TouchableOpacity>
        <View style={styles.footerLinks}>
          <Text style={styles.footerLink}>Privacy | Terms</Text>
          <Text style={styles.footerLink}>Cancel Anytime</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface },
  topBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 18 },
  closeBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: "rgba(0,0,0,0.06)", alignItems: "center", justifyContent: "center" },
  restore: { color: colors.muted, fontWeight: font.semibold, fontSize: 15 },

  heroWrap: { alignItems: "center", marginTop: 10 },
  eyebrow: { textAlign: "center", color: colors.primary, fontWeight: font.black, fontSize: 18, marginTop: 4 },
  headline: { textAlign: "center", color: colors.navy, fontWeight: font.black, fontSize: 32, marginTop: 4 },
  subtitle: { textAlign: "center", color: colors.muted, fontSize: 16, marginTop: 8, paddingHorizontal: 40 },

  timeline: { marginTop: 26, paddingHorizontal: 28 },
  step: { flexDirection: "row", gap: 14 },
  stepIconCol: { alignItems: "center" },
  stepIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#E7EAEF", alignItems: "center", justifyContent: "center" },
  stepIconActive: { backgroundColor: colors.primary },
  stepConnector: { width: 2, flex: 1, backgroundColor: "#E7EAEF", marginVertical: 2 },
  stepTitle: { fontSize: 17, fontWeight: font.bold, color: colors.navy },
  stepDesc: { fontSize: 14, color: colors.muted, marginTop: 2 },

  trialBar: { backgroundColor: "#E9ECF1", marginHorizontal: 20, marginTop: 6, borderRadius: radius.md, paddingVertical: 12, alignItems: "center" },
  trialText: { fontSize: 15, fontWeight: font.bold, color: colors.navy },
  priceRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 24, marginTop: 16 },
  priceLabel: { fontSize: 16, fontWeight: font.bold, color: colors.navy },
  priceLabelSub: { fontSize: 13, color: colors.muted, marginTop: 2 },
  freeTrial: { fontSize: 14, fontWeight: font.bold, color: colors.greenSoft },
  priceValue: { fontSize: 18, fontWeight: font.black, color: colors.navy, marginTop: 2 },

  footer: { position: "absolute", left: 0, right: 0, bottom: 0, paddingHorizontal: 20, paddingTop: 10, backgroundColor: "rgba(255,255,255,0.95)" },
  cta: { backgroundColor: colors.primary, borderRadius: radius.md, paddingVertical: 17, alignItems: "center", ...shadow.button },
  ctaText: { color: "#fff", fontSize: 20, fontWeight: font.bold },
  footerLinks: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  footerLink: { color: colors.muted, fontSize: 13 },
});
