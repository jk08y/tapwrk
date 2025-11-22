/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Placeholder "Premium" Palette - Replace with your Portfolio colors later
        ios: {
          bg: "#F5F5F7",       // Apple Light Grey Background
          surface: "#FFFFFF",  // Pure White
          text: "#1D1D1F",     // Apple Black
          subtext: "#86868B",  // Apple Grey
          blue: "#007AFF",     // System Blue
          green: "#34C759",    // System Green
          divider: "rgba(0,0,0,0.1)",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0,0,0,0.04)',
        'float': '0 20px 40px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}