// Webpack config
const webpack = require('webpack');
const path = require('path');

const resourcePath = path.join(__dirname, './src');
const buildPath = path.join(__dirname, './dist');

const libraryName = 'react-bs-datatable';

const plugins = [];
const loaders = [
  {
    test: /\.(jsx|js)$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
      babelrc: false,
      presets: [
        ['env', { modules: false }],
        'react',
        'stage-2',
      ]
    }
  },
];

// Environment settings
plugins.push(
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new webpack.optimize.UglifyJsPlugin()
);

// Configuration
module.exports = {
  devtool: 'cheap-source-map',
  context: resourcePath,
  entry: {
    index: './Table.js'
  },
  output: {
    path: buildPath + '/',
    filename: libraryName + '.min.js',
    library: libraryName,
    libraryTarget: 'umd'
  },
  // Ignore these vendor libraries from being bundled in dist/
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
