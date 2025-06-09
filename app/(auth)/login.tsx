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

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuthStore();
  
  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      router.replace('/(tabs)/index');
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
            <View className="mb-12">
              <Text className="text-gray-900 text-3xl font-bold mb-2">
                Welcome Back
              </Text>
              <Text className="text-gray-600 text-lg">
                Sign in to continue your financial journey
              </Text>
            </View>

            {/* Form */}
            <View className="space-y-4">
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
                        placeholder="Enter your password"
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
                {errors.password && (
                  <Text className="text-error-500 text-sm mt-1">
                    {errors.password.message}
                  </Text>
                )}
              </View>

              <Pressable className="self-end">
                <Text className="text-primary-500 font-medium">
                  Forgot Password?
                </Text>
              </Pressable>
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
                {loading ? 'Signing In...' : 'Sign In'}
              </Text>
            </Pressable>

            {/* Register Link */}
            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-600">Don&apos;t have an account? </Text>
              <Pressable onPress={() => router.replace('/(auth)/register')}>
                <Text className="text-primary-500 font-medium">Sign Up</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
}