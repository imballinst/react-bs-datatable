import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/lib/Button';

var NavButton = function NavButton(props) {
  var pageNavNumber = props.pageNavNumber,
      disabled = props.disabled,
      onPageNavigate = props.onPageNavigate,
      label = props.label;


  var btnProps = {
    disabled: disabled,
    onClick: onPageNavigate(pageNavNumber)
  };

  return React.createElement(
    Button,
    btnProps,
    label
  );
};

NavButton.propTypes = {
  pageNavNumber: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  onPageNavigate: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default NavButton;