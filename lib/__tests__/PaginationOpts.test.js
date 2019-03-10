"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _PaginationOpts = _interopRequireDefault(require("../PaginationOpts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onRowsPerPageChange = jest.fn(function (val) {
  return expect(val).toBe(10);
});

function setup() {
  var props = {
    keyName: 'test-keyname',
    labels: {},
    onRowsPerPageChange: onRowsPerPageChange,
    rowsPerPageOption: [5, 10, 15, 20],
    rowsPerPage: 5
  };
  var enzymeWrapper = (0, _enzyme.shallow)(_react.default.createElement(_PaginationOpts.default, props));
  return {
    props: props,
    enzymeWrapper: enzymeWrapper
  };
}

describe('PaginationOpts component (src/PaginationOpts)', function () {
  it('should match normal snapshot', function () {
    var _setup = setup(),
        props = _setup.props,
        enzymeWrapper = _setup.enzymeWrapper;

    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should have the same props before and after render', function () {
    var _setup2 = setup(),
        props = _setup2.props,
        enzymeWrapper = _setup2.enzymeWrapper;

    expect(enzymeWrapper.instance().props.keyName).toBe('test-keyname');
    expect(enzymeWrapper.instance().props.labels).toEqual({});
    expect(enzymeWrapper.instance().props.rowsPerPage).toBe(5);
    expect(enzymeWrapper.instance().props.rowsPerPageOption).toEqual([5, 10, 15, 20]);
    expect(enzymeWrapper.instance().props.onRowsPerPageChange).toBe(onRowsPerPageChange);
  });
  it('should call onRowsPerPageChange on change', function () {
    var _setup3 = setup(),
        props = _setup3.props,
        enzymeWrapper = _setup3.enzymeWrapper;

    var selectOption = enzymeWrapper.find('[name="form-control-pagination"]');
    selectOption.simulate('change', {
      target: {
        value: 10
      }
    });
  });
});