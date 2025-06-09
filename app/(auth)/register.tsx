import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/store/authStore';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuthStore();
  
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    try {
      await signUp(data.email, data.password, data.fullName);
      Alert.alert(
        'Account Created',
        'Please check your email to verify your account',
        [{ text: 'OK', onPress: () => router.replace('/(auth)/login') }]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 bg-white">
        <KeyboardAwareScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          extraScrollHeight={20}
        >
          <View className="flex-1 px-5 pt-8">
            {/* Header */}
            <View className="mb-8">
              <Text className="text-gray-900 text-3xl font-bold mb-2">
                Create Account
              </Text>
              <Text className="text-gray-600 text-lg">
                Start your financial journey with Cura
              </Text>
            </View>

            {/* Form */}
            <View className="space-y-4">
              <View className='mb-4'>
                <Text className="text-gray-700 text-sm font-medium mb-2">
                  Full Name
                </Text>
                <Controller
                  control={control}
                  name="fullName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className={`flex-row items-center border rounded-xl px-4 py-3 ${
                      errors.fullName ? 'border-error-500' : 'border-gray-200'
                    }`}>
                      <Ionicons name="person-outline" size={20} color="#6B7280" />
                      <TextInput
                        className="flex-1 ml-2 text-base"
                        placeholder="Enter your full name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        returnKeyType="next"
                      />
                    </View>
                  )}
                />
                {errors.fullName && (
                  <Text className="text-error-500 text-sm mt-1">
                    {errors.fullName.message}
                  </Text>
                )}
              </View>

              <View className='mb-4'>
                <Text className="text-gray-700 text-sm font-medium mb-2">
                  Email
                </Text>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className={`flex-row items-center border rounded-xl px-4 py-3 ${
                      errors.email ? 'border-error-500' : 'border-gray-200'
                    }`}>
                      <Ionicons name="mail-outline" size={20} color="#6B7280" />
                      <TextInput
                        className="flex-1 ml-2 text-base"
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        returnKeyType="next"
                      />
                    </View>
                  )}
                />
                {errors.email && (
                  <Text className="text-error-500 text-sm mt-1">
                    {errors.email.message}
                  </Text>
                )}
              </View>

              <View className='mb-4'>
                <Text className="text-gray-700 text-sm font-medium mb-2">
                  Password
                </Text>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className={`flex-row items-center border rounded-xl px-4 py-3 ${
                      errors.password ? 'border-error-500' : 'border-gray-200'
                    }`}>
                      <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
                      <TextInput
                        className="flex-1 ml-2 text-base"
                        placeholder="Create a password"
                        secureTextEntry
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        returnKeyType="next"
                      />
                    </View>
                  )}
                />
                {errors.password && (
                  <Text className="text-error-500 text-sm mt-1">
                    {errors.password.message}
                  </Text>
                )}
              </View>

              <View className='mb-4'>
                <Text className="text-gray-700 text-sm font-medium mb-2">
                  Confirm Password
                </Text>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className={`flex-row items-center border rounded-xl px-4 py-3 ${
                      errors.confirmPassword ? 'border-error-500' : 'border-gray-200'
                    }`}>
                      <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
                      <TextInput
                        className="flex-1 ml-2 text-base"
                        placeholder="Confirm your password"
                        secureTextEntry
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        returnKeyType="done"
                        onSubmitEditing={handleSubmit(onSubmit)}
                      />
                    </View>
                  )}
                />
                {errors.confirmPassword && (
                  <Text className="text-error-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </View>
            </View>

            {/* Submit Button */}
            <Pressable
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
              className={`mt-8 rounded-xl py-4 items-center ${
                loading ? 'bg-primary-300' : 'bg-primary-500 active:bg-primary-600'
              }`}
            >
              <Text className="text-white text-base font-semibold">
                {loading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </Pressable>

            {/* Login Link */}
            <View className="flex-row justify-center mt-6 mb-8">
              <Text className="text-gray-600">Already have an account? </Text>
              <Pressable onPress={() => router.replace('/(auth)/login')}>
                <Text className="text-primary-500 font-medium">Sign In</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
}