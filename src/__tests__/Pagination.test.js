import React from 'react';
import { shallow } from 'enzyme';

import Pagination from '../Pagination';

const onPageNavigate = jest.fn();

function setup() {
  const props = {
    data: [],
    keyName: 'pagination-keyname',
    currentPage: 1,
    onPageNavigate,
    rowsPerPage: 5
  };

  const enzymeWrapper = shallow(<Pagination {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Pagination component (src/Pagination)', () => {
  it('should match normal snapshot', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should have the same props before and after render', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper.prop('data')).toEqual([]);
    expect(enzymeWrapper.prop('keyName')).toBe('pagination-keyname');
    expect(enzymeWrapper.prop('currentPage')).toBe(1);
    expect(enzymeWrapper.prop('rowsPerPage')).toBe(5);
    expect(enzymeWrapper.prop('onPageNavigate')).toBe(onPageNavigate);
  });
});
