/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'pacifico':['var(--font-pacifico)', 'cursive'],
        'roboto': ['var(--font-roboto)', 'sans-serif', 'ui-sans-serif', 'system-ui',]
      },
      maxWidth: {
        "5xl" : '1030px',
      },
     fontSize: {
      titleLarge: ['1.375rem', {
        lineHeight: '28px'
      }]
     },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}