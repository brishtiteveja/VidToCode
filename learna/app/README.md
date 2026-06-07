# Learna (React Native / Expo) — UI clone

A pixel-faithful reconstruction of the **"Speak & Learn English: Learna"** mobile app, reverse-engineered from a 10-minute screen recording (`../Recordings/LearnaApp.MP4`). See `../design-analysis.md` for the full UI spec derived from 306 analyzed frames.

## Stack
- Expo SDK 56, React Native 0.85, React 19, TypeScript
- `@react-navigation/native` + bottom-tabs + native-stack
- `expo-linear-gradient`, `react-native-svg` (robot mascot + winding path), `@expo/vector-icons`

## Run
```bash
cd app
npm install        # already installed
npm run ios        # or: npm run android / npm run web
```
Then press `i` (iOS simulator), `a` (Android), or `w` (web) in the Expo CLI.

## Screens implemented

### Onboarding (shown first, until completed)
- **Welcome** — social proof (4.6 rating, 50M+ downloads, laurels), glowing robot hero with multilingual greeting bubbles, online-learner count, "Let's Go".
- **Feature carousel** — swipeable: Your Private Tutor (language chips + video-call card), Feedback & Improve, Progress & Grow (level bar + mini skill path) with pager dots + Continue.
- **Chat onboarding** — data-driven AI-tutor questionnaire with progress bar + avatar: name (keyboard) → native language → target language → explanation language → interests (multi, ≤4) → level → improvement areas (multi) → daily goal → reminder time, then Continue. Single/multi chips + send FAB, answers stored in app state.
- **Personalizing plan** — animated % counter inside an SVG progress ring around the avatar, rotating social-proof cards, then a "Your plan is ready!" summary (Course / Level / Focus / Duration / Interests from the user's answers) → "Get My Plan" enters the app.
- Gated by `AppStateProvider` (`src/state/AppState.tsx`); finishing flips `onboarded` and the navigator swaps to the tabbed app. Answers personalize the Profile tab.

### Main app
- **Home** — dark-blue hero (robot mascot, EN / streak / PRO pills, Free Talk), winding Duolingo-style lesson path with colored / locked / current nodes and section dividers.
- **Topic Preview** — bottom sheet (node-colored header, Words/Grammar chips, Lecture/Practice buttons, vocabulary grid, "Got it").
- **Lesson chat** (signature) — avatar "video" panel (gradient + robot, timer, 1x speed, Lecture→Practice stepper, expand), orange section banner, bilingual chat bubbles with translate(文A)/play actions, Inspire amber hint card, Type · Mic · Inspire dock, and the green-mic press-to-record state (trash / lock pills).
- **Role-Play** — Language Level cards, Collection carousel, "Create your own scenario!", themed category rows with type + level badges.
- **Scenario Detail** — hero, level badge, CASE / TASKS cards, "Start Chat".
- **Progress** — Feedback Center, Vocabulary Practice, streaks, Call Time Spent bar chart, Call History.
- **Profile** — avatar header, "Study in Native Language" toggle, settings rows + Native Language picker sheet.
- **Paywall** — Learna Pro (3-step trial timeline, Free Trial Enabled, pricing, Try Free).

## Notes
- Design tokens live in `src/theme/index.ts` (palette, level/node colors, radius, shadows).
- Content is mock data in `src/data/*` mirroring the recording (e.g. the "Catching Up" lesson, Bengali↔English scaffolding).
- The robot mascot is a hand-built SVG (`src/components/RobotAvatar.tsx`) standing in for the app's 3D avatar.
- Verified: `tsc --noEmit` clean, no lint errors, `expo export --platform web` bundles successfully.
