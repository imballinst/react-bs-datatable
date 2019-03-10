"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _TableHeader = _interopRequireDefault(require("../TableHeader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onSortChange = jest.fn();

function setup() {
  var props = {
    tableHeader: [],
    keyName: 'test-keyname',
    sortedProp: {
      prop: 'test-prop',
      isAscending: true
    },
    onSortChange: onSortChange
  };
  var enzymeWrapper = (0, _enzyme.shallow)(_react.default.createElement(_TableHeader.default, props));
  return {
    props: props,
    enzymeWrapper: enzymeWrapper
  };
}

describe('TableHeader component (src/TableHeader)', function () {
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

    expect(enzymeWrapper.instance().props.tableHeader).toEqual([]);
    expect(enzymeWrapper.instance().props.keyName).toBe('test-keyname');
    expect(enzymeWrapper.instance().props.sortedProp).toEqual({
      prop: 'test-prop',
      isAscending: true
    });
    expect(enzymeWrapper.instance().props.onSortChange).toBe(onSortChange);
  });
});