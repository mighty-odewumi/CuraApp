import React, { useState, useRef } from 'react';
import { View, Text, Image, Pressable, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: "You're grinding every day. But where's your money going?",
    subtitle: "Cura helps you track your hustle effortlessly, so you don't lose sight of your money. No stress. No spreadsheets. Just clarity.",
    image: require('@/assets/images/onboarding-1.png'),
  },
  {
    id: 2,
    title: "You don't need to figure it all out.",
    subtitle: "Cura tracks your money, learns your hustle, and gives you insights without asking for too much. It just works. Quietly.",
    image: require('@/assets/images/onboarding-2.png'),
  },
  {
    id: 3,
    title: "Now your money can work for you.",
    subtitle: "Once Cura sees your hustle is stable, it helps you start investing — safely, with no risk, and only when you're ready.",
    image: require('@/assets/images/onboarding-3.png'),
  },
];

export default function OnboardingScreen() {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const handleNext = () => {
    if (currentPage < 2) {
      const nextPage = currentPage + 1;
      pagerRef.current?.setPage(nextPage);
      setCurrentPage(nextPage);
    } else {
      router.replace('/(auth)/register');
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      const prevPage = currentPage - 1;
      pagerRef.current?.setPage(prevPage);
      setCurrentPage(prevPage);
    }
  };

  const handlePageSelected = (e: any) => {
    setCurrentPage(e.nativeEvent.position);
  };

  const renderPage = (data: typeof onboardingData[0], index: number) => (
    <View key={data.id} style={{ width }} className="flex-1">
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-center pt-6 pb-8">
          <View className="w-10 h-10 bg-primary-500 rounded-full items-center justify-center mr-3">
            <Ionicons name="alert" size={20} color="white" />
          </View>
          <Text className="text-primary-500 text-2xl font-bold">Cura</Text>
        </View>

        {/* Content */}
        <Animated.View 
          entering={FadeInRight.delay(index * 100)}
          className="flex-1 px-5"
        >
          {/* Illustration */}
          <View className="items-center mb-12">
            <View className="w-70 h-70 bg-primary-50 rounded-full items-center justify-center">
              <Image 
                source={data.image} 
                className="w-48 h-48"
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Text Content */}
          <View className="px-5">
            <Text className="text-gray-900 text-3xl font-bold mb-6 leading-tight">
              {data.title}
            </Text>
            <Text className="text-gray-600 text-base leading-6">
              {data.subtitle}
            </Text>
          </View>
        </Animated.View>

        {/* Bottom Section */}
        <View className="px-5 pb-8">
          {/* Progress Dots */}
          <View className="flex-row justify-center mb-8">
            {[0, 1, 2].map((dot) => (
              <Pressable
                key={dot}
                onPress={() => {
                  pagerRef.current?.setPage(dot);
                  setCurrentPage(dot);
                }}
                className={`w-2 h-2 rounded-full mx-1.5 ${
                  dot === currentPage ? 'bg-primary-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </View>

          {/* Navigation Buttons */}
          <View className="flex-row space-x-3">
            {currentPage > 0 && (
              <Pressable
                onPress={handlePrevious}
                className="flex-1 border border-primary-500 rounded-xl py-4 items-center active:bg-primary-50"
              >
                <Text className="text-primary-500 text-base font-semibold">
                  Previous
                </Text>
              </Pressable>
            )}
            
            <Pressable
              onPress={handleNext}
              className={`${currentPage > 0 ? 'flex-1' : 'flex-1'} bg-primary-500 rounded-xl py-4 items-center active:bg-primary-600`}
            >
              <Text className="text-white text-base font-semibold">
                {currentPage === 2 ? 'Get Started' : 'Next'}
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );

  return (
    <>
      <StatusBar style="dark" />
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={handlePageSelected}
      >
        {onboardingData.map((data, index) => renderPage(data, index))}
      </PagerView>
    </>
  );
}