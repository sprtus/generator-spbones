const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// Get environment mode
const ENV_MODE = process.env.NODE_ENV;

// Get project directory name
const PROJECT = path.basename(path.resolve(__dirname));

// Init Sass stylesheet extraction
const extractSass = new ExtractTextPlugin({
  filename: '../css/[name].css',
});

// Get entry files
const app = [];
const entries = require('./entry');
entries.forEach((entry, i) => {
  if (entry.indexOf('*') > -1) glob.sync(entry).forEach(file => app.push(file));
  else app.push(entry);
});

module.exports = {
  entry: {
    app,
  },

  output: {
    path: path.resolve(__dirname, `dist/_catalogs/masterpage/${PROJECT}/js`),
    filename: 'app.js',
  },

  devtool: ENV_MODE === 'production' ? false : 'source-map',

  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },

      // Sass
      {
        test: /\.s[ac]ss$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: ENV_MODE === 'production' ? true : false,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: ENV_MODE === 'production' ? true : false,
              },
            },
          ],
        }),
      },

      // Images
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/,
        exclude: /fonts\//,
        loader: 'file-loader',
        options: {
          name: '../images/[name].[ext]',
        },
      },

      // Fonts
      {
        test: /fonts\/.*\.(eot|ttf|woff2?|svg)([\?#].*)?$/,
        loader: 'file-loader',
        options: {
          name: '../fonts/[name].[ext]',
        },
      },

      // Templates
      {
        test: /\.(master|aspx|html)$/,
        loader: 'file-loader',
        options: {
          name: '../[name].[ext]',
        },
      },

      // Web parts
      {
        test: /\.(dwp|webpart)$/,
        loader: 'file-loader',
        options: {
          name: '../../../wp/[name].[ext]',
        },
      },
    ],
  },

  plugins: [
    extractSass,
  ],
};
