var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import _forEach from 'lodash/forEach';
import _orderBy from 'lodash/orderBy';
import _includes from 'lodash/includes';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Form from 'react-bootstrap/lib/Form';

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
        _forEach(rowsPerPageOption, function (opt) {
          if (!_includes(selectOption, opt) && typeof opt === 'number') {
            selectOption.push(opt);
          }
        });

        // Order the pagination options ascending
        selectOption = _orderBy(selectOption, undefined, 'asc');

        // Push to array of React Elements
        _forEach(selectOption, function (option) {
          var optionProps = {
            key: keyName + '-page-opt-' + option,
            value: option
          };

          selectOption.push(React.createElement(
            'option',
            optionProps,
            option
          ));
        });

        renderedElements = React.createElement(
          Form,
          { inline: true },
          React.createElement(
            FormGroup,
            { controlId: 'formGroupPagination' },
            labels.show || 'Show',
            ' ',
            React.createElement(
              FormControl,
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
}(React.Component);

PaginationOpts.propTypes = {
  keyName: PropTypes.string.isRequired,
  labels: PropTypes.object.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  rowsPerPageOption: PropTypes.array,
  rowsPerPage: PropTypes.number
};

PaginationOpts.defaultProps = {
  rowsPerPage: undefined,
  rowsPerPageOption: undefined
};

export default PaginationOpts;