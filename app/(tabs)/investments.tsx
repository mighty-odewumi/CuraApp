import React, { useState, useEffect, useCallback } from "react"
import { View, Text, ScrollView, Pressable, RefreshControl, Alert, TextInput, Modal } from "react-native"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"
import { useFocusEffect } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { useAuthStore } from "@/store/authStore"
import { useFinanceStore } from "@/store/financeStore"
import { useInvestmentStore } from "@/store/investmentStore"
import { StockItem } from "@/components/StockItem"
import { EducationalPopups } from "@/components/EducationalPopups"
import { EmptyState } from "@/components/EmptyState"
import { LinearGradient } from "expo-linear-gradient"

export default function InvestmentsScreen() {
  const [refreshing, setRefreshing] = useState(false)
  const [showEducationalTips, setShowEducationalTips] = useState(false)
  const [selectedTab, setSelectedTab] = useState<"stocks" | "portfolio">("stocks")
  const [showBuyModal, setShowBuyModal] = useState(false)
  const [selectedStock, setSelectedStock] = useState<any>(null)
  const [shareQuantity, setShareQuantity] = useState("10")

  const { user } = useAuthStore()
  const { investmentProgress, weeklyProfit } = useFinanceStore()
  const {
    stocks,
    portfolio,
    virtualBalance,
    totalProfit,
    totalCurrentValue,
    totalInvested,
    loading,
    lastUpdated,
    canInvest,
    fetchStocks,
    fetchPortfolio,
    updateVirtualBalance,
    setCanInvest,
    buyStock,
  } = useInvestmentStore()

  // Safe number parsing with fallbacks
  const safeVirtualBalance = typeof virtualBalance === "number" ? virtualBalance : 0
  const safeTotalProfit = typeof totalProfit === "number" ? totalProfit : 0
  const safeTotalCurrentValue = typeof totalCurrentValue === "number" ? totalCurrentValue : 0
  const safeTotalInvested = typeof totalInvested === "number" ? totalInvested : 0
  const safeInvestmentProgress = investmentProgress?.percentage || 0
  const safeWeeklyProfit = typeof weeklyProfit === "number" ? weeklyProfit : 0

  // Check if user can invest (100% progress or judge credentials)
  useEffect(() => {
    const judgeEmail = process.env.EXPO_PUBLIC_JUDGE_EMAIL
    const isJudge = user?.email === judgeEmail
    const hasFullProgress = safeInvestmentProgress >= 100

    setCanInvest(isJudge || hasFullProgress)

    // Set virtual balance to weekly profit
    if (safeWeeklyProfit > 0) {
      updateVirtualBalance(safeWeeklyProfit)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, safeInvestmentProgress, safeWeeklyProfit])

  // Show educational tips after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEducationalTips(true)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  // Fetch data when screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchStocks()
      if (user?.id) {
        fetchPortfolio(user.id)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]),
  )

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      await fetchStocks()
      if (user?.id) {
        await fetchPortfolio(user.id)
      }
    } catch (error) {
      console.error("Error refreshing:", error)
    } finally {
      setRefreshing(false)
    }
  }

  const handleStockPress = (stock: any) => {
    if (!canInvest) {
      Alert.alert(
        "Investment Locked",
        "Complete your savings goal to unlock investment features, or use judge credentials to access immediately.",
        [{ text: "OK" }],
      )
      return
    }

    setSelectedStock(stock)
    setShowBuyModal(true)
  }

  const handleBuyStock = async () => {
    if (!user?.id || !selectedStock) return

    const shares = Number.parseInt(shareQuantity)
    if (isNaN(shares) || shares <= 0) {
      Alert.alert("Invalid Quantity", "Please enter a valid number of shares")
      return
    }

    const stockPrice = typeof selectedStock.ClosePrice === "number" ? selectedStock.ClosePrice : 0
    const totalCost = stockPrice * shares

    if (totalCost > safeVirtualBalance) {
      Alert.alert(
        "Insufficient Balance",
        `You need ₦${totalCost.toLocaleString()} but only have ₦${safeVirtualBalance.toLocaleString()}`,
      )
      return
    }

    try {
      await buyStock(user.id, selectedStock, shares)
      Alert.alert(
        "Success",
        `Successfully bought ${shares} shares of ${selectedStock.Symbol} for ₦${totalCost.toLocaleString()}`,
      )
      setShowBuyModal(false)
      setSelectedStock(null)
      setShareQuantity("10")
    } catch (error: any) {
      Alert.alert("Error", error.message || "An error occurred while buying the stock")
    }
  }

  const renderProgressSection = () => (
    <View className="mx-5 mb-6">
      <LinearGradient
        colors={["#1877F2", "#1565C0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="rounded-2xl p-5"
      >
        <Text className="text-white text-lg font-semibold mb-2">Investment Progress</Text>
        <View className="flex-row items-center justify-between">
          <View>
            <Text style={{ color: "rgba(255, 255, 255, 0.8)" }} className="text-sm">
              {canInvest ? "Ready to Invest!" : "Keep Saving to Unlock"}
            </Text>
            <Text className="text-white text-2xl font-bold">{safeInvestmentProgress.toFixed(0)}%</Text>
          </View>
          <View className="items-end">
            <Text style={{ color: "rgba(255, 255, 255, 0.8)" }} className="text-sm">
              Virtual Balance
            </Text>
            <Text className="text-white text-xl font-bold">₦{safeVirtualBalance.toLocaleString()}</Text>
          </View>
        </View>

        <View className="mt-4 rounded-full h-2" style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
          <View className="bg-white rounded-full h-2" style={{ width: `${Math.min(safeInvestmentProgress, 100)}%` }} />
        </View>
      </LinearGradient>
    </View>
  )

  const renderTabSelector = () => (
    <View className="flex-row bg-gray-100 mx-5 mb-4 rounded-xl p-1">
      <Pressable
        onPress={() => setSelectedTab("stocks")}
        className={`flex-1 py-2 rounded-lg items-center ${selectedTab === "stocks" ? "bg-white shadow-sm" : ""}`}
      >
        <Text className={`font-medium ${selectedTab === "stocks" ? "text-gray-900" : "text-gray-500"}`}>
          Available Stocks ({stocks?.length || 0})
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setSelectedTab("portfolio")}
        className={`flex-1 py-2 rounded-lg items-center ${selectedTab === "portfolio" ? "bg-white shadow-sm" : ""}`}
      >
        <Text className={`font-medium ${selectedTab === "portfolio" ? "text-gray-900" : "text-gray-500"}`}>
          My Portfolio ({portfolio?.length || 0})
        </Text>
      </Pressable>
    </View>
  )

  const renderStocksList = () => (
    <View className="px-5">
      {loading && (!stocks || stocks.length === 0) ? (
        <View className="bg-white rounded-xl p-8 items-center">
          <Text className="text-gray-500">Loading stocks...</Text>
        </View>
      ) : stocks && stocks.length > 0 ? (
        <>
          <Text className="text-sm text-gray-600 mb-4">
            {canInvest ? "Tap any stock to buy shares" : "Complete your savings goal to start investing"}
          </Text>
          {stocks.map((stock) => (
            <StockItem key={stock.Id} stock={stock} onPress={() => handleStockPress(stock)} canInvest={canInvest} />
          ))}
        </>
      ) : (
        <EmptyState
          icon="trending-up"
          title="No Stocks Available"
          subtitle="Unable to fetch stock data at the moment. Please try refreshing."
        />
      )}
    </View>
  )

  const renderPortfolio = () => (
    <View className="px-5">
      {portfolio && portfolio.length > 0 ? (
        <>
          <View className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
            <Text className="text-gray-600 text-sm mb-3">Portfolio Summary</Text>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500 text-sm">Total Invested</Text>
              <Text className="text-gray-900 font-semibold">₦{safeTotalInvested.toLocaleString()}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500 text-sm">Current Value</Text>
              <Text className="text-gray-900 font-semibold">₦{safeTotalCurrentValue.toLocaleString()}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-500 text-sm">Total P&L</Text>
              <Text className={`font-bold ${safeTotalProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                {safeTotalProfit >= 0 ? "+" : ""}₦{safeTotalProfit.toLocaleString()}
              </Text>
            </View>
          </View>

          {portfolio.map((holding) => {
            const safeShares = typeof holding.shares === "number" ? holding.shares : 0
            const safePurchasePrice = typeof holding.purchase_price === "number" ? holding.purchase_price : 0
            const safeTotalValue = typeof holding.total_value === "number" ? holding.total_value : 0
            const safeProfitLoss = typeof holding.profit_loss === "number" ? holding.profit_loss : 0
            const safeProfitLossPercent =
              typeof holding.profit_loss_percent === "number" ? holding.profit_loss_percent : 0

            return (
              <View key={holding.id} className="bg-white border border-gray-200 rounded-xl p-4 mb-3">
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text className="text-gray-900 text-lg font-bold">{holding.symbol || "N/A"}</Text>
                    <Text className="text-gray-600 text-sm">{holding.company_name || "Unknown Company"}</Text>
                    <Text className="text-gray-500 text-xs mt-1">
                      {safeShares} shares @ ₦{safePurchasePrice.toFixed(2)}
                    </Text>
                  </View>

                  <View className="items-end">
                    <Text className="text-gray-900 text-lg font-bold">₦{safeTotalValue.toLocaleString()}</Text>
                    <Text className={`text-sm font-medium ${safeProfitLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {safeProfitLoss >= 0 ? "+" : ""}₦{safeProfitLoss.toFixed(2)}
                    </Text>
                    <Text className={`text-xs ${safeProfitLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                      ({safeProfitLoss >= 0 ? "+" : ""}
                      {safeProfitLossPercent.toFixed(1)}%)
                    </Text>
                  </View>
                </View>
              </View>
            )
          })}
        </>
      ) : (
        <EmptyState
          icon="briefcase-outline"
          title="No Investments Yet"
          subtitle={
            canInvest
              ? "Start building your portfolio by buying your first stock."
              : "Complete your savings goal to start investing."
          }
        />
      )}
    </View>
  )

  const renderBuyModal = () => {
    if (!selectedStock) return null

    const stockPrice = typeof selectedStock.ClosePrice === "number" ? selectedStock.ClosePrice : 0
    const stockChange = typeof selectedStock.Change === "number" ? selectedStock.Change : 0
    const stockPercentChange = typeof selectedStock.PercentChange === "number" ? selectedStock.PercentChange : 0
    const quantity = Number.parseInt(shareQuantity) || 0

    return (
      <Modal visible={showBuyModal} transparent animationType="slide" onRequestClose={() => setShowBuyModal(false)}>
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-xl font-bold text-gray-900">Buy {selectedStock.Symbol || "Stock"}</Text>
              <Pressable onPress={() => setShowBuyModal(false)}>
                <Ionicons name="close" size={24} color="#9CA3AF" />
              </Pressable>
            </View>

            <View className="bg-gray-50 rounded-xl p-4 mb-4">
              <Text className="text-gray-600 text-sm mb-1">{selectedStock.Company2 || "Unknown Company"}</Text>
              <Text className="text-2xl font-bold text-gray-900 mb-2">₦{stockPrice.toFixed(2)}</Text>
              <Text className={`text-sm font-medium ${stockChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                {stockChange >= 0 ? "+" : ""}₦{stockChange.toFixed(2)} ({stockPercentChange >= 0 ? "+" : ""}
                {stockPercentChange.toFixed(2)}%)
              </Text>
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-2">Number of Shares</Text>
              <TextInput
                value={shareQuantity}
                onChangeText={setShareQuantity}
                keyboardType="numeric"
                className="border border-gray-300 rounded-xl px-4 py-3 text-lg"
                placeholder="Enter quantity"
              />
            </View>

            <View className="bg-gray-50 rounded-xl p-4 mb-6">
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-600">Total Cost</Text>
                <Text className="font-semibold">₦{(stockPrice * quantity).toLocaleString()}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Available Balance</Text>
                <Text className="font-semibold">₦{safeVirtualBalance.toLocaleString()}</Text>
              </View>
            </View>

            <Pressable onPress={handleBuyStock} className="bg-primary-500 rounded-xl py-4 items-center">
              <Text className="text-white font-bold text-lg">Buy {quantity} Shares</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-4 bg-white border-b border-gray-100">
          <Text className="text-xl font-bold text-gray-900">Invest</Text>
          <Pressable onPress={handleRefresh} disabled={loading}>
            <Ionicons name="refresh" size={24} color={loading ? "#9CA3AF" : "#1877F2"} />
          </Pressable>
        </View>

        <ScrollView
          className="flex-1"
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
          showsVerticalScrollIndicator={false}
        >
          {renderProgressSection()}

          {lastUpdated && (
            <Text className="text-gray-500 text-xs text-center mb-4">
              Last updated: {new Date(lastUpdated).toLocaleTimeString()}
            </Text>
          )}

          {renderTabSelector()}

          {selectedTab === "stocks" ? renderStocksList() : renderPortfolio()}
        </ScrollView>

        {renderBuyModal()}

        <EducationalPopups isVisible={showEducationalTips} onComplete={() => setShowEducationalTips(false)} />
      </SafeAreaView>
    </>
  )
}
