/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lab: {
          void: '#030712',
          deep: '#0a0f1a',
          panel: '#0f1729',
          glass: '#141f35',
          border: '#1e3a5f',
          cyan: '#22d3ee',
          green: '#4ade80',
          amber: '#fbbf24',
          magenta: '#e879f9',
          plasma: '#818cf8',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Consolas', 'monospace'],
        body: ['Exo 2', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'orbit': 'orbit 20s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'data-stream': 'dataStream 2s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(34, 211, 238, 0.6), 0 0 80px rgba(129, 140, 248, 0.2)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(140px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(140px) rotate(-360deg)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        dataStream: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 200%' },
        },
      },
    },
  },
  plugins: [],
};
