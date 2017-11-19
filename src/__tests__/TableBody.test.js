import React from 'react';
import { shallow } from 'enzyme';

import TableBody from '../TableBody';

function setup() {
  const props = {
    paginatedData: [],
    keyName: 'pagination-keyname',
    tableHeader: [],
    labels: {},
  };

  const enzymeWrapper = shallow(
    <TableBody {...props} />,
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe('TableBody component (src/TableBody)', () => {
  it('should match normal snapshot', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should have the same props before and after render', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper.instance().props.paginatedData).toEqual([]);
    expect(enzymeWrapper.instance().props.keyName).toBe('pagination-keyname');
    expect(enzymeWrapper.instance().props.tableHeader).toEqual([]);
    expect(enzymeWrapper.instance().props.labels).toEqual({});
  });
});
