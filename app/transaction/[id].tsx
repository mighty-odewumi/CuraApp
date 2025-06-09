import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Alert, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFinanceStore } from '@/store/financeStore';

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [transaction, setTransaction] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { getTransactionById, deleteTransaction } = useFinanceStore();

  useEffect(() => {
    loadTransaction();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadTransaction = async () => {
    try {
      const data = await getTransactionById(id!);
      setTransaction(data);
    } catch (error) {
      console.error('Error loading transaction:', error);
      Alert.alert('Error', 'Failed to load transaction details');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTransaction(id!);
              Alert.alert('Success', 'Transaction deleted successfully');
              router.back();
            } catch (error: any) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!transaction) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">Transaction not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isIncome = transaction.type === 'income';
  const amountColor = isIncome ? 'text-success-600' : 'text-error-600';
  const iconBgColor = isIncome ? 'bg-success-50' : 'bg-error-50';
  const iconColor = isIncome ? '#4CAF50' : '#F44336';

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-100">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </Pressable>
          <Text className="text-lg font-semibold text-gray-900">
            Transaction Details
          </Text>
          <Pressable onPress={handleDelete}>
            <Ionicons name="trash-outline" size={24} color="#EF4444" />
          </Pressable>
        </View>

        <ScrollView className="flex-1 px-5 py-6">
          {/* Transaction Icon & Amount */}
          <View className="items-center mb-8">
            <View className={`w-20 h-20 rounded-full ${iconBgColor} items-center justify-center mb-4`}>
              <Ionicons
                name={transaction.icon as any || (isIncome ? 'cash' : 'receipt')}
                size={40}
                color={iconColor}
              />
            </View>
            <Text className={`text-3xl font-bold ${amountColor}`}>
              {isIncome ? '+' : '-'}₦{Math.abs(transaction.amount).toLocaleString()}
            </Text>
            <Text className="text-gray-600 text-lg mt-1">
              {transaction.name}
            </Text>
          </View>

          {/* Transaction Details */}
          <View className="space-y-6">
            <View className="bg-gray-50 rounded-xl p-4">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-gray-600 font-medium">Type</Text>
                <View className={`px-3 py-1 rounded-full ${
                  isIncome ? 'bg-success-100' : 'bg-error-100'
                }`}>
                  <Text className={`text-sm font-medium ${
                    isIncome ? 'text-success-700' : 'text-error-700'
                  }`}>
                    {isIncome ? 'Income' : 'Expense'}
                  </Text>
                </View>
              </View>

              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-gray-600 font-medium">Category</Text>
                <Text className="text-gray-900 font-medium">{transaction.category}</Text>
              </View>

              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-gray-600 font-medium">Date</Text>
                <Text className="text-gray-900 font-medium">
                  {new Date(transaction.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-gray-600 font-medium">Time</Text>
                <Text className="text-gray-900 font-medium">
                  {new Date(transaction.date).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
            </View>

            {transaction.description && (
              <View className="bg-gray-50 rounded-xl p-4">
                <Text className="text-gray-600 font-medium mb-2">Description</Text>
                <Text className="text-gray-900">{transaction.description}</Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Edit Button */}
        <View className="px-5 pb-6 pt-4 border-t border-gray-100">
          <Pressable
            onPress={() => router.push(`/edit-transaction/${id}`)}
            className="bg-primary-500 rounded-xl py-4 items-center active:bg-primary-600"
          >
            <Text className="text-white text-base font-semibold">
              Edit Transaction
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
}