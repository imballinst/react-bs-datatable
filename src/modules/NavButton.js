import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';

function NavButton({ pageNavNumber, disabled, onPageNavigate, label }) {
  const btnProps = {
    disabled,
    onClick: onPageNavigate(pageNavNumber)
  };

  return <Button {...btnProps}>{label}</Button>;
}

NavButton.propTypes = {
  pageNavNumber: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  onPageNavigate: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default NavButton;
