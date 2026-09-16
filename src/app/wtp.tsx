import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ExitButton } from '@/components/ExitButton';
import { useWTPGame } from '@/hooks/useWTPGame';
import Animated, { FadeIn, FadeOut, Layout, useAnimatedStyle, withRepeat, withSequence, withTiming, useSharedValue, ZoomIn } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useProgression } from '@/hooks/ProgressionContext';
import { Image } from 'expo-image';

export default function WTPScreen() {
  const isDark = useColorScheme() === 'dark';
  const { selectedRegion, hapticsEnabled } = useProgression();
  const {
    target,
    options,
    isSilhouette,
    correctCount,
    lastResult,
    guess,
    nextPokemon
  } = useWTPGame();

  const shakeOffset = useSharedValue(0);

  const handleGuess = (name: string) => {
    const isCorrect = guess(name);
    if (isCorrect) {
      if (hapticsEnabled) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      if (hapticsEnabled) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      shakeOffset.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withRepeat(withTiming(10, { duration: 100 }), 3, true),
        withTiming(0, { duration: 50 })
      );
    }
  };

  const animatedShakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeOffset.value }],
  }));

  useEffect(() => {
    if (lastResult === 'correct') {
      const timer = setTimeout(() => {
        nextPokemon();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [lastResult, nextPokemon]);

  const getImagePath = (id: number) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  };

  const isChampionship = selectedRegion === 'Championship';

  return (
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
            {selectedRegion} {isChampionship ? 'Arena' : 'Mystery'}
          </Text>
          <View style={styles.caughtRow}>
            <Text style={[styles.caughtValue, isDark && styles.textWhite]}>{correctCount}</Text>
            <Text style={styles.caughtLabel}>Caught</Text>
          </View>
        </View>
      </View>

      <View style={styles.gameArea}>
        <Animated.View
          key={target.id}
          entering={FadeIn.duration(500)}
          exiting={FadeOut.duration(500)}
          layout={Layout.springify()}
          style={styles.pokemonContainer}
        >
          <Animated.View style={[styles.imageWrapper, animatedShakeStyle]}>
             <View style={[
               styles.imageBg,
               isDark ? styles.imageBgDark : styles.imageBgLight,
               isChampionship && (isDark ? styles.imageBgChampionshipDark : styles.imageBgChampionshipLight)
             ]} />
            <Image
              source={getImagePath(target.id)}
              style={styles.pokemonImage}
              contentFit="contain"
              transition={500}
              tintColor={isSilhouette ? '#000' : undefined}
            />
            {!isSilhouette && (
              <Animated.View
                entering={ZoomIn.springify()}
                style={styles.revealBadge}
              >
                <Text style={styles.revealText}>
                  It's {target.name}!
                </Text>
              </Animated.View>
            )}
          </Animated.View>

          <View style={styles.optionsGrid}>
            {options.map((option) => {
              const isCorrectOption = option === target.name;

              const optionStyle = [
                styles.optionButton,
                isDark ? styles.optionButtonDark : styles.optionButtonLight,
                isChampionship && (isDark ? styles.optionButtonChampionshipDark : styles.optionButtonChampionshipLight),
                !isSilhouette && isCorrectOption && styles.optionButtonCorrect
              ];

              const optionTextStyle = [
                styles.optionText,
                isDark ? styles.textWhite : styles.textDark,
                isChampionship && (isDark ? styles.textChampionshipLight : styles.textChampionshipDark),
                !isSilhouette && isCorrectOption && styles.textWhiteFull
              ];

              return (
                <TouchableOpacity
                  key={option}
                  onPress={() => handleGuess(option)}
                  disabled={!isSilhouette}
                  activeOpacity={0.8}
                  style={optionStyle}
                >
                  <Text style={optionTextStyle}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>
      </View>

      <View style={styles.footer}>
          <View style={[
            styles.hintBox,
            isChampionship ? styles.hintBoxChampionship : (isDark ? styles.hintBoxDark : styles.hintBoxLight)
          ]}>
            <Text style={[
              styles.hintText,
              isChampionship ? styles.textChampionshipDark : styles.textSlate400
            ]}>
                Pick the correct Pokémon!
            </Text>
          </View>
      </View>
      <ExitButton />
    </SafeAreaView>
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
  caughtRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  caughtValue: {
    fontSize: 32,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    color: '#0F172A',
    marginRight: 4,
  },
  caughtLabel: {
    fontSize: 10,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  gameArea: {
    flex: 1,
    itemsCenter: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  pokemonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  imageWrapper: {
    position: 'relative',
    width: 288,
    height: 288,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 64,
  },
  imageBg: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 50,
    borderWidth: 2,
  },
  imageBgLight: { backgroundColor: '#F8FAFC', borderColor: '#F1F5F9' },
  imageBgDark: { backgroundColor: 'rgba(15, 23, 42, 0.5)', borderColor: '#1E293B' },
  imageBgChampionshipLight: { borderColor: 'rgba(251, 191, 36, 0.2)' },
  imageBgChampionshipDark: { borderColor: 'rgba(217, 119, 6, 0.1)' },
  pokemonImage: {
    width: 224,
    height: 224,
  },
  revealBadge: {
    position: 'absolute',
    bottom: -24,
    backgroundColor: '#22C55E',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  revealText: {
    color: '#FFFFFF',
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    fontSize: 20,
    textTransform: 'uppercase',
    fontStyle: 'italic',
    letterSpacing: -1,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  optionButton: {
    width: '48%',
    padding: 24,
    borderRadius: 24,
    marginBottom: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  optionButtonLight: { backgroundColor: '#F8FAFC', borderColor: '#F1F5F9' },
  optionButtonDark: { backgroundColor: '#0F172A', borderColor: '#1E293B' },
  optionButtonChampionshipLight: { backgroundColor: 'rgba(254, 243, 199, 0.5)', borderColor: '#FDE68A' },
  optionButtonChampionshipDark: { backgroundColor: '#0F172A', borderColor: 'rgba(217, 119, 6, 0.3)' },
  optionButtonCorrect: { backgroundColor: '#22C55E', borderColor: '#22C55E' },
  optionText: {
    fontSize: 16,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  textWhite: { color: '#FFFFFF' },
  textDark: { color: '#0F172A' },
  textWhiteFull: { color: '#FFFFFF' },
  textChampionshipDark: { color: '#92400E' },
  textChampionshipLight: { color: '#FEF3C7' },
  footer: {
    paddingBottom: 144,
    paddingHorizontal: 40,
  },
  hintBox: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 24,
    borderWidth: 2,
  },
  hintBoxLight: { backgroundColor: '#F8FAFC', borderColor: '#F1F5F9' },
  hintBoxDark: { backgroundColor: '#0F172A', borderColor: '#1E293B' },
  hintBoxChampionship: { backgroundColor: 'rgba(254, 243, 199, 0.5)', borderColor: '#FDE68A' },
  hintText: {
    fontSize: 11,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
