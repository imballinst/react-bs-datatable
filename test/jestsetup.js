import React from 'react';
import { shallow, render, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Set these test-related things global so we don't have to re-import them in every package.
global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;

// Configure Enzyme adapter.
configure({ adapter: new Adapter() });

// Fail tests on any warning
console.error = message => {
  throw new Error(message);
};
