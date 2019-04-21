"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _InputGroup = _interopRequireDefault(require("react-bootstrap/InputGroup"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _FormGroup = _interopRequireDefault(require("react-bootstrap/FormGroup"));

var _FormControl = _interopRequireDefault(require("react-bootstrap/FormControl"));

var _FontAwesome = _interopRequireDefault(require("./modules/FontAwesome"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Filter =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Filter, _React$Component);

  function Filter() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Filter);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Filter)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onInputChange", function (e) {
      _this.props.onChangeFilter(e.target.value);
    });

    _defineProperty(_assertThisInitialized(_this), "onClearFilter", function () {
      _this.props.onChangeFilter('');
    });

    return _this;
  }

  _createClass(Filter, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          tableHeader = _this$props.tableHeader,
          filterText = _this$props.filterText,
          keyName = _this$props.keyName,
          placeholder = _this$props.placeholder;
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
        filterRender = _react.default.createElement(_FormGroup.default, {
          controlId: "select-filter-".concat(keyName)
        }, _react.default.createElement(_InputGroup.default, null, _react.default.createElement(_FormControl.default, {
          type: "text",
          value: filterText,
          placeholder: placeholder,
          onChange: this.onInputChange
        }), _react.default.createElement(_InputGroup.default.Button, null, _react.default.createElement(_Button.default, {
          onClick: this.onClearFilter
        }, _react.default.createElement(_FontAwesome.default, {
          icon: "times",
          additionalClass: "fa-fw"
        })))));
      }

      return filterRender;
    }
  }]);

  return Filter;
}(_react.default.Component);

Filter.propTypes = {
  tableHeader: _propTypes.default.array.isRequired,
  keyName: _propTypes.default.string.isRequired,
  filterText: _propTypes.default.string.isRequired,
  onChangeFilter: _propTypes.default.func.isRequired,
  placeholder: _propTypes.default.string
};
Filter.defaultProps = {
  placeholder: 'Enter text'
};
var _default = Filter;
exports.default = _default;