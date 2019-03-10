"use strict";

var _FontAwesome = _interopRequireDefault(require("../FontAwesome"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setup() {
  var props = {
    icon: 'history',
    additionalClass: 'fa-fw'
  };
  var enzymeWrapper = shallow(React.createElement(_FontAwesome.default, props));
  return {
    props: props,
    enzymeWrapper: enzymeWrapper
  };
}

describe('FontAwesome component (src/modules/FontAwesome)', function () {
  it('should match normal snapshot', function () {
    var _setup = setup(),
        props = _setup.props,
        enzymeWrapper = _setup.enzymeWrapper;

    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should render self and subcomponents', function () {
    var _setup2 = setup(),
        enzymeWrapper = _setup2.enzymeWrapper;

    expect(enzymeWrapper.find('i').hasClass('fa fa-history fa-fw')).toBe(true);
    expect(enzymeWrapper.find('i').prop('aria-hidden')).toBe('true');
    expect(Object.keys(enzymeWrapper.find('i').props()).length).toBe(2);
  });
});