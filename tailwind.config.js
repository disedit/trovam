/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'storyblok/**/**.vue'
  ],
  theme: {
    colors: {
      'red': '#e0602e',
      'blue': '#3f85c1',
      'yellow': '#fad414',
      'green': '#099e76',
      'orange': '#e17625',
      'pink': '#e3aaca',
      'black': '#1e1e1e',
      'white': '#f7eee8',
      'gray': '#71717a',
    },
    fontFamily: {
      sans: ['Agrandir', 'sans-serif'],
      headline: ['Agrandir-WideLight', 'sans-serif'],
    },
  },
  plugins: [],
}

