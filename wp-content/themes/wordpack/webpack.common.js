const config = require(`./webpack.config.js`);

const path = require(`path`);
const webpack = require(`webpack`);

const CleanWebpackPlugin = require(`clean-webpack-plugin`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);

module.exports = {
  externals: {
    webpackConfig: config
  },

  output: {
    path: path.resolve(__dirname, `dist`)
  },

  plugins: [
    new CleanWebpackPlugin([`dist`]),
    new HtmlWebpackPlugin({
      chunks: `js`,
      excludeChunks: `css`,
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
        removeComments: true
      },
      inject: false,
      hash: true,
      template: `src/ejs/js.ejs`,
      filename: `php/js.php`
    })
  ],

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: `babel-loader`
      }
    }, {
      test: /\.(jpg|jpeg|gif|png|svg|ttf|eot|woff|woff2)$/,
      use: {
        loader: `file-loader`
      }
    }]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: `vendors`,
          chunks: `all`
        },
        styles: {
          name: `styles`,
          test: /\.css$/,
          chunks: `all`,
          enforce: true
        }
      }
    }
  }
};
