import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': '#050d1a',
        'bg-surface': '#0a1628',
        'bg-card': '#111d2e',
        'accent-cyan': '#00e5ff',
        'accent-purple': '#7c3aed',
        'accent-orange': '#ff6b35',
        'accent-green': '#22c55e',
      },
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
        exo2: ['var(--font-exo2)', 'sans-serif'],
        jetbrains: ['var(--font-jetbrains)', 'monospace'],
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.7', filter: 'brightness(1.5)' },
        },
        'circuit-draw': {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'counter-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'circuit-draw': 'circuit-draw 5s linear forwards',
        float: 'float 4s ease-in-out infinite',
        'scan-line': 'scan-line 8s linear infinite',
        'counter-up': 'counter-up 0.5s ease-out forwards',
      },
      boxShadow: {
        'neon-cyan': '0 0 10px #00e5ff, 0 0 20px #00e5ff',
        'neon-purple': '0 0 10px #7c3aed, 0 0 20px #7c3aed',
        'neon-orange': '0 0 10px #ff6b35, 0 0 20px #ff6b35',
      },
    },
  },
  plugins: [],
};

export default config;
