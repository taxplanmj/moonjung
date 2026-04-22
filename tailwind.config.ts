import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

const config: Config = {
    content: [
        './app/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './lib/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1B2A4A',
                    50: '#E8EDF5',
                    100: '#D1DBEB',
                    200: '#A3B7D7',
                    300: '#7593C3',
                    400: '#476FAF',
                    500: '#1B2A4A',
                    600: '#16223B',
                    700: '#111A2D',
                    800: '#0C111E',
                    900: '#07090F',
                },
                accent: {
                    DEFAULT: '#FF6B35',
                    50: '#FFF0E9',
                    100: '#FFE1D3',
                    200: '#FFC3A7',
                    300: '#FFA57B',
                    400: '#FF884F',
                    500: '#FF6B35',
                    600: '#E55520',
                    700: '#B8431A',
                    800: '#8B3313',
                    900: '#5E220D',
                },
                surface: {
                    DEFAULT: '#FFFFFF',
                    50: '#FAFBFC',
                    100: '#F4F6F8',
                    200: '#E9ECF0',
                    300: '#D1D5DB',
                },
                muted: {
                    DEFAULT: '#6B7280',
                    foreground: '#9CA3AF',
                },
            },
            fontFamily: {
                sans: ['var(--font-noto-sans-kr)', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                DEFAULT: '0.5rem',
                lg: '0.75rem',
                xl: '1rem',
                '2xl': '1.5rem',
            },
            boxShadow: {
                'card': '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.08)',
                'card-hover': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
                'glow': '0 0 20px rgba(255, 107, 53, 0.3)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'count-up': 'countUp 2s ease-out',
                'pulse-soft': 'pulseSoft 2s infinite',
                'marquee': 'marquee 40s linear infinite',
                'marquee-reverse': 'marqueeReverse 35s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.8' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                marqueeReverse: {
                    '0%': { transform: 'translateX(-50%)' },
                    '100%': { transform: 'translateX(0%)' },
                },
            },
        },
    },
    plugins: [forms],
};

export default config;
