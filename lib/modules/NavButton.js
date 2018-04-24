'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('react-bootstrap/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavButton = function NavButton(props) {
  var pageNavNumber = props.pageNavNumber,
      disabled = props.disabled,
      onPageNavigate = props.onPageNavigate,
      label = props.label;


  var btnProps = {
    disabled: disabled,
    onClick: onPageNavigate(pageNavNumber)
  };

  return _react2.default.createElement(
    _Button2.default,
    btnProps,
    label
  );
};

NavButton.propTypes = {
  pageNavNumber: _propTypes2.default.number.isRequired,
  disabled: _propTypes2.default.bool.isRequired,
  onPageNavigate: _propTypes2.default.func.isRequired,
  label: _propTypes2.default.string.isRequired
};

exports.default = NavButton;