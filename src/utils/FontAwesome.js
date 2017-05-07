import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';

const FontAwesome = (props) => {
  const { icon, additionalClass } = props;
  const faIconString = `fa-${icon}`;

  const faClass = classNames({
    fa: true,
    [`${faIconString}`]: true,
    [`${additionalClass}`]: true,
  });

  return (
    <i className={faClass} aria-hidden="true" />
  );
};

FontAwesome.propTypes = {
  icon: PropTypes.string.isRequired,
  additionalClass: PropTypes.string.isRequired,
};

export default FontAwesome;
