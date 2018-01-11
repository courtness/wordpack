var webpack = require("webpack");
var path = require("path");

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    "app": "./src/js/index.js",
    "app.min": "./src/js/index.js"
  },

  output: {
    path: __dirname + "/dist/js",
    filename: "[name].js"
  },

  plugins: [
    // js
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    }),

    // css
    new ExtractTextPlugin({
      filename: "../css/[name].css"
    }),
  ],

  module: {
    rules: [
      // js
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env"],
            plugins: ["babel-plugin-transform-class-properties"]
          }
        },
      },

      // scss
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true,
                discardComments: {
                  removeAll: true
                }
              }
            }, {
              loader: "postcss-loader",
              options: {
                plugins: function() {
                  return [
                    require("postcss-import"),
                    require("autoprefixer")
                  ];
                }
              }
            }, {
              loader: "sass-loader"
            }
          ]
        })
      },

      // fonts
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: "file-loader",
          query: {
            name: "../../fonts/[name].[ext]"
          }
        }
      }
    ]
  },
}
