# PokeLingo

PokeLingo is a web-based training tool designed to help players master Pokemon type effectiveness and identification. It provides a structured learning path through every generation of the series, from Kanto to Paldea.

## Overview

The application focuses on two primary modes of practice: type matchup speed-testing and silhouette recognition. As you play, you earn experience points and level up your trainer profile, which unlocks new regions and challenges.

## Game Modes

### PokeLingo (Type Mastery)
A split-screen challenge where you compare two Pokemon. Your goal is to determine the type relationship between them by swiping:
- Swipe Right: Your Pokemon is super effective against the opponent.
- Swipe Left: The opponent is super effective against you.
- Swipe Up: Neither Pokemon has a type advantage.

### Mystery (Who's That Pokemon?)
A silhouette identification game. You are presented with a hidden Pokemon and four possible names. Identifying the correct Pokemon fills your regional collection and earns badges.

### Type Guide
A comprehensive reference tool that maps out every type's weaknesses and strengths. It serves as a study guide for players before they jump into the games.

## Progression and Regions

The app tracks your progress locally in your browser. You begin in the Kanto region and unlock subsequent generations as you reach specific level milestones:
- Johto: Level 5
- Hoenn: Level 7
- Sinnoh: Level 9
- ...up to the Championship Arena at Level 20.

Achievements are recognized through the Gym Badge system, with Silver and Gold medals awarded for specific milestones in each game mode.

## Technical Details

PokeLingo is built with React Native Web and Expo, allowing for a highly responsive, mobile-first interface that runs directly in any modern browser.

### Local Development
To run the project locally:
1. Install dependencies: `npm install`
2. Start the development server: `npm run web`

### Deployment
The project is optimized for static hosting on GitHub Pages:
- Build the project: `npm run build:web`
- Deploy: `npm run deploy`

### Privacy and Persistence
Your progress is saved using the browser's local storage. No accounts, authentication, or external databases are required. All data remains on your own device.
