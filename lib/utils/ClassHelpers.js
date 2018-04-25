'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paginateData = exports.filterData = exports.sortData = exports.isPropFilterable = exports.getLastChildren = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _filter2 = require('lodash/filter');

var _filter3 = _interopRequireDefault(_filter2);

var _orderBy2 = require('lodash/orderBy');

var _orderBy3 = _interopRequireDefault(_orderBy2);

var _includes2 = require('lodash/includes');

var _includes3 = _interopRequireDefault(_includes2);

var _keys2 = require('lodash/keys');

var _keys3 = _interopRequireDefault(_keys2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getLastChildren = function getLastChildren(reactElement) {
  var isReactElement = _react2.default.isValidElement(reactElement);

  return isReactElement ? getLastChildren(reactElement.props.children) : reactElement;
};

var isPropFilterable = function isPropFilterable(tableHeader, prop) {
  var i = 0;
  var found = false;
  var isFilterable = false;

  while (!found && i < tableHeader.length) {
    if (tableHeader[i].prop === prop) {
      found = true;

      if (tableHeader[i].filterable === true) {
        isFilterable = true;
      }
    }

    i += 1;
  }

  return isFilterable;
};

var sortData = function sortData(sortedProp, onSort, data) {
  var sortedData = data;

  if (sortedProp !== {}) {
    var prop = sortedProp.prop,
        isAscending = sortedProp.isAscending;

    var sortMultiplier = isAscending ? 'asc' : 'desc';

    sortedData = (0, _orderBy3.default)(sortedData, function (value) {
      var quantifiedValue = getLastChildren(value[prop]);

      // if onSort use the onSort[prop] function
      // this is a handler for custom objects, such as Date
      if (onSort && typeof onSort[prop] === 'function') {
        quantifiedValue = onSort[prop](quantifiedValue);
      }

      return quantifiedValue;
    }, sortMultiplier);
  }

  return sortedData;
};

var filterData = function filterData(tableHeader, filterText, onFilter, data) {
  var filteredData = data;

  if (filterText !== '') {
    filteredData = (0, _filter3.default)(filteredData, function (element) {
      var isElementIncluded = false;
      var i = 0;

      var elementProps = (0, _keys3.default)(element);
      var elementPropLength = elementProps.length;

      while (!isElementIncluded && i < elementPropLength) {
        var prop = elementProps[i];

        if (isPropFilterable(tableHeader, prop)) {
          var columnValue = element[prop];

          // Get last children and fill columnValue with empty string if undefined
          columnValue = getLastChildren(columnValue) || '';

          if (onFilter && typeof onFilter[prop] === 'function') {
            columnValue = onFilter[prop](columnValue);
          } else if (typeof columnValue !== 'string') {
            // Convert to string if it is not a string
            columnValue = columnValue.toString();
          }

          columnValue = columnValue.toLowerCase();

          // If filterText is string/substring of columnValue
          isElementIncluded = (0, _includes3.default)(columnValue, filterText.toLowerCase());
        }

        i += 1;
      }

      return isElementIncluded;
    });
  }

  return filteredData;
};

var paginateData = function paginateData(rowsPerPage, currentPage, data) {
  var paginatedData = data;

  if (rowsPerPage !== undefined) {
    var startRow = (currentPage - 1) * rowsPerPage;
    var endRow = currentPage * rowsPerPage;

    paginatedData = data.slice(startRow, endRow);
  }

  return paginatedData;
};

exports.getLastChildren = getLastChildren;
exports.isPropFilterable = isPropFilterable;
exports.sortData = sortData;
exports.filterData = filterData;
exports.paginateData = paginateData;