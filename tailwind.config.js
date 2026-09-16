/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/app/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        pokemon: {
          red: '#EF4444',
          blue: '#3B82F6',
          yellow: '#FACC15',
          gold: '#FFD700',
        },
      },
      fontFamily: {
        rounded: ['SF Pro Rounded', 'Hiragino Maru Gothic ProN', 'Meiryo', 'MS PGothic', 'sans-serif'],
        display: ['Spline Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '40px',
        '5xl': '50px',
      },
    },
  },
  plugins: [],
}
