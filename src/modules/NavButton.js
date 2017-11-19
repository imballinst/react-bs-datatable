import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/lib/Button';

const NavButton = (props) => {
  const {
    pageNavNumber,
    disabled,
    onPageNavigate,
    label,
  } = props;

  const btnProps = {
    disabled,
    onClick: onPageNavigate(pageNavNumber),
  };

  return <Button {...btnProps}>{label}</Button>;
};

NavButton.propTypes = {
  pageNavNumber: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  onPageNavigate: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default NavButton;
