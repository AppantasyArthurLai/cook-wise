module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom palette
        'culinary-dark': '#2A303C',
        'culinary-light': '#F8F9FA',
        'culinary-accent': '#E67E22',
        'culinary-accent-dark': '#D35400',
        'herb-green': '#2ECC71',
        'herb-green-dark': '#27AE60',
        'spice-red': '#E74C3C',
        'cream': '#ECF0F1',
        'salt': '#F5F5F5',
        'pepper': '#333333',
        // 保留 DaisyUI 主題顏色，但以 Tailwind 原生方式定義
        'primary': '#E67E22',
        'primary-focus': '#D35400',
        'secondary': '#2ECC71',
        'secondary-focus': '#27AE60',
        'accent': '#3498DB',
        'accent-focus': '#2980B9',
        'error': '#F87272',
        'success': '#36D399',
        'warning': '#FBBD23',
        'info': '#3ABFF8',
      },
    },
  },
  plugins: [],
};
