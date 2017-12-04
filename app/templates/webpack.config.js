const path = require("path");
const webpack = require('webpack')
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const env = require("./env.js");

const PRODUCTION_MODE = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    app: [
      "./src/js/app.js",
      "./src/css/app.scss"      
    ]
  },
  output: {
    filename: `masterpage/${env.appFolder}/js/[name].bundle.js`,
    path: path.resolve(__dirname, `dist/_catalogs/`)
  },
  /**
   * Use source-map to create source maps during development builds
   */
  devtool: PRODUCTION_MODE ? false : "source-map",
  module: {
    rules: [
      /**
       * Compile Sass stylesheets to CSS using sass-loader and css-loader
       */
      {
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: !PRODUCTION_MODE
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: !PRODUCTION_MODE
              }
            }
          ]
        })
      },

    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: "src/*.dwp",
        to: "wp/[name].[ext]"
      },
      {
        from: "src/*.webpart",
        to: "wp/[name].[ext]"
      },
      {
        from: "src/*.aspx",
        to: "masterpage/${env.appFolder}/[name].[ext]"
      },
      {
        from: "src/*.master",
        to: "masterpage/${env.appFolder}/[name].[ext]"
      }
    ]),
    new ExtractTextPlugin({
      // define where to save the file
      filename: `masterpage/${env.appFolder}/css/[name].bundle.css`,
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: PRODUCTION_MODE
    })
  ]
};
