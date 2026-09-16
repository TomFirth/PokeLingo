import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useProgression } from '@/hooks/ProgressionContext';
import { Medal } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export const BadgeNotification = () => {
  const { badges } = useProgression();
  const [visible, setVisible] = useState(false);
  const [latestBadge, setLatestBadge] = useState<string | null>(null);
  const [processedBadges, setProcessedBadges] = useState<string[]>(badges);

  useEffect(() => {
    const newBadges = badges.filter(b => !processedBadges.includes(b));
    if (newBadges.length > 0) {
      const badge = newBadges[0];
      setLatestBadge(badge);
      setVisible(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      const timer = setTimeout(() => {
        setVisible(false);
        setProcessedBadges(prev => [...prev, badge]);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [badges, processedBadges]);

  if (!visible || !latestBadge) return null;

  const badgeNames: Record<string, string> = {
    lingo_kanto_silver: 'Kanto Swipe Silver',
    lingo_kanto_gold: 'Kanto Swipe Gold',
    wtp_kanto_silver: 'WTP Kanto Silver',
    wtp_kanto_gold: 'WTP Kanto Gold',
  };

  return (
    <View className="absolute top-32 left-0 right-0 items-center z-[110] px-6">
      <Animated.View
        entering={FadeInUp.springify()}
        exiting={FadeOutUp}
        className="bg-indigo-600 p-6 rounded-[30px] shadow-2xl flex-row items-center border-4 border-white dark:border-slate-900"
      >
        <View className="bg-white/20 p-3 rounded-2xl mr-4">
          <Medal size={32} color="white" />
        </View>
        <View>
          <Text className="text-white font-black text-xs uppercase tracking-widest mb-1">Badge Earned!</Text>
          <Text className="text-white font-black text-xl uppercase italic">{badgeNames[latestBadge] || latestBadge}</Text>
        </View>
      </Animated.View>
    </View>
  );
};
