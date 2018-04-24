'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FontAwesome = function FontAwesome(props) {
  var _classNames;

  var icon = props.icon,
      additionalClass = props.additionalClass;

  var faIconString = 'fa-' + icon;

  var faClass = (0, _bind2.default)((_classNames = {
    fa: true
  }, _defineProperty(_classNames, '' + faIconString, true), _defineProperty(_classNames, '' + additionalClass, true), _classNames));

  return _react2.default.createElement('i', { className: faClass, 'aria-hidden': 'true' });
};

FontAwesome.propTypes = {
  icon: _propTypes2.default.string.isRequired,
  additionalClass: _propTypes2.default.string.isRequired
};

exports.default = FontAwesome;