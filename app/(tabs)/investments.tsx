import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Pressable, RefreshControl, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/store/authStore';
import { useFinanceStore } from '@/store/financeStore';
import { useInvestmentStore } from '@/store/investmentStore';
import { StockItem } from '@/components/StockItem';
import { EducationalPopups } from '@/components/EducationalPopups';
import { EmptyState } from '@/components/EmptyState';
import { LinearGradient } from 'expo-linear-gradient';


export default function InvestmentsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [showEducationalTips, setShowEducationalTips] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'stocks' | 'portfolio'>('stocks');
  
  const { user } = useAuthStore();
  const { investmentProgress, weeklyProfit } = useFinanceStore();
  const { 
    stocks, 
    portfolio, 
    virtualBalance, 
    totalProfit, 
    loading, 
    lastUpdated, 
    canInvest,
    fetchStocks, 
    fetchPortfolio, 
    updateVirtualBalance,
    setCanInvest 
  } = useInvestmentStore();

  // Check if user can invest (100% progress or judge credentials)
  useEffect(() => {
    const judgeEmail = process.env.EXPO_PUBLIC_JUDGE_EMAIL;
    const isJudge = user?.email === judgeEmail;
    const hasFullProgress = investmentProgress.percentage >= 100;
    
    setCanInvest(isJudge || hasFullProgress);
    
    // Set virtual balance to weekly profit
    if (weeklyProfit > 0) {
      updateVirtualBalance(weeklyProfit);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, investmentProgress.percentage, weeklyProfit]);

  // Show educational tips after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEducationalTips(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Fetch data when screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchStocks();
      if (user?.id) {
        fetchPortfolio(user.id);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id])
  );

  // Auto-refresh stocks every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchStocks();
    }, 30000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchStocks();
      if (user?.id) {
        await fetchPortfolio(user.id);
      }
    } catch (error) {
      console.error('Error refreshing:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleStockPress = (stock: any) => {
    if (!canInvest) {
      Alert.alert(
        'Investment Locked',
        'Complete your savings goal to unlock investment features, or use judge credentials to access immediately.',
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      `Buy ${stock.Symbol}`,
      `Current Price: ₦${stock.ClosePrice.toFixed(2)}\nVirtual Balance: ₦${virtualBalance.toLocaleString()}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Buy 10 Shares', 
          onPress: () => handleBuyStock(stock, 10)
        },
        { 
          text: 'Buy 50 Shares', 
          onPress: () => handleBuyStock(stock, 50)
        },
      ]
    );
  };

  const handleBuyStock = async (stock: any, shares: number) => {
    if (!user?.id) return;

    try {
      const { buyStock } = useInvestmentStore.getState();
      await buyStock(user.id, stock, shares);
      Alert.alert('Success', `Successfully bought ${shares} shares of ${stock.Symbol}`);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const renderProgressSection = () => (
    <View className="mx-5 mb-6">
      <LinearGradient
        colors={['#1877F2', '#1565C0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="rounded-2xl p-5"
      >
        <Text className="text-white text-lg font-semibold mb-2">
          Investment Progress
        </Text>
        <View className="flex-row items-center justify-between">
          <View>
            <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }} className="text-sm">
              {canInvest ? 'Ready to Invest!' : 'Keep Saving to Unlock'}
            </Text>
            <Text className="text-white text-2xl font-bold">
              {investmentProgress.percentage.toFixed(0)}%
            </Text>
          </View>
          <View className="items-end">
            <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }} className="text-sm">
              Virtual Balance
            </Text>
            <Text className="text-white text-xl font-bold">
              ₦{virtualBalance.toLocaleString()}
            </Text>
          </View>
        </View>
        
        <View className="mt-4 rounded-full h-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
          <View 
            className="bg-white rounded-full h-2"
            style={{ width: `${Math.min(investmentProgress.percentage, 100)}%` }}
          />
        </View>
      </LinearGradient>
    </View>
  );

  const renderTabSelector = () => (
    <View className="flex-row bg-gray-100 mx-5 mb-4 rounded-xl p-1">
      <Pressable
        onPress={() => setSelectedTab('stocks')}
        className={`flex-1 py-2 rounded-lg items-center ${
          selectedTab === 'stocks' ? 'bg-white shadow-sm' : ''
        }`}
      >
        <Text className={`font-medium ${
          selectedTab === 'stocks' ? 'text-gray-900' : 'text-gray-500'
        }`}>
          Available Stocks
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setSelectedTab('portfolio')}
        className={`flex-1 py-2 rounded-lg items-center ${
          selectedTab === 'portfolio' ? 'bg-white shadow-sm' : ''
        }`}
      >
        <Text className={`font-medium ${
          selectedTab === 'portfolio' ? 'text-gray-900' : 'text-gray-500'
        }`}>
          My Portfolio
        </Text>
      </Pressable>
    </View>
  );

  const renderStocksList = () => (
    <View className="px-5">
      {stocks.length > 0 ? (
        stocks.map((stock) => (
          <StockItem
            key={stock.Id}
            stock={stock}
            onPress={() => handleStockPress(stock)}
            canInvest={canInvest}
          />
        ))
      ) : (
        <EmptyState
          icon="trending-up"
          title="No Stocks Available"
          subtitle="Unable to fetch stock data at the moment. Please try refreshing."
        />
      )}
    </View>
  );

  const renderPortfolio = () => (
    <View className="px-5">
      {portfolio.length > 0 ? (
        <>
          <View className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
            <Text className="text-gray-600 text-sm mb-2">Portfolio Summary</Text>
            <View className="flex-row justify-between">
              <View>
                <Text className="text-gray-500 text-xs">Total Profit/Loss</Text>
                <Text className={`text-lg font-bold ${
                  totalProfit >= 0 ? 'text-success-600' : 'text-error-600'
                }`}>
                  {totalProfit >= 0 ? '+' : ''}₦{totalProfit.toLocaleString()}
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-gray-500 text-xs">Holdings</Text>
                <Text className="text-gray-900 text-lg font-bold">
                  {portfolio.length} stocks
                </Text>
              </View>
            </View>
          </View>
          
          {portfolio.map((holding) => (
            <View key={holding.id} className="bg-white border border-gray-200 rounded-xl p-4 mb-3">
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-gray-900 text-lg font-bold">
                    {holding.symbol}
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    {holding.company_name}
                  </Text>
                  <Text className="text-gray-500 text-xs mt-1">
                    {holding.shares} shares @ ₦{holding.purchase_price.toFixed(2)}
                  </Text>
                </View>
                
                <View className="items-end">
                  <Text className="text-gray-900 text-lg font-bold">
                    ₦{holding.total_value.toLocaleString()}
                  </Text>
                  <Text className={`text-sm font-medium ${
                    holding.profit_loss >= 0 ? 'text-success-600' : 'text-error-600'
                  }`}>
                    {holding.profit_loss >= 0 ? '+' : ''}₦{holding.profit_loss.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </>
      ) : (
        <EmptyState
          icon="briefcase-outline"
          title="No Investments Yet"
          subtitle={canInvest ? "Start building your portfolio by buying your first stock." : "Complete your savings goal to start investing."}
        />
      )}
    </View>
  );

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-4 bg-white border-b border-gray-100">
          <Text className="text-xl font-bold text-gray-900">Invest</Text>
          <Pressable onPress={handleRefresh} disabled={loading}>
            <Ionicons 
              name="refresh" 
              size={24} 
              color={loading ? "#9CA3AF" : "#1877F2"} 
            />
          </Pressable>
        </View>

        <ScrollView
          className="flex-1"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          {renderProgressSection()}
          
          {lastUpdated && (
            <Text className="text-gray-500 text-xs text-center mb-4">
              Last updated: {new Date(lastUpdated).toLocaleTimeString()}
            </Text>
          )}

          {renderTabSelector()}
          
          {selectedTab === 'stocks' ? renderStocksList() : renderPortfolio()}
        </ScrollView>

        <EducationalPopups
          isVisible={showEducationalTips}
          onComplete={() => setShowEducationalTips(false)}
        />
      </SafeAreaView>
    </>
  );
}