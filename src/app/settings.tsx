import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
      <View className="px-6 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ChevronLeft size={28} color="#64748b" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-slate-900 dark:text-white">Settings</Text>
      </View>

      <View className="flex-1 p-6">
        <View className="bg-slate-100 dark:bg-slate-800 p-6 rounded-3xl">
          <Text className="text-slate-900 dark:text-white text-lg font-semibold mb-2">
            App Version
          </Text>
          <Text className="text-slate-500 dark:text-slate-400">
            1.0.0 (Phase 1)
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
