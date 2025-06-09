import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Transaction {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
  icon: string;
}

interface TransactionItemProps {
  transaction: Transaction;
  onPress: () => void;
}

export function TransactionItem({ transaction, onPress }: TransactionItemProps) {
  const isIncome = transaction.type === 'income';
  const borderColor = isIncome ? 'border-l-success-500' : 'border-l-error-500';
  const iconBgColor = isIncome ? 'bg-success-50' : 'bg-error-50';
  const iconColor = isIncome ? '#4CAF50' : '#F44336';
  const amountColor = isIncome ? 'text-success-600' : 'text-error-600';
  const tagBgColor = isIncome ? 'bg-success-50' : 'bg-error-50';
  const tagTextColor = isIncome ? 'text-success-700' : 'text-error-700';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <Pressable
      onPress={onPress}
      className="active:bg-gray-50"
    >
      <View className={`border-l-4 ${borderColor} pl-3 py-3`}>
        <View className="flex-row items-center">
          {/* Icon */}
          <View className={`w-10 h-10 rounded-full ${iconBgColor} items-center justify-center mr-3`}>
            <Ionicons 
              name={transaction.icon as any || (isIncome ? 'cash' : 'receipt')} 
              size={20} 
              color={iconColor}
            />
          </View>

          {/* Content */}
          <View className="flex-1">
            <Text className="text-gray-900 text-base font-semibold">
              {transaction.name}
            </Text>
            <Text className="text-gray-600 text-sm">
              {formatDate(transaction.date)}
            </Text>
          </View>

          {/* Amount & Category */}
          <View className="items-end">
            <Text className={`text-base font-semibold ${amountColor}`}>
              {isIncome ? '+' : '-'}₦{Math.abs(transaction.amount).toLocaleString()}
            </Text>
            <View className={`px-2 py-1 rounded ${tagBgColor} mt-1`}>
              <Text className={`text-xs font-medium ${tagTextColor}`}>
                {transaction.category}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}