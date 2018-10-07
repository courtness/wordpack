const common = require(`./webpack.common.js`);
const webpack = require(`webpack`);
const merge = require(`webpack-merge`);

const BrowserSyncPlugin = require(`browser-sync-webpack-plugin`);
const ExtractTextPlugin = require(`extract-text-webpack-plugin`);// TODO : Hot reloads without this, once supported

module.exports = merge(common, {
  mode: `development`,

  output: {
    filename: `js/${common.externals.webpackConfig.fs.jsFilename}.js`,
    chunkFilename: `js/[name].js`,
    publicPath: `/wp-content/themes/${common.externals.webpackConfig.wordpress.themeName}/dist/`
  },

  devServer: {
    compress: true,
    historyApiFallback: true,
    port: common.externals.webpackConfig.browsersync.port,
    proxy: {
      "*": {
        target: common.externals.webpackConfig.browsersync.proxy,
        secure: false
      },
      "/": {
        target: common.externals.webpackConfig.browsersync.proxy,
        secure: false
      }
    }
  },

  devtool: `inline-source-map`,

  plugins: [
    new BrowserSyncPlugin({
      proxy: common.externals.webpackConfig.browsersync.proxy,
      files: [
        `**/*.php`
      ],
      notify: false,
      open: false,
      reloadDelay: 0
    }),
    new ExtractTextPlugin(`./css/${common.externals.webpackConfig.fs.cssFilename}.css`),
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: `style-loader`,
        use: [{
          loader: `css-loader`,
          options: {
            sourceMap: true
          }
        }, {
          loader: `sass-loader`,
          options: {
            sourceMap: true
          }
        }]
      })
    }, {
      test: /\.(jpg|jpeg|gif|png|svg|ttf|eot|woff|woff2)$/,
      use: {
        loader: `file-loader`,
        options: {
          useRelativePath: true,
          name: `[name].[ext]`,
          outputPath: `../`,
        }
      }
    }]
  }
});
