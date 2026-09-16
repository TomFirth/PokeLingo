# PokeLingo Project Guide

## Environment
- Expo SDK 57 (SDK version is critical, check AGENTS.md)
- React Native Web 0.86
- TypeScript
- NativeWind (Tailwind CSS)

## Build & Deploy (Web)
- Run Dev: `npm run web`
- Build: `npm run build:web`
- Deploy to GitHub Pages: `npm run deploy`
- Note: If deploying to a sub-path, use `BASE_URL=/your-repo-name/ npm run build:web`

## Progression & Storage
- Uses `AsyncStorage` which maps to `localStorage` on web.
- Data is persistent per-browser session.

## Architecture
- `src/app`: Expo Router screens
- `src/hooks`: Custom logic (Progression, Game Engines)
- `src/data`: Pokémon and Type static data
- `src/components`: UI components
