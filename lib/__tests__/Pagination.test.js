"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Pagination = _interopRequireDefault(require("../Pagination"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onPageNavigate = jest.fn();

function setup() {
  var props = {
    data: [],
    keyName: 'pagination-keyname',
    currentPage: 1,
    onPageNavigate: onPageNavigate,
    rowsPerPage: 5
  };
  var enzymeWrapper = (0, _enzyme.shallow)(_react.default.createElement(_Pagination.default, props));
  return {
    props: props,
    enzymeWrapper: enzymeWrapper
  };
}

describe('Pagination component (src/Pagination)', function () {
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
    expect(enzymeWrapper.instance().props.currentPage).toBe(1);
    expect(enzymeWrapper.instance().props.rowsPerPage).toBe(5);
    expect(enzymeWrapper.instance().props.onPageNavigate).toBe(onPageNavigate);
  });
});