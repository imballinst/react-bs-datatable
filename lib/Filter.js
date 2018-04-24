'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _InputGroup = require('react-bootstrap/lib/InputGroup');

var _InputGroup2 = _interopRequireDefault(_InputGroup);

var _Button = require('react-bootstrap/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

var _FormGroup = require('react-bootstrap/lib/FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _FormControl = require('react-bootstrap/lib/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _FontAwesome = require('./modules/FontAwesome');

var _FontAwesome2 = _interopRequireDefault(_FontAwesome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filter = function (_React$Component) {
  _inherits(Filter, _React$Component);

  function Filter() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Filter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Filter.__proto__ || Object.getPrototypeOf(Filter)).call.apply(_ref, [this].concat(args))), _this), _this.onInputChange = function (e) {
      _this.props.onChangeFilter(e.target.value);
    }, _this.onClearFilter = function () {
      _this.props.onChangeFilter('');
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Filter, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          tableHeader = _props.tableHeader,
          filterText = _props.filterText,
          keyName = _props.keyName;

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
        filterRender = _react2.default.createElement(
          _FormGroup2.default,
          { controlId: 'select-filter-' + keyName },
          _react2.default.createElement(
            _InputGroup2.default,
            null,
            _react2.default.createElement(_FormControl2.default, {
              type: 'text',
              value: filterText,
              placeholder: 'Enter text',
              onChange: this.onInputChange
            }),
            _react2.default.createElement(
              _InputGroup2.default.Button,
              null,
              _react2.default.createElement(
                _Button2.default,
                { onClick: this.onClearFilter },
                _react2.default.createElement(_FontAwesome2.default, { icon: 'times', additionalClass: 'fa-fw' })
              )
            )
          )
        );
      }

      return filterRender;
    }
  }]);

  return Filter;
}(_react2.default.Component);

Filter.propTypes = {
  tableHeader: _propTypes2.default.array.isRequired,
  keyName: _propTypes2.default.string.isRequired,
  filterText: _propTypes2.default.string.isRequired,
  onChangeFilter: _propTypes2.default.func.isRequired
};

exports.default = Filter;