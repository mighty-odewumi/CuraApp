import React from "react";
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stock } from '@/lib/stocksApi';

interface StockItemProps {
  stock: Stock;
  onPress: () => void;
  canInvest: boolean;
}

export function StockItem({ stock, onPress, canInvest }: StockItemProps) {
  const isPositive = stock.Change >= 0;
  const changeColor = isPositive ? 'text-success-600' : 'text-error-600';
  const changeBgColor = isPositive ? 'bg-success-50' : 'bg-error-50';

  return (
    <Pressable
      onPress={onPress}
      className="bg-white border border-gray-200 rounded-xl p-4 mb-3 active:bg-gray-50"
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-gray-900 text-lg font-bold">
            {stock.Symbol}
          </Text>
          <Text className="text-gray-600 text-sm" numberOfLines={1}>
            {stock.Company2}
          </Text>
          <Text className="text-gray-500 text-xs mt-1">
            {stock.Sector} • {stock.Market}
          </Text>
        </View>
        
        <View className="items-end">
          <Text className="text-gray-900 text-lg font-bold">
            ₦{stock.ClosePrice.toFixed(2)}
          </Text>
          <View className={`flex-row items-center px-2 py-1 rounded ${changeBgColor}`}>
            <Ionicons 
              name={isPositive ? 'trending-up' : 'trending-down'} 
              size={12} 
              color={isPositive ? '#4CAF50' : '#F44336'} 
            />
            <Text className={`text-xs font-medium ml-1 ${changeColor}`}>
              {isPositive ? '+' : ''}{stock.Change.toFixed(2)} ({stock.PercChange.toFixed(1)}%)
            </Text>
          </View>
        </View>
      </View>
      
      <View className="flex-row justify-between mt-3 pt-3 border-t border-gray-100">
        <View>
          <Text className="text-gray-500 text-xs">Volume</Text>
          <Text className="text-gray-900 text-sm font-medium">
            {stock.Volume.toLocaleString()}
          </Text>
        </View>
        <View>
          <Text className="text-gray-500 text-xs">High</Text>
          <Text className="text-gray-900 text-sm font-medium">
            ₦{stock.HighPrice.toFixed(2)}
          </Text>
        </View>
        <View>
          <Text className="text-gray-500 text-xs">Low</Text>
          <Text className="text-gray-900 text-sm font-medium">
            ₦{stock.LowPrice.toFixed(2)}
          </Text>
        </View>
        {!canInvest && (
          <View className="bg-gray-100 px-2 py-1 rounded">
            <Text className="text-gray-500 text-xs">View Only</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}