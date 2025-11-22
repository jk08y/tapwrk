// path: tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // improved font stack for cross-platform premium feel
        sans: [
          'Inter', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          '"San Francisco"', 
          '"Helvetica Neue"', 
          'sans-serif'
        ],
      },
      colors: {
        ios: {
          blue: '#007AFF', // Classic iOS Blue
          green: '#34C759',
          indigo: '#5856D6',
          gray: '#8E8E93',
          light: '#F2F2F7', // System Gray 6 Light
          dark: '#000000',  // Deep Black for OLED feel
          cardLight: '#FFFFFF',
          cardDark: '#1C1C1E',
          bgLight: '#F5F5F7',
          bgDark: '#000000',
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-sm': '0 4px 16px 0 rgba(31, 38, 135, 0.07)',
        'ios-float': '0 20px 40px -5px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(0, 122, 255, 0.3)',
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.03)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-up': 'float-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
      },
      keyframes: {
        'float-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}