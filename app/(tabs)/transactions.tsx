import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Pressable, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/store/authStore';
import { useFinanceStore } from '@/store/financeStore';
import { TransactionItem } from '@/components/TransactionItem';
import { EmptyState } from '@/components/EmptyState';

export default function TransactionsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const { user } = useAuthStore();
  const { allTransactions, fetchFinancialData, loading, hasData } = useFinanceStore();

  // Use useFocusEffect instead of useEffect for better navigation handling
  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        fetchFinancialData(user.id);
      }
    }, [user?.id])
  );

  const onRefresh = async () => {
    if (user) {
      setRefreshing(true);
      try {
        await fetchFinancialData(user.id);
      } catch (error) {
        console.error('Error refreshing:', error);
      } finally {
        setRefreshing(false);
      }
    }
  };

  const filteredTransactions = allTransactions.filter(transaction => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  });

  const handleFilterChange = (newFilter: 'all' | 'income' | 'expense') => {
    console.log('Changing filter to:', newFilter);
    setFilter(newFilter);
  };

  const handleTransactionPress = (transactionId: string) => {
    console.log('Navigating to transaction:', transactionId);
    router.push(`/transaction/${transactionId}`);
  };

  const handleAddTransaction = () => {
    console.log('Navigating to add transaction');
    router.push('/add-transaction');
  };

  const renderEmptyState = () => (
    <EmptyState
      icon="receipt-outline"
      title="No Transactions Yet"
      subtitle="Start tracking your financial journey by adding your first transaction."
      actionText="Add Transaction"
      onAction={handleAddTransaction}
    />
  );

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">Please log in to view transactions</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-100">
          <Text className="text-xl font-bold text-gray-900">Transactions</Text>
          <Pressable onPress={handleAddTransaction}>
            <Ionicons name="add-circle" size={28} color="#1877F2" />
          </Pressable>
        </View>

        {!hasData && !loading ? (
          renderEmptyState()
        ) : (
          <>
            {/* Filter Tabs */}
            <View className="flex-row bg-gray-50 mx-5 mt-4 rounded-xl p-1">
              {[
                { key: 'all', label: 'All' },
                { key: 'income', label: 'Income' },
                { key: 'expense', label: 'Expense' },
              ].map((tab) => (
                <Pressable
                  key={tab.key}
                  onPress={() => handleFilterChange(tab.key as any)}
                  className={`flex-1 py-2 rounded-lg items-center ${
                    filter === tab.key ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  <Text className={`font-medium ${
                    filter === tab.key ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {tab.label}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Transactions List */}
            <ScrollView
              className="flex-1 px-5 mt-4"
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              showsVerticalScrollIndicator={false}
            >
              {filteredTransactions.length > 0 ? (
                <View className="space-y-3 pb-6">
                  {filteredTransactions.map((transaction) => (
                    <TransactionItem
                      key={transaction.id}
                      transaction={transaction}
                      onPress={() => handleTransactionPress(transaction.id)}
                    />
                  ))}
                </View>
              ) : (
                <View className="flex-1 justify-center items-center py-20">
                  <Ionicons name="filter-outline" size={48} color="#CBD5E1" />
                  <Text className="text-gray-500 text-center mt-2">
                    No {filter} transactions found
                  </Text>
                </View>
              )}
            </ScrollView>
          </>
        )}
      </SafeAreaView>
    </>
  );
}