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
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        recipeTheme: {
          "primary": "#E67E22",          // Vibrant orange for primary actions
          "primary-focus": "#D35400",    // Darker orange for hover states
          "primary-content": "#ffffff",  // White text on primary buttons
          
          "secondary": "#2ECC71",        // Fresh green as secondary color
          "secondary-focus": "#27AE60",  // Darker green for hover states
          "secondary-content": "#ffffff",// White text on secondary buttons
          
          "accent": "#3498DB",           // Blue accent for highlights
          "accent-focus": "#2980B9",     // Darker blue for hover states
          "accent-content": "#ffffff",   // White text on accent elements
          
          "neutral": "#2A303C",          // Dark slate for neutral elements
          "neutral-focus": "#222831",    // Darker slate for hover states
          "neutral-content": "#ffffff",  // White text on neutral backgrounds
          
          "base-100": "#F8F9FA",         // Light background
          "base-200": "#ECF0F1",         // Slightly darker background for contrast
          "base-300": "#E2E8F0",         // Even darker background for more contrast
          "base-content": "#1E293B",     // Dark text on light backgrounds
          
          "info": "#3ABFF8",             // Blue for informational messages
          "success": "#36D399",          // Green for success messages
          "warning": "#FBBD23",          // Yellow for warning messages
          "error": "#F87272",            // Red for error messages
        },
      },
      "light",
    ],
    darkTheme: "recipeTheme",
  },
};
