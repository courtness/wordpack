const common = require(`./webpack.common.js`);
const merge = require(`webpack-merge`);

const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);

module.exports = merge(common, {
  mode: `production`,

  output: {
    filename: `js/${common.externals.webpackConfig.fs.jsFilename}.[hash].js`,
    chunkFilename: `js/[chunkhash].js`,
    publicPath: `/${common.externals.webpackConfig.wordpress.stagingPrefix}/wp-content/themes/${common.externals.webpackConfig.wordpress.themeName}/dist/`
  },

  plugins: [
    new HtmlWebpackPlugin({
      chunks: `css`,
      excludeChunks: `js`,
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
        removeComments: true
      },
      inject: false,
      hash: true,
      template: `src/ejs/css.ejs`,
      filename: `php/css.php`
    }),
    new MiniCssExtractPlugin({
      filename: `css/${common.externals.webpackConfig.fs.cssFilename}.[hash].css`,
      chunkFilename: `css/[name].[chunkhash].css`
    })
  ],

  module: {
    rules: [{
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        MiniCssExtractPlugin.loader,
        `css-loader`,
        {
          loader: `postcss-loader`,
          options: {
            config: {
              path: `./config/postcss.config.js`
            }
          }
        },
        `sass-loader`
      ]
    }]
  }
});
