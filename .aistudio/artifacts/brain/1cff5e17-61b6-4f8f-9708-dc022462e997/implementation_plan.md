# English Default Localization & Universal Language Alignment

Configure English as the primary, default language across the entire Suraksha Saathi application—including initial landing states, UI navigation, safety reader instructions, shift/wage logs, grievance forms, and welfare resources—while maintaining the full multilingual switcher for Hindi, Tamil, Telugu, Bengali, and Marathi.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Based on your confirmation in Phase 1:
> - **Default Language**: English (`en`) will be the default application language on initial load and across all views.
> - **Multilingual Switcher Retained**: Workers and administrators can still toggle to Hindi, Tamil, Telugu, Bengali, or Marathi at any time via the top navigation language menu.
> - **Universal English Data & Audio**: All sample shift records, preset hazard sign analyses, emergency beacon advisories, wage slips, and voice-to-text / text-to-speech defaults will initialize in clear, accessible English.

- **Confirmed Decision 1**: Set English as the default initial application language (`localStorage` fallback to `'en'`).
- **Confirmed Decision 2**: Preserve the multi-language selector in the header for on-demand switching to native Indian languages.
- **Decision 3 (Audio & Presets)**: Default Web Speech API synthesis to Indian English (`en-IN`) with natural cadence suitable for industrial environments.

---

## 1. Overview & Core Concept

- **What It Does**: Sets English as the universal default interface language across all five application sections:
  1. *Home & Safety Hub*: English emergency alerts, daily safety rules, and shift status.
  2. *Multilingual Safety Manual Reader*: English preset analyses (Pinch Rollers, High Voltage, Acid Tanks), prompt instructions, and English text-to-speech audio narration.
  3. *Shift & Wage Tracker*: English shift types ("Day Shift", "Night Shift", "Double Shift"), overtime 2x rate notifications, and English printable wage slips.
  4. *Anonymous Grievance Box*: English hazard categories, severity ratings, tracking codes, and English voice dictation.
  5. *Worker Resources & Legal Rights*: English descriptions for e-Shram, One Nation One Ration Card, Ayushman Bharat, 2x Overtime laws, EPFO balance checks, and helplines.
- **Target Audience**: Factory workers, plant supervisors, safety officers, and compliance auditors seeking an English-first operational interface.
- **Key Value**: Provides clean, professional, and accessible English terminology while ensuring migrant workers can still select their regional language when needed.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **First Arrival**: User opens the application; all headers, navigation icons, quick action cards, and safety advisories load instantly in crisp English.
  2. **Manual Scanner**: Pre-selected sign defaults to *Rotating Roller Pinch Point* in English with immediate "Listen Audio" playback in English (`en-IN`).
  3. **Shift Tracking**: Default shift logs display English contractor details (*Apex Industrial Staffing*), hourly rates, and standard English wage slips.
  4. **Language Switch**: Tapping the language badge in the top bar allows immediate 1-tap switching to Hindi, Tamil, Telugu, Bengali, or Marathi without page reload.
- **Visual Identity & Theme**:
  - *Color Palette*: Industrial safety yellow/amber (`#F59E0B`, `amber-400/500`) on deep charcoal zinc (`#09090B`) with high-visibility hazard red (`#DC2626`) for Emergency SOS.
  - *Typography*: Clean, legible sans-serif with tabular numerals (`tabular-nums`) for shift calculations and wage slips.
  - *Accessibility*: Retains font-size scaling toggle (Normal / Large / Extra Large) and high-contrast night shift toggle.
- **Interactive Feedback**:
  - Voice audio player animates wave indicators when narrating English safety scripts.
  - Microphone dictation button responds in English ("Listening... speak now...").

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: English as Primary Default with Multilingual Retention**
  - *Chosen Approach*: Change initial state `localStorage.getItem('suraksha_lang') || 'en'` in `App.tsx` and ensure all subcomponents default their local states and mock records to English.
  - *Why*: Satisfies the user's requirement to have English everywhere out-of-the-box, without permanently stripping the app of its valuable migrant accessibility features.
  - *Alternatives Considered*: Hardcoding English and deleting translation files was rejected because it removes the core companion premise for non-English migrant workers.
- **Decision 2: English Preset & Mock Data Alignment**
  - *Chosen Approach*: Update `INITIAL_SHIFTS`, `INITIAL_GRIEVANCES`, and `PRESET_SIGNS` so that their default selections and notes are in English, with full bilingual parity.
  - *Why*: Ensures there are no jarring mixed-language moments where UI labels are English but sample records remain in Devanagari Hindi.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│                      Suraksha Saathi                   │
│           (Default Language: 'en' / English)           │
└──────────────────────────┬─────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│      Top Header & SOS    │  │  Bottom Tab Navigation   │
│ • Lang Selector (Default:│  │ • Home                   │
│   English with hi/ta/te/ │  │ • Safety Scanner         │
│   bn/mr available)       │  │ • Shifts & Wages         │
│ • Text Scaler (A, A+, A+)│  │ • Grievance Box          │
│ • High Contrast Mode     │  │ • Rights & Schemes       │
└────────────┬─────────────┘  └──────────┬───────────────┘
             │                           │
             ▼                           ▼
┌────────────────────────────────────────────────────────┐
│                   Active View Components               │
├──────────────────────────┬─────────────────────────────┤
│ Home Dashboard           │ English status, 2x OT rate, │
│                          │ quick action shortcuts      │
├──────────────────────────┼─────────────────────────────┤
│ Safety Manual Scanner    │ English hazard sign analysis│
│                          │ & 'en-IN' voice synthesis   │
├──────────────────────────┼─────────────────────────────┤
│ Shift & Wage Tracker     │ English calendar & digital  │
│                          │ wage slip generator         │
├──────────────────────────┼─────────────────────────────┤
│ Anonymous Grievance Box  │ English voice-to-text mic   │
│                          │ & tracking status tickets   │
├──────────────────────────┼─────────────────────────────┤
│ Worker Resources Section │ English e-Shram, ONORC,     │
│                          │ 2x Overtime law & helplines │
└──────────────────────────┴─────────────────────────────┘
```

- **State Model**:
  - `language`: Initialized to `'en'` (persisted to `localStorage`).
  - `speechService`: Uses `'en-IN'` locale with clear pacing.
  - `server.ts`: Default fallback `targetLanguage: 'en'` for API requests.
- **Verification Plan**:
  - Run `compile_applet` to verify compilation.
  - Run `lint_applet` to ensure type safety.
  - Verify all 5 views display English text, English speech readouts, and English sample records on initial load.
