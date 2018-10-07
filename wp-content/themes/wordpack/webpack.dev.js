const common = require(`./webpack.common.js`);
const webpack = require(`webpack`);
const merge = require(`webpack-merge`);

const BrowserSyncPlugin = require(`browser-sync-webpack-plugin`);

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
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    rules: [{
      test: /\.(sa|sc|c)ss$/,
      use: [
        `style-loader`,
        `css-loader`,
        {
          loader: `postcss-loader`,
          options: {
            config: {
              path: `./config/postcss.config.js`
            }
          }
        },
        `sass-loader`,
      ],
    }]
  }
});
