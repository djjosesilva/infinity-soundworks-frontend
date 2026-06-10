/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: { DEFAULT: '#131314', dim: '#131314', bright: '#3a393a', deepest: '#0A0A0B', glass: 'rgba(20,20,22,0.7)' },
        primary: { DEFAULT: '#00D1FF', fixed: '#b7eaff', dim: '#4cd6ff', container: '#00d1ff' },
        secondary: { DEFAULT: '#BC13FE', fixed: '#f8d8ff', dim: '#ebb2ff' },
        tertiary: { DEFAULT: '#39FF14', fixed: '#79ff5b' },
        'on-surface': '#e5e2e3',
        'border-glow': 'rgba(0,209,255,0.2)',
        'status-pending': '#636366',
        'status-active': '#00D1FF',
        'status-success': '#39FF14',
        'status-error': '#FF3B30',
        'data-purple': '#BC13FE',
      },
      fontFamily: { sora: ['Sora', 'sans-serif'], inter: ['Inter', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] },
      backdropBlur: { glass: '12px' },
    },
  },
  plugins: [],
};
