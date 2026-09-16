import React from 'react';
import { View, Text, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ExitButton } from '@/components/ExitButton';
import { useProgression } from '@/hooks/ProgressionContext';
import { Medal, Lock } from 'lucide-react-native';

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  color: string;
}

export default function GymBadgeScreen() {
  const isDark = useColorScheme() === 'dark';
  const { badges } = useProgression();

  const allBadges: BadgeItem[] = [
    {
      id: 'lingo_kanto_silver',
      name: 'Kanto Silver',
      description: '50 Correct Swipes',
      color: '#94A3B8'
    },
    {
      id: 'lingo_kanto_gold',
      name: 'Kanto Gold',
      description: '100 Correct Swipes',
      color: '#FACC15'
    },
    {
      id: 'wtp_kanto_silver',
      name: 'WTP Silver',
      description: '10 Caught Pokémon',
      color: '#94A3B8'
    },
    {
      id: 'wtp_kanto_gold',
      name: 'WTP Gold',
      description: '50 Caught Pokémon',
      color: '#FACC15'
    },
  ];

  const BadgeCard = ({ badge }: { badge: BadgeItem }) => {
    const isEarned = badges.includes(badge.id);

    return (
      <View
        style={[
          styles.badgeCard,
          isDark ? styles.bgDarkCard : styles.bgWhiteCard,
          !isEarned && styles.badgeCardLocked
        ]}
      >
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: isEarned ? badge.color : (isDark ? '#1E293B' : '#F1F5F9') },
            { borderColor: isEarned ? 'rgba(255,255,255,0.3)' : (isDark ? '#334155' : '#E2E8F0') }
          ]}
        >
          {isEarned ? (
            <Medal size={42} color="white" strokeWidth={2.5} />
          ) : (
            <Lock size={38} color="#94A3B8" strokeWidth={2.5} />
          )}
        </View>
        <Text style={[styles.badgeName, isEarned ? (isDark ? styles.textWhite : styles.textDark) : styles.textSlate400]}>
          {badge.name}
        </Text>
        <Text style={[
          styles.badgeDescription,
          isEarned ? (isDark ? styles.textSlate500 : styles.textSlate400) : (isDark ? styles.textSlate600 : styles.textSlate300)
        ]}>
          {badge.description}
        </Text>
        {isEarned && (
          <View style={styles.earnedBadge}>
             <Text style={styles.earnedText}>Earned</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDark ? styles.bgDark : styles.bgWhite]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, isDark && styles.textWhite]}>
          Gym Badges
        </Text>
        <Text style={styles.subtitle}>
          Complete regional challenges to fill your trophy room.
        </Text>

        <View style={styles.grid}>
          {allBadges.map(b => (
            <BadgeCard key={b.id} badge={b} />
          ))}
        </View>
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
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 48,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 16,
    marginBottom: 12,
    letterSpacing: -2,
  },
  subtitle: {
    color: '#64748B',
    fontFamily: 'SF Pro Rounded',
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    lineHeight: 20,
    marginBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: '48%',
    padding: 32,
    borderRadius: 40,
    marginBottom: 16,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  bgWhiteCard: { backgroundColor: '#FFFFFF', borderColor: '#F1F5F9' },
  bgDarkCard: { backgroundColor: '#0F172A', borderColor: '#1E293B' },
  badgeCardLocked: {
    opacity: 0.6,
    backgroundColor: 'rgba(248, 250, 252, 0.5)',
  },
  iconWrapper: {
    padding: 20,
    borderRadius: 24,
    marginBottom: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  badgeName: {
    fontSize: 16,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  badgeDescription: {
    fontSize: 9,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 4,
  },
  earnedBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#22C55E',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  earnedText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  textWhite: { color: '#FFFFFF' },
  textDark: { color: '#0F172A' },
  textSlate400: { color: '#94A3B8' },
  textSlate500: { color: '#64748B' },
  textSlate600: { color: '#475569' },
  textSlate300: { color: '#CBD5E1' },
});
