import React from 'react';
import { shallow } from 'enzyme';

import TableBody from '../TableBody';

function setup() {
  const props = {
    data: [],
    keyName: 'pagination-keyname',
    tableHeader: [],
    labels: {}
  };

  const enzymeWrapper = shallow(<TableBody {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('TableBody component (src/TableBody)', () => {
  it('should match normal snapshot', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should have the same props before and after render', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper.prop('className')).toBe('tbody-default');
  });
});
