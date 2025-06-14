import React, { useEffect } from "react"
import { View, Text, TouchableOpacity, Alert, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useProfileStore } from "@/store/profileStore"
import { useAuthStore } from "@/store/authStore"

export default function ProfileScreen() {
  const { profile, loading, fetchProfile } = useProfileStore()
  const { signOut } = useAuthStore()

  useEffect(() => {
    fetchProfile()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleImagePicker = async () => {
    // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    // if (status !== "granted") {
    //   Alert.alert("Permission needed", "Please grant camera roll permissions")
    //   return
    // }

    // const result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [1, 1],
    //   quality: 0.8,
    // })

    // if (!result.canceled && result.assets[0]) {
    //   await uploadAvatar(result.assets[0].uri)
    // }

    Alert.alert("Coming soon");
  }

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", style: "destructive", onPress: signOut },
    ])
  }

  if (loading && !profile) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
        <Text className="text-gray-600">Loading profile...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-center items-center px-8">
        {/* Avatar */}
        <TouchableOpacity onPress={handleImagePicker} className="relative mb-8">
          <View className="w-32 h-32 rounded-full bg-primary-100 items-center justify-center border-4 border-white shadow-lg">
            {profile?.avatar_url ? (
              <Image source={{ uri: profile.avatar_url }} className="w-32 h-32 rounded-full" />
            ) : (
              <Ionicons name="person" size={60} color="#1877F2" />
            )}
          </View>
          <View className="absolute -bottom-2 -right-2 bg-primary-500 p-3 rounded-full shadow-lg">
            <Ionicons name="camera" size={20} color="white" />
          </View>
        </TouchableOpacity>

        {/* User Info */}
        <View className="items-center mb-12">
          <Text className="text-2xl font-bold text-gray-800 mb-2">{profile?.full_name || "User"}</Text>
          <Text className="text-gray-600 text-base">{profile?.email}</Text>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity onPress={handleSignOut} className="bg-red-500 px-8 py-4 rounded-xl shadow-lg w-full max-w-xs">
          <View className="flex-row items-center justify-center">
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text className="text-white font-semibold text-base ml-2">Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
