import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ExitButton } from '@/components/ExitButton';
import { useRouter } from 'expo-router';
import { BookOpen, Moon, Sun, Monitor, Bell, BellOff, Info, RefreshCw } from 'lucide-react-native';
import { useProgression } from '@/hooks/ProgressionContext';

export default function SettingsScreen() {
  const isDark = useColorScheme() === 'dark';
  const router = useRouter();
  const {
    resetProgression,
    hapticsEnabled,
    setHapticsEnabled,
    themePreference,
    setThemePreference
  } = useProgression();

  return (
    <SafeAreaView style={[styles.container, isDark ? styles.bgDark : styles.bgWhite]}>
      <View style={styles.content}>
        <Text style={[styles.title, isDark && styles.textWhite]}>
          Settings
        </Text>

        <View style={[styles.section, isDark ? styles.sectionDark : styles.sectionLight]}>
          <View style={styles.sectionHeader}>
            <Info size={16} color="#64748B" style={styles.sectionIcon} />
            <Text style={styles.sectionLabel}>Appearance</Text>
          </View>
          <View style={styles.themeRow}>
            {[
              { id: 'light', icon: Sun, label: 'Light' },
              { id: 'dark', icon: Moon, label: 'Dark' },
              { id: 'system', icon: Monitor, label: 'System' },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = themePreference === item.id;

              const itemStyle = [
                styles.themeButton,
                isDark ? styles.themeButtonDark : styles.themeButtonLight,
                isActive && (isDark ? styles.themeButtonActiveDark : styles.themeButtonActiveLight)
              ];

              const itemTextStyle = [
                styles.themeButtonText,
                isActive ? (isDark ? styles.textDark : styles.textWhite) : styles.textSlate400
              ];

              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setThemePreference(item.id as any)}
                  activeOpacity={0.7}
                  style={itemStyle}
                >
                  <Icon
                    size={24}
                    color={isActive ? (themePreference === 'dark' ? '#000' : '#fff') : '#94A3B8'}
                    strokeWidth={2.5}
                  />
                  <Text style={itemTextStyle}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={[styles.section, isDark ? styles.sectionDark : styles.sectionLight]}>
          <View style={styles.hapticRow}>
            <View style={styles.hapticInfo}>
              <View style={[
                styles.hapticIconWrapper,
                hapticsEnabled
                  ? (isDark ? styles.hapticIconWrapperActiveDark : styles.hapticIconWrapperActiveLight)
                  : (isDark ? styles.hapticIconWrapperInactiveDark : styles.hapticIconWrapperInactiveLight)
              ]}>
                {hapticsEnabled ? <Bell size={24} color="#3B82F6" strokeWidth={2.5} /> : <BellOff size={24} color="#64748B" strokeWidth={2.5} />}
              </View>
              <View>
                <Text style={[styles.hapticTitle, isDark && styles.textWhite]}>Haptics</Text>
                <Text style={styles.hapticSubtitle}>Tactile Feedback</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setHapticsEnabled(!hapticsEnabled)}
              activeOpacity={0.8}
              style={[
                styles.switchTrack,
                hapticsEnabled ? styles.switchTrackActive : (isDark ? styles.switchTrackInactiveDark : styles.switchTrackInactiveLight)
              ]}
            >
              <View style={[
                styles.switchThumb,
                hapticsEnabled ? styles.switchThumbActive : styles.switchThumbInactive
              ]} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push('/types')}
          activeOpacity={0.8}
          style={[styles.actionCard, isDark ? styles.sectionDark : styles.sectionLight]}
        >
          <View style={styles.actionCardInfo}>
            <View style={[styles.actionIconWrapper, isDark ? styles.bgGreenDark : styles.bgGreenLight]}>
              <BookOpen size={24} color="#22C55E" strokeWidth={2.5} />
            </View>
            <View>
                <Text style={[styles.actionTitle, isDark && styles.textWhite]}>Type Guide</Text>
                <Text style={styles.actionSubtitle}>Study Weaknesses</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={resetProgression}
          activeOpacity={0.8}
          style={[styles.actionCard, isDark ? styles.bgRedDark : styles.bgRedLight, styles.borderRed]}
        >
          <View style={styles.actionCardInfo}>
             <View style={[styles.actionIconWrapper, isDark ? styles.bgRedIconDark : styles.bgRedIconLight]}>
              <RefreshCw size={24} color="#EF4444" strokeWidth={2.5} />
            </View>
            <View>
                <Text style={styles.textRed}>Reset Progress</Text>
                <Text style={[styles.actionSubtitle, isDark ? styles.textRedDark : styles.textRedLight]}>Start Over</Text>
            </View>
          </View>
        </TouchableOpacity>
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
  content: {
    padding: 32,
  },
  title: {
    fontSize: 48,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 40,
    letterSpacing: -2,
  },
  section: {
    padding: 32,
    borderRadius: 40,
    borderWidth: 2,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionLight: { backgroundColor: '#F8FAFC', borderColor: '#F1F5F9' },
  sectionDark: { backgroundColor: '#0F172A', borderColor: '#1E293B' },
  sectionHeader: {
    flexDirection: 'row',
    itemsCenter: 'center',
    marginBottom: 24,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionLabel: {
    color: '#64748B',
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  themeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  themeButton: {
    itemsCenter: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 24,
    borderWidth: 2,
  },
  themeButtonLight: { backgroundColor: '#FFFFFF', borderColor: '#F1F5F9' },
  themeButtonDark: { backgroundColor: '#0F172A', borderColor: '#1E293B' },
  themeButtonActiveLight: { backgroundColor: '#0F172A', borderColor: '#0F172A' },
  themeButtonActiveDark: { backgroundColor: '#FFFFFF', borderColor: '#FFFFFF' },
  themeButtonText: {
    fontSize: 10,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    marginTop: 12,
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
  hapticRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hapticInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hapticIconWrapper: {
    padding: 16,
    borderRadius: 16,
    marginRight: 20,
    borderWidth: 2,
  },
  hapticIconWrapperActiveLight: { backgroundColor: '#EFF6FF', borderColor: '#DBEAFE' },
  hapticIconWrapperActiveDark: { backgroundColor: 'rgba(30, 58, 138, 0.3)', borderColor: 'rgba(30, 58, 138, 0.5)' },
  hapticIconWrapperInactiveLight: { backgroundColor: '#F1F5F9', borderColor: '#E2E8F0' },
  hapticIconWrapperInactiveDark: { backgroundColor: '#1E293B', borderColor: '#334155' },
  hapticTitle: {
    fontSize: 20,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  hapticSubtitle: {
    color: '#94A3B8',
    fontFamily: 'SF Pro Rounded',
    fontWeight: '700',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: 4,
  },
  switchTrack: {
    width: 64,
    height: 40,
    borderRadius: 999,
    padding: 6,
  },
  switchTrackActive: { backgroundColor: '#3B82F6' },
  switchTrackInactiveLight: { backgroundColor: '#CBD5E1' },
  switchTrackInactiveDark: { backgroundColor: '#334155' },
  switchThumb: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  switchThumbActive: { alignSelf: 'flex-end' },
  switchThumbInactive: { alignSelf: 'flex-start' },
  actionCard: {
    padding: 32,
    borderRadius: 40,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionCardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIconWrapper: {
    padding: 16,
    borderRadius: 16,
    marginRight: 20,
    borderWidth: 2,
  },
  bgGreenLight: { backgroundColor: '#F0FDF4', borderColor: '#DCFCE7' },
  bgGreenDark: { backgroundColor: 'rgba(20, 83, 45, 0.3)', borderColor: 'rgba(20, 83, 45, 0.5)' },
  bgRedLight: { backgroundColor: '#FEF2F2', borderColor: '#FEE2E2' },
  bgRedDark: { backgroundColor: 'rgba(127, 29, 29, 0.2)', borderColor: 'rgba(153, 27, 27, 0.3)' },
  bgRedIconLight: { backgroundColor: '#FEE2E2', borderColor: '#FEE2E2' },
  bgRedIconDark: { backgroundColor: 'rgba(127, 29, 29, 0.3)', borderColor: 'rgba(127, 29, 29, 0.5)' },
  borderRed: { borderColor: '#FEE2E2' },
  actionTitle: {
    fontSize: 20,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  actionSubtitle: {
    color: '#64748B',
    fontFamily: 'SF Pro Rounded',
    fontWeight: '700',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: 4,
  },
  textRed: {
    color: '#EF4444',
    fontSize: 20,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  textRedLight: { color: '#F87171' },
  textRedDark: { color: 'rgba(127, 29, 29, 0.5)' },
  textWhite: { color: '#FFFFFF' },
  textDark: { color: '#0F172A' },
  textSlate400: { color: '#94A3B8' },
});
