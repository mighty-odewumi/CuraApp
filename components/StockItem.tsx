import React from "react"
import { View, Text, Pressable } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface Stock {
  Id: string
  Symbol: string
  Company2: string
  ClosePrice: number
  Change: number
  PercentChange: number
  Volume?: number
  MarketCap?: string
}

interface StockItemProps {
  stock: Stock
  onPress: () => void
  canInvest: boolean
}

export const StockItem: React.FC<StockItemProps> = ({ stock, onPress, canInvest }) => {
  // Safe number parsing with fallbacks
  const closePrice = typeof stock.ClosePrice === "number" ? stock.ClosePrice : 0
  const change = typeof stock.Change === "number" ? stock.Change : 0
  const percentChange = typeof stock.PercentChange === "number" ? stock.PercentChange : 0
  const volume = typeof stock.Volume === "number" ? stock.Volume : 0

  const isPositive = change >= 0
  const changeColor = isPositive ? "text-green-600" : "text-red-600"
  const changeBgColor = isPositive ? "bg-green-50" : "bg-red-50"

  return (
    <Pressable
      onPress={onPress}
      className={`bg-white border border-gray-200 rounded-xl p-4 mb-3 ${
        canInvest ? "active:bg-gray-50" : "opacity-60"
      }`}
      disabled={!canInvest}
    >
      <View className="flex-row items-center justify-between">
        {/* Stock Info */}
        <View className="flex-1 mr-4">
          <View className="flex-row items-center mb-1">
            <Text className="text-lg font-bold text-gray-900 mr-2">{stock.Symbol || "N/A"}</Text>
            {!canInvest && <Ionicons name="lock-closed" size={16} color="#9CA3AF" />}
          </View>
          <Text className="text-sm text-gray-600 mb-1" numberOfLines={1}>
            {stock.Company2 || "Unknown Company"}
          </Text>
          {volume > 0 && <Text className="text-xs text-gray-500">Vol: {volume.toLocaleString()}</Text>}
        </View>

        {/* Price Info */}
        <View className="items-end">
          <Text className="text-lg font-bold text-gray-900 mb-1">₦{closePrice.toFixed(2)}</Text>

          <View className={`px-2 py-1 rounded-full ${changeBgColor}`}>
            <View className="flex-row items-center">
              <Ionicons
                name={isPositive ? "trending-up" : "trending-down"}
                size={12}
                color={isPositive ? "#059669" : "#DC2626"}
              />
              <Text className={`text-xs font-medium ml-1 ${changeColor}`}>
                {isPositive ? "+" : ""}₦{change.toFixed(2)}
              </Text>
            </View>
          </View>

          <Text className={`text-xs font-medium mt-1 ${changeColor}`}>
            ({isPositive ? "+" : ""}
            {percentChange.toFixed(2)}%)
          </Text>
        </View>
      </View>

      {/* Buy Indicator */}
      {canInvest && (
        <View className="flex-row items-center justify-center mt-3 pt-3 border-t border-gray-100">
          <Ionicons name="add-circle-outline" size={16} color="#1877F2" />
          <Text className="text-primary-600 text-sm font-medium ml-1">Tap to Buy</Text>
        </View>
      )}
    </Pressable>
  )
}
