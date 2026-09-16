# PokeLingo Development Roadmap

This document outlines the development phases for PokeLingo, moving from a Minimum Viable Product (MVP) to a fully-featured application.

## Phase 1: Foundation & Navigation (MVP Start)
*Goal: Establish the project structure and basic screen navigation.*

- [x] Initialize Expo project (SDK 57, React Native 0.86, New Architecture).
- [x] Configure Tailwind CSS / NativeWind for styling.
- [x] Set up Expo Router with the following shell screens:
    - `MenuScreen` (Home)
    - `PokeLingoScreen` (Game)
    - `WTPScreen` (Who's That Pokemon)
    - `TypesScreen` (Tutorial/Reference)
    - `GymBadgeScreen` (Achievements)
    - `SettingsScreen`
- [x] Implement core UI theme (Dark/Light mode support, rounded surfaces, clean typography).

## Phase 2: PokeLingo Core Mechanics (MVP)
*Goal: Functional swiping game using Pokemon types.*

- [x] Data layer: Define Type relationships (Weaknesses, Resistances, Immunities).
- [x] Implement Generation I (Kanto) type data.
- [x] Build the Game Engine:
    - Split screen UI (Player vs. Opponent).
    - Swipe logic: Right (Strong), Left (Weak), Up (Neutral).
    - Basic win/loss state and feedback.
- [x] Implement `TypesScreen` vertical list tutorial.

## Phase 3: "Who's That Pokemon?" Core Mechanics (MVP)
*Goal: Silhouette guessing game.*

- [x] Implement silhouette generator (Saturation/Contrast filter on images).
- [x] Create Autocomplete text input for Pokemon names.
- [x] basic guessing logic and result feedback.

## Phase 4: Progression & Persistence
*Goal: XP system and data saving.*

- [x] Set up `AsyncStorage` or `SQLite` for local state persistence.
- [x] Implement XP and Leveling system.
- [x] Add Level-up toasts and Main Menu XP display.
- [x] Implement region-based locking (unlock Johto after Kanto, etc.).

## Phase 5: Badge System & Polish
*Goal: Reward system and enhanced user experience.*

- [x] Build `GymBadgeScreen` with Silver/Gold badge logic.
- [x] Add Badge milestones for PokeLingo (Gen completion) and WTP (10/100 correct).
- [x] Integrate tactile haptics for gameplay actions.
- [x] Add animated transitions between screens and game states.

## Phase 6: Content Expansion & Final Polish
*Goal: Complete the full game experience.*

- [x] Add data for all Generations (II through IX).
- [x] Implement "Championship" mode (Mixed Generations - Logic implemented, Level 20 unlock).
- [x] Final UI/UX pass: Edge-to-edge layouts, system bar matching.
- [x] Performance optimization (Hermes, New Architecture enabled).
- [x] **Transition to Web**: Removed Android-specific build scripts and configurations.
- [x] **Web Caching & Persistence**: Configured for GitHub Pages and verified `AsyncStorage` (LocalStorage) for session saving.

## Phase 7: Polish & Snappy Gameplay
*Goal: Enhanced feedback and streamlined WTP.*

- [x] Implement Multiple Choice (4 buttons) for WTP guessing.
- [x] Integrate `expo-image` for high-performance caching.
- [x] Add locked region visibility (padlocks and level requirements).
- [x] Implement "Shake" and "Pop" micro-animations for feedback.
- [x] Expand Settings with Haptic and Theme toggles.
- [x] Apply "Championship Flavor" (unique gold-themed UI).
- [x] **Styling Overhaul**: Applied modern rounded typography, improved color hierarchy, and 40px rounded surfaces across all screens.
