// src/store/financeStore.ts (Updated with better error handling)
import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

interface Transaction {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
  icon: string;
  description?: string;
  user_id: string;
}

interface FinanceState {
  weeklyProfit: number;
  totalIncome: number;
  totalExpenses: number;
  recentTransactions: Transaction[];
  allTransactions: Transaction[];
  investmentProgress: {
    target: number;
    saved: number;
    percentage: number;
  };
  loading: boolean;
  hasData: boolean;
  fetchFinancialData: (userId: string) => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  getTransactionById: (id: string) => Promise<Transaction>;
  deleteTransaction: (id: string) => Promise<void>;
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<void>;
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  weeklyProfit: 0,
  totalIncome: 0,
  totalExpenses: 0,
  recentTransactions: [],
  allTransactions: [],
  investmentProgress: {
    target: 10000,
    saved: 0,
    percentage: 0
  },
  loading: false,
  hasData: false,

  fetchFinancialData: async (userId) => {
    set({ loading: true });
    
    try {
      console.log('Fetching financial data for user:', userId);
      
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Fetched transactions:', transactions);

      if (transactions && transactions.length > 0) {
        const income = transactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + Number(t.amount), 0);
        
        const expenses = transactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + Number(t.amount), 0);

        const weeklyProfit = income - expenses;
        const saved = Math.max(0, weeklyProfit);
        const percentage = Math.min(100, (saved / 10000) * 100);
        
        set({
          allTransactions: transactions,
          recentTransactions: transactions.slice(0, 5),
          totalIncome: income,
          totalExpenses: expenses,
          weeklyProfit,
          investmentProgress: {
            target: 10000,
            saved,
            percentage
          },
          hasData: true,
          loading: false
        });
      } else {
        set({
          allTransactions: [],
          recentTransactions: [],
          totalIncome: 0,
          totalExpenses: 0,
          weeklyProfit: 0,
          investmentProgress: {
            target: 10000,
            saved: 0,
            percentage: 0
          },
          hasData: false,
          loading: false
        });
      }
    } catch (error) {
      console.error('Error fetching financial data:', error);
      set({ loading: false, hasData: false });
      throw error;
    }
  },

  addTransaction: async (transaction) => {
    try {
      console.log('Adding transaction:', transaction);
      
      // Ensure amount is a number
      const transactionData = {
        ...transaction,
        amount: Number(transaction.amount),
        date: new Date().toISOString(),
      };

      console.log('Transaction data to insert:', transactionData);

      const { data, error } = await supabase
        .from('transactions')
        .insert([transactionData])
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }

      console.log('Transaction added successfully:', data);

      // Refresh data after adding
      await get().fetchFinancialData(transaction.user_id);
      
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  },

  getTransactionById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching transaction:', error);
      throw error;
    }
  },

  deleteTransaction: async (id) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Refresh financial data
      const state = get();
      const transaction = state.allTransactions.find(t => t.id === id);
      if (transaction) {
        await state.fetchFinancialData(transaction.user_id);
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  },

  updateTransaction: async (id, updates) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      // Refresh data after updating
      const state = get();
      const transaction = state.allTransactions.find(t => t.id === id);
      if (transaction) {
        await state.fetchFinancialData(transaction.user_id);
      }
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  },
}));