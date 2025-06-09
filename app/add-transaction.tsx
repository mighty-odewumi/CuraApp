import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { router, useLocalSearchParams } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/store/authStore';
import { useFinanceStore } from '@/store/financeStore';

const transactionSchema = z.object({
  name: z.string().min(1, 'Transaction name is required'),
  amount: z.string().min(1, 'Amount is required').refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Amount must be a valid positive number',
  }),
  description: z.string().optional(),
});

type TransactionForm = z.infer<typeof transactionSchema>;

const incomeCategories = [
  { id: 'salary', name: 'Salary', icon: 'briefcase' },
  { id: 'freelance', name: 'Freelance', icon: 'laptop' },
  { id: 'business', name: 'Business', icon: 'storefront' },
  { id: 'investment', name: 'Investment', icon: 'trending-up' },
  { id: 'gift', name: 'Gift', icon: 'gift' },
  { id: 'other', name: 'Other', icon: 'ellipsis-horizontal' },
];

const expenseCategories = [
  { id: 'food', name: 'Food & Dining', icon: 'restaurant' },
  { id: 'transport', name: 'Transport', icon: 'car' },
  { id: 'shopping', name: 'Shopping', icon: 'bag' },
  { id: 'entertainment', name: 'Entertainment', icon: 'game-controller' },
  { id: 'bills', name: 'Bills & Utilities', icon: 'receipt' },
  { id: 'health', name: 'Healthcare', icon: 'medical' },
  { id: 'education', name: 'Education', icon: 'school' },
  { id: 'other', name: 'Other', icon: 'ellipsis-horizontal' },
];

export default function AddTransactionScreen() {
  const { type } = useLocalSearchParams<{ type?: 'income' | 'expense' }>();
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>(type || 'expense');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();
  const { addTransaction } = useFinanceStore();

  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<TransactionForm>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      name: '',
      amount: '',
      description: '',
    }
  });

  // Watch form values for debugging
  const watchedValues = watch();
  
  useEffect(() => {
    console.log('Form values:', watchedValues);
    console.log('Selected category:', selectedCategory);
    console.log('Transaction type:', transactionType);
    console.log('User:', user);
  }, [watchedValues, selectedCategory, transactionType, user]);

  const categories = transactionType === 'income' ? incomeCategories : expenseCategories;

  const onSubmit = async (data: TransactionForm) => {
    console.log('Form submitted with data:', data);
    
    if (!selectedCategory) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    setLoading(true);
    try {
      const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
      
      const transactionData = {
        name: data.name.trim(),
        amount: Number(data.amount),
        category: selectedCategoryData?.name || selectedCategory,
        type: transactionType,
        description: data.description?.trim() || '',
        icon: selectedCategoryData?.icon || 'receipt',
        user_id: user.id,
      };

      console.log('Submitting transaction:', transactionData);

      await addTransaction(transactionData);

      Alert.alert(
        'Success',
        `${transactionType === 'income' ? 'Income' : 'Expense'} added successfully!`,
        [{ 
          text: 'OK', 
          onPress: () => {
            reset();
            setSelectedCategory('');
            router.back();
          }
        }]
      );
      
    } catch (error: any) {
      console.error('Transaction submission error:', error);
      Alert.alert('Error', error.message || 'Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  // Reset category when transaction type changes
  useEffect(() => {
    setSelectedCategory('');
  }, [transactionType]);

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
          {/* Header */}
          <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-100">
            <Pressable onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </Pressable>
            <Text className="text-lg font-semibold text-gray-900">
              Add {transactionType === 'income' ? 'Income' : 'Expense'}
            </Text>
            <View className="w-6" />
          </View>

          <ScrollView className="flex-1 px-5 py-6">
            {/* Transaction Type Toggle */}
            <View className="flex-row bg-gray-100 rounded-xl p-1 mb-6">
              <Pressable
                onPress={() => {
                  console.log('Switching to expense');
                  setTransactionType('expense');
                }}
                className={`flex-1 py-3 rounded-lg items-center ${
                  transactionType === 'expense' ? 'bg-white shadow-sm' : ''
                }`}
              >
                <Text className={`font-medium ${
                  transactionType === 'expense' ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  Expense
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  console.log('Switching to income');
                  setTransactionType('income');
                }}
                className={`flex-1 py-3 rounded-lg items-center ${
                  transactionType === 'income' ? 'bg-white shadow-sm' : ''
                }`}
              >
                <Text className={`font-medium ${
                  transactionType === 'income' ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  Income
                </Text>
              </Pressable>
            </View>

            {/* Form */}
            <View className="space-y-6">
              {/* Transaction Name */}
              <View>
                <Text className="text-gray-700 text-sm font-medium mb-2">
                  Transaction Name *
                </Text>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className={`border rounded-xl px-4 py-3 text-base ${
                        errors.name ? 'border-error-500' : 'border-gray-200'
                      }`}
                      placeholder={`Enter ${transactionType} name`}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      returnKeyType="next"
                    />
                  )}
                />
                {errors.name && (
                  <Text className="text-error-500 text-sm mt-1">
                    {errors.name.message}
                  </Text>
                )}
              </View>

              {/* Amount */}
              <View>
                <Text className="text-gray-700 text-sm font-medium mb-2">
                  Amount (₦) *
                </Text>
                <Controller
                  control={control}
                  name="amount"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className={`border rounded-xl px-4 py-3 text-base ${
                        errors.amount ? 'border-error-500' : 'border-gray-200'
                      }`}
                      placeholder="0.00"
                      keyboardType="numeric"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      returnKeyType="next"
                    />
                  )}
                />
                {errors.amount && (
                  <Text className="text-error-500 text-sm mt-1">
                    {errors.amount.message}
                  </Text>
                )}
              </View>

              {/* Category Selection */}
              <View>
                <Text className="text-gray-700 text-sm font-medium mb-3">
                  Category *
                </Text>
                <View className="flex-row flex-wrap gap-3">
                  {categories.map((category) => (
                    <Pressable
                      key={category.id}
                      onPress={() => {
                        console.log('Selected category:', category.id);
                        setSelectedCategory(category.id);
                      }}
                      className={`flex-row items-center px-4 py-3 rounded-xl border ${
                        selectedCategory === category.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <Ionicons
                        name={category.icon as any}
                        size={20}
                        color={selectedCategory === category.id ? '#1877F2' : '#6B7280'}
                      />
                      <Text className={`ml-2 font-medium ${
                        selectedCategory === category.id ? 'text-primary-500' : 'text-gray-700'
                      }`}>
                        {category.name}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                {!selectedCategory && (
                  <Text className="text-gray-500 text-sm mt-2">
                    Please select a category
                  </Text>
                )}
              </View>

              {/* Description (Optional) */}
              <View>
                <Text className="text-gray-700 text-sm font-medium mb-2">
                  Description (Optional)
                </Text>
                <Controller
                  control={control}
                  name="description"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="border border-gray-200 rounded-xl px-4 py-3 text-base"
                      placeholder="Add a note..."
                      multiline
                      numberOfLines={3}
                      textAlignVertical="top"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      returnKeyType="done"
                    />
                  )}
                />
              </View>
            </View>
          </ScrollView>

          {/* Submit Button */}
          <View className="px-5 pb-6 pt-4 border-t border-gray-100">
            <Pressable
              onPress={() => {
                console.log('Submit button pressed');
                handleSubmit(onSubmit)();
              }}
              disabled={loading}
              className={`rounded-xl py-4 items-center ${
                loading ? 'bg-primary-300' : 'bg-primary-500 active:bg-primary-600'
              }`}
            >
              <Text className="text-white text-base font-semibold">
                {loading ? 'Adding...' : `Add ${transactionType === 'income' ? 'Income' : 'Expense'}`}
              </Text>
            </Pressable>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
}