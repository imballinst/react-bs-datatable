"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _NavButton = _interopRequireDefault(require("../NavButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setup() {
  var props = {
    pageNavNumber: 5,
    disabled: false,
    onPageNavigate: jest.fn(function (val) {
      return expect(val).toBe(5);
    }),
    label: 'test-label'
  };
  var enzymeWrapper = (0, _enzyme.shallow)(_react.default.createElement(_NavButton.default, props));
  return {
    props: props,
    enzymeWrapper: enzymeWrapper
  };
}

describe('NavButton component (src/modules/NavButton)', function () {
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

    expect(enzymeWrapper.instance().props.label).toBe('test-label');
    expect(enzymeWrapper.instance().props.pageNavNumber).toBe(5);
    expect(enzymeWrapper.instance().props.disabled).toBe(false);
  });
  it('should call the jest mock function onPageNavigate', function () {
    var _setup3 = setup(),
        props = _setup3.props,
        enzymeWrapper = _setup3.enzymeWrapper;

    expect(enzymeWrapper.instance().props.onPageNavigate.mock.calls.length).toBe(1);
  });
});