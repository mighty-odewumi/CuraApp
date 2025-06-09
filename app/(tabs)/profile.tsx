import React from "react";
import { ScrollView, View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="items-center pt-8 pb-6 bg-[#4A55A2]/10">
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
            className="w-24 h-24 rounded-full mb-4"
          />
          <Text className="text-2xl font-bold text-[#4A55A2]">John Doe</Text>
          <Text className="text-gray-500">Patient ID: #12345</Text>
        </View>
        
        <View className="p-4">
          <Text className="text-lg font-semibold mb-4 text-[#4A55A2]">Personal Information</Text>
          <View className="flex-row items-center mb-3">
            <Ionicons name="calendar-outline" size={20} color="#4A55A2" />
            <Text className="ml-3 text-gray-700">Date of Birth: 15/05/1985</Text>
          </View>
          <View className="flex-row items-center mb-3">
            <Ionicons name="call-outline" size={20} color="#4A55A2" />
            <Text className="ml-3 text-gray-700">Phone: +1 234 567 8900</Text>
          </View>
          <View className="flex-row items-center mb-3">
            <Ionicons name="mail-outline" size={20} color="#4A55A2" />
            <Text className="ml-3 text-gray-700">Email: johndoe@example.com</Text>
          </View>
          <View className="flex-row items-center mb-3">
            <Ionicons name="location-outline" size={20} color="#4A55A2" />
            <Text className="ml-3 text-gray-700">Address: 123 Main St, City</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}