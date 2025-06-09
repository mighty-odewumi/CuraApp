// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        primary: {
          50: '#EBF4FF',
          100: '#D6E8FF',
          200: '#B3D4FF',
          300: '#80B8FF',
          400: '#4D94FF',
          500: '#1877F2', // Main brand color
          600: '#1565C0',
          700: '#1250A3',
          800: '#0F3F7A',
          900: '#0D2F5C',
        },
        
        // Success Colors (Income)
        success: {
          50: '#E8F5E8',
          100: '#D1EBD1',
          200: '#A3D7A3',
          300: '#75C375',
          400: '#4CAF50',
          500: '#3D8C40',
          600: '#2E6930',
          700: '#1F4620',
          800: '#0F2310',
          900: '#051105',
        },
        
        // Error Colors (Expenses)
        error: {
          50: '#FFEBEE',
          100: '#FFCDD2',
          200: '#EF9A9A',
          300: '#E57373',
          400: '#EF5350',
          500: '#F44336',
          600: '#E53935',
          700: '#D32F2F',
          800: '#C62828',
          900: '#B71C1C',
        },
        
        // Warning Colors
        warning: {
          50: '#FFF8E1',
          100: '#FFECB3',
          200: '#FFE082',
          300: '#FFD54F',
          400: '#FFCA28',
          500: '#FFC107',
          600: '#FFB300',
          700: '#FFA000',
          800: '#FF8F00',
          900: '#FF6F00',
        },
        
        // Empty State Colors
        empty: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
        },
      },
    },
  },
  plugins: [],
}