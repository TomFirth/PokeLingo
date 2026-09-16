import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useProgression } from '@/hooks/ProgressionContext';
import { Medal } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export const BadgeNotification = () => {
  const isDark = useColorScheme() === 'dark';
  const { badges, hapticsEnabled } = useProgression();
  const [visible, setVisible] = useState(false);
  const [latestBadge, setLatestBadge] = useState<string | null>(null);
  const [processedBadges, setProcessedBadges] = useState<string[]>(badges);

  useEffect(() => {
    const newBadges = badges.filter(b => !processedBadges.includes(b));
    if (newBadges.length > 0) {
      const badge = newBadges[0];
      setLatestBadge(badge);
      setVisible(true);
      if (hapticsEnabled) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      const timer = setTimeout(() => {
        setVisible(false);
        setProcessedBadges(prev => [...prev, badge]);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [badges, processedBadges]);

  if (!visible || !latestBadge) return null;

  const badgeNames: Record<string, string> = {
    lingo_kanto_silver: 'Kanto Silver',
    lingo_kanto_gold: 'Kanto Gold',
    wtp_kanto_silver: 'WTP Silver',
    wtp_kanto_gold: 'WTP Gold',
  };

  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeInUp.springify()}
        exiting={FadeOutUp}
        style={[styles.toast, isDark ? styles.borderDark : styles.borderWhite]}
      >
        <View style={styles.iconWrapper}>
          <Medal size={32} color="white" />
        </View>
        <View>
          <Text style={styles.label}>Badge Earned!</Text>
          <Text style={styles.title}>{badgeNames[latestBadge] || latestBadge}</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 128,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 110,
    paddingHorizontal: 24,
  },
  toast: {
    backgroundColor: '#4F46E5',
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
    fontSize: 20,
    textTransform: 'uppercase',
    fontStyle: 'italic',
    letterSpacing: -0.5,
  },
});
