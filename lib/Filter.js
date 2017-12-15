var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

import FontAwesome from './modules/FontAwesome';

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
        filterRender = React.createElement(
          FormGroup,
          { controlId: 'select-filter-' + keyName },
          React.createElement(
            InputGroup,
            null,
            React.createElement(FormControl, {
              type: 'text',
              value: filterText,
              placeholder: 'Enter text',
              onChange: this.onInputChange
            }),
            React.createElement(
              InputGroup.Button,
              null,
              React.createElement(
                Button,
                { onClick: this.onClearFilter },
                React.createElement(FontAwesome, { icon: 'times', additionalClass: 'fa-fw' })
              )
            )
          )
        );
      }

      return filterRender;
    }
  }]);

  return Filter;
}(React.Component);

Filter.propTypes = {
  tableHeader: PropTypes.array.isRequired,
  keyName: PropTypes.string.isRequired,
  filterText: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired
};

export default Filter;