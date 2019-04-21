import React from 'react';
import { shallow } from 'enzyme';

import BodyRow from '../BodyRow';

function setup() {
  const props = {
    data: [
      {
        prop1: 123
      }
    ],
    keyName: 'pagination-keyname',
    tableHeader: [
      {
        prop: 'prop1'
      }
    ],
    rowIdx: 0
  };

  const enzymeWrapper = shallow(<BodyRow {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('BodyRow component (src/BodyRow)', () => {
  it('should match normal snapshot', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should render a table row', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper.prop('className')).toEqual('tbody-tr-default');
    expect(enzymeWrapper.prop('children').length).toEqual(1);
  });
});
