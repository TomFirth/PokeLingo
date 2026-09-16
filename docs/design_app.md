I want the app to load on a menu page with PokeLingo (Poke-ball)
Who's that pokemon (a playing card - TCG with just a large question mark on it)
A book - the long list of all types (tutorial)
A settings cog. 

Show user's xp/level on the main menu
When a user completes a region/gen they get a badge in the badge screen. There's a silver badge for the type icon stage and a gold badge for the pokemon image stage.

I want:

MenuScreen
SettingsScreen
GymBadgeScreen
TypesScreen
PokeLingoScreen
WTPScreen

Other screens?


large, clean typography
generous spacing
rounded surfaces
subtle elevation
dynamic colour where appropriate
dark/light themes
proper edge-to-edge layout
animated transitions
tactile haptics (mobile only)
proper browser back navigation
accessibility-sized touch targets
almost no unnecessary chrome

Stack:
React Native Web 0.86
Expo SDK 57
TypeScript
Expo Router
React 19.2
AsyncStorage (LocalStorage) for persistence
No backend
No authentication
No API
No database server
Local browser storage only


Navigation flow:
Menu -> Settings
 -> Types (first time) -> PokeLingo
 -> WTP
 -> Badges

Settings -> Types

Every screen should have an (x) at the bottom middle, like pokemon go, to exit back to the menu.

## Polish & Juice (Phase 7+)
- **Visual Progression**: Show locked regions in the selector (grayed out with padlock and "Unlocks at Level X" text).
- **Haptics & Animations**: 
    - Shake animation on incorrect guess.
    - Particle/Pop effect on correct guess.
    - Toggle for haptics in settings (mobile only).
- **Performance**: Use `expo-image` for high-performance image caching and smooth silhouette-to-reveal transitions.
- **Theme**: Toggles for Light/Dark/System in settings.
- **Championship Flavor**: Unique gold-themed UI or stadium background for Championship mode.
- **Web Optimization**: Hosted on GitHub Pages, optimized for caching and LocalStorage persistence.
