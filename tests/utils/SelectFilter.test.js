import React from 'react';
import { shallow } from 'enzyme';

import SelectFilter from '../../src/utils/SelectFilter';

function setup() {
  const props = {
    filterText: 'abc',
    onFilterMultiselect: jest.fn()
  };

  const enzymeWrapper = shallow(
    <SelectFilter {...props} />
  );

  return {
    props,
    enzymeWrapper
  };
}

describe('SelectFilter component (js/component/SelectFilter)', () => {
  it ('should render self and subcomponents', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper.instance().props.filterText).toBe(props.filterText);
    expect(enzymeWrapper.instance().props.onFilterMultiselect).toBe(props.onFilterMultiselect);
  });
});
