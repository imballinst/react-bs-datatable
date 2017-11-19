import React from 'react';
import { shallow } from 'enzyme';

import PaginationOpts from '../PaginationOpts';

const onRowsPerPageChange = jest.fn(val => expect(val).toBe(10));

function setup() {
  const props = {
    keyName: 'test-keyname',
    labels: {},
    onRowsPerPageChange,
    rowsPerPageOption: [5, 10, 15, 20],
    rowsPerPage: 5,
  };

  const enzymeWrapper = shallow(
    <PaginationOpts {...props} />,
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe('PaginationOpts component (src/PaginationOpts)', () => {
  it('should match normal snapshot', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should have the same props before and after render', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper.instance().props.keyName).toBe('test-keyname');
    expect(enzymeWrapper.instance().props.labels).toEqual({});
    expect(enzymeWrapper.instance().props.rowsPerPage).toBe(5);
    expect(enzymeWrapper.instance().props.rowsPerPageOption).toEqual([5, 10, 15, 20]);
    expect(enzymeWrapper.instance().props.onRowsPerPageChange).toBe(onRowsPerPageChange);
  });

  it('should call onRowsPerPageChange on change', () => {
    const { props, enzymeWrapper } = setup();

    const selectOption = enzymeWrapper.find('[name="form-control-pagination"]');

    selectOption.simulate('change', {
      target: { value: 10 },
    });
  });
});
