const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config.module.rules.push(
    {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../')
    },
    {
      test: /\.tsx?$/,
      loader: {
        loader: 'ts-loader',
        options: {
          configFile: '../tsconfig.json'
        }
      },
      exclude: /node_modules/
    }
  );

  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre'
  });

  config.resolve.alias = {
    '@material-ui/core': '@material-ui/core/esm',
    '@material-ui/icons': '@material-ui/icons/esm',
    '@material-ui/styles': '@material-ui/styles/esm',
    '@material-ui/system': '@material-ui/system/esm',
    '@material-ui/utils': '@material-ui/utils/esm'
  };

  config.resolve.extensions.push('.ts', '.tsx');

  // Return the altered config
  return config;
};
