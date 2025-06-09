import React, { useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/store/authStore';
import { useFinanceStore } from '@/store/financeStore';
import { TransactionItem } from '@/components/TransactionItem';
import { FinancialSummaryCard } from '@/components/FinancialSummaryCard';
import { CircularProgress } from '@/components/CircularProgress';
import { EmptyState } from '@/components/EmptyState';

export default function HomePage() {
  const { user } = useAuthStore();
  const { 
    weeklyProfit, 
    totalIncome, 
    totalExpenses, 
    recentTransactions,
    investmentProgress,
    fetchFinancialData,
    loading,
    hasData
  } = useFinanceStore();

  useEffect(() => {
    if (user) {
      fetchFinancialData(user.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const renderEmptyState = () => (
    <EmptyState
      icon="wallet-outline"
      title="Welcome to Cura!"
      subtitle="Start tracking your financial journey by adding your first transaction."
      actionText="Add a Transaction"
      onAction={() => router.push('/add-transaction')}
    />
  );

  const renderContent = () => {
    if (!hasData && !loading) {
      return renderEmptyState();
    }

    return (
      <>
        {/* Weekly Profit */}
        <View className="px-5 mb-6">
          <Text className="text-gray-900 text-2xl font-bold">
            ₦{weeklyProfit.toLocaleString()} profit this week 💰
          </Text>
        </View>

        {/* Financial Summary Cards */}
        <View className="flex-row px-5 mb-6 space-x-2">
          <FinancialSummaryCard
            title="Income"
            amount={totalIncome}
            icon="trending-up"
            backgroundColor="bg-success-50"
            iconColor="text-success-500"
          />
          <FinancialSummaryCard
            title="Expenses"
            amount={totalExpenses}
            icon="receipt"
            backgroundColor="bg-warning-50"
            iconColor="text-warning-500"
          />
          <FinancialSummaryCard
            title="Net Profit"
            amount={weeklyProfit}
            icon="calculator"
            backgroundColor="bg-primary-50"
            iconColor="text-primary-500"
          />
        </View>

        {/* Action Buttons */}
        <View className="px-5 mb-8 space-y-3">
          <Pressable
            onPress={() => router.push({
              pathname: '/transactions', 
              params: {type: 'income'}})
            }
            className="bg-primary-500 rounded-xl py-4 mb-3 items-center active:bg-primary-600"
          >
            <Text className="text-white text-base font-semibold">
              + Add Income
            </Text>
          </Pressable>
          
          <Pressable
            onPress={() => router.push({
              pathname: '/add-transaction', 
              params: {type: 'expense'}})
            }
            className="border-2 border-primary-500 rounded-xl py-4 items-center active:bg-primary-50"
          >
            <Text className="text-primary-500 text-base font-semibold">
              + Add Expense
            </Text>
          </Pressable>
        </View>

        {/* Cura Invest Section */}
        <View className="px-5 mb-8">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-900 text-xl font-semibold">
              Cura Invest 🚀
            </Text>
            <Pressable onPress={() => router.push('/(tabs)/investments')}>
              <Text className="text-primary-500 text-sm font-medium">
                View Details 
              </Text>
            </Pressable>
          </View>
          
          <Text className="text-gray-600 text-sm mb-4">
            {investmentProgress.saved > 0 ? 'Keep saving to unlock.' : 'Start saving to unlock investment features.'}
          </Text>
          
          <View className="flex-row items-center">
            <CircularProgress
              percentage={investmentProgress.percentage}
              size={80}
              strokeWidth={6}
              color="#1877F2"
            />
            
            <View className="ml-4 flex-1">
              <Text className="text-gray-900 text-base">
                Target: ₦{investmentProgress.target.toLocaleString()}
              </Text>
              <Text className="text-gray-900 text-base">
                Saved: ₦{investmentProgress.saved.toLocaleString()}
              </Text>
              <Text className="text-gray-600 text-base">
                Left: ₦{(investmentProgress.target - investmentProgress.saved).toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Recent Transactions */}
        <View className="px-5 mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-900 text-xl font-semibold">
              Recent Transactions
            </Text>
            <Pressable onPress={() => router.push('/(tabs)/transactions')}>
              <Text className="text-primary-500 text-sm font-medium">
                See All
              </Text>
            </Pressable>
          </View>
          
          {recentTransactions.length > 0 ? (
            <View className="space-y-3">
              {recentTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  onPress={() => router.push(`/transaction/${transaction.id}`)}
                />
              ))}
            </View>
          ) : (
            <View className="py-8 items-center">
              <Ionicons name="receipt-outline" size={48} color="#CBD5E1" />
              <Text className="text-gray-500 text-center mt-2">
                No transactions yet
              </Text>
              <Text className="text-gray-400 text-center text-sm">
                Add your first transaction to see it here
              </Text>
            </View>
          )}
        </View>
      </>
    );
  };

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Header Greeting */}
          <View className="mx-4 mt-6 mb-5">
            <View className="bg-primary-500 rounded-2xl px-5 py-4">
              <Text className="text-white text-lg font-semibold">
                Hi, {user?.full_name?.split(' ')[0] || 'there'} 👋
              </Text>
            </View>
          </View>

          {loading ? (
            <View className="flex-1 justify-center items-center py-20">
              <Text className="text-gray-500">Loading your data...</Text>
            </View>
          ) : (
            renderContent()
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}