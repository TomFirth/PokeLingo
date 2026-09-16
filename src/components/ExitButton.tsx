import React from 'react';
import { TouchableOpacity, View, useColorScheme, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';

export const ExitButton = () => {
  const router = useRouter();
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.replace('/')}
        activeOpacity={0.7}
        style={[styles.button, isDark ? styles.bgLight : styles.bgDark]}
      >
        <X size={24} color={isDark ? '#0F172A' : '#F8FAFC'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    padding: 16,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  bgDark: { backgroundColor: '#0F172A' },
  bgLight: { backgroundColor: '#F8FAFC' },
});
