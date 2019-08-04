"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _bind = _interopRequireDefault(require("classnames/bind"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function FontAwesome(_ref) {
  var icon = _ref.icon,
      additionalClass = _ref.additionalClass;
  var faIconString = "fa-".concat(icon);
  var faClass = (0, _bind["default"])('fa', faIconString, additionalClass);
  return _react["default"].createElement("i", {
    className: faClass,
    "aria-hidden": "true"
  });
}

FontAwesome.propTypes = {
  icon: _propTypes["default"].string.isRequired,
  additionalClass: _propTypes["default"].string.isRequired
};
var _default = FontAwesome;
exports["default"] = _default;