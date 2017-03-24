// Webpack config
const webpack = require('webpack');
const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const resourcePath = path.join(__dirname, './src');
const buildPath = path.join(__dirname, './dist');

const libraryName = 'react-bs-datatable';

// Common plugins
const plugins = [
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
  })
];

const loaders = [
  {
    test: /\.(jsx|js)$/,
    loader: 'babel-loader',
    exclude: /node_modules/
  }
];

// Environment settings
if (isProd) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false
      },
    })
  );
}

// Configuration
module.exports = {
  devtool: isProd ? 'cheap-source-map' : 'eval',
  context: resourcePath,
  entry: {
    index: './index.js'
  },
  output: {
    path: buildPath + '/',
    filename: isProd ? libraryName + '.min.js' : libraryName + '.js',
    library: libraryName,
    libraryTarget: 'umd'
  },
  externals: ['react', 'react-dom', 'react-bootstrap'],
  module: {
    loaders: loaders
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      resourcePath,
      path.resolve(__dirname, 'node_modules')
    ]
  },
  plugins
};
