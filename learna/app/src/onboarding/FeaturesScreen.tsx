import React, { useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { colors, font, radius, shadow } from "../theme";
import RobotAvatar from "../components/RobotAvatar";
import type { OnboardingParamList } from "./OnboardingNavigator";

const slides = [
  {
    key: "tutor",
    title: "Your Private Tutor",
    subtitle: "Experience learning with your own friendly virtual tutor.",
  },
  {
    key: "feedback",
    title: "Feedback & Improve",
    subtitle: "Learna identifies your improvement areas and encourages you to improve them.",
  },
  {
    key: "progress",
    title: "Progress & Grow",
    subtitle: "Learna creates a personalized learning path for you.",
  },
];

const langChips = [
  { flag: "🇩🇪", name: "German", badge: "New" },
  { flag: "🇬🇧", name: "English" },
  { flag: "🇪🇸", name: "Spanish" },
  { flag: "🇫🇷", name: "French" },
];

export default function FeaturesScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const nav = useNavigation<NativeStackNavigationProp<OnboardingParamList>>();
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / width);
    if (i !== index) setIndex(i);
  };

  const onContinue = () => {
    if (index < slides.length - 1) {
      scrollRef.current?.scrollTo({ x: (index + 1) * width, animated: true });
      setIndex(index + 1);
    } else {
      nav.navigate("Chat");
    }
  };

  return (
    <LinearGradient colors={["#EAF3FD", "#FFFFFF"]} style={styles.root}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: insets.top + 24 }}
      >
        {slides.map((s) => (
          <View key={s.key} style={[styles.slide, { width }]}>
            {s.key === "tutor" && <TutorHero />}
            {s.key === "feedback" && <FeedbackHero />}
            {s.key === "progress" && <ProgressHero />}
          </View>
        ))}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
        <Text style={styles.title}>{slides[index].title}</Text>
        <Text style={styles.subtitle}>{slides[index].subtitle}</Text>
        <TouchableOpacity style={styles.cta} activeOpacity={0.9} onPress={onContinue}>
          <Text style={styles.ctaText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

function TutorHero() {
  return (
    <View style={{ alignItems: "center", width: "100%" }}>
      <View style={styles.chipRow}>
        {langChips.map((c) => (
          <View key={c.name} style={[styles.langChip, c.name === "English" && styles.langChipActive]}>
            <Text style={{ fontSize: 14 }}>{c.flag}</Text>
            <Text style={[styles.langChipText, c.name === "English" && { color: "#fff" }]}>{c.name}</Text>
            {c.badge && (
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>{c.badge}</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      <LinearGradient colors={["#2B4E86", "#15233F"]} style={styles.callCard}>
        <View style={styles.callLabel}>
          <Ionicons name="videocam" size={14} color="#fff" />
          <Text style={styles.callLabelText}>Learna · Video Call</Text>
        </View>
        <RobotAvatar size={120} />
        <View style={styles.caption}>
          <Text style={styles.captionText}>Hi! How are you?</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

function FeedbackHero() {
  return (
    <View style={styles.heroCard}>
      <View style={styles.fbLine}>
        <Ionicons name="close-circle" size={20} color={colors.red} />
        <Text style={styles.fbStrike}>I have went to the store.</Text>
      </View>
      <View style={styles.fbLine}>
        <Ionicons name="checkmark-circle" size={20} color={colors.greenSoft} />
        <Text style={styles.fbGood}>I have gone to the store.</Text>
      </View>
      <View style={styles.fbTag}>
        <Ionicons name="sparkles" size={14} color={colors.primary} />
        <Text style={styles.fbTagText}>Grammar tip · Present Perfect</Text>
      </View>
    </View>
  );
}

function ProgressHero() {
  return (
    <View style={styles.heroCard}>
      <View style={styles.levelBar}>
        <Text style={styles.levelText}>Beginner</Text>
        <View style={styles.levelTrack}>
          <View style={styles.levelFill} />
        </View>
        <Text style={styles.levelText}>Pre-Int.</Text>
      </View>
      <View style={styles.miniPath}>
        {[
          { c: "#F0584B", icon: "hand-left", done: true },
          { c: "#16B0A6", icon: "flag", done: true },
          { c: "#B7BDC4", icon: "flag", done: false },
          { c: "#B7BDC4", icon: "person", done: false },
        ].map((n, i) => (
          <View key={i} style={[styles.miniNode, { backgroundColor: n.c }]}>
            <Ionicons name={n.icon as any} size={20} color="#fff" />
            {n.done ? (
              <View style={styles.checkBadge}>
                <Ionicons name="checkmark" size={10} color="#fff" />
              </View>
            ) : (
              <View style={styles.lockBadge}>
                <Ionicons name="lock-closed" size={9} color="#8A94A6" />
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  slide: { alignItems: "center", paddingHorizontal: 20 },

  chipRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 18 },
  langChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fff",
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
    ...shadow.card,
  },
  langChipActive: { backgroundColor: colors.primary },
  langChipText: { fontSize: 14, fontWeight: font.semibold, color: colors.navy },
  newBadge: { backgroundColor: "#36C759", borderRadius: radius.pill, paddingHorizontal: 6, paddingVertical: 1 },
  newBadgeText: { color: "#fff", fontSize: 10, fontWeight: font.bold },

  callCard: { width: 240, height: 300, borderRadius: radius.xl, alignItems: "center", justifyContent: "center", gap: 18 },
  callLabel: { position: "absolute", top: 14, left: 14, flexDirection: "row", alignItems: "center", gap: 6 },
  callLabelText: { color: "#fff", fontSize: 13, fontWeight: font.semibold },
  caption: { backgroundColor: "rgba(0,0,0,0.4)", borderRadius: radius.pill, paddingHorizontal: 16, paddingVertical: 8 },
  captionText: { color: "#fff", fontSize: 15, fontWeight: font.medium },

  heroCard: {
    width: "92%",
    backgroundColor: "#fff",
    borderRadius: radius.xl,
    padding: 22,
    gap: 16,
    ...shadow.card,
  },
  fbLine: { flexDirection: "row", alignItems: "center", gap: 10 },
  fbStrike: { fontSize: 16, color: colors.muted, textDecorationLine: "line-through" },
  fbGood: { fontSize: 16, color: colors.navy, fontWeight: font.semibold },
  fbTag: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-start", backgroundColor: "#EAF2FE", borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 7 },
  fbTagText: { fontSize: 13, color: colors.primary, fontWeight: font.semibold },

  levelBar: { flexDirection: "row", alignItems: "center", gap: 10 },
  levelText: { fontSize: 13, fontWeight: font.bold, color: colors.navySoft },
  levelTrack: { flex: 1, height: 10, borderRadius: 5, backgroundColor: "#E4ECF6", overflow: "hidden" },
  levelFill: { width: "28%", height: 10, backgroundColor: "#36C759" },
  miniPath: { flexDirection: "row", justifyContent: "space-around", marginTop: 4 },
  miniNode: { width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center" },
  checkBadge: { position: "absolute", right: -2, bottom: -2, width: 20, height: 20, borderRadius: 10, backgroundColor: "#36C759", alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#fff" },
  lockBadge: { position: "absolute", right: -2, bottom: -2, width: 20, height: 20, borderRadius: 10, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#EEF1F5" },

  footer: { paddingHorizontal: 22 },
  dots: { flexDirection: "row", justifyContent: "center", gap: 7, marginBottom: 18 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#C5D6E8" },
  dotActive: { width: 20, backgroundColor: colors.primary },
  title: { fontSize: 28, fontWeight: font.black, color: colors.navy, textAlign: "center" },
  subtitle: { fontSize: 16, color: colors.navySoft, textAlign: "center", marginTop: 10, paddingHorizontal: 24, lineHeight: 22 },
  cta: { backgroundColor: colors.primary, borderRadius: radius.md, paddingVertical: 17, alignItems: "center", marginTop: 22, ...shadow.button },
  ctaText: { color: "#fff", fontSize: 19, fontWeight: font.bold },
});
