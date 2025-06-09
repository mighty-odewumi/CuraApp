import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import { useAuthStore } from '@/store/authStore';

export default function SplashScreen() {
  const { user } = useAuthStore();
  const progressWidth = useSharedValue(0);
  const opacity = useSharedValue(1);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    progressWidth.value = withTiming(100, { duration: 2000 });
    
    const timer = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 300 }, () => {
        runOnJS(navigateNext)();
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const navigateNext = () => {
    if (user) {
      router.replace('/(tabs)');
    } else {
      router.replace('/onboarding');
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <Animated.View style={containerStyle} className="flex-1">
        <LinearGradient
          colors={['#1877F2', '#1565C0']}
          className="flex-1"
        >
          <SafeAreaView className="flex-1 justify-center items-center px-5">
            <View className="items-center">
              <Text className="text-white text-7xl font-bold mb-6">
                Cura
              </Text>
              <Text className="text-white text-base text-center opacity-90">
                Track your hustle. Unlock your future.
              </Text>
            </View>
            
            <View className="absolute bottom-10 w-4/5">
              <View className="h-1 bg-white/20 rounded-full overflow-hidden">
                <Animated.View 
                  style={progressStyle}
                  className="h-full bg-white rounded-full"
                />
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </Animated.View>
    </>
  );
}