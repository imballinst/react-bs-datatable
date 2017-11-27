import React from 'react';
import { shallow } from 'enzyme';

import {
  FormGroup,
  FormControl,
  InputGroup,
  Button,
} from 'react-bootstrap';

import Filter from '../Filter';
import FontAwesome from '../modules/FontAwesome';

const onChangeFilter = jest.fn();

function setup() {
  const props = {
    keyName: 'test-keyname',
    onChangeFilter,
    filterText: 'old-test-filter',
    tableHeader: [
      { prop: 'prop', filterable: true },
    ],
  };

  const enzymeWrapper = shallow(
    <Filter {...props} />,
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe('Filter component (src/Filter)', () => {
  it('should match normal snapshot', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should render self and subcomponents', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper.instance().props.filterText).toBe('old-test-filter');
    expect(enzymeWrapper.instance().props.keyName).toBe('test-keyname');

    expect(enzymeWrapper.find(FormGroup).props().controlId).toBe('select-filter-test-keyname');
    expect(Object.keys(enzymeWrapper.find(FormGroup).props()).length).toBe(3);
    expect(enzymeWrapper.find(FormGroup).length).toBe(1);

    expect(enzymeWrapper.find(InputGroup).length).toBe(1);

    expect(enzymeWrapper.find(FormControl).props().type).toBe('text');
    expect(enzymeWrapper.find(FormControl).props().value).toBe('old-test-filter');
    expect(enzymeWrapper.find(FormControl).props().placeholder).toBe('Enter text');
    expect(typeof enzymeWrapper.find(FormControl).props().onChange).toBe('function');
    expect(enzymeWrapper.find(FormControl).length).toBe(1);

    expect(enzymeWrapper.find(InputGroup.Button).length).toBe(1);

    expect(typeof enzymeWrapper.find(Button).props().onClick).toBe('function');
    expect(enzymeWrapper.find(Button).length).toBe(1);

    expect(enzymeWrapper.find(FontAwesome).props().icon).toBe('times');
    expect(enzymeWrapper.find(FontAwesome).props().additionalClass).toBe('fa-fw');
    expect(enzymeWrapper.find(FontAwesome).length).toBe(1);
  });

  it('should have the same props before and after render', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper.instance().props.keyName).toBe('test-keyname');
    expect(enzymeWrapper.instance().props.tableHeader).toEqual([
      { prop: 'prop', filterable: true },
    ]);
    expect(enzymeWrapper.instance().props.filterText).toBe('old-test-filter');
    expect(enzymeWrapper.instance().props.onChangeFilter).toBe(onChangeFilter);
  });

  it('should trigger onClearFilter', () => {
    const { props, enzymeWrapper } = setup();

    const value = '';
    enzymeWrapper.find(Button).simulate('click', {
      preventDefault: jest.fn(),
    });

    expect(props.onChangeFilter).toBeCalledWith(value);
    expect(props.onChangeFilter.mock.calls.length).toBe(1);
  });

  it('should trigger onInputChange with a certain value', () => {
    const { props, enzymeWrapper } = setup();

    const value = 'asd';
    enzymeWrapper.find(FormControl).simulate('change', {
      target: { value },
    });

    expect(props.onChangeFilter).toBeCalledWith(value);
    expect(props.onChangeFilter.mock.calls.length).toBe(2);
  });
});
