import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

export default function TypesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
      <View className="px-6 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ChevronLeft size={28} color="#64748b" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-slate-900 dark:text-white">Type Guide</Text>
      </View>

      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-slate-500 dark:text-slate-400 text-center text-lg">
          Type relationships coming soon in Phase 2!
        </Text>
      </View>
    </SafeAreaView>
  );
}
