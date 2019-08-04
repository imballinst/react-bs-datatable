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
    return _Pagination["default"];
  }
});
Object.defineProperty(exports, "PaginationOpts", {
  enumerable: true,
  get: function get() {
    return _PaginationOpts["default"];
  }
});
Object.defineProperty(exports, "TableHeader", {
  enumerable: true,
  get: function get() {
    return _TableHeader["default"];
  }
});
Object.defineProperty(exports, "TableBody", {
  enumerable: true,
  get: function get() {
    return _TableBody["default"];
  }
});
Object.defineProperty(exports, "Filter", {
  enumerable: true,
  get: function get() {
    return _Filter["default"];
  }
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/** Datatable Component */
function Datatable(_ref) {
  var initialSort = _ref.initialSort,
      onSort = _ref.onSort,
      onFilter = _ref.onFilter,
      rowsPerPage = _ref.rowsPerPage,
      rowsPerPageOption = _ref.rowsPerPageOption,
      tableHeader = _ref.tableHeader,
      tableBody = _ref.tableBody,
      tableBsClass = _ref.tableBsClass,
      labels = _ref.labels;

  var _useState = (0, _react.useState)(function () {
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


    return {
      sortedProp: defaultSort,
      rowsPerPage: defaultRowsPerPage,
      currentPage: 1,
      filterText: ''
    };
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  (0, _react.useEffect)(function () {
    // Resets the table if the data passed down is different.
    if (tableBody !== undefined) {
      setState(function (oldState) {
        return _objectSpread({}, oldState, {
          filterText: '',
          currentPage: 1,
          rowsPerPage: rowsPerPage
        });
      });
    }
  }, [tableBody, rowsPerPage]);

  function onChangeFilter(text) {
    setState(function (oldState) {
      return _objectSpread({}, oldState, {
        filterText: text,
        currentPage: 1
      });
    });
  }

  function onPageNavigate(nextPage) {
    return function () {
      setState(function (oldState) {
        return _objectSpread({}, oldState, {
          currentPage: nextPage
        });
      });
    };
  }

  function onRowsPerPageChange(numOfPage) {
    return function () {
      setState(function (oldState) {
        return _objectSpread({}, oldState, {
          rowsPerPage: parseInt(numOfPage, 10),
          currentPage: 1
        });
      });
    };
  }

  function onSortChange(nextProp) {
    return function () {
      var nextSort = state.sortedProp;

      if (nextProp !== state.sortedProp.prop) {
        nextSort.prop = nextProp;
        nextSort.isAscending = true;
      } else {
        nextSort.isAscending = !state.sortedProp.isAscending;
      }

      setState(function (oldState) {
        return _objectSpread({}, oldState, {
          sortedProp: nextSort
        });
      });
    };
  }

  function processData() {
    var sortedProp = state.sortedProp,
        filterText = state.filterText,
        rowsPerPage = state.rowsPerPage,
        currentPage = state.currentPage;
    var filteredData = (0, _ClassHelpers.filterData)(tableHeader, filterText, onFilter, tableBody);
    var sortedData = (0, _ClassHelpers.sortData)(sortedProp, onSort, filteredData);
    var paginatedData = (0, _ClassHelpers.paginateData)(rowsPerPage, currentPage, sortedData);
    return paginatedData;
  }

  var data = processData(tableHeader, tableBody, onSort, onFilter);
  var tableClass = (0, _classnames["default"])("table-datatable", tableBsClass);
  return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(_Row["default"], {
    className: "controlRow"
  }, _react["default"].createElement(_Col["default"], {
    xs: 12,
    md: 4
  }, _react["default"].createElement(_Filter["default"], {
    tableHeader: tableHeader,
    placeholder: labels.filterPlaceholder,
    onChangeFilter: onChangeFilter,
    filterText: state.filterText
  })), _react["default"].createElement(_Col["default"], {
    xs: 12,
    md: 4
  }, _react["default"].createElement(_PaginationOpts["default"], {
    labels: labels,
    onRowsPerPageChange: onRowsPerPageChange,
    rowsPerPage: state.rowsPerPage,
    rowsPerPageOption: rowsPerPageOption
  })), _react["default"].createElement(_Col["default"], {
    xs: 12,
    md: 4,
    className: "text-right"
  }, _react["default"].createElement(_Pagination["default"], {
    data: tableBody,
    rowsPerPage: state.rowsPerPage,
    currentPage: state.currentPage,
    onPageNavigate: onPageNavigate,
    labels: labels
  }))), _react["default"].createElement(_Row["default"], null, _react["default"].createElement(_Col["default"], {
    xs: "12"
  }, _react["default"].createElement(_Table["default"], {
    className: tableClass
  }, _react["default"].createElement(_TableHeader["default"], {
    tableHeader: tableHeader,
    sortedProp: state.sortedProp,
    onSortChange: onSortChange
  }), _react["default"].createElement(_TableBody["default"], {
    tableHeader: tableHeader,
    labels: labels,
    data: data
  })))));
}

Datatable.propTypes = {
  /** Initial sort of the table */
  initialSort: _propTypes["default"].object,
  onSort: _propTypes["default"].object,
  onFilter: _propTypes["default"].object,
  rowsPerPage: _propTypes["default"].number,
  rowsPerPageOption: _propTypes["default"].arrayOf(_propTypes["default"].number),
  tableHeader: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  tableBody: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  tableBsClass: _propTypes["default"].string,
  labels: _propTypes["default"].object
};
Datatable.defaultProps = {
  initialSort: undefined,
  onSort: undefined,
  onFilter: undefined,
  rowsPerPage: undefined,
  rowsPerPageOption: [],
  tableBsClass: '',
  labels: {}
};
var _default = Datatable;
exports["default"] = _default;