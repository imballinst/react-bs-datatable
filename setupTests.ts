import { setGlobalConfig } from '@storybook/testing-react';
import '@testing-library/jest-dom';

// Storybook's preview file location
import * as globalStorybookConfig from './.storybook/preview';

window.alert = () => {};
console.warn = () => {};
console.debug = () => {};

setGlobalConfig(globalStorybookConfig);
