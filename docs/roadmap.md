# PokeLingo Development Roadmap

This document outlines the development phases for PokeLingo, moving from a Minimum Viable Product (MVP) to a fully-featured application.

## Phase 1: Foundation & Navigation (MVP Start)
*Goal: Establish the project structure and basic screen navigation.*

- [ ] Initialize Expo project (SDK 57, React Native 0.86, New Architecture).
- [ ] Configure Tailwind CSS / NativeWind for styling.
- [ ] Set up Expo Router with the following shell screens:
    - `MenuScreen` (Home)
    - `PokeLingoScreen` (Game)
    - `WTPScreen` (Who's That Pokemon)
    - `TypesScreen` (Tutorial/Reference)
    - `GymBadgeScreen` (Achievements)
    - `SettingsScreen`
- [ ] Implement core UI theme (Dark/Light mode support, rounded surfaces, clean typography).

## Phase 2: PokeLingo Core Mechanics (MVP)
*Goal: Functional swiping game using Pokemon types.*

- [ ] Data layer: Define Type relationships (Weaknesses, Resistances, Immunities).
- [ ] Implement Generation I (Kanto) type data.
- [ ] Build the Game Engine:
    - Split screen UI (Player vs. Opponent).
    - Swipe logic: Right (Strong), Left (Weak), Up (Neutral).
    - Basic win/loss state and feedback.
- [ ] Implement `TypesScreen` vertical list tutorial.

## Phase 3: "Who's That Pokemon?" Core Mechanics (MVP)
*Goal: Silhouette guessing game.*

- [ ] Implement silhouette generator (Saturation/Contrast filter on images).
- [ ] Create Autocomplete text input for Pokemon names.
- [ ] basic guessing logic and result feedback.

## Phase 4: Progression & Persistence
*Goal: XP system and data saving.*

- [ ] Set up `AsyncStorage` or `SQLite` for local state persistence.
- [ ] Implement XP and Leveling system.
- [ ] Add Level-up toasts and Main Menu XP display.
- [ ] Implement region-based locking (unlock Johto after Kanto, etc.).

## Phase 5: Badge System & Polish
*Goal: Reward system and enhanced user experience.*

- [ ] Build `GymBadgeScreen` with Silver/Gold badge logic.
- [ ] Add Badge milestones for PokeLingo (Gen completion) and WTP (10/100 correct).
- [ ] Integrate tactile haptics for gameplay actions.
- [ ] Add animated transitions between screens and game states.

## Phase 6: Content Expansion & Final Polish
*Goal: Complete the full game experience.*

- [ ] Add data for all Generations (II through IX).
- [ ] Implement "Championship" mode (Mixed Generations).
- [ ] Final UI/UX pass: Edge-to-edge layouts, system bar matching, accessibility audit.
- [ ] Performance optimization (Hermes, New Architecture).
