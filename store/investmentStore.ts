import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { stocksApi, type Stock } from "@/lib/stocksApi"
import { supabase } from "@/lib/supabase"

interface Portfolio {
  id: string
  user_id: string
  symbol: string
  company_name: string
  shares: number
  purchase_price: number
  current_price: number
  total_value: number
  profit_loss: number
  profit_loss_percent: number
  purchase_date: string
}

interface InvestmentState {
  stocks: Stock[]
  portfolio: Portfolio[]
  virtualBalance: number
  totalInvested: number
  totalCurrentValue: number
  totalProfit: number
  loading: boolean
  lastUpdated: string | null
  canInvest: boolean

  // Actions
  fetchStocks: () => Promise<void>
  fetchPortfolio: (userId: string) => Promise<void>
  buyStock: (userId: string, stock: Stock, shares: number) => Promise<void>
  updateVirtualBalance: (balance: number) => void
  setCanInvest: (canInvest: boolean) => void
  calculatePortfolioMetrics: () => void
}

export const useInvestmentStore = create<InvestmentState>()(
  persist(
    (set, get) => ({
      stocks: [],
      portfolio: [],
      virtualBalance: 0,
      totalInvested: 0,
      totalCurrentValue: 0,
      totalProfit: 0,
      loading: false,
      lastUpdated: null,
      canInvest: false,

      fetchStocks: async () => {
        set({ loading: true })
        try {
          const { stocks, lastUpdated } = await stocksApi.getTopGainers()
          set({
            stocks,
            lastUpdated,
            loading: false,
          })
        } catch (error) {
          console.error("Error fetching stocks:", error)
          set({ loading: false })
        }
      },

      fetchPortfolio: async (userId) => {
        try {
          const { data: portfolio, error } = await supabase
            .from("portfolio")
            .select("*")
            .eq("user_id", userId)
            .order("purchase_date", { ascending: false })

          if (error) throw error

          if (portfolio) {
            set({ portfolio })
            get().calculatePortfolioMetrics()
          }
        } catch (error) {
          console.error("Error fetching portfolio:", error)
        }
      },

      calculatePortfolioMetrics: () => {
        const { portfolio } = get()

        const totalInvested = portfolio.reduce((sum, item) => sum + item.shares * item.purchase_price, 0)
        const totalCurrentValue = portfolio.reduce((sum, item) => sum + item.total_value, 0)
        const totalProfit = totalCurrentValue - totalInvested

        set({
          totalInvested,
          totalCurrentValue,
          totalProfit,
        })
      },

      buyStock: async (userId, stock, shares) => {
        const state = get()
        const totalCost = stock.ClosePrice * shares

        if (totalCost > state.virtualBalance) {
          throw new Error("Insufficient virtual balance")
        }

        try {
          const { error } = await supabase.from("portfolio").insert([
            {
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
            },
          ])

          if (error) throw error

          // Update virtual balance
          set({ virtualBalance: state.virtualBalance - totalCost })

          // Refresh portfolio
          await get().fetchPortfolio(userId)
        } catch (error) {
          console.error("Error buying stock:", error)
          throw error
        }
      },

      updateVirtualBalance: (balance) => {
        set({ virtualBalance: balance })
      },

      setCanInvest: (canInvest) => {
        set({ canInvest })
      },
    }),
    {
      name: "investment-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
