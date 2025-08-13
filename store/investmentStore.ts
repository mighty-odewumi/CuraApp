import { create } from 'zustand';
import { stocksApi, Stock } from '@/lib/stocksApi';
import { supabase } from '@/lib/supabase';

interface Portfolio {
  id: string;
  user_id: string;
  symbol: string;
  company_name: string;
  shares: number;
  purchase_price: number;
  current_price: number;
  total_value: number;
  profit_loss: number;
  profit_loss_percent: number;
  purchase_date: string;
}

interface InvestmentState {
  stocks: Stock[];
  portfolio: Portfolio[];
  virtualBalance: number;
  totalInvested: number;
  totalProfit: number;
  loading: boolean;
  lastUpdated: string | null;
  canInvest: boolean;
  fetchStocks: () => Promise<void>;
  fetchPortfolio: (userId: string) => Promise<void>;
  buyStock: (userId: string, stock: Stock, shares: number) => Promise<void>;
  sellStock: (userId: string, portfolioId: string, shares: number) => Promise<void>;
  updateVirtualBalance: (balance: number) => void;
  setCanInvest: (canInvest: boolean) => void;
}

export const useInvestmentStore = create<InvestmentState>((set, get) => ({
  stocks: [],
  portfolio: [],
  virtualBalance: 0,
  totalInvested: 0,
  totalProfit: 0,
  loading: false,
  lastUpdated: null,
  canInvest: false,

  fetchStocks: async () => {
    set({ loading: true });
    try {
      const { stocks, lastUpdated } = await stocksApi.getTopGainers();
      set({ 
        stocks, 
        lastUpdated,
        loading: false 
      });
    } catch (error) {
      console.error('Error fetching stocks:', error);
      set({ loading: false });
    }
  },

  fetchPortfolio: async (userId) => {
    try {
      const { data: portfolio, error } = await supabase
        .from('portfolio')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      if (portfolio) {
        const totalInvested = portfolio.reduce((sum, item) => sum + (item.shares * item.purchase_price), 0);
        const totalValue = portfolio.reduce((sum, item) => sum + item.total_value, 0);
        const totalProfit = totalValue - totalInvested;

        set({
          portfolio,
          totalInvested,
          totalProfit,
        });
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    }
  },

  buyStock: async (userId, stock, shares) => {
    const state = get();
    const totalCost = stock.ClosePrice * shares;

    if (totalCost > state.virtualBalance) {
      throw new Error('Insufficient virtual balance');
    }

    try {
      const { error } = await supabase
        .from('portfolio')
        .insert([{
          user_id: userId,
          symbol: stock.Symbol,
          company_name: stock.Company2,
          shares,
          purchase_price: stock.ClosePrice,
          current_price: stock.ClosePrice,
          total_value: totalCost,
          profit_loss: 0,
          profit_loss_percent: 0,
          purchase_date: new Date().toISOString(),
        }]);

      if (error) throw error;

      // Update virtual balance
      set({ virtualBalance: state.virtualBalance - totalCost });
      
      // Refresh portfolio
      await get().fetchPortfolio(userId);
    } catch (error) {
      console.error('Error buying stock:', error);
      throw error;
    }
  },

  sellStock: async (userId, portfolioId, shares) => {
    try {
      const { error } = await supabase
        .from('portfolio')
        .delete()
        .eq('id', portfolioId);

      if (error) throw error;

      // Refresh portfolio
      await get().fetchPortfolio(userId);
    } catch (error) {
      console.error('Error selling stock:', error);
      throw error;
    }
  },

  updateVirtualBalance: (balance) => {
    set({ virtualBalance: balance });
  },

  setCanInvest: (canInvest) => {
    set({ canInvest });
  },
}));
