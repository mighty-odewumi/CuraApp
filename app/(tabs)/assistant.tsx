import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function Assistant() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! I'm your financial assistant. How can I help you today?", isUser: false }
  ]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput('');
      
      // Placeholder for AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "This is a placeholder response. The AI assistant will be integrated here.", 
          isUser: false 
        }]);
      }, 1000);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="p-4 border-b border-border">
        <Text className="text-foreground text-xl font-bold">Financial Assistant</Text>
      </View>

      <ScrollView 
        className="flex-1 px-4 pt-4"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {messages.map((message, index) => (
          <View 
            key={index} 
            className={`mb-4 max-w-[80%] p-3 rounded-xl ${
              message.isUser ? 
                'bg-primary self-end rounded-tr-none' : 
                'bg-muted self-start rounded-tl-none'
            }`}
          >
            <Text className={message.isUser ? "text-primary-foreground" : "text-foreground"}>
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View className="p-4 border-t border-border flex-row items-center">
        <TextInput
          className="flex-1 bg-muted p-3 rounded-xl text-foreground"
          placeholder="Ask a financial question..."
          placeholderTextColor="#666"
          value={input}
          onChangeText={setInput}
          multiline
        />
        <TouchableOpacity 
          onPress={handleSend} 
          className="ml-2 bg-primary h-12 w-12 rounded-full items-center justify-center"
        >
          <MaterialIcons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}