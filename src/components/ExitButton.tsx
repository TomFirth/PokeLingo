import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';

export const ExitButton = () => {
  const router = useRouter();

  return (
    <View className="absolute bottom-10 left-0 right-0 items-center">
      <TouchableOpacity
        onPress={() => router.replace('/')}
        activeOpacity={0.7}
        className="bg-slate-900 dark:bg-white p-4 rounded-full shadow-lg"
      >
        <X size={24} color={process.env.EXPO_PUBLIC_DARK_MODE === 'true' ? '#000' : '#fff'}
           className="text-white dark:text-slate-900"
        />
      </TouchableOpacity>
    </View>
  );
};
