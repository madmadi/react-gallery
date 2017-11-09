const webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  entry: './client.js',
  output: {
    path: __dirname + '/public',
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /(node_modules)/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ mangle: true, sourcemap: true }),
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ],
};