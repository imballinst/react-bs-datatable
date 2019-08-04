"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _InputGroup = _interopRequireDefault(require("react-bootstrap/InputGroup"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _FormControl = _interopRequireDefault(require("react-bootstrap/FormControl"));

var _FontAwesome = _interopRequireDefault(require("./modules/FontAwesome"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Filter(_ref) {
  var tableHeader = _ref.tableHeader,
      filterText = _ref.filterText,
      placeholder = _ref.placeholder,
      onChangeFilter = _ref.onChangeFilter;

  // Event handlers.
  function onInputChange(e) {
    onChangeFilter(e.target.value);
  }

  function onClearFilter() {
    onChangeFilter('');
  }

  var filterRender = null;
  var i = 0;
  var filterable = false;

  while (!filterable && i < tableHeader.length) {
    if (tableHeader[i].filterable === true) {
      filterable = true;
    }

    i += 1;
  }

  if (filterable) {
    filterRender = _react["default"].createElement(_InputGroup["default"], null, _react["default"].createElement(_FormControl["default"], {
      type: "text",
      value: filterText,
      placeholder: placeholder,
      onChange: onInputChange
    }), _react["default"].createElement(_InputGroup["default"].Append, null, _react["default"].createElement(_Button["default"], {
      onClick: onClearFilter
    }, _react["default"].createElement(_FontAwesome["default"], {
      icon: "times",
      additionalClass: "fa-fw"
    }))));
  }

  return filterRender;
}

Filter.propTypes = {
  tableHeader: _propTypes["default"].array.isRequired,
  filterText: _propTypes["default"].string.isRequired,
  onChangeFilter: _propTypes["default"].func.isRequired,
  placeholder: _propTypes["default"].string
};
Filter.defaultProps = {
  placeholder: 'Enter text'
};
var _default = Filter;
exports["default"] = _default;