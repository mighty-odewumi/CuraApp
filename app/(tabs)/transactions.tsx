import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/store/authStore';
import { useFinanceStore } from '@/store/financeStore';
import { TransactionItem } from '@/components/TransactionItem';
import { EmptyState } from '@/components/EmptyState';

export default function TransactionsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const { user } = useAuthStore();
  const { recentTransactions, fetchFinancialData, loading, hasData } = useFinanceStore();

  useEffect(() => {
    if (user) {
      fetchFinancialData(user.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onRefresh = async () => {
    if (user) {
      setRefreshing(true);
      await fetchFinancialData(user.id);
      setRefreshing(false);
    }
  };

  const filteredTransactions = recentTransactions.filter(transaction => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  });

  const renderEmptyState = () => (
    <EmptyState
      icon="receipt-outline"
      title="No Transactions Yet"
      subtitle="Start tracking your financial journey by adding your first transaction."
      actionText="Add Transaction"
      onAction={() => router.push('/add-transaction')}
    />
  );

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-100">
          <Text className="text-xl font-bold text-gray-900">Transactions</Text>
          <Pressable onPress={() => router.push('/add-transaction')}>
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
                  onPress={() => setFilter(tab.key as any)}
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
                      onPress={() => router.push(`/transaction/${transaction.id}` as any)}
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