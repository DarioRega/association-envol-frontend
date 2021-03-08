/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    fontFamily: {
      heading: ['Poppins', 'Helvetica', 'Arial', 'sans-serif'],
      body: ['Nunito', 'Helvetica', 'Arial', 'sans-serif'],
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1300px',
      '2xl': '1440px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        brand: {
          'dark-gray': '#C4C4C4',
          'dark-blue': '#011993',
          'light-blue': '#429CF4',
          'main-gray': '#F4F5F7',
          'middle-gray': '#666',
          carbon: '#333',
          error: '#E60013',
          success: '#18A339',
        },
      },
    },
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: false, // process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
};
