const common = require(`./webpack.common.js`);
const merge = require(`webpack-merge`);

const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);

module.exports = merge(common, {
  mode: `production`,

  output: {
    filename: `js/${common.externals.webpackConfig.fs.jsFilename}.[hash].js`,
    chunkFilename: `js/[name].[chunkhash].js`,
    publicPath: `/wp-content/themes/${common.externals.webpackConfig.wordpress.themeName}/dist/`
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `./css/${common.externals.webpackConfig.fs.cssFilename}.[hash].css`
    })
  ],

  module: {
    rules: [{
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        `style-loader`,
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
    }, {
      test: /\.(jpg|jpeg|gif|png|svg|ttf|eot|woff|woff2)$/,
      use: {
        loader: `file-loader`,
        options: {
          name: `[name].[ext]`,
          outputPath: `./css/assets/`,
          publicPath: `./assets/`
        }
      }
    }]
  }
});
