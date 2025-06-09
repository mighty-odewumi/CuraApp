import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Sample transaction data
const transactionData = [
  {
    id: '1',
    title: 'Grocery Shopping',
    amount: -85.50,
    date: '2024-05-20',
    category: 'Food'
  },
  {
    id: '2',
    title: 'Salary Deposit',
    amount: 2500.00,
    date: '2024-05-15',
    category: 'Income'
  },
  {
    id: '3',
    title: 'Electric Bill',
    amount: -120.75,
    date: '2024-05-12',
    category: 'Utilities'
  },
  {
    id: '4',
    title: 'Dinner with Friends',
    amount: -68.20,
    date: '2024-05-10',
    category: 'Entertainment'
  },
  {
    id: '5',
    title: 'Freelance Payment',
    amount: 350.00,
    date: '2024-05-08',
    category: 'Income'
  },
];

// Transaction filters
const filters = ['All', 'Income', 'Expense', 'Food', 'Utilities', 'Entertainment'];

export default function TransactionsScreen() {
  const [activeFilter, setActiveFilter] = useState('All');

  const formatCurrency = (amount: number) => {
    return `${amount < 0 ? '-' : '+'} $${Math.abs(amount).toFixed(2)}`;
  };

  const filteredTransactions = activeFilter === 'All' 
    ? transactionData 
    : activeFilter === 'Income' 
      ? transactionData.filter(tx => tx.amount > 0)
      : activeFilter === 'Expense'
        ? transactionData.filter(tx => tx.amount < 0)
        : transactionData.filter(tx => tx.category === activeFilter);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-4 py-6">
        <Text className="text-2xl font-bold text-gray-800">Transactions</Text>
        <Text className="text-gray-500 mt-1">Review your recent financial activity</Text>
      </View>
      
      {/* Filters */}
      <View className="px-4 mb-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-2">
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              className={`px-4 py-2 mr-2 rounded-full ${
                activeFilter === filter ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            >
              <Text 
                className={`${
                  activeFilter === filter ? 'text-white' : 'text-gray-800'
                } font-medium`}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Transaction List */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-4 pb-6"
        renderItem={({ item }) => (
          <TouchableOpacity className="flex-row items-center justify-between bg-white p-4 my-1 rounded-xl shadow-sm">
            <View className="flex-row items-center">
              <View className={`w-10 h-10 rounded-full items-center justify-center ${
                item.amount > 0 ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <Ionicons 
                  name={item.amount > 0 ? 'arrow-down' : 'arrow-up'} 
                  size={20} 
                  color={item.amount > 0 ? '#10B981' : '#EF4444'} 
                />
              </View>
              <View className="ml-3">
                <Text className="font-semibold text-gray-800">{item.title}</Text>
                <Text className="text-xs text-gray-500">{item.date} · {item.category}</Text>
              </View>
            </View>
            <Text className={`font-bold ${
              item.amount > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatCurrency(item.amount)}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-12">
            <Text className="text-gray-500">No transactions found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}