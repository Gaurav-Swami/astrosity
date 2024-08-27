/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primaryBg: "#121212",
        secondaryBg: "#1e1e1e",
        primaryText: "#E0E0E0",
        secondaryText: "#B0B0B0",
        accent: "#BB86FC",
        secondaryAccent: "#03DAC6",
        error: "#CF6679",

        // Light mode colors
        lightPrimaryBg: "#F0F0F0", // Light background color
        lightSecondaryBg: "#FFFFFF", // White background for contrast
        lightPrimaryText: "#333333", // Dark text for readability
        lightSecondaryText: "#666666", // Medium dark text for secondary information
        lightAccent: "#6D28D9", // Primary accent color for light theme
        lightSecondaryAccent: "#03DAC6", // Secondary accent color (same as dark for consistency)
        lightError: "#B00020", // Error color for light theme

        // Additional complementary colors
        neutralGray: "#B0B0B0", // Neutral gray for both themes
        success: "#4CAF50", // Success message color
        warning: "#FFC107", // Warning message color
        info: "#2196F3", // Information message color
      },
    },
  },
  plugins: [],
};
