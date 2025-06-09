import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function InvestmentsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView className="flex-1 p-4">
        <View className="py-4">
          <Text className="text-2xl font-bold text-gray-800">Investments</Text>
          <Text className="text-gray-600 mt-2">Your investment portfolio overview</Text>
        </View>
        
        <View className="bg-gray-100 rounded-lg p-4 mt-4">
          <Text className="font-semibold text-gray-800">Portfolio Value</Text>
          <Text className="text-2xl font-bold text-green-600 mt-1">$10,324.75</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}