import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface EducationalTip {
  id: number;
  title: string;
  content: string;
  icon: string;
}

const educationalTips: EducationalTip[] = [
  {
    id: 1,
    title: "Diversification is Key",
    content: "Don't put all your eggs in one basket! Spread your investments across different sectors and companies to reduce risk.",
    icon: "pie-chart"
  },
  {
    id: 2,
    title: "Buy Low, Sell High",
    content: "The golden rule of investing. Look for undervalued stocks with good fundamentals and sell when they're overpriced.",
    icon: "trending-up"
  },
  {
    id: 3,
    title: "Research Before You Invest",
    content: "Always research a company's financial health, market position, and future prospects before investing your money.",
    icon: "search"
  }
];

interface EducationalPopupsProps {
  isVisible: boolean;
  onComplete: () => void;
}

export function EducationalPopups({ isVisible, onComplete }: EducationalPopupsProps) {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const showNextTip = () => {
      if (currentTipIndex < educationalTips.length) {
        setShowTip(true);
      } else {
        onComplete();
      }
    };

    const timer = setTimeout(showNextTip, currentTipIndex === 0 ? 4000 : 5000);
    return () => clearTimeout(timer);
  }, [isVisible, currentTipIndex, onComplete]);

  const handleClose = () => {
    setShowTip(false);
    
    setTimeout(() => {
      if (currentTipIndex < educationalTips.length - 1) {
        setCurrentTipIndex(currentTipIndex + 1);
      } else {
        onComplete();
      }
    }, 300);
  };

  if (!isVisible || currentTipIndex >= educationalTips.length) {
    return null;
  }

  const currentTip = educationalTips[currentTipIndex];

  return (
    <Modal
      visible={showTip}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-5">
        <Animated.View 
          entering={FadeIn}
          exiting={FadeOut}
          className="bg-white rounded-2xl p-6 w-full max-w-sm"
        >
          <View className="items-center mb-4">
            <View className="w-16 h-16 bg-primary-100 rounded-full items-center justify-center mb-3">
              <Ionicons name={currentTip.icon as any} size={32} color="#1877F2" />
            </View>
            <Text className="text-xl font-bold text-gray-900 text-center">
              {currentTip.title}
            </Text>
          </View>
          
          <Text className="text-gray-600 text-center leading-6 mb-6">
            {currentTip.content}
          </Text>
          
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-400 text-sm">
              {currentTipIndex + 1} of {educationalTips.length}
            </Text>
            <Pressable
              onPress={handleClose}
              className="bg-primary-500 px-6 py-2 rounded-lg active:bg-primary-600"
            >
              <Text className="text-white font-semibold">
                {currentTipIndex === educationalTips.length - 1 ? 'Got it!' : 'Next'}
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}