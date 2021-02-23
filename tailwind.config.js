module.exports = {

  purge: {
    enabled: true,
    layers: ['components', 'utilities'],
    content: [
      "./pages/**/*.js",
      "./pages/**/*.ts",
      "./pages/**/*.jsx",
      "./pages/**/*.tsx",
      "./components/**/*.js",
      "./components/**/*.ts",
      "./components/**/*.jsx",
      "./components/**/*.tsx"
    ],
  },

  darkMode: false, // or 'media' or 'class'

  theme: {
    extend: {
      borderWidth: {
        '3': '3px',
        '5': '5px',
        '6': '6px',
      },
      borderRadius: {
        'lg-custom': '1.125rem'
      },
      boxShadow: {
        'xl-custom': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        'lg-custom': '0 19px 37px -9px rgba(0, 0, 0, 0.5)'
      },
      colors: {
        'g': 'rgb(93, 198, 93)',
        'r': 'rgb(202, 88, 88)',
        'y': 'rgb(221, 221, 115)',
        'b': 'rgb(87, 87, 199)',
        'lightest': 'rgb(248, 241, 232)',
        'lighter': 'rgb(210, 199, 183)',
        'darkest': 'rgb(13, 22, 43)',
      },
      height: {
        '18': '4.5rem',
        '54': '13.5rem',
      },
      margin: {
        '15': '3.75rem',
      },
      padding: {
        '0.75': '0.1875rem',
        '2.25': '0.5625rem',
      },
      transitionDuration: {
        '0': '0ms',
      },
      width: {
        '18': '4.5rem',
        '54': '13.5rem',
      },
    },
  },

  variants: {
    extend: {
      borderColor: ['focus-visible'],
      opacity: ['disabled'],
    },
  },

  plugins: [],
}
