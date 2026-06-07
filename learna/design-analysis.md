# Learna ("Speak & Learn English: Learna" / "Learna AI") — UI Spec

Reverse-engineered from `LearnaApp.MP4` (10:11, 720×1558 portrait, iOS). 306 frames @ 0.5fps analyzed in 20 windows (`frames/seg_01..20.md`). This doc is the build spec for the React Native clone.

## Brand & Design System

**Identity:** AI-tutor English-learning app. Rounded, friendly, gamified (Duolingo-like path + streaks + PRO). 3D humanoid robot mascot/avatar. Bilingual scaffolding (target English explained in the learner's native language, e.g. Bengali).

**Palette**
- Primary blue: `#2F86EB` (CTAs, active tab, toggles, links). Variants seen: `#2F88F0`, `#2F90F5`, `#2F6BFF`.
- Navy text/headings: `#16335E` / `#1E3A5F`.
- App background (gray): `#EEF1F5` / `#F2F4F7`.
- Card surface: `#FFFFFF`.
- Muted text: `#8A94A6` / `#9AA3AF`.
- Assistant bubble: `#F0F1F3` (gray). User bubble: `#D6E8FB` (light blue).
- Record/active green: `#34C759`. Success green: `#2BA84A`.
- Destructive red: `#FF3B30`.
- Accent orange (Lecture banner, streak flame): `#F5A623`.
- Avatar/hero gradient: `#2A4A86 → #16294E` (deep blue).
- Hint card (Inspire): amber `#FBE7BE` w/ brown text `#6B4E1E`.

**Level badge colors** (outlined pills): Beginner `#2F86EB` (blue), Pre-Intermediate `#2BA84A` (green), Intermediate `#E0A21A` (amber), Upper-Intermediate `#E8772A` (orange), Advanced `#E0463C` (red), Proficient `#7B5CD6` (purple).

**Map node colors** (cycle): blue `#2F86EB`, teal `#19B5C9`, purple `#7B57E0`, red `#E2374A`, orange `#F0572D`, magenta `#C13DBE`, green `#5DBB46`, amber `#F4A300`. Locked nodes gray `#B7BFC7` w/ padlock badge.

**Typography:** Rounded sans-serif (Nunito / SF-Rounded feel). Titles ~22–34px bold/extrabold navy; body ~16px; labels/eyebrows ~12–13px uppercase tracked gray; tab labels ~11px.

**Shape:** Cards radius ~16–20; buttons ~14–16; pills fully rounded. Soft shadows; primary buttons have a darker drop-shadow "base".

**Bottom tab bar (4):** Home (house), Role-Play (theater masks), Progress (bar chart), Profile (person). Active = blue icon+label; inactive = gray.

## Navigation Map
- **Onboarding (forward-only, no tabs):** Splash → ATT → Welcome carousel (social proof) → Feature carousel (Private Tutor / Feedback / Progress path) → AI-tutor chat onboarding (name → native lang → target lang → explanation lang → interests[≤4] → level → improvement areas → daily goal → reminder time → notifications) → "Personalizing plan" loader carousel (comparison / timeline / plan-ready) → Paywall (Learna Pro) → Account creation (Apple/Google/Email) → main app.
- **Main app (bottom tabs):** Home · Role-Play · Progress · Profile.
  - Home node tap → **Topic Preview** bottom sheet → Lecture/Practice → **Lesson chat** (full screen).
  - Role-Play card → Scenario list → Scenario detail (CASE/TASKS) → Lesson chat (with Tasks tracker).
  - "Free Talk" (Home hero) → open conversation.
  - Locked node / premium → **Paywall** modal.

## Core Screens (build targets)

### 1. Home — Lesson Path Map
- Dark-blue hero header: centered 3D robot avatar; top-left `EN` flag pill; top-right `🔥 0` streak + `PRO` crown pills; bottom-left people/group pill (›); bottom-right `Free Talk` blue pill (video icon).
- Body: winding/serpentine connected path of large **circular nodes** (alternating left/center/right), each colored with a white glyph + label below; locked nodes gray + padlock badge; current node highlighted (red/orange) with halo. Section dividers (`Advanced`, etc.) between rule lines.
- Floating scroll-to-top/down FAB. Bottom tabs.
- Sample node labels: Catching Up, That's So True, Weekend Getaway, Spending Free Time, Public Opinion, Negotiations, Travel Plans, Missed Opportunities, …

### 2. Topic Preview — Bottom Sheet
- Colored rounded-top header (= node color): drag handle, big title, subtitle (native-language desc), `N Words` + `N Grammar` chips.
- White body: `EXERCISES` → two buttons **Lecture** (green) / **Practice** (purple). `WORDS TO PRACTICE` → 2-col word cards (speaker icon + English word + native translation). Full-width `Got it` CTA.

### 3. Lesson Chat (Lecture / Practice) — signature screen
- Top ~30% avatar "video" panel (deep-blue gradient + robot). Overlays: close `✕` (top-left), countdown timer pill (e.g. `04:59`), `1x` speed pill (top-right, opens 0.5/0.7/1/1.25 menu), fullscreen/expand arrows (bottom-right), left vertical **Lecture → Practice** stepper.
- Optional green `Tasks (0/3 Complete)` collapsible bar (Role-Play tasks).
- Orange `Lecture` section banner.
- Scrolling chat: assistant bubbles (gray, left) each with **translate (文A)** + **play (▶)** buttons; user bubbles (blue, right). Streaming text + typing `•••` indicator + scroll-to-bottom FAB.
- Inspire → amber example/hint card.
- Bottom dock: **Type** (keyboard) · large center **Mic** (blue) · **Inspire** (lightbulb). Recording state: left red trash/cancel pill · center **green mic** · right blue lock/send pill (WhatsApp-style press-hold). Loading spinner while transcribing.
- Fullscreen "call" mode: edge-to-edge avatar + captions + Minimize/Mic/Inspire; red close.
- Leave dialog: "Are you sure? You won't receive a feedback report…" Continue Call / Leave Call.

### 4. Role-Play
- `Language Level`: two cards (Beginner 🐤 "26 Scenes" / Pre-Intermediate 📚 "27 Scenes").
- `Collection`: `Random` 🎲 pill + horizontal cards (Restaurant, Travel, Social Dynamics, Shopping, Activities… each "12 Scenes", light-blue tile).
- `Create your own scenario!` banner (avatar cluster + + + ›).
- Category sections (`School & Job`, `Daily Interactions`, `Flirting`, `English Exams`, `Activities`, `Free Discussion`…) each w/ `See All` + horizontal card row.
- Cards: thumbnail + title + type (`Task`/`Scenario`/`Discussion`/`English Test`) + level badge.
- Scenario list (pushed): back + title + level filter chips (All/levels) + vertical cards.
- Scenario detail: hero illustration, level badge, title, `CASE` card, `TASKS` checklist, `Start Chat` CTA.

### 5. Progress
- `Feedback Center`: 3 cards — Grammar (teal), Better to Say (green), Pronunciation (indigo), each "0 times" + › button. (Detail = empty state w/ illustration + helper text.)
- `Vocabulary Practice`: progress bar + New Words `6` / Upcoming Words `1613`.
- `Your Streak`: Daily Streak `0` (orange), Longest Streak `0` (red); weekly day flames (Sa–Fr).
- `Call Time Spent`: Total Spent / Daily Average / Daily Goal + bar chart (Su–Sa).
- `Call History`: `See All` + cards (title + timestamp + ›).

### 6. Profile
- Header: avatar (blue, "A", + badge) + name `Ananda` (›) + email + gear.
- `Study in Native Language` toggle card (ON).
- Settings list: 🎯 Target Language=English, 🇬🇧 Language Level=Advanced, 👶 Native Language=বাংলা, 🧺 Interests=Cooking,Fo…, 🚩 Daily Goal=10 min/day, 🔔 Daily Reminder=21:30 (each row value + ›).
- Tapping a row → bottom sheet picker (chips + Save), e.g. Native Language.

### 7. Paywall — Learna Pro (modal)
- Close `✕` (left), `Restore` (right). Hero robot + `Learna Pro` eyebrow + `Get Unlimited Access` headline + subtitle.
- 3-step vertical timeline: 🔒 Start your free trial (active) → 🔔 Get a reminder → ⭐ Start your subscription ($17.99/wk starting Jun 13).
- `Free Trial Enabled` bar. Pricing: Due today / 7 days free $0.00 — Due June 13, 2026 / $17.99. `Try Free` CTA. `Privacy | Terms` · `Cancel Anytime`.

## Notes / mechanics
- Onboarding modeled as a chat with a progress bar; chips (single & multi-select up to 4), free-text, searchable language bottom-sheet, inline time wheel.
- Per-message translate + TTS play on every assistant bubble; speed control on lessons; countdown turn timer.
- Loss-aversion dialogs (leave call, jump-to-exercise kangaroo).
- Status/marketing: "4.6 Store Rating", "50M+ Downloads", "#1 Language Learning App", "95% see results in 7 days".
