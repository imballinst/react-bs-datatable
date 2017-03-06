import React from 'react';
import { shallow } from 'enzyme';

import Datatable from '../src/index';

function setup() {
  const tableHeader = [
    { title: 'Username', prop: 'userID'  },
    { title: 'Person Name', prop: 'name' },
  ];

  const tableBody = [
    { userID: "i-am-tyler", name: "Tyler Olfson" },
    { userID: "sir-bobby", name: "Bobby Charly" }
  ];

  const props = {
    tableHeader: tableHeader,
    tableBody: tableBody,
    rowsPerPage: 5,
    rowsPerPageOption: [5, 10, 15, 20],
    sortable: true,
    filterable: true,
    initialSort: {
      prop: 'deviceID',
      sortOrder: 'ascending'
    },
    keyName: 'test-table'
  };

  const enzymeWrapper = shallow(
    <Datatable {...props} />
  );

  return {
    props,
    enzymeWrapper
  };
}

describe('Datatable component (js/component/Datatable)', () => {
  it ('should render self and subcomponents', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper.instance().props.tableHeader).toEqual([
      { title: 'Username', prop: 'userID'  },
      { title: 'Person Name', prop: 'name' },
    ]);
    expect(enzymeWrapper.instance().props.tableBody).toEqual([
      { userID: "i-am-tyler", name: "Tyler Olfson" },
      { userID: "sir-bobby", name: "Bobby Charly" }
    ]);
    expect(enzymeWrapper.instance().props.rowsPerPage).toBe(5);
    expect(enzymeWrapper.instance().props.rowsPerPageOption).toEqual([5, 10, 15, 20]);
    expect(enzymeWrapper.instance().props.sortable).toBe(true);
    expect(enzymeWrapper.instance().props.filterable).toBe(true);
    expect(enzymeWrapper.instance().props.initialSort).toEqual({
      prop: 'deviceID',
      sortOrder: 'ascending'
    });
    expect(enzymeWrapper.instance().props.keyName).toBe('test-table');

    expect(enzymeWrapper.find('Row').length).toBe(1);
    expect(enzymeWrapper.find('Col').length).toBe(4);
    expect(enzymeWrapper.find('Table').length).toBe(1);

    expect(enzymeWrapper.find('thead').length).toBe(1);
    expect(enzymeWrapper.find('tbody').length).toBe(1);
  });
});
