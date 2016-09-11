const webpack = require('webpack');
const path = require('path');

let server = 'http://localhost';
if (process.env.HOST_SERVER && process.env.HOST_SERVER !== '') {
  server = process.env.HOST_SERVER;
}

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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'HOST_SERVER': JSON.stringify(server),
        'HOST_MODE': JSON.stringify(process.env.HOST_MODE),
      },
    }),
  ],
};
