import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router/react-navigation';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme, View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ProgressionProvider } from '@/hooks/ProgressionContext';
import { LevelUpToast } from '@/components/LevelUpToast';
import { BadgeNotification } from '@/components/BadgeNotification';
import { StatusBar } from 'expo-status-bar';
import { useProgression } from '../hooks/ProgressionContext';
import '@/global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const systemColorScheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <ProgressionProvider>
        <ThemeAwareStack systemColorScheme={systemColorScheme} />
      </ProgressionProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function ThemeAwareStack({ systemColorScheme }: { systemColorScheme: 'light' | 'dark' | null | undefined }) {
  const { themePreference } = useProgression();

  const colorScheme = themePreference === 'system' ? systemColorScheme : themePreference;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <LevelUpToast />
      <BadgeNotification />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="lingo" />
        <Stack.Screen name="wtp" />
        <Stack.Screen name="types" />
        <Stack.Screen name="badges" />
        <Stack.Screen name="settings" />
      </Stack>
    </ThemeProvider>
  );
}
