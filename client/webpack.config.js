var webpack = require('webpack');
var path = require('path');


module.exports = {
  context: path.join(__dirname),
  devtool: 'eval',
  entry: ['./src/App.js'],
  output: {
    path: path.resolve('./build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devserver: {
    inline: true,
    port:3000
  },
  plugins: [
      new webpack.ProvidePlugin({
          d3: 'd3'

      })
   ],
  
  module: {
    loaders: [
      {
        test:/\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query:{
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}