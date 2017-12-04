const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const env = require('./env.js');

module.exports = {
  entry: {
    app: [
      './src/js/app.js'//:'./dist/somewhere,
    //  './src/js/app.css'      
    ]
  },
  output: {
    filename: `masterpage/${env.appFolder}/js/[name].js`,
    path: path.resolve(__dirname, `dist/catalogs/`)
  },
  module: {
      loaders: [
          { test: /\.[s]css$/, loader: "style!css" }
      ]
  }, 
  plugins: [
    new CopyWebpackPlugin([
        { 
          from: 'src/*.dwp', 
          to: 'wp/[name].[ext]'
        },{ 
          from: 'src/*.webpart', 
          to: 'wp/[name].[ext]'
        },
        { 
          from: 'src/*.aspx', 
          to: 'masterpage/${env.appFolder}/[name].[ext]'
        },{ 
          from: 'src/*.master', 
          to: 'masterpage/${env.appFolder}/[name].[ext]'
        },
    ])
  ]
};