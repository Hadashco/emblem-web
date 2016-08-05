var webpack = require('webpack');


module.exports = {
  entry: './src/App.js',
  output: {
    path: './client/build/',
    filename: 'bundle.js'
  },
  devserver: {
    inline: true,
    port:3000
  },
  
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
  },
  plugins: [
      new webpack.ProvidePlugin({
          d3: 'd3',
          $: 'jquery'

      })
   ]
}