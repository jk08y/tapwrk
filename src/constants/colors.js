// path: src/constants/colors.js
// Exporting colors for usage in JS/Canvas/Charts where Tailwind classes aren't enough
export const COLORS = {
  ios: {
    blue: '#007AFF',
    green: '#34C759',
    indigo: '#5856D6',
    gray: '#8E8E93',
    light: '#F2F2F7',
    dark: '#000000',
    cardLight: '#FFFFFF',
    cardDark: '#1C1C1E',
    bgLight: '#F5F5F7',
    bgDark: '#000000',
  }
};

export const CHART_COLORS = {
  primary: COLORS.ios.blue,
  secondary: COLORS.ios.indigo,
  success: COLORS.ios.green,
  background: COLORS.ios.light,
};