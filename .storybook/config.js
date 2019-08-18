import { configure } from '@storybook/react';

import './addons';

import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/scss/font-awesome.scss';
// Base styles.
import '../dist/styles.scss';
// Custom SCSS for the stories.
import './stories.scss';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
