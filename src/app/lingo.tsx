import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ExitButton } from '@/components/ExitButton';
import { useGameEngine } from '@/hooks/useGameEngine';
import { GestureDetector, Gesture, Directions } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  withSequence,
  withRepeat,
  FadeIn,
  ZoomIn
} from 'react-native-reanimated';
import { TYPE_COLORS } from '@/data/types';
import * as Haptics from 'expo-haptics';
import { useProgression } from '@/hooks/ProgressionContext';
import { Image } from 'expo-image';

export default function PokeLingoScreen() {
  const isDark = useColorScheme() === 'dark';
  const { selectedRegion, hapticsEnabled } = useProgression();
  const { player, opponent, score, streak, handleSwipe } = useGameEngine();
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const shakeOffset = useSharedValue(0);

  const onSwipe = (direction: 'left' | 'right' | 'up') => {
    const isCorrect = handleSwipe(direction);
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      if (hapticsEnabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      if (hapticsEnabled) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      shakeOffset.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withRepeat(withTiming(10, { duration: 100 }), 3, true),
        withTiming(0, { duration: 50 })
      );
    }

    setTimeout(() => setFeedback(null), 500);
  };

  const animatedShakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeOffset.value }],
  }));

  const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart(() => runOnJS(onSwipe)('right'));

  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onStart(() => runOnJS(onSwipe)('left'));

  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => runOnJS(onSwipe)('up'));

  const composedGestures = Gesture.Race(flingRight, flingLeft, flingUp);

  const getImagePath = (id: number) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  };

  const isChampionship = selectedRegion === 'Championship';

  return (
    <GestureDetector gesture={composedGestures}>
      <SafeAreaView style={[
        styles.container,
        isDark ? styles.bgDark : styles.bgWhite,
        isChampionship && (isDark ? styles.bgChampionshipDark : styles.bgChampionshipLight)
      ]}>
        <View style={styles.header}>
          <View>
            <Text style={[
              styles.regionLabel,
              isChampionship ? styles.textChampionship : styles.textSlate400
            ]}>
              {selectedRegion} {isChampionship ? 'Arena' : 'Region'}
            </Text>
            <View style={styles.scoreRow}>
                <Text style={[styles.scoreValue, isDark && styles.textWhite]}>{score}</Text>
                <Text style={styles.scoreLabel}>Points</Text>
            </View>
          </View>
          <View style={[
            styles.streakBadge,
            isChampionship ? styles.bgChampionship : styles.bgRed
          ]}>
            <Text style={styles.streakText}>Streak: {streak}</Text>
          </View>
        </View>

        <Animated.View style={[styles.gameArea, animatedShakeStyle]}>
          <View style={styles.side}>
            <View style={styles.pokemonWrapper}>
              <Image
                  source={getImagePath(player.id)}
                  style={styles.pokemonImage}
                  contentFit="contain"
                  transition={300}
              />
              <Text style={[styles.pokemonName, isDark && styles.textWhite]}>{player.name}</Text>
              <View style={styles.typeRow}>
                {player.types.map(t => (
                  <View key={t} style={[styles.typeBadge, { backgroundColor: TYPE_COLORS[t] }]}>
                    <Text style={styles.typeText}>{t}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.side}>
            <View style={styles.pokemonWrapper}>
              <Image
                  source={getImagePath(opponent.id)}
                  style={styles.pokemonImage}
                  contentFit="contain"
                  transition={300}
              />
              <Text style={[styles.pokemonName, isDark && styles.textWhite]}>{opponent.name}</Text>
              <View style={styles.typeRow}>
                {opponent.types.map(t => (
                  <View key={t} style={[styles.typeBadge, { backgroundColor: TYPE_COLORS[t] }]}>
                    <Text style={styles.typeText}>{t}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </Animated.View>

        {feedback && (
          <View style={styles.feedbackOverlay}>
             <Animated.View
                entering={ZoomIn.springify().damping(12)}
                style={[
                  styles.feedbackBadge,
                  feedback === 'correct' ? styles.bgGreen : styles.bgRed
                ]}
              >
                <Text style={styles.feedbackText}>{feedback === 'correct' ? '✓' : '✗'}</Text>
             </Animated.View>
          </View>
        )}

        <View style={styles.controlsContainer}>
          <View style={[
            styles.controlsBox,
            isChampionship ? styles.controlsBoxChampionship : (isDark ? styles.controlsBoxDark : styles.controlsBoxLight)
          ]}>
            <Text style={[
              styles.controlsText,
              isChampionship ? styles.controlsTextChampionship : styles.textSlate500
            ]}>
                Right: Strong  •  Left: Weak  •  Up: Neutral
            </Text>
          </View>
        </View>

        <ExitButton />
      </SafeAreaView>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgWhite: { backgroundColor: '#FFFFFF' },
  bgDark: { backgroundColor: '#020617' },
  bgChampionshipLight: { backgroundColor: 'rgba(251, 191, 36, 0.05)' },
  bgChampionshipDark: { backgroundColor: '#020617' },
  header: {
    paddingHorizontal: 32,
    paddingVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  regionLabel: {
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  textChampionship: { color: '#D97706' },
  textSlate400: { color: '#94A3B8' },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreValue: {
    fontSize: 32,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    color: '#0F172A',
    marginRight: 4,
  },
  scoreLabel: {
    fontSize: 10,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  streakBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bgChampionship: { backgroundColor: '#F59E0B' },
  bgRed: { backgroundColor: '#EF4444' },
  streakText: {
    color: '#FFFFFF',
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  gameArea: {
    flex: 1,
    flexDirection: 'row',
  },
  side: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  pokemonWrapper: {
    alignItems: 'center',
    width: '100%',
  },
  pokemonImage: {
    width: 176,
    height: 176,
    marginBottom: 24,
  },
  pokemonName: {
    fontSize: 24,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 12,
    letterSpacing: -1,
    textAlign: 'center',
  },
  typeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  typeBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  feedbackOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  feedbackBadge: {
    padding: 48,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 8,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    transform: [{ scale: 1.2 }],
  },
  bgGreen: { backgroundColor: '#22C55E' },
  bgRedFull: { backgroundColor: '#EF4444' }, // Named uniquely to avoid collision
  feedbackText: {
    color: '#FFFFFF',
    fontSize: 72,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
  },
  controlsContainer: {
    paddingHorizontal: 32,
    paddingBottom: 144,
    alignItems: 'center',
  },
  controlsBox: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 24,
    borderWidth: 2,
  },
  controlsBoxLight: { backgroundColor: '#F8FAFC', borderColor: '#F1F5F9' },
  controlsBoxDark: { backgroundColor: '#0F172A', borderColor: '#1E293B' },
  controlsBoxChampionship: { backgroundColor: 'rgba(254, 243, 199, 0.5)', borderColor: '#FDE68A' },
  controlsText: {
    fontSize: 11,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  controlsTextChampionship: { color: '#92400E' },
  textSlate500: { color: '#64748B' },
  textWhite: { color: '#FFFFFF' },
});
