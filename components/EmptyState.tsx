import React from "react";
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle: string;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  subtitle,
  actionText,
  onAction,
}: EmptyStateProps) {
  return (
    <View className="flex-1 justify-center items-center px-8 py-20">
      <View className="w-24 h-24 bg-empty-100 rounded-full items-center justify-center mb-6">
        <Ionicons name={icon as any} size={48} color="#94A3B8" />
      </View>
      
      <Text className="text-gray-900 text-xl font-bold text-center mb-2">
        {title}
      </Text>
      
      <Text className="text-gray-600 text-base text-center mb-8 leading-6">
        {subtitle}
      </Text>
      
      {actionText && onAction && (
        <Pressable
          onPress={onAction}
          className="bg-primary-500 rounded-xl px-6 py-4 min-w-[200px] active:bg-primary-600"
        >
          <Text className="text-white text-base font-semibold text-center">
            {actionText}
          </Text>
        </Pressable>
      )}
    </View>
  );
}