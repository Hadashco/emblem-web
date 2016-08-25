const webpack = require('webpack');
const path = require('path');


module.exports = {
  context: path.join(__dirname),
  devtool: 'eval',
  entry: ['./src/App.js'],
  output: {
    path: path.resolve('./build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devserver: {
    inline: true,
    port: 3000,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
};
