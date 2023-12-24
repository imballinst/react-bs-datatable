import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: [
    '../src/__stories__/*.stories.mdx',
    '../src/__stories__/*.stories.@(js|jsx|ts|tsx)'
  ],

  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],

  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },

  typescript: {
    reactDocgen: false
  }
};

export default config;
