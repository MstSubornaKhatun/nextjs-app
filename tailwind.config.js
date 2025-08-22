/** @type {import('tailwindcss').Config} */
module.exports = {
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
          DEFAULT: '#9b27ce',
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#9b27ce',
          600: '#8b1fab',
          700: '#7c1d8a',
          800: '#6b1969',
          900: '#581747',
        },
        secondary: {
          DEFAULT: '#f5dcff',
          50: '#fefcff',
          100: '#f5dcff',
          200: '#edc4fe',
          300: '#e3a6fc',
          400: '#d788f9',
          500: '#c969f5',
          600: '#b84bef',
          700: '#a435e7',
          800: '#8e26d4',
          900: '#7519b8',
        },
        accent: {
          DEFAULT: '#ad3bff',
          50: '#fbf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#ad3bff',
          600: '#9a29f0',
          700: '#8719e0',
          800: '#7210c4',
          900: '#5e0ca1',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}