"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "sortData", {
  enumerable: true,
  get: function get() {
    return _ClassHelpers.sortData;
  }
});
Object.defineProperty(exports, "filterData", {
  enumerable: true,
  get: function get() {
    return _ClassHelpers.filterData;
  }
});
Object.defineProperty(exports, "paginateData", {
  enumerable: true,
  get: function get() {
    return _ClassHelpers.paginateData;
  }
});
Object.defineProperty(exports, "Pagination", {
  enumerable: true,
  get: function get() {
    return _Pagination.default;
  }
});
Object.defineProperty(exports, "PaginationOpts", {
  enumerable: true,
  get: function get() {
    return _PaginationOpts.default;
  }
});
Object.defineProperty(exports, "TableHeader", {
  enumerable: true,
  get: function get() {
    return _TableHeader.default;
  }
});
Object.defineProperty(exports, "TableBody", {
  enumerable: true,
  get: function get() {
    return _TableBody.default;
  }
});
Object.defineProperty(exports, "Filter", {
  enumerable: true,
  get: function get() {
    return _Filter.default;
  }
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Row = _interopRequireDefault(require("react-bootstrap/Row"));

var _Col = _interopRequireDefault(require("react-bootstrap/Col"));

var _Table = _interopRequireDefault(require("react-bootstrap/Table"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ClassHelpers = require("./utils/ClassHelpers");

var _Pagination = _interopRequireDefault(require("./Pagination"));

var _PaginationOpts = _interopRequireDefault(require("./PaginationOpts"));

var _TableHeader = _interopRequireDefault(require("./TableHeader"));

var _TableBody = _interopRequireDefault(require("./TableBody"));

var _Filter = _interopRequireDefault(require("./Filter"));

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

var Datatable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Datatable, _React$Component);

  function Datatable(props) {
    var _this;

    _classCallCheck(this, Datatable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Datatable).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onChangeFilter", function (text) {
      _this.setState({
        filterText: text,
        currentPage: 1
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onPageNavigate", function (nextPage) {
      return function () {
        _this.setState({
          currentPage: nextPage
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onRowsPerPageChange", function (numOfPage) {
      _this.setState({
        rowsPerPage: parseInt(numOfPage, 10),
        currentPage: 1
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSortChange", function (nextProp) {
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
    });

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

    var isOptionsGiven = rowsPerPageOption.length > 0;
    var defaultRowsPerPage;

    if (isOptionsGiven) {
      if (rowsPerPageOption.includes(rowsPerPage)) {
        defaultRowsPerPage = rowsPerPage;
      } else {
        defaultRowsPerPage = rowsPerPageOption[0];
      }
    } // Define initial state


    _this.state = {
      sortedProp: defaultSort,
      rowsPerPage: defaultRowsPerPage,
      currentPage: 1,
      filterText: ''
    };
    return _this;
  }

  _createClass(Datatable, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      this.setState({
        filterText: '',
        currentPage: 1,
        rowsPerPage: newProps.rowsPerPage
      });
    }
  }, {
    key: "processData",
    value: function processData(tableHeader, tableBody, onSort, onFilter) {
      var _this$state = this.state,
          sortedProp = _this$state.sortedProp,
          filterText = _this$state.filterText,
          rowsPerPage = _this$state.rowsPerPage,
          currentPage = _this$state.currentPage;
      var filteredData = (0, _ClassHelpers.filterData)(tableHeader, filterText, onFilter, tableBody);
      var sortedData = (0, _ClassHelpers.sortData)(sortedProp, onSort, filteredData);
      var paginatedData = (0, _ClassHelpers.paginateData)(rowsPerPage, currentPage, sortedData);
      return paginatedData;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          sortedProp = _this$state2.sortedProp,
          filterText = _this$state2.filterText,
          rowsPerPage = _this$state2.rowsPerPage,
          currentPage = _this$state2.currentPage;
      var _this$props = this.props,
          tableHeader = _this$props.tableHeader,
          tableBody = _this$props.tableBody,
          onSort = _this$props.onSort,
          onFilter = _this$props.onFilter,
          keyName = _this$props.keyName,
          tableBsClass = _this$props.tableBsClass,
          labels = _this$props.labels,
          rowsPerPageOption = _this$props.rowsPerPageOption;
      var data = this.processData(tableHeader, tableBody, onSort, onFilter);
      var tableClass = (0, _classnames.default)("table-datatable-".concat(keyName), tableBsClass);
      return _react.default.createElement(_Row.default, null, _react.default.createElement(_Col.default, {
        xs: 12,
        md: 4
      }, _react.default.createElement(_Filter.default, {
        tableHeader: tableHeader,
        placeholder: labels.filterPlaceholder,
        onChangeFilter: this.onChangeFilter,
        filterText: filterText,
        keyName: keyName
      })), _react.default.createElement(_Col.default, {
        xs: 12,
        md: 4
      }, _react.default.createElement(_PaginationOpts.default, {
        labels: labels,
        onRowsPerPageChange: this.onRowsPerPageChange,
        rowsPerPage: rowsPerPage,
        rowsPerPageOption: rowsPerPageOption,
        keyName: keyName
      })), _react.default.createElement(_Col.default, {
        xs: 12,
        md: 4,
        className: "text-right"
      }, _react.default.createElement(_Pagination.default, {
        data: tableBody,
        rowsPerPage: rowsPerPage,
        keyName: keyName,
        currentPage: currentPage,
        onPageNavigate: this.onPageNavigate,
        labels: labels
      })), _react.default.createElement(_Col.default, {
        xs: "12"
      }, _react.default.createElement(_Table.default, {
        className: tableClass
      }, _react.default.createElement(_TableHeader.default, {
        tableHeader: tableHeader,
        keyName: keyName,
        sortedProp: sortedProp,
        onSortChange: this.onSortChange
      }), _react.default.createElement(_TableBody.default, {
        tableHeader: tableHeader,
        keyName: keyName,
        labels: labels,
        data: data
      }))));
    }
  }]);

  return Datatable;
}(_react.default.Component);

Datatable.propTypes = {
  initialSort: _propTypes.default.object,
  onSort: _propTypes.default.object,
  onFilter: _propTypes.default.object,
  rowsPerPage: _propTypes.default.number,
  rowsPerPageOption: _propTypes.default.arrayOf(_propTypes.default.number),
  tableHeader: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  tableBody: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  tableBsClass: _propTypes.default.string,
  keyName: _propTypes.default.string,
  labels: _propTypes.default.object
};
Datatable.defaultProps = {
  initialSort: undefined,
  onSort: undefined,
  onFilter: undefined,
  rowsPerPage: undefined,
  rowsPerPageOption: [],
  tableBsClass: '',
  keyName: 'default',
  labels: {}
};
var _default = Datatable;
exports.default = _default;