import React from 'react';
import { View, Text, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ExitButton } from '@/components/ExitButton';
import { TYPE_CHART, TYPE_COLORS, PokemonType } from '@/data/types';

export default function TypesScreen() {
  const isDark = useColorScheme() === 'dark';
  const types = Object.keys(TYPE_CHART) as PokemonType[];

  const TypeRow = ({ type }: { type: PokemonType }) => {
    const strengths = Object.entries(TYPE_CHART[type] || {})
      .filter(([_, multiplier]) => multiplier! > 1)
      .map(([t]) => t as PokemonType);

    const weaknesses = Object.entries(TYPE_CHART)
      .filter(([_, chart]) => (chart as any)[type] > 1)
      .map(([t]) => t as PokemonType);

    return (
      <View style={styles.row}>
        {/* Weaknesses (Left) */}
        <View style={styles.weaknessesContainer}>
          {weaknesses.map(w => (
            <View key={w} style={[styles.typeMiniBadge, { backgroundColor: TYPE_COLORS[w] }]} />
          ))}
        </View>

        {/* Current Type (Middle) */}
        <View style={styles.centerTypeWrapper}>
          <View style={[styles.centerTypeBadge, { backgroundColor: TYPE_COLORS[type] }]}>
            <Text style={styles.centerTypeText}>{type}</Text>
          </View>
        </View>

        {/* Strengths (Right) */}
        <View style={styles.strengthsContainer}>
          {strengths.map(s => (
            <View key={s} style={[styles.typeMiniBadge, { backgroundColor: TYPE_COLORS[s] }]} />
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDark ? styles.bgDark : styles.bgWhite]}>
      <View style={styles.header}>
        <Text style={[styles.title, isDark && styles.textWhite]}>
          Type Guide
        </Text>
        <View style={styles.legendRow}>
          <Text style={styles.legendLabel}>Weak To</Text>
          <Text style={styles.legendLabel}>Strong Vs</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {types.map(t => (
          <TypeRow key={t} type={t} />
        ))}
      </ScrollView>
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
  header: {
    padding: 32,
    paddingBottom: 16,
  },
  title: {
    fontSize: 48,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center',
    letterSpacing: -2,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
  },
  legendLabel: {
    color: '#64748B',
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 140,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  weaknessesContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 16,
    gap: 6,
  },
  strengthsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 16,
    gap: 6,
  },
  centerTypeWrapper: {
    width: 96,
    alignItems: 'center',
  },
  centerTypeBadge: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  centerTypeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  typeMiniBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  textWhite: { color: '#FFFFFF' },
});
