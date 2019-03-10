"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _BodyRow = _interopRequireDefault(require("../BodyRow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setup() {
  var props = {
    data: [],
    keyName: 'pagination-keyname',
    tableHeader: [],
    rowIdx: 1
  };
  var enzymeWrapper = (0, _enzyme.shallow)(_react.default.createElement(_BodyRow.default, props));
  return {
    props: props,
    enzymeWrapper: enzymeWrapper
  };
}

describe('BodyRow component (src/BodyRow)', function () {
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

    expect(enzymeWrapper.instance().props.data).toEqual([]);
    expect(enzymeWrapper.instance().props.keyName).toBe('pagination-keyname');
    expect(enzymeWrapper.instance().props.tableHeader).toEqual([]);
    expect(enzymeWrapper.instance().props.rowIdx).toBe(1);
  });
});