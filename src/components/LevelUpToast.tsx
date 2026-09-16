import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutUp
} from 'react-native-reanimated';
import { useProgression } from '@/hooks/ProgressionContext';
import { Trophy } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export const LevelUpToast = () => {
  const isDark = useColorScheme() === 'dark';
  const { level, hapticsEnabled } = useProgression();
  const [visible, setVisible] = useState(false);
  const [displayLevel, setDisplayLevel] = useState(level);

  useEffect(() => {
    if (level > displayLevel) {
      setVisible(true);
      if (hapticsEnabled) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      const timer = setTimeout(() => {
        setVisible(false);
        setDisplayLevel(level);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [level, displayLevel]);

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeInUp.springify()}
        exiting={FadeOutUp}
        style={[styles.toast, isDark ? styles.borderDark : styles.borderWhite]}
      >
        <View style={styles.iconWrapper}>
          <Trophy size={32} color="white" />
        </View>
        <View>
          <Text style={styles.label}>New Level Reached!</Text>
          <Text style={styles.title}>Level {level} Trainer</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 64,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
    paddingHorizontal: 24,
  },
  toast: {
    backgroundColor: '#F59E0B',
    padding: 24,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 4,
  },
  borderWhite: { borderColor: '#FFFFFF' },
  borderDark: { borderColor: '#0F172A' },
  iconWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 16,
    marginRight: 16,
  },
  label: {
    color: '#FFFFFF',
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    fontSize: 24,
    textTransform: 'uppercase',
    fontStyle: 'italic',
  },
});
