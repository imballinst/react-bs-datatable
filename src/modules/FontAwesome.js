import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';

function FontAwesome({ icon, additionalClass }) {
  const faIconString = `fa-${icon}`;
  const faClass = classNames('fa', faIconString, additionalClass);

  return <i className={faClass} aria-hidden="true" />;
}

FontAwesome.propTypes = {
  icon: PropTypes.string.isRequired,
  additionalClass: PropTypes.string.isRequired
};

export default FontAwesome;
