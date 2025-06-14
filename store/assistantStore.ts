import { create } from "zustand"

export interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  type?: "text" | "suggestion" | "insight"
}

export interface FinancialInsight {
  id: string
  title: string
  description: string
  category: "spending" | "saving" | "investing" | "budgeting"
  priority: "high" | "medium" | "low"
  actionable: boolean
}

interface AssistantState {
  messages: Message[]
  insights: FinancialInsight[]
  isTyping: boolean
  quickSuggestions: string[]
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void
  sendMessage: (text: string) => Promise<void>
  generateInsights: () => void
  clearChat: () => void
}

export const useAssistantStore = create<AssistantState>((set, get) => ({
  messages: [
    {
      id: "1",
      text: "Hi! I'm your AI financial coach. I'm here to help you make better financial decisions. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
      type: "text",
    },
  ],
  insights: [],
  isTyping: false,
  quickSuggestions: [
    "How can I save more money?",
    "What should I invest in?",
    "Help me create a budget",
    "Analyze my spending patterns",
  ],

  addMessage: (message) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    }
    set((state) => ({
      messages: [...state.messages, newMessage],
    }))
  },

  sendMessage: async (text: string) => {
    const { addMessage } = get()

    // Add user message
    addMessage({ text, isUser: true })

    // Set typing indicator
    set({ isTyping: true })

    // Simulate AI response (replace with actual AI API call)
    setTimeout(() => {
      const responses = [
        "That's a great question! Based on your spending patterns, I'd recommend focusing on reducing your dining out expenses by 20%. This could save you about ₦15,000 monthly.",
        "I've analyzed your financial data. You're doing well with savings! Consider investing 30% of your monthly surplus in low-risk index funds.",
        "Let me help you create a budget. Based on your income, I suggest the 50/30/20 rule: 50% needs, 30% wants, 20% savings and investments.",
        "Your spending analysis shows you spend most on transportation and food. Here are some tips to optimize these categories...",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      addMessage({
        text: randomResponse,
        isUser: false,
        type: "text",
      })

      set({ isTyping: false })
    }, 2000)
  },

  generateInsights: () => {
    const sampleInsights: FinancialInsight[] = [
      {
        id: "1",
        title: "High Dining Expenses",
        description: "You spent 25% more on dining out this month compared to last month.",
        category: "spending",
        priority: "high",
        actionable: true,
      },
      {
        id: "2",
        title: "Savings Goal Progress",
        description: "You're 80% towards your monthly savings goal. Great job!",
        category: "saving",
        priority: "medium",
        actionable: false,
      },
      {
        id: "3",
        title: "Investment Opportunity",
        description: "Consider diversifying your portfolio with some tech stocks.",
        category: "investing",
        priority: "medium",
        actionable: true,
      },
    ]

    set({ insights: sampleInsights })
  },

  clearChat: () => {
    set({
      messages: [
        {
          id: "1",
          text: "Hi! I'm your AI financial coach. I'm here to help you make better financial decisions. How can I assist you today?",
          isUser: false,
          timestamp: new Date(),
          type: "text",
        },
      ],
    })
  },
}))
