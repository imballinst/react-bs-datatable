'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Row = require('react-bootstrap/lib/Row');

var _Row2 = _interopRequireDefault(_Row);

var _Col = require('react-bootstrap/lib/Col');

var _Col2 = _interopRequireDefault(_Col);

var _Table = require('react-bootstrap/lib/Table');

var _Table2 = _interopRequireDefault(_Table);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ClassHelpers = require('./utils/ClassHelpers');

var _Pagination = require('./Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _PaginationOpts = require('./PaginationOpts');

var _PaginationOpts2 = _interopRequireDefault(_PaginationOpts);

var _TableHeader = require('./TableHeader');

var _TableHeader2 = _interopRequireDefault(_TableHeader);

var _TableBody = require('./TableBody');

var _TableBody2 = _interopRequireDefault(_TableBody);

var _Filter = require('./Filter');

var _Filter2 = _interopRequireDefault(_Filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Datatable = function (_React$Component) {
  _inherits(Datatable, _React$Component);

  function Datatable(props) {
    _classCallCheck(this, Datatable);

    var _this = _possibleConstructorReturn(this, (Datatable.__proto__ || Object.getPrototypeOf(Datatable)).call(this, props));

    _this.onChangeFilter = function (text) {
      _this.setState({
        filterText: text,
        currentPage: 1
      });
    };

    _this.onPageNavigate = function (nextPage) {
      return function () {
        _this.setState({
          currentPage: nextPage
        });
      };
    };

    _this.onRowsPerPageChange = function (numOfPage) {
      _this.setState({
        rowsPerPage: parseInt(numOfPage, 10),
        currentPage: 1
      });
    };

    _this.onSortChange = function (nextProp) {
      return function () {
        var nextSort = _this.state.sortedProp;

        if (nextProp !== _this.state.sortedProp.prop) {
          nextSort.prop = nextProp;
          nextSort.isAscending = true;
        } else {
          nextSort.isAscending = !_this.state.sortedProp.isAscending;
        }

        _this.setState({
          sortedProp: nextSort
        });
      };
    };

    var tableHeader = props.tableHeader,
        initialSort = props.initialSort,
        rowsPerPageOption = props.rowsPerPageOption,
        rowsPerPage = props.rowsPerPage;

    var defaultSort = {};

    if (initialSort !== undefined) {
      var found = false;
      var i = 0;

      while (!found && i < tableHeader.length) {
        if (tableHeader[i].prop === initialSort.prop) {
          found = true;

          if (tableHeader[i].sortable === true) {
            defaultSort = initialSort;
          }
        }

        i += 1;
      }
    }

    var isOptionsGiven = rowsPerPageOption.length;
    var defaultRowsPerPage = void 0;

    if (isOptionsGiven) {
      if (rowsPerPageOption.includes(rowsPerPage)) {
        defaultRowsPerPage = rowsPerPage;
      } else {
        defaultRowsPerPage = rowsPerPageOption[0];
      }
    }

    // Define initial state
    _this.state = {
      sortedProp: defaultSort,
      rowsPerPage: defaultRowsPerPage,
      currentPage: 1,
      filterText: ''
    };
    return _this;
  }

  _createClass(Datatable, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.setState({
        filterText: '',
        currentPage: 1,
        rowsPerPage: newProps.rowsPerPage
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          sortedProp = _state.sortedProp,
          filterText = _state.filterText,
          rowsPerPage = _state.rowsPerPage,
          currentPage = _state.currentPage;
      var _props = this.props,
          tableHeader = _props.tableHeader,
          tableBody = _props.tableBody,
          onSort = _props.onSort,
          onFilter = _props.onFilter,
          customClass = _props.tableClass,
          keyName = _props.keyName,
          labels = _props.labels,
          rowsPerPageOption = _props.rowsPerPageOption;


      var filteredData = (0, _ClassHelpers.filterData)(tableHeader, filterText, onFilter, tableBody);
      var sortedData = (0, _ClassHelpers.sortData)(sortedProp, onSort, filteredData);

      var paginatedData = (0, _ClassHelpers.paginateData)(rowsPerPage, currentPage, sortedData);

      var tableClass = (0, _classnames2.default)(_defineProperty({
        'table-datatable': true
      }, '' + customClass, true));

      return _react2.default.createElement(
        _Row2.default,
        null,
        _react2.default.createElement(
          _Col2.default,
          { xs: 12, md: 4 },
          _react2.default.createElement(_Filter2.default, {
            tableHeader: tableHeader,
            onChangeFilter: this.onChangeFilter,
            filterText: filterText,
            keyName: keyName
          })
        ),
        _react2.default.createElement(
          _Col2.default,
          { xs: 12, md: 4 },
          _react2.default.createElement(_PaginationOpts2.default, {
            labels: labels,
            onRowsPerPageChange: this.onRowsPerPageChange,
            rowsPerPage: rowsPerPage,
            rowsPerPageOption: rowsPerPageOption,
            keyName: keyName
          })
        ),
        _react2.default.createElement(
          _Col2.default,
          { xs: 12, md: 4, className: 'text-right' },
          _react2.default.createElement(_Pagination2.default, {
            data: sortedData,
            rowsPerPage: rowsPerPage,
            keyName: keyName,
            currentPage: currentPage,
            onPageNavigate: this.onPageNavigate,
            labels: labels
          })
        ),
        _react2.default.createElement(
          _Col2.default,
          { xs: 12 },
          _react2.default.createElement(
            _Table2.default,
            { className: tableClass },
            _react2.default.createElement(_TableHeader2.default, {
              tableHeader: tableHeader,
              keyName: keyName,
              sortedProp: sortedProp,
              onSortChange: this.onSortChange
            }),
            _react2.default.createElement(_TableBody2.default, {
              tableHeader: tableHeader,
              keyName: keyName,
              labels: labels,
              paginatedData: paginatedData
            })
          )
        )
      );
    }
  }]);

  return Datatable;
}(_react2.default.Component);

Datatable.propTypes = {
  initialSort: _propTypes2.default.object,
  keyName: _propTypes2.default.string.isRequired,
  onSort: _propTypes2.default.object,
  onFilter: _propTypes2.default.object,
  rowsPerPage: _propTypes2.default.number,
  rowsPerPageOption: _propTypes2.default.arrayOf(_propTypes2.default.number),
  tableHeader: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  tableBody: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  tableClass: _propTypes2.default.string,
  labels: _propTypes2.default.object
};

Datatable.defaultProps = {
  initialSort: undefined,
  onSort: undefined,
  onFilter: undefined,
  rowsPerPage: undefined,
  rowsPerPageOption: undefined,
  tableClass: '',
  labels: {}
};

exports.default = Datatable;