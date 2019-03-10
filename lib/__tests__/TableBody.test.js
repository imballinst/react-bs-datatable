"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _TableBody = _interopRequireDefault(require("../TableBody"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setup() {
  var props = {
    paginatedData: [],
    keyName: 'pagination-keyname',
    tableHeader: [],
    labels: {}
  };
  var enzymeWrapper = (0, _enzyme.shallow)(_react.default.createElement(_TableBody.default, props));
  return {
    props: props,
    enzymeWrapper: enzymeWrapper
  };
}

describe('TableBody component (src/TableBody)', function () {
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

    expect(enzymeWrapper.instance().props.paginatedData).toEqual([]);
    expect(enzymeWrapper.instance().props.keyName).toBe('pagination-keyname');
    expect(enzymeWrapper.instance().props.tableHeader).toEqual([]);
    expect(enzymeWrapper.instance().props.labels).toEqual({});
  });
});