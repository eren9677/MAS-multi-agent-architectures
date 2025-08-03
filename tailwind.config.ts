import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#0a6eff', // RGB(10, 110, 255)
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        light: {
          bg: '#ffffff',
          surface: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0',
          text: '#1e293b',
          'text-secondary': '#64748b',
        },
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
          card: '#334155',
          border: '#475569',
          text: '#f1f5f9',
          'text-secondary': '#94a3b8',
        },
      },
      spacing: {
        '6': '24px',
        '8': '32px',
        '16': '64px',
        '24': '96px',
        '32': '128px',
        '64': '256px',
      },
      animation: {
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'gradient-hover': 'gradient-hover 0.5s ease-in-out',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'gradient-hover': {
          '0%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '100%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
      boxShadow: {
        'soft-hover': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'dark-hover': '0 10px 25px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0a6eff 0%, #3b82f6 50%, #8b5cf6 100%)',
        'gradient-primary-dark': 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 50%, #7c3aed 100%)',
        'gradient-blueish': 'linear-gradient(135deg, #0a6eff 0%, #60a5fa 25%, #3b82f6 50%, #1d4ed8 75%, #1e40af 100%)',
        'gradient-blueish-hover': 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 25%, #3b82f6 50%, #60a5fa 75%, #0a6eff 100%)',
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
      transitionProperty: {
        'all': 'all',
      },
      transitionDuration: {
        '300': '300ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'ease': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config 