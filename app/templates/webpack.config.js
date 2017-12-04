const path = require('path');
const env = require('env');

module.exports = {
  entry: {
    app: [
      './resources/js/app.js',
      './resources/scss/app.css'
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, `dist/_catalogs/masterpage/${env.appFolder}/js`)
  }
};