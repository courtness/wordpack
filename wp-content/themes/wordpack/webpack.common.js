const config = require(`./config/webpack.config.js`);

const path = require(`path`);
const webpack = require(`webpack`);

const CleanWebpackPlugin = require(`clean-webpack-plugin`);
const PhpManifestPlugin = require(`webpack-php-manifest`);

module.exports = {
  externals: {
    webpackConfig: config
  },

  output: {
    path: path.resolve(__dirname, `dist`),
  },

  plugins: [
    new CleanWebpackPlugin([`dist`]),
    new PhpManifestPlugin({
      path: `/wp-content/themes/${config.wordpress.themeName}/dist/`
    })
  ],

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: `babel-loader`
      }
    }]
  }
};
