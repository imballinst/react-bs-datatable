const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/Table.js',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              '@babel/preset-react'
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  externals: [
    function(context, request, callback) {
      if (/(react|react-bootstrap)/.test(request)) {
        return callback(null, 'commonjs ' + request);
      }
      callback();
    }
  ]
};
