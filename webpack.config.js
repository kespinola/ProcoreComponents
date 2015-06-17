var webpack = require('webpack');
var config = require('./config');

module.exports = {
  output: {
    library: 'ProcoreComponents',
    libraryTarget: 'umd'
  },

  externals: [
    {
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      }
    }
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  resolve: {
    extensions: ["", ".js"]
  },

  // plugins: [
  //  new webpack.optimize.UglifyJsPlugin({
  //    compressor: { warnings: false }
  //  })
  // ]
};
