'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _orderBy2 = require('lodash/orderBy');

var _orderBy3 = _interopRequireDefault(_orderBy2);

var _includes2 = require('lodash/includes');

var _includes3 = _interopRequireDefault(_includes2);

var _FormGroup = require('react-bootstrap/lib/FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _FormControl = require('react-bootstrap/lib/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _Form = require('react-bootstrap/lib/Form');

var _Form2 = _interopRequireDefault(_Form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaginationOpts = function (_React$Component) {
  _inherits(PaginationOpts, _React$Component);

  function PaginationOpts() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PaginationOpts);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PaginationOpts.__proto__ || Object.getPrototypeOf(PaginationOpts)).call.apply(_ref, [this].concat(args))), _this), _this.onRowsPerPageChange = function (e) {
      _this.props.onRowsPerPageChange(e.target.value);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PaginationOpts, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          labels = _props.labels,
          rowsPerPage = _props.rowsPerPage,
          keyName = _props.keyName,
          rowsPerPageOption = _props.rowsPerPageOption;

      var selectOption = [];
      var renderedElements = null;

      if (rowsPerPage !== undefined) {
        selectOption.push(rowsPerPage);

        // Make sure there are no duplicates being pushed
        (0, _forEach3.default)(rowsPerPageOption, function (opt) {
          if (!(0, _includes3.default)(selectOption, opt) && typeof opt === 'number') {
            selectOption.push(opt);
          }
        });

        // Order the pagination options ascending
        selectOption = (0, _orderBy3.default)(selectOption, undefined, 'asc');

        // Push to array of React Elements
        (0, _forEach3.default)(selectOption, function (option) {
          var optionProps = {
            key: keyName + '-page-opt-' + option,
            value: option
          };

          selectOption.push(_react2.default.createElement(
            'option',
            optionProps,
            option
          ));
        });

        renderedElements = _react2.default.createElement(
          _Form2.default,
          { inline: true },
          _react2.default.createElement(
            _FormGroup2.default,
            { controlId: 'formGroupPagination' },
            labels.show || 'Show',
            ' ',
            _react2.default.createElement(
              _FormControl2.default,
              {
                name: 'form-control-pagination',
                defaultValue: rowsPerPage,
                componentClass: 'select',
                placeholder: 'select',
                onChange: this.onRowsPerPageChange
              },
              selectOption
            ),
            ' ',
            labels.entries || 'entries'
          )
        );
      }

      return renderedElements;
    }
  }]);

  return PaginationOpts;
}(_react2.default.Component);

PaginationOpts.propTypes = {
  keyName: _propTypes2.default.string.isRequired,
  labels: _propTypes2.default.object.isRequired,
  onRowsPerPageChange: _propTypes2.default.func.isRequired,
  rowsPerPageOption: _propTypes2.default.array,
  rowsPerPage: _propTypes2.default.number
};

PaginationOpts.defaultProps = {
  rowsPerPage: undefined,
  rowsPerPageOption: undefined
};

exports.default = PaginationOpts;