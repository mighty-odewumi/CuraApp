import React, { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useAssistantStore } from "@/store/assistantStore"
import { LinearGradient } from "expo-linear-gradient"

export default function AssistantScreen() {
  const [inputText, setInputText] = useState("")
  const scrollViewRef = useRef<ScrollView>(null)
  const { messages, insights, isTyping, quickSuggestions, sendMessage, generateInsights, clearChat } =
    useAssistantStore()

  useEffect(() => {
    generateInsights()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      await sendMessage(inputText.trim())
      setInputText("")
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true })
      }, 100)
    }
  }

  const handleQuickSuggestion = (suggestion: string) => {
    sendMessage(suggestion)
  }

  const renderMessage = (message: any) => (
    <View key={message.id} className={`mb-4 ${message.isUser ? "items-end" : "items-start"}`}>
      <View className={`max-w-[80%] p-3 rounded-2xl ${message.isUser ? "bg-primary-500" : "bg-gray-100"}`}>
        <Text className={`${message.isUser ? "text-white" : "text-gray-800"}`}>{message.text}</Text>
      </View>
      <Text className="text-xs text-gray-500 mt-1">
        {message.timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </View>
  )

  const renderInsightCard = (insight: any) => (
    <TouchableOpacity key={insight.id} className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="font-semibold text-gray-800 flex-1">{insight.title}</Text>
        <View
          className={`px-2 py-1 rounded-full ${
            insight.priority === "high"
              ? "bg-red-100"
              : insight.priority === "medium"
                ? "bg-yellow-100"
                : "bg-green-100"
          }`}
        >
          <Text
            className={`text-xs font-medium ${
              insight.priority === "high"
                ? "text-red-600"
                : insight.priority === "medium"
                  ? "text-yellow-600"
                  : "text-green-600"
            }`}
          >
            {insight.priority.toUpperCase()}
          </Text>
        </View>
      </View>
      <Text className="text-gray-600 text-sm mb-2">{insight.description}</Text>
      {insight.actionable && (
        <TouchableOpacity className="bg-primary-50 px-3 py-2 rounded-lg self-start">
          <Text className="text-primary-600 text-sm font-medium">Take Action</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  )

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : "height"}>
        {/* Header */}
        <LinearGradient colors={["#1877F2", "#1565C0"]} className="px-5 py-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-white text-xl font-bold">AI Assistant</Text>
              <Text style={{ color: "rgba(255, 255, 255, 0.8)" }} className="text-sm">
                Your personal financial coach
              </Text>
            </View>
            <TouchableOpacity onPress={clearChat} className="bg-white/20 p-2 rounded-full">
              <Ionicons name="refresh" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Insights Section */}
        {insights.length > 0 && (
          <View className="px-5 py-4">
            <Text className="text-lg font-semibold text-gray-800 mb-3">Financial Insights</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row">{insights.map(renderInsightCard)}</View>
            </ScrollView>
          </View>
        )}

        {/* Chat Messages */}
        <ScrollView ref={scrollViewRef} className="flex-1 px-5" showsVerticalScrollIndicator={false}>
          {messages.map(renderMessage)}

          {isTyping && (
            <View className="items-start mb-4">
              <View className="bg-gray-100 p-3 rounded-2xl">
                <ActivityIndicator size="small" color="#1877F2" />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Quick Suggestions */}
        {messages.length <= 1 && (
          <View className="px-5 py-3">
            <Text className="text-sm font-medium text-gray-600 mb-2">Quick suggestions:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row">
                {quickSuggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleQuickSuggestion(suggestion)}
                    className="bg-white border border-gray-200 px-4 py-2 rounded-full mr-2"
                  >
                    <Text className="text-gray-700 text-sm">{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {/* Input Section */}
        <View className="px-5 py-4 bg-white border-t border-gray-200">
          <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask me anything about your finances..."
              className="flex-1 text-gray-800"
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className={`ml-2 p-2 rounded-full ${inputText.trim() && !isTyping ? "bg-primary-500" : "bg-gray-300"}`}
            >
              <Ionicons name="send" size={16} color={inputText.trim() && !isTyping ? "white" : "gray"} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
