const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  important: true,
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
    'libs/**/*.{html,ts,css,scss}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        card: 'repeat(auto-fill, minmax(220px, 1fr))',
      },
    },
  },
  plugins: [],
};
