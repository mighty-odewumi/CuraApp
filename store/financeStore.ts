// src/store/financeStore.ts
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
}

interface FinanceState {
  weeklyProfit: number;
  totalIncome: number;
  totalExpenses: number;
  recentTransactions: Transaction[];
  investmentProgress: {
    target: number;
    saved: number;
    percentage: number;
  };
  loading: boolean;
  hasData: boolean;
  fetchFinancialData: (userId: string) => Promise<void>;
}

export const useFinanceStore = create<FinanceState>((set) => ({
  weeklyProfit: 0,
  totalIncome: 0,
  totalExpenses: 0,
  recentTransactions: [],
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
      const { data: transactions } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false })
        .limit(5);

      if (transactions && transactions.length > 0) {
        const income = transactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
        
        const expenses = transactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);
        
        set({
          recentTransactions: transactions,
          totalIncome: income,
          totalExpenses: expenses,
          weeklyProfit: income - expenses,
          hasData: true,
          loading: false
        });
      } else {
        set({
          recentTransactions: [],
          totalIncome: 0,
          totalExpenses: 0,
          weeklyProfit: 0,
          hasData: false,
          loading: false
        });
      }
    } catch (error) {
      console.error('Error fetching financial data:', error);
      set({ loading: false, hasData: false });
    }
  },
}));