"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Table = _interopRequireDefault(require("../Table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cellTransform = function cellTransform(row) {
  return row.name.split(' ').reverse().join(' ');
};

function setup() {
  var tableHeader = [{
    title: 'Username',
    prop: 'userID',
    sortable: true,
    filterable: true
  }, {
    title: 'Person Name',
    prop: 'name',
    sortable: true,
    filterable: true
  }, {
    title: 'Person Name (reversed)',
    prop: 'reversedName',
    cell: cellTransform,
    sortable: true,
    filterable: true
  }];
  var tableBody = [{
    userID: 'i-am-tyler-1',
    name: 'Tyler Olfson 1'
  }, {
    userID: 'i-am-tyler-2',
    name: 'Tyler Olfson 2'
  }, {
    userID: 'i-am-tyler-3',
    name: 'Tyler Olfson 3'
  }, {
    userID: 'i-am-tyler-4',
    name: 'Tyler Olfson 4'
  }, {
    userID: 'i-am-tyler-5',
    name: 'Tyler Olfson 5'
  }, {
    userID: 'i-am-tyler-6',
    name: 'Tyler Olfson 6'
  }, {
    userID: 'sir-bobby-1',
    name: 'Bobby Charly 1'
  }, {
    userID: 'sir-bobby-2',
    name: 'Bobby Charly 2'
  }, {
    userID: 'sir-bobby-3',
    name: 'Bobby Charly 3'
  }, {
    userID: 'sir-bobby-4',
    name: 'Bobby Charly 4'
  }, {
    userID: 'sir-bobby-5',
    name: 'Bobby Charly 5'
  }, {
    userID: 'sir-bobby-6',
    name: 'Bobby Charly 6'
  }];
  var props = {
    tableHeader: tableHeader,
    tableBody: tableBody,
    tableClass: 'table table-striped table-responsive',
    rowsPerPage: 5,
    rowsPerPageOption: [5, 10, 15, 20],
    initialSort: {
      prop: 'userID',
      isAscending: true
    },
    keyName: 'test-table'
  };
  var enzymeWrapper = (0, _enzyme.shallow)(_react.default.createElement(_Table.default, props));
  return {
    props: props,
    enzymeWrapper: enzymeWrapper
  };
}

describe('Datatable component (src/Datatable)', function () {
  it('should match normal snapshot', function () {
    var _setup = setup(),
        props = _setup.props,
        enzymeWrapper = _setup.enzymeWrapper;

    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should render self and subcomponents', function () {
    var _setup2 = setup(),
        props = _setup2.props,
        enzymeWrapper = _setup2.enzymeWrapper;

    expect(enzymeWrapper.instance().props.tableHeader).toEqual([{
      title: 'Username',
      prop: 'userID',
      sortable: true,
      filterable: true
    }, {
      title: 'Person Name',
      prop: 'name',
      sortable: true,
      filterable: true
    }, {
      title: 'Person Name (reversed)',
      prop: 'reversedName',
      cell: cellTransform,
      sortable: true,
      filterable: true
    }]);
    expect(enzymeWrapper.instance().props.tableBody).toEqual([{
      userID: 'i-am-tyler-1',
      name: 'Tyler Olfson 1'
    }, {
      userID: 'i-am-tyler-2',
      name: 'Tyler Olfson 2'
    }, {
      userID: 'i-am-tyler-3',
      name: 'Tyler Olfson 3'
    }, {
      userID: 'i-am-tyler-4',
      name: 'Tyler Olfson 4'
    }, {
      userID: 'i-am-tyler-5',
      name: 'Tyler Olfson 5'
    }, {
      userID: 'i-am-tyler-6',
      name: 'Tyler Olfson 6'
    }, {
      userID: 'sir-bobby-1',
      name: 'Bobby Charly 1'
    }, {
      userID: 'sir-bobby-2',
      name: 'Bobby Charly 2'
    }, {
      userID: 'sir-bobby-3',
      name: 'Bobby Charly 3'
    }, {
      userID: 'sir-bobby-4',
      name: 'Bobby Charly 4'
    }, {
      userID: 'sir-bobby-5',
      name: 'Bobby Charly 5'
    }, {
      userID: 'sir-bobby-6',
      name: 'Bobby Charly 6'
    }]);
    expect(enzymeWrapper.instance().props.tableClass).toEqual('table table-striped table-responsive');
    expect(enzymeWrapper.instance().props.rowsPerPage).toBe(5);
    expect(enzymeWrapper.instance().props.rowsPerPageOption).toEqual([5, 10, 15, 20]);
    expect(enzymeWrapper.instance().props.initialSort).toEqual({
      prop: 'userID',
      isAscending: true
    });
    expect(enzymeWrapper.instance().props.keyName).toBe('test-table');
    expect(enzymeWrapper.find('Row').length).toBe(1);
    expect(enzymeWrapper.find('Col').length).toBe(4);
    expect(enzymeWrapper.find('Table').length).toBe(1);
  });
  it('should change the sortedProp state', function () {
    var _setup3 = setup(),
        props = _setup3.props,
        enzymeWrapper = _setup3.enzymeWrapper;

    expect(enzymeWrapper.state('sortedProp')).toEqual({
      prop: 'userID',
      isAscending: true
    });
    enzymeWrapper.find('.thead-th-default').at(0).simulate('click', {
      preventDefault: jest.fn()
    });
    expect(enzymeWrapper.state('sortedProp')).toEqual({
      prop: 'userID',
      isAscending: true
    });
  });
});