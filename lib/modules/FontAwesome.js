function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';

var FontAwesome = function FontAwesome(props) {
  var _classNames;

  var icon = props.icon,
      additionalClass = props.additionalClass;

  var faIconString = 'fa-' + icon;

  var faClass = classNames((_classNames = {
    fa: true
  }, _defineProperty(_classNames, '' + faIconString, true), _defineProperty(_classNames, '' + additionalClass, true), _classNames));

  return React.createElement('i', { className: faClass, 'aria-hidden': 'true' });
};

FontAwesome.propTypes = {
  icon: PropTypes.string.isRequired,
  additionalClass: PropTypes.string.isRequired
};

export default FontAwesome;