module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
    './index.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        'custom-light': ['FontLight', 'sans-serif'],
        'custom-bold': ['FontBold', 'sans-serif'],
        'custom-medium': ['FontMedium', 'sans-serif'],
        'custom-thin': ['FontThin', 'sans-serif'],
      },
      backgroundColor: {
        'custom-bg': '#1B1C21', // Replace with your desired background color
      },
    },
  },
  plugins: [],
};


