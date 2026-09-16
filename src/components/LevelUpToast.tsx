import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutUp,
  SpringInAtRest,
  Layout
} from 'react-native-reanimated';
import { useProgression } from '@/hooks/ProgressionContext';
import { Trophy } from 'lucide-react-native';

export const LevelUpToast = () => {
  const { level } = useProgression();
  const [visible, setVisible] = useState(false);
  const [displayLevel, setDisplayLevel] = useState(level);

  useEffect(() => {
    if (level > displayLevel) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setDisplayLevel(level);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [level, displayLevel]);

  if (!visible) return null;

  return (
    <View className="absolute top-16 left-0 right-0 items-center z-[100] px-6">
      <Animated.View
        entering={FadeInUp.springify()}
        exiting={FadeOutUp}
        className="bg-amber-500 p-6 rounded-[30px] shadow-2xl flex-row items-center border-4 border-white dark:border-slate-900"
      >
        <View className="bg-white/20 p-3 rounded-2xl mr-4">
          <Trophy size={32} color="white" />
        </View>
        <View>
          <Text className="text-white font-black text-xs uppercase tracking-widest mb-1">New Level Reached!</Text>
          <Text className="text-white font-black text-2xl uppercase italic">Level {level} Trainer</Text>
        </View>
      </Animated.View>
    </View>
  );
};
