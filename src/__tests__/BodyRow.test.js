import React from 'react';
import { shallow } from 'enzyme';

import BodyRow from '../BodyRow';

function setup() {
  const props = {
    data: [],
    keyName: 'pagination-keyname',
    tableHeader: [],
    rowIdx: 1,
  };

  const enzymeWrapper = shallow(
    <BodyRow {...props} />,
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe('BodyRow component (src/BodyRow)', () => {
  it('should match normal snapshot', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should have the same props before and after render', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper.instance().props.data).toEqual([]);
    expect(enzymeWrapper.instance().props.keyName).toBe('pagination-keyname');
    expect(enzymeWrapper.instance().props.tableHeader).toEqual([]);
    expect(enzymeWrapper.instance().props.rowIdx).toBe(1);
  });
});
