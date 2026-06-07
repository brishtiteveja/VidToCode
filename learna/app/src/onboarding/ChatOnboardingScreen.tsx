import React, { useMemo, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { colors, font, radius, shadow } from "../theme";
import RobotAvatar from "../components/RobotAvatar";
import { useAppState } from "../state/AppState";
import type { OnboardingParamList } from "./OnboardingNavigator";

type Choice = { label: string; emoji?: string };
type Answers = Record<string, string | string[]>;
type Step = {
  id: string;
  type: "text" | "single" | "multi";
  prompt: (a: Answers) => string;
  helper?: string;
  placeholder?: string;
  options?: (a: Answers) => Choice[];
  max?: number;
};

const steps: Step[] = [
  {
    id: "name",
    type: "text",
    prompt: () => "What's your name?",
    helper: "Learna will call you by this name.",
    placeholder: "Enter your name",
  },
  {
    id: "nativeLanguage",
    type: "single",
    prompt: (a) => `Great to meet you ${a.name || "there"}! What's your native language?`,
    options: () => [
      { label: "বাংলা", emoji: "🇧🇩" },
      { label: "English", emoji: "🇬🇧" },
      { label: "Español", emoji: "🇪🇸" },
      { label: "中文", emoji: "🇨🇳" },
      { label: "Tiếng Việt", emoji: "🇻🇳" },
    ],
  },
  {
    id: "targetLanguage",
    type: "single",
    prompt: () => "Which language would you like to learn?",
    options: () => [
      { label: "English", emoji: "🇬🇧" },
      { label: "Spanish", emoji: "🇪🇸" },
      { label: "French", emoji: "🇫🇷" },
      { label: "German", emoji: "🇩🇪" },
    ],
  },
  {
    id: "explanationLanguage",
    type: "single",
    prompt: (a) =>
      `Do you want to learn ${a.targetLanguage || "English"} with explanations in ${a.nativeLanguage || "বাংলা"} or in ${a.targetLanguage || "English"}?`,
    options: (a) => [
      { label: String(a.nativeLanguage || "বাংলা"), emoji: "🇧🇩" },
      { label: String(a.targetLanguage || "English"), emoji: "🇬🇧" },
    ],
  },
  {
    id: "interests",
    type: "multi",
    max: 4,
    prompt: () => "Please select your interests. You can choose up to 4 options.",
    options: () => [
      { label: "Pop Culture", emoji: "🎬" },
      { label: "Cooking", emoji: "🍳" },
      { label: "Food", emoji: "🥑" },
      { label: "Traveling", emoji: "🧳" },
      { label: "Shopping", emoji: "🛍️" },
      { label: "Sports", emoji: "⚽" },
    ],
  },
  {
    id: "level",
    type: "single",
    prompt: () => "What is your level of English?",
    options: () => [
      { label: "Beginner" },
      { label: "Pre-Intermediate" },
      { label: "Intermediate" },
      { label: "Upper-Intermediate" },
      { label: "Advanced" },
      { label: "Proficient" },
    ],
  },
  {
    id: "areas",
    type: "multi",
    max: 6,
    prompt: () => "In which areas would you like to improve your English?",
    options: () => [
      { label: "Career & job", emoji: "💼" },
      { label: "Family & friends", emoji: "👫" },
      { label: "Communicating with partners", emoji: "💑" },
      { label: "Travels", emoji: "✈️" },
      { label: "Brain training", emoji: "🧠" },
      { label: "Education", emoji: "🎓" },
    ],
  },
  {
    id: "dailyGoal",
    type: "single",
    prompt: () => "What's your daily practice goal?",
    options: () => [
      { label: "5 min / day" },
      { label: "10 min / day" },
      { label: "15 min / day" },
      { label: "30 min / day" },
      { label: "60 min / day" },
    ],
  },
  {
    id: "reminder",
    type: "single",
    prompt: () => "Pick a time of the day to start your practice every day.",
    options: () => [
      { label: "09:00", emoji: "🌅" },
      { label: "12:30", emoji: "🌞" },
      { label: "18:00", emoji: "🌆" },
      { label: "21:30", emoji: "🌙" },
    ],
  },
];

function labelWithEmoji(c: Choice) {
  return c.emoji ? `${c.emoji} ${c.label}` : c.label;
}

export default function ChatOnboardingScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<OnboardingParamList>>();
  const { setProfile } = useAppState();
  const scrollRef = useRef<ScrollView>(null);

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [text, setText] = useState("");
  const [selection, setSelection] = useState<string[]>([]);

  const done = stepIndex >= steps.length;
  const step = done ? null : steps[stepIndex];
  const progress = stepIndex / (steps.length + 1);

  const options = useMemo(() => (step?.options ? step.options(answers) : []), [step, answers]);

  const commit = (value: string | string[]) => {
    const next = { ...answers, [steps[stepIndex].id]: value };
    setAnswers(next);
    setSelection([]);
    setText("");
    setStepIndex((i) => i + 1);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 60);
  };

  const onSend = () => {
    if (!step) return;
    if (step.type === "text") {
      if (!text.trim()) return;
      commit(text.trim());
    } else if (step.type === "single") {
      if (!selection[0]) return;
      commit(selection[0]);
    } else {
      if (!selection.length) return;
      commit(selection);
    }
  };

  const toggle = (label: string) => {
    if (!step) return;
    if (step.type === "single") {
      setSelection([label]);
    } else {
      setSelection((s) => {
        if (s.includes(label)) return s.filter((x) => x !== label);
        if (step.max && s.length >= step.max) return s;
        return [...s, label];
      });
    }
  };

  const finish = () => {
    setProfile({
      name: String(answers.name || "Ananda"),
      nativeLanguage: String(answers.nativeLanguage || "বাংলা"),
      targetLanguage: String(answers.targetLanguage || "English"),
      explanationLanguage: String(answers.explanationLanguage || "বাংলা"),
      interests: (answers.interests as string[]) || [],
      level: String(answers.level || "Advanced"),
      areas: (answers.areas as string[]) || [],
      dailyGoal: String(answers.dailyGoal || "10 min / day"),
      reminder: String(answers.reminder || "21:30"),
    });
    nav.navigate("Personalizing");
  };

  const canSend =
    step?.type === "text" ? text.trim().length > 0 : selection.length > 0;

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${Math.max(progress * 100, 6)}%` }]} />
      </View>

      <View style={styles.avatarWrap}>
        <RobotAvatar size={64} />
      </View>

      <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={styles.chat}>
        <AiBubble text="Hi there!" />
        <AiBubble text="I'm Learna, your personalized AI Tutor. I will help you to learn a new language and improve your language skills." />

        {steps.slice(0, stepIndex).map((s) => {
          const a = answers[s.id];
          const userText = Array.isArray(a)
            ? a
                .map((lab) => {
                  const c = s.options?.(answers).find((o) => o.label === lab);
                  return c ? labelWithEmoji(c) : lab;
                })
                .join(", ")
            : (() => {
                const c = s.options?.(answers).find((o) => o.label === a);
                return c ? labelWithEmoji(c) : String(a);
              })();
          return (
            <View key={s.id}>
              <AiBubble text={s.prompt(answers)} />
              <UserBubble text={userText} />
            </View>
          );
        })}

        {step && <AiBubble text={step.prompt(answers)} />}
        {done && <AiBubble text="All set! I'll remind you at your practice time. Allow notifications not to miss it!" />}
      </ScrollView>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={[styles.dock, { paddingBottom: insets.bottom + 10 }]}>
          {done ? (
            <TouchableOpacity style={styles.continueBtn} activeOpacity={0.9} onPress={finish}>
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          ) : step?.type === "text" ? (
            <>
              {step.helper && (
                <View style={styles.helper}>
                  <Text style={styles.helperText}>{step.helper}</Text>
                </View>
              )}
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder={step.placeholder}
                  placeholderTextColor={colors.muted}
                  value={text}
                  onChangeText={setText}
                  onSubmitEditing={onSend}
                  returnKeyType="send"
                />
                <SendFab enabled={canSend} onPress={onSend} />
              </View>
            </>
          ) : (
            <>
              <View style={styles.chipWrap}>
                {options.map((o) => {
                  const active = selection.includes(o.label);
                  return (
                    <TouchableOpacity
                      key={o.label}
                      style={[styles.chip, active && styles.chipActive]}
                      onPress={() => toggle(o.label)}
                    >
                      {o.emoji && <Text style={{ fontSize: 15 }}>{o.emoji}</Text>}
                      <Text style={[styles.chipText, active && styles.chipTextActive]}>{o.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View style={styles.fabRow}>
                <SendFab enabled={canSend} onPress={onSend} />
              </View>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

function SendFab({ enabled, onPress }: { enabled: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity
      disabled={!enabled}
      onPress={onPress}
      style={[styles.fab, { backgroundColor: enabled ? colors.primary : "#9DC8F5" }]}
    >
      <Ionicons name="arrow-up" size={22} color="#fff" />
    </TouchableOpacity>
  );
}

function AiBubble({ text }: { text: string }) {
  return (
    <View style={styles.aiRow}>
      <View style={styles.aiBubble}>
        <Text style={styles.aiText}>{text}</Text>
      </View>
    </View>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <View style={styles.userRow}>
      <View style={styles.userBubble}>
        <Text style={styles.userText}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface },
  progressTrack: { height: 6, borderRadius: 3, backgroundColor: "#E4ECF6", marginHorizontal: 16, overflow: "hidden" },
  progressFill: { height: 6, backgroundColor: colors.primary, borderRadius: 3 },
  avatarWrap: { alignItems: "center", marginTop: 8 },

  chat: { padding: 14, gap: 10, paddingBottom: 20 },
  aiRow: { alignSelf: "flex-start", maxWidth: "86%" },
  aiBubble: { backgroundColor: colors.bubbleAi, borderRadius: 16, borderBottomLeftRadius: 4, padding: 12 },
  aiText: { fontSize: 16, lineHeight: 22, color: colors.navy },
  userRow: { alignSelf: "flex-end", maxWidth: "82%", marginTop: 8 },
  userBubble: { backgroundColor: colors.bubbleUser, borderRadius: 16, borderBottomRightRadius: 4, padding: 12 },
  userText: { fontSize: 16, lineHeight: 22, color: colors.navy },

  dock: { borderTopWidth: 1, borderTopColor: colors.border, paddingHorizontal: 16, paddingTop: 12, backgroundColor: colors.surface },
  helper: { backgroundColor: "#E8F1FE", borderRadius: radius.md, paddingVertical: 10, alignItems: "center", marginBottom: 10 },
  helperText: { fontSize: 14, color: colors.navy, fontWeight: font.medium },
  inputRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  input: { flex: 1, backgroundColor: "#F0F0F2", borderRadius: radius.md, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, color: colors.navy },

  chipWrap: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 12 },
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
  chipText: { fontSize: 15, fontWeight: font.semibold, color: colors.navy },
  chipTextActive: { color: "#fff" },
  fabRow: { alignItems: "flex-end" },
  fab: { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center", ...shadow.button },

  continueBtn: { backgroundColor: colors.primary, borderRadius: radius.md, paddingVertical: 16, alignItems: "center", ...shadow.button },
  continueText: { color: "#fff", fontSize: 18, fontWeight: font.bold },
});
