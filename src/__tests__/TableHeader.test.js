import React from 'react';
import { shallow } from 'enzyme';

import TableHeader from '../TableHeader';

const onSortChange = jest.fn();

function setup() {
  const props = {
    tableHeader: [],
    keyName: 'test-keyname',
    sortedProp: { prop: 'test-prop', isAscending: true },
    onSortChange,
  };

  const enzymeWrapper = shallow(
    <TableHeader {...props} />,
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe('TableHeader component (src/TableHeader)', () => {
  it('should match normal snapshot', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should have the same props before and after render', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper.instance().props.tableHeader).toEqual([]);
    expect(enzymeWrapper.instance().props.keyName).toBe('test-keyname');
    expect(enzymeWrapper.instance().props.sortedProp).toEqual({ prop: 'test-prop', isAscending: true });
    expect(enzymeWrapper.instance().props.onSortChange).toBe(onSortChange);
  });
});
