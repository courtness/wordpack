var webpack = require("webpack");
var path = require("path");

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    "app": ["babel-polyfill", "proxy-polyfill", "./src/js/index.js"],
    "app.min": ["babel-polyfill", "proxy-polyfill", "./src/js/index.js"]
  },

  output: {
    path: __dirname + "/dist/js",
    filename: "[name].js"
  },

  resolve: {
    alias: {
      "assets": path.resolve(__dirname, "assets")
    }
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

      // images
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        use: {
          loader: "url-loader"
        }
      },

      // fonts
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: "url-loader"
        }
      }
    ]
  },
}
