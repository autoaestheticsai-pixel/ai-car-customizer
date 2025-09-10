/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0A0A0A',
          mid: '#2E2E2E',
          metal: '#A7A9AC',
          blue: '#1E3A8A',
          blueGlow: '#3B82F6',
          white: '#FFFFFF',
          silver: '#C0C0C0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0_0_40px_rgba(30,58,138,0.25)',
        'glow-sm': '0_0_20px_rgba(30,58,138,0.15)',
        'glow-lg': '0_0_60px_rgba(30,58,138,0.35)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'nebula': 'nebula 30s ease-in-out infinite',
        'nebula-delayed': 'nebula 45s ease-in-out infinite 15s',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%': { boxShadow: '0_0_20px_rgba(30,58,138,0.15)' },
          '100%': { boxShadow: '0_0_40px_rgba(30,58,138,0.35)' },
        },
        nebula: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(30px, -30px) scale(1.1)' },
          '50%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '75%': { transform: 'translate(20px, 10px) scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
