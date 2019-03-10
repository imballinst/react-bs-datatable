"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _bind = _interopRequireDefault(require("classnames/bind"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FontAwesome = function FontAwesome(props) {
  var _classNames;

  var icon = props.icon,
      additionalClass = props.additionalClass;
  var faIconString = "fa-".concat(icon);
  var faClass = (0, _bind.default)((_classNames = {
    fa: true
  }, _defineProperty(_classNames, "".concat(faIconString), true), _defineProperty(_classNames, "".concat(additionalClass), true), _classNames));
  return _react.default.createElement("i", {
    className: faClass,
    "aria-hidden": "true"
  });
};

FontAwesome.propTypes = {
  icon: _propTypes.default.string.isRequired,
  additionalClass: _propTypes.default.string.isRequired
};
var _default = FontAwesome;
exports.default = _default;