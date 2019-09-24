const autoprefixer = require(`autoprefixer`);
const cssnano = require(`cssnano`);
const purgecss = require(`@fullhuman/postcss-purgecss`);
const tailwindcss = require(`tailwindcss`);

module.exports = {
  plugins: [
    tailwindcss(`./tailwind.js`),
    cssnano({
      preset: `default`
    }),
    purgecss({
      content: [`**/*.php`]
    }),
    autoprefixer
  ]
};