import React from 'react';
import { shallow } from 'enzyme';

import FontAwesome from '../../src/utils/FontAwesome';

function setup() {
  const props = {
    icon: 'history',
    additionalClass: 'fa-fw'
  };

  const enzymeWrapper = shallow(
    <FontAwesome {...props} />
  );

  return {
    props,
    enzymeWrapper
  };
}

describe('FontAwesome component (js/component/FontAwesome)', () => {
  it ('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('i').hasClass('fa fa-history fa-fw')).toBe(true);
    expect(enzymeWrapper.find('i').prop('aria-hidden')).toBe("true");

    expect(Object.keys(enzymeWrapper.find('i').props()).length).toBe(2);
  });
});
