import FontAwesome from '../FontAwesome';

function setup() {
  const props = {
    icon: 'history',
    additionalClass: 'fa-fw',
  };

  const enzymeWrapper = shallow(
    <FontAwesome {...props} />,
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe('FontAwesome component (src/modules/FontAwesome)', () => {
  it('should match normal snapshot', () => {
    const { props, enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('i').hasClass('fa fa-history fa-fw')).toBe(true);
    expect(enzymeWrapper.find('i').prop('aria-hidden')).toBe('true');

    expect(Object.keys(enzymeWrapper.find('i').props()).length).toBe(2);
  });
});
