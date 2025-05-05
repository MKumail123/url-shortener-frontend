module.exports = {
    theme: {
        extend: {
          colors: {
            dark: {
                900: '#0A0F1C',
                800: '#0D1219',
                700: '#1A1F2C',
              }
          }
        }
      },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
}