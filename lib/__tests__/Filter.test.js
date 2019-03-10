"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _reactBootstrap = require("react-bootstrap");

var _Filter = _interopRequireDefault(require("../Filter"));

var _FontAwesome = _interopRequireDefault(require("../modules/FontAwesome"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var onChangeFilter = jest.fn();

function setup() {
  var props = {
    keyName: 'test-keyname',
    onChangeFilter: onChangeFilter,
    filterText: 'old-test-filter',
    tableHeader: [{
      prop: 'prop',
      filterable: true
    }],
    placeholder: 'Enter a text!'
  };
  var enzymeWrapper = (0, _enzyme.shallow)(_react.default.createElement(_Filter.default, props));
  return {
    props: props,
    enzymeWrapper: enzymeWrapper
  };
}

describe('Filter component (src/Filter)', function () {
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

    expect(enzymeWrapper.instance().props.filterText).toBe('old-test-filter');
    expect(enzymeWrapper.instance().props.keyName).toBe('test-keyname');
    expect(enzymeWrapper.find(_reactBootstrap.FormGroup).props().controlId).toBe('select-filter-test-keyname');
    expect(Object.keys(enzymeWrapper.find(_reactBootstrap.FormGroup).props()).length).toBe(3);
    expect(enzymeWrapper.find(_reactBootstrap.FormGroup).length).toBe(1);
    expect(enzymeWrapper.find(_reactBootstrap.InputGroup).length).toBe(1);
    expect(enzymeWrapper.find(_reactBootstrap.FormControl).props().type).toBe('text');
    expect(enzymeWrapper.find(_reactBootstrap.FormControl).props().value).toBe('old-test-filter');
    expect(enzymeWrapper.find(_reactBootstrap.FormControl).props().placeholder).toBe('Enter a text!');
    expect(_typeof(enzymeWrapper.find(_reactBootstrap.FormControl).props().onChange)).toBe('function');
    expect(enzymeWrapper.find(_reactBootstrap.FormControl).length).toBe(1);
    expect(enzymeWrapper.find(_reactBootstrap.InputGroup.Button).length).toBe(1);
    expect(_typeof(enzymeWrapper.find(_reactBootstrap.Button).props().onClick)).toBe('function');
    expect(enzymeWrapper.find(_reactBootstrap.Button).length).toBe(1);
    expect(enzymeWrapper.find(_FontAwesome.default).props().icon).toBe('times');
    expect(enzymeWrapper.find(_FontAwesome.default).props().additionalClass).toBe('fa-fw');
    expect(enzymeWrapper.find(_FontAwesome.default).length).toBe(1);
  });
  it('should have the same props before and after render', function () {
    var _setup3 = setup(),
        props = _setup3.props,
        enzymeWrapper = _setup3.enzymeWrapper;

    expect(enzymeWrapper.instance().props.keyName).toBe('test-keyname');
    expect(enzymeWrapper.instance().props.tableHeader).toEqual([{
      prop: 'prop',
      filterable: true
    }]);
    expect(enzymeWrapper.instance().props.filterText).toBe('old-test-filter');
    expect(enzymeWrapper.instance().props.onChangeFilter).toBe(onChangeFilter);
  });
  it('should trigger onClearFilter', function () {
    var _setup4 = setup(),
        props = _setup4.props,
        enzymeWrapper = _setup4.enzymeWrapper;

    var value = '';
    enzymeWrapper.find(_reactBootstrap.Button).simulate('click', {
      preventDefault: jest.fn()
    });
    expect(props.onChangeFilter).toBeCalledWith(value);
    expect(props.onChangeFilter.mock.calls.length).toBe(1);
  });
  it('should trigger onInputChange with a certain value', function () {
    var _setup5 = setup(),
        props = _setup5.props,
        enzymeWrapper = _setup5.enzymeWrapper;

    var value = 'asd';
    enzymeWrapper.find(_reactBootstrap.FormControl).simulate('change', {
      target: {
        value: value
      }
    });
    expect(props.onChangeFilter).toBeCalledWith(value);
    expect(props.onChangeFilter.mock.calls.length).toBe(2);
  });
});