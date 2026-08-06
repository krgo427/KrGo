/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:   '#00AEEF', // Light cyan blue
        secondary: '#0b1120',
        accent:    '#00AEEF',
        bg:        '#F8FAFC',
        blue: {
          50: '#E5F7FD',
          100: '#CCEFFC',
          200: '#99DFF9',
          300: '#66CFF5',
          400: '#33BFF2',
          500: '#00AEEF',
          600: '#008BBF',
          700: '#00688F',
          800: '#00455F',
          900: '#002230',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
