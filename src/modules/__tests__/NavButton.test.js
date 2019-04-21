import React from 'react';
import { shallow } from 'enzyme';

import NavButton from '../NavButton';

function setup() {
  const props = {
    pageNavNumber: 5,
    disabled: false,
    onPageNavigate: jest.fn(val => expect(val).toBe(5)),
    label: 'test-label'
  };

  const enzymeWrapper = shallow(<NavButton {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('NavButton component (src/modules/NavButton)', () => {
  it('should match normal snapshot', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should have the same props before and after render', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper.prop('children')).toBe('test-label');
    expect(enzymeWrapper.prop('onClick')).toBe(undefined);
    expect(enzymeWrapper.prop('disabled')).toBe(false);
  });

  // FIXME: this test is broken.
  // it('should call the jest mock function onPageNavigate', () => {
  //   const { props, enzymeWrapper } = setup();

  //   expect(enzymeWrapper.prop('onPageNavigate').mock.calls.length).toBe(1);
  // });
});
