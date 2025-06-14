# Cura - Personal Finance Management & Investment Platform

> **Track your hustle. Unlock your future.**

## 📋 Table of Contents

- [Cura - Personal Finance Management \& Investment Platform](#cura---personal-finance-management--investment-platform)
  - [📋 Table of Contents](#-table-of-contents)
  - [Overview](#overview)
  - [🏆 Key Features](#-key-features)
    - [📊 **Smart Financial Tracking**](#-smart-financial-tracking)
    - [💰 **Gamified Investment System**](#-gamified-investment-system)
    - [🤖 **AI Financial Coach**](#-ai-financial-coach)
    - [🎯 **Goal-Oriented Design**](#-goal-oriented-design)
  - [🚀 Technical Excellence](#-technical-excellence)
    - [**Architecture \& State Management**](#architecture--state-management)
    - [**Backend Integration**](#backend-integration)
    - [**Mobile-First Design**](#mobile-first-design)
  - [📱 Core Screens](#-core-screens)
    - [**Dashboard (Home)**](#dashboard-home)
    - [**Transactions Management**](#transactions-management)
    - [**Investment Platform**](#investment-platform)
    - [**AI Assistant**](#ai-assistant)
  - [🛠 Technology Stack](#-technology-stack)
  - [🔧 Installation \& Setup](#-installation--setup)
  - [📱 Demo Access](#-demo-access)
    - [Prerequisites](#prerequisites)
    - [Quick Start](#quick-start)
    - [Environment Setup](#environment-setup)
  - [📊 Database Schema](#-database-schema)
    - [Users \& Authentication](#users--authentication)
    - [Transactions](#transactions)
    - [Portfolio](#portfolio)
  - [🎯 Unique Value Propositions](#-unique-value-propositions)
    - [**1. Progressive Investment Access**](#1-progressive-investment-access)
    - [**2. Gamified Financial Learning**](#2-gamified-financial-learning)
    - [**3. AI-Powered Insights**](#3-ai-powered-insights)
    - [**4. Virtual Trading Environment**](#4-virtual-trading-environment)
  - [🔐 Security Features](#-security-features)
  - [🚀 Performance Optimizations](#-performance-optimizations)
  - [📈 Scalability Considerations](#-scalability-considerations)
  - [🎨 Design Philosophy](#-design-philosophy)
  - [🏆 Innovation Highlights](#-innovation-highlights)
  - [📞 Support \& Documentation](#-support--documentation)

## Overview

Cura is a comprehensive financial management mobile application built with React Native and Expo, designed to help users track their finances, make informed investment decisions, and achieve their financial goals through AI-powered insights.

## 🏆 Key Features

### 📊 **Smart Financial Tracking**
- Real-time income and expense monitoring
- Comprehensive transaction categorization
- Weekly profit calculations and financial summaries
- Visual progress tracking with interactive charts

### 💰 **Gamified Investment System**
- **Progressive Investment Unlocking**: Users must achieve 100% savings progress to access investment features
- **Virtual Trading**: Practice with real-world stock data using earned virtual balance
- **Real Stock Integration**: Live data from Nigerian Stock Exchange and global markets
- **Portfolio Management**: Track investments, profits, and losses in real-time

### 🤖 **AI Financial Coach**
- Intelligent financial insights and recommendations
- Natural language processing for user queries
- Personalized budgeting advice
- Spending pattern analysis and optimization

### 🎯 **Goal-Oriented Design**
- **Savings Target System**: ₦10,000 default investment unlock threshold
- **Progress Visualization**: Circular progress indicators and achievement tracking
- **Educational Components**: Investment tips and financial literacy content

## 🚀 Technical Excellence

### **Architecture & State Management**
```typescript
// Zustand-based state management for optimal performance
- authStore: User authentication and session management
- financeStore: Transaction tracking and financial calculations
- investmentStore: Stock data and portfolio management
- assistantStore: AI chat functionality and insights
```

### **Backend Integration**
- **Supabase**: PostgreSQL database with real-time capabilities
- **Row Level Security (RLS)**: Secure data isolation per user
- **Real-time Updates**: Live stock prices and portfolio synchronization
- **RESTful API**: Clean data fetching and mutation patterns

### **Mobile-First Design**
- **React Native + Expo**: Cross-platform native performance
- **TypeScript**: Type-safe development for reliability
- **NativeWind**: Tailwind CSS for consistent styling
- **Reanimated**: Smooth animations and transitions

## 📱 Core Screens

### **Dashboard (Home)**
- Weekly profit overview
- Financial summary cards (Income/Expenses/Net Profit)
- Investment progress tracking
- Quick action buttons for adding transactions
- Recent transactions preview

### **Transactions Management**
- Comprehensive transaction history
- Advanced filtering (All/Income/Expense)
- CRUD operations with real-time updates
- Category-based organization
- Pull-to-refresh functionality

### **Investment Platform**
- **Progressive Access**: Locked until savings goal achieved
- **Live Stock Data**: Real-time prices and market information
- **Virtual Trading**: Risk-free investment simulation
- **Portfolio Analytics**: Performance tracking and profit/loss calculations
- **Educational Tooltips**: Investment guidance for beginners

### **AI Assistant**
- Natural language financial coaching
- Contextual insights based on user data
- Quick suggestion prompts
- Real-time chat interface
- Personalized recommendations

## 🛠 Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React Native + Expo | Cross-platform mobile development |
| **Language** | TypeScript | Type safety and developer experience |
| **Styling** | NativeWind (Tailwind CSS) | Consistent, responsive design |
| **State** | Zustand | Lightweight, efficient state management |
| **Backend** | Supabase | Database, authentication, real-time |
| **Navigation** | Expo Router | File-based routing system |
| **Animations** | React Native Reanimated | Smooth, performant animations |

## 🔧 Installation & Setup
Download the APK Build [here](https://drive.google.com/file/d/16sqI_2ZTdnNMrC0Qc9u8Rvxi0m9lFSbK/view?usp=sharing) (for Android devices)

## 📱 Demo Access

1. Sign up with any email
2. A confirmation link is sent to the email
3. Click the link to confirm your email address. (Note: while it will show an error page, the confirmation has been successful).
4. Navigate back to the App 
5. Add income/expense transactions
6. Build savings to unlock investments
7. Explore AI assistant features

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator

### Quick Start
```bash
# Clone the repository
git clone https://github.com/mighty-odewumi/CuraApp.git
cd Cura

# Install dependencies
npm install

# Start the development server
npx expo start

# Run on specific platform
npx expo start --ios      # iOS Simulator
npx expo start --android  # Android Emulator
npx expo start --web      # Web browser
```

### Environment Setup
Create a `.env` file in the root directory:
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
Note: We hardcoded our Supabase secrets because it is Row Level protected and encouraged by the Official Expo docs.

## 📊 Database Schema

### Users & Authentication
- Handled by Supabase Auth
- User metadata storage
- Session management

### Transactions
```sql
transactions (
  id: uuid PRIMARY KEY,
  user_id: uuid REFERENCES auth.users,
  name: text,
  amount: numeric,
  category: text,
  type: 'income' | 'expense',
  date: timestamptz,
  description: text
)
```

### Portfolio
```sql
portfolio (
  id: uuid PRIMARY KEY,
  user_id: uuid REFERENCES auth.users,
  symbol: text,
  company_name: text,
  shares: integer,
  purchase_price: numeric,
  current_price: numeric,
  total_value: numeric,
  profit_loss: numeric,
  purchase_date: timestamptz
)
```

## 🎯 Unique Value Propositions

### **1. Progressive Investment Access**
Unlike traditional apps, Cura requires users to demonstrate financial discipline by achieving savings goals before accessing investment features. This promotes responsible financial behavior.

### **2. Gamified Financial Learning**
The app transforms financial management into an engaging experience with progress tracking, achievement unlocking, and educational components.

### **3. AI-Powered Insights**
Smart analysis of spending patterns with actionable recommendations helps users optimize their financial decisions.

### **4. Virtual Trading Environment**
Users can practice investment strategies with real market data using their earned savings as virtual capital, reducing real-world risk.

## 🔐 Security Features

- **Row Level Security**: Database-level access control
- **Authenticated Routes**: Protected app sections
- **Input Validation**: Zod schema validation
- **Secure Storage**: Expo SecureStore for sensitive data
- **Environment Variables**: Secure API key management

## 🚀 Performance Optimizations

- **Efficient State Management**: Zustand for minimal re-renders
- **Data Caching**: Smart data fetching strategies
- **Lazy Loading**: Component-level code splitting
- **Image Optimization**: Expo Image for efficient media handling
- **Animation Performance**: Native driver animations

## 📈 Scalability Considerations

- **Modular Architecture**: Clean separation of concerns
- **API Abstraction**: Easy backend switching capability
- **Component Reusability**: DRY principle implementation
- **Type Safety**: Comprehensive TypeScript coverage
- **Error Handling**: Robust error boundaries and fallbacks

## 🎨 Design Philosophy

- **Mobile-First**: Optimized for touch interactions
- **Accessibility**: WCAG compliant design patterns
- **Consistency**: Design system implementation
- **Performance**: 60fps animations and smooth scrolling
- **User-Centric**: Intuitive navigation and clear feedback


## 🏆 Innovation Highlights

1. **Behavioral Finance Integration**: Combines psychology with technology
2. **Real Market Data**: Live stock feeds fetched directly from NGX for authentic experience
3. **Progressive Feature Unlocking**: Unique gamification approach
4. **AI Financial Coaching**: Personalized guidance system
5. **Cross-Platform Excellence**: Single codebase, native performance

## 📞 Support & Documentation

- **Code Quality**: ESLint + TypeScript for consistency
- **Component Documentation**: Inline comments and props documentation
- **Error Logging**: Comprehensive error tracking
- **Development Tools**: Expo development tools integration

---

**Built with ❤️ by the Cura Team**

*Cura represents the future of personal finance management - where technology meets financial wellness to create meaningful behavioral change.*
