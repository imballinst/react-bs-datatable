"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _FormGroup = _interopRequireDefault(require("react-bootstrap/FormGroup"));

var _FormControl = _interopRequireDefault(require("react-bootstrap/FormControl"));

var _Form = _interopRequireDefault(require("react-bootstrap/Form"));

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

var PaginationOpts =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PaginationOpts, _React$Component);

  function PaginationOpts() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PaginationOpts);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PaginationOpts)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onRowsPerPageChange", function (e) {
      _this.props.onRowsPerPageChange(e.target.value);
    });

    return _this;
  }

  _createClass(PaginationOpts, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          labels = _this$props.labels,
          rowsPerPage = _this$props.rowsPerPage,
          keyName = _this$props.keyName,
          rowsPerPageOption = _this$props.rowsPerPageOption;
      var selectOption = [];
      var renderedElements = null;

      if (rowsPerPage !== undefined) {
        selectOption.push(rowsPerPage); // Make sure there are no duplicates being pushed

        rowsPerPageOption.forEach(function (opt) {
          if (!selectOption.includes(opt) && typeof opt === 'number') {
            selectOption.push(opt);
          }
        }); // Order the pagination options ascending

        selectOption = selectOption.sort(); // Push to array of React Elements

        selectOption.forEach(function (option) {
          var optionProps = {
            key: "".concat(keyName, "-page-opt-").concat(option),
            value: option
          };
          selectOption.push(_react.default.createElement("option", optionProps, option));
        });
        renderedElements = _react.default.createElement(_Form.default, {
          inline: true
        }, _react.default.createElement(_FormGroup.default, {
          controlId: "formGroupPagination"
        }, labels.show || 'Show', ' ', _react.default.createElement(_FormControl.default, {
          name: "form-control-pagination",
          defaultValue: rowsPerPage,
          componentClass: "select",
          placeholder: "select",
          onChange: this.onRowsPerPageChange
        }, selectOption), ' ', labels.entries || 'entries'));
      }

      return renderedElements;
    }
  }]);

  return PaginationOpts;
}(_react.default.Component);

PaginationOpts.propTypes = {
  keyName: _propTypes.default.string.isRequired,
  labels: _propTypes.default.object.isRequired,
  onRowsPerPageChange: _propTypes.default.func.isRequired,
  rowsPerPageOption: _propTypes.default.array,
  rowsPerPage: _propTypes.default.number
};
PaginationOpts.defaultProps = {
  rowsPerPage: undefined,
  rowsPerPageOption: undefined
};
var _default = PaginationOpts;
exports.default = _default;