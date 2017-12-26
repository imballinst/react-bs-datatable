var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Table from 'react-bootstrap/lib/Table';

import classNames from 'classnames';

import { sortData, filterData, paginateData } from './utils/ClassHelpers';
import Pagination from './Pagination';
import PaginationOpts from './PaginationOpts';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Filter from './Filter';

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
          customClass = _props.tableClass,
          keyName = _props.keyName,
          labels = _props.labels,
          rowsPerPageOption = _props.rowsPerPageOption;


      var filteredData = filterData(tableHeader, filterText, tableBody);
      var sortedData = sortData(sortedProp, onSort, filteredData);

      var paginatedData = paginateData(rowsPerPage, currentPage, sortedData);

      var tableClass = classNames(_defineProperty({
        'table-datatable': true
      }, '' + customClass, true));

      return React.createElement(
        Row,
        null,
        React.createElement(
          Col,
          { xs: 12, md: 4 },
          React.createElement(Filter, {
            tableHeader: tableHeader,
            onChangeFilter: this.onChangeFilter,
            filterText: filterText,
            keyName: keyName
          })
        ),
        React.createElement(
          Col,
          { xs: 12, md: 4 },
          React.createElement(PaginationOpts, {
            labels: labels,
            onRowsPerPageChange: this.onRowsPerPageChange,
            rowsPerPage: rowsPerPage,
            rowsPerPageOption: rowsPerPageOption,
            keyName: keyName
          })
        ),
        React.createElement(
          Col,
          { xs: 12, md: 4, className: 'text-right' },
          React.createElement(Pagination, {
            data: sortedData,
            rowsPerPage: rowsPerPage,
            keyName: keyName,
            currentPage: currentPage,
            onPageNavigate: this.onPageNavigate,
            labels: labels
          })
        ),
        React.createElement(
          Col,
          { xs: 12 },
          React.createElement(
            Table,
            { className: tableClass },
            React.createElement(TableHeader, {
              tableHeader: tableHeader,
              keyName: keyName,
              sortedProp: sortedProp,
              onSortChange: this.onSortChange
            }),
            React.createElement(TableBody, {
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
}(React.Component);

Datatable.propTypes = {
  initialSort: PropTypes.object,
  keyName: PropTypes.string.isRequired,
  onSort: PropTypes.object,
  rowsPerPage: PropTypes.number,
  rowsPerPageOption: PropTypes.arrayOf(PropTypes.number),
  tableHeader: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableBody: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableClass: PropTypes.string,
  labels: PropTypes.object
};

Datatable.defaultProps = {
  initialSort: undefined,
  onSort: undefined,
  rowsPerPage: undefined,
  rowsPerPageOption: undefined,
  tableClass: '',
  labels: {}
};

export default Datatable;