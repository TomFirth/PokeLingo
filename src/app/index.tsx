import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  Settings,
  BookOpen,
  Trophy,
  Gamepad2,
  Search,
  Lock
} from 'lucide-react-native';
import { useProgression } from '@/hooks/ProgressionContext';

const REGION_REQUIREMENTS: Record<string, number> = {
  Kanto: 1,
  Johto: 2,
  Hoenn: 3,
  Sinnoh: 4,
  Unova: 5,
  Kalos: 6,
  Alola: 7,
  Galar: 8,
  Paldea: 9,
  Championship: 10,
};

const ALL_REGIONS = Object.keys(REGION_REQUIREMENTS);

export default function MenuScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === 'dark';
  const { level, xp, unlockedRegions, selectedRegion, setSelectedRegion } = useProgression();
  const progress = (xp / 500) * 100;

  const MenuCard = ({
    title,
    subtitle,
    icon: Icon,
    onPress,
    color = "blue"
  }: {
    title: string;
    subtitle: string;
    icon: any;
    onPress: () => void;
    color?: "red" | "blue" | "green" | "amber";
  }) => {
    const cardStyle = [
      styles.card,
      isDark ? styles.cardDark : styles.cardLight,
      color === 'red' && (isDark ? styles.cardRedDark : styles.cardRedLight),
      color === 'blue' && (isDark ? styles.cardBlueDark : styles.cardBlueLight),
      color === 'green' && (isDark ? styles.cardGreenDark : styles.cardGreenLight),
      color === 'amber' && (isDark ? styles.cardAmberDark : styles.cardAmberLight),
    ];

    const iconBgStyle = [
      styles.iconBg,
      color === 'red' && (isDark ? styles.iconBgRedDark : styles.iconBgRedLight),
      color === 'blue' && (isDark ? styles.iconBgBlueDark : styles.iconBgBlueLight),
      color === 'green' && (isDark ? styles.iconBgGreenDark : styles.iconBgGreenLight),
      color === 'amber' && (isDark ? styles.iconBgAmberDark : styles.iconBgAmberLight),
    ];

    const iconColors = {
      red: "#EF4444",
      blue: "#3B82F6",
      green: "#22C55E",
      amber: "#F59E0B",
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={cardStyle}
      >
        <View style={iconBgStyle}>
          <Icon size={38} color={iconColors[color]} strokeWidth={2.5} />
        </View>
        <Text style={[styles.cardTitle, isDark && styles.textWhite]}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDark ? styles.bgDark : styles.bgWhite]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <View style={styles.badgeRow}>
              <View style={[styles.levelBadge, isDark ? styles.bgWhite : styles.bgDark]}>
                <Text style={[styles.levelText, isDark ? styles.textDark : styles.textWhite]}>Lvl {level}</Text>
              </View>
              <View style={styles.regionActiveBadge}>
                <Text style={styles.regionActiveText}>{selectedRegion} Active</Text>
              </View>
            </View>
            <Text style={[styles.title, isDark && styles.textWhite]}>PokeLingo</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/settings')}
            activeOpacity={0.7}
            style={[styles.settingsButton, isDark ? styles.settingsButtonDark : styles.settingsButtonLight]}
          >
            <Settings size={28} color="#64748B" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        <View style={styles.xpContainer}>
          <View style={styles.xpHeader}>
            <Text style={styles.xpLabel}>Experience</Text>
            <Text style={[styles.xpValue, isDark && styles.textWhite]}>{xp} / 500 XP</Text>
          </View>
          <View style={[styles.xpBarBg, isDark ? styles.xpBarBgDark : styles.xpBarBgLight]}>
            <View style={[styles.xpBarFill, { width: `${progress}%` }]} />
          </View>
        </View>

        <View style={styles.regionSection}>
          <Text style={styles.sectionLabel}>Choose your Region</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.regionScroll} contentContainerStyle={styles.regionScrollContent}>
            {ALL_REGIONS.map((region) => {
              const isUnlocked = unlockedRegions.includes(region);
              const isSelected = selectedRegion === region;
              const req = REGION_REQUIREMENTS[region];

              return (
                <TouchableOpacity
                  key={region}
                  onPress={() => isUnlocked && setSelectedRegion(region)}
                  activeOpacity={isUnlocked ? 0.7 : 1}
                  style={[
                    styles.regionItem,
                    isDark ? styles.regionItemDark : styles.regionItemLight,
                    isSelected && (isDark ? styles.regionItemSelectedDark : styles.regionItemSelectedLight),
                    !isUnlocked && styles.regionItemLocked
                  ]}
                >
                  {!isUnlocked && <Lock size={14} color="#94A3B8" style={styles.lockIcon} />}
                  <View>
                    <Text style={[
                      styles.regionText,
                      isSelected ? (isDark ? styles.textDark : styles.textWhite) : (isDark ? styles.textLightGray : styles.textGray)
                    ]}>
                      {region}
                    </Text>
                    {!isUnlocked && (
                      <Text style={styles.regionReqText}>
                        Lv. {req}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.grid}>
          <MenuCard
            title="PokeLingo"
            subtitle="Master Types"
            icon={Gamepad2}
            onPress={() => router.push('/lingo')}
            color="red"
          />
          <MenuCard
            title="Mystery"
            subtitle="Who's that?"
            icon={Search}
            onPress={() => router.push('/wtp')}
            color="blue"
          />
          <MenuCard
            title="Tutorial"
            subtitle="Study Guide"
            icon={BookOpen}
            onPress={() => router.push('/types')}
            color="green"
          />
          <MenuCard
            title="Badges"
            subtitle="Trophy Room"
            icon={Trophy}
            onPress={() => router.push('/badges')}
            color="amber"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgWhite: {
    backgroundColor: '#FFFFFF',
  },
  bgDark: {
    backgroundColor: '#020617',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 16,
    marginBottom: 40,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    marginRight: 8,
  },
  levelText: {
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  regionActiveBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  regionActiveText: {
    color: '#EF4444',
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 48,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -2,
  },
  textWhite: {
    color: '#FFFFFF',
  },
  textDark: {
    color: '#0F172A',
  },
  textGray: {
    color: '#64748B',
  },
  textLightGray: {
    color: '#94A3B8',
  },
  bgWhiteFull: {
    backgroundColor: '#FFFFFF',
  },
  settingsButton: {
    padding: 16,
    borderRadius: 999,
    borderWidth: 2,
  },
  settingsButtonLight: {
    backgroundColor: '#F8FAFC',
    borderColor: '#F1F5F9',
  },
  settingsButtonDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  xpContainer: {
    marginBottom: 48,
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  xpLabel: {
    color: '#94A3B8',
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  xpValue: {
    color: '#0F172A',
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  xpBarBg: {
    height: 20,
    borderRadius: 999,
    overflow: 'hidden',
    borderWidth: 2,
    padding: 4,
  },
  xpBarBgLight: {
    backgroundColor: '#F1F5F9',
    borderColor: '#F8FAFC',
  },
  xpBarBgDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  xpBarFill: {
    backgroundColor: '#EF4444',
    height: '100%',
    borderRadius: 999,
  },
  regionSection: {
    marginBottom: 40,
  },
  sectionLabel: {
    color: '#94A3B8',
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  regionScroll: {
    marginHorizontal: -24,
  },
  regionScrollContent: {
    paddingHorizontal: 24,
  },
  regionItem: {
    marginRight: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  regionItemLight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#F1F5F9',
  },
  regionItemDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  regionItemSelectedLight: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  regionItemSelectedDark: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  regionItemLocked: {
    opacity: 0.4,
  },
  lockIcon: {
    marginRight: 12,
  },
  regionText: {
    fontSize: 16,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  regionReqText: {
    fontSize: 9,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    padding: 24,
    borderRadius: 40,
    marginBottom: 16,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  cardLight: {
    backgroundColor: '#F8FAFC',
    borderColor: '#F1F5F9',
  },
  cardDark: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
  },
  cardRedLight: { backgroundColor: '#FEF2F2', borderColor: '#FEE2E2' },
  cardRedDark: { backgroundColor: 'rgba(127, 29, 29, 0.2)', borderColor: 'rgba(153, 27, 27, 0.3)' },
  cardBlueLight: { backgroundColor: '#EFF6FF', borderColor: '#DBEAFE' },
  cardBlueDark: { backgroundColor: 'rgba(30, 58, 138, 0.2)', borderColor: 'rgba(30, 64, 175, 0.3)' },
  cardGreenLight: { backgroundColor: '#F0FDF4', borderColor: '#DCFCE7' },
  cardGreenDark: { backgroundColor: 'rgba(20, 83, 45, 0.2)', borderColor: 'rgba(22, 101, 52, 0.3)' },
  cardAmberLight: { backgroundColor: '#FFFBEB', borderColor: '#FEF3C7' },
  cardAmberDark: { backgroundColor: 'rgba(120, 53, 15, 0.2)', borderColor: 'rgba(146, 64, 14, 0.3)' },
  iconBg: {
    padding: 20,
    borderRadius: 24,
    marginBottom: 16,
  },
  iconBgRedLight: { backgroundColor: '#FEE2E2' },
  iconBgRedDark: { backgroundColor: 'rgba(153, 27, 27, 0.5)' },
  iconBgBlueLight: { backgroundColor: '#DBEAFE' },
  iconBgBlueDark: { backgroundColor: 'rgba(30, 64, 175, 0.5)' },
  iconBgGreenLight: { backgroundColor: '#DCFCE7' },
  iconBgGreenDark: { backgroundColor: 'rgba(22, 101, 52, 0.5)' },
  iconBgAmberLight: { backgroundColor: '#FEF3C7' },
  iconBgAmberDark: { backgroundColor: 'rgba(146, 64, 14, 0.5)' },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  cardSubtitle: {
    fontSize: 10,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '700',
    color: '#64748B',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 4,
    opacity: 0.7,
  },
});
