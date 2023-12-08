/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xl': {'min': '1060px'},
      'lg': {'min': '1060px', 'max': '1290px'},
      'md': {'min': '668px', 'max': '1060px'},
      'sm' : {'max': '667px'},
      'ft' :{ 'max': '820px'}
    },
    extend: {
      fontFamily: {
        pacifico: ["var(--font-pacifico)", "cursive"],
        roboto: [
          "var(--font-roboto)",
          "sans-serif",
          "ui-sans-serif",
          "system-ui",
        ],
      },
      maxWidth: {
        "5xl": "1030px",
      },
      fontSize: {
        titleLarge: ["1.375rem", { lineHeight: "28px" }],
        headlineLarge: ["2rem", { lineHeight: "40px" }],
        headlineMedium: ["1.75rem", { lineHeight: "26px" }],
        headlineSmall: ["1.5rem", { lineHeight: "32px" }],
      },
      colors: {
        'purple-10':'#240754',
        'purple-9': '#34126F',
        'purple-7' : '#51279B',
        'purple-5': "#724BB7",
        'purple-4': '#8662C7',
        'purple-2': '#CFBCF2',
        'purple-1': '#EAE2F8',
        'text-color': '#1D192B',
        'text-color-2': '20324c',
        'place-holder-color': '#49454F',
        'neutral-100': '#f1f5f880',
        'purple-opacity-20': '#e8def833'
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
