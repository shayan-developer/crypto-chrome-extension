/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'vazir': ['Vazir', 'sans-serif'],
        'vazir-light': ['Vazir', 'sans-serif'],
        'vazir-regular': ['Vazir', 'sans-serif'],
        'vazir-medium': ['Vazir', 'sans-serif'],
        'vazir-semibold': ['Vazir', 'sans-serif'],
        'vazir-bold': ['Vazir', 'sans-serif'],
      },
      fontWeight: {
        'vazir-light': '300',
        'vazir-regular': '400',
        'vazir-medium': '500',
        'vazir-semibold': '600',
        'vazir-bold': '700',
      },
    },
  },
  plugins: [],
}

