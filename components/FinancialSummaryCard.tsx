import React from "react";
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FinancialSummaryCardProps {
  title: string;
  amount: number;
  icon: string;
  backgroundColor: string;
  iconColor: string;
}

export function FinancialSummaryCard({
  title,
  amount,
  icon,
  backgroundColor,
  iconColor,
}: FinancialSummaryCardProps) {
  const getIconColorValue = (colorClass: string) => {
    switch (colorClass) {
      case 'text-success-500': return '#4CAF50';
      case 'text-warning-500': return '#FFC107';
      case 'text-primary-500': return '#1877F2';
      default: return '#6B7280';
    }
  };

  return (
    <View className={`flex-1 ${backgroundColor} rounded-xl p-3`}>
      <View className="items-center">
        <Text className="text-gray-600 text-sm mb-1">{title}</Text>
        <Ionicons 
          name={icon as any} 
          size={20} 
          color={getIconColorValue(iconColor)} 
        />
        <Text className="text-gray-900 text-lg font-semibold mt-1">
          ₦{amount.toLocaleString()}
        </Text>
      </View>
    </View>
  );
}