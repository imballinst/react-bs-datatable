"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function NavButton(_ref) {
  var pageNavNumber = _ref.pageNavNumber,
      disabled = _ref.disabled,
      onPageNavigate = _ref.onPageNavigate,
      label = _ref.label;
  var btnProps = {
    disabled: disabled,
    onClick: onPageNavigate(pageNavNumber)
  };
  return _react["default"].createElement(_Button["default"], btnProps, label);
}

NavButton.propTypes = {
  pageNavNumber: _propTypes["default"].number.isRequired,
  disabled: _propTypes["default"].bool.isRequired,
  onPageNavigate: _propTypes["default"].func.isRequired,
  label: _propTypes["default"].string.isRequired
};
var _default = NavButton;
exports["default"] = _default;