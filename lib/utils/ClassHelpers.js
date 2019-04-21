"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paginateData = exports.filterData = exports.sortData = exports.isPropFilterable = exports.getLastChildren = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getLastChildren = function getLastChildren(reactElement) {
  var isReactElement = _react.default.isValidElement(reactElement);

  return isReactElement ? getLastChildren(reactElement.props.children) : reactElement;
};

exports.getLastChildren = getLastChildren;

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

exports.isPropFilterable = isPropFilterable;

var sortData = function sortData(sortedProp, onSort, data) {
  var sortedData = data;

  if (sortedProp.prop !== undefined) {
    var prop = sortedProp.prop,
        isAscending = sortedProp.isAscending;
    var sortMultiplier = isAscending ? 1 : -1;
    sortedData = sortedData.sort(function (a, b) {
      var quantifiedValue1 = getLastChildren(a[prop]);
      var quantifiedValue2 = getLastChildren(b[prop]); // if onSort use the onSort[prop] function
      // this is a handler for custom objects, such as Date

      if (onSort && typeof onSort[prop] === 'function') {
        return onSort[prop](quantifiedValue1, quantifiedValue2);
      }

      if (quantifiedValue1 < quantifiedValue2) {
        return -1 * sortMultiplier;
      } else if (quantifiedValue1 > quantifiedValue2) {
        return 1 * sortMultiplier;
      }

      return 0;
    });
  }

  return sortedData;
};

exports.sortData = sortData;

var filterData = function filterData(tableHeader, filterText, onFilter, data) {
  var filteredData = data;

  if (filterText !== '') {
    filteredData = filteredData.filter(function (element) {
      var isElementIncluded = false;
      var i = 0;
      var elementProps = Object.keys(element);
      var elementPropLength = elementProps.length;

      while (!isElementIncluded && i < elementPropLength) {
        var prop = elementProps[i];

        if (isPropFilterable(tableHeader, prop)) {
          var columnValue = element[prop]; // Get last children and fill columnValue with empty string if undefined

          columnValue = getLastChildren(columnValue) || '';

          if (onFilter && typeof onFilter[prop] === 'function') {
            columnValue = onFilter[prop](columnValue);
          } else if (typeof columnValue !== 'string') {
            // Convert to string if it is not a string
            columnValue = columnValue.toString();
          }

          columnValue = columnValue.toLowerCase(); // If filterText is string/substring of columnValue

          isElementIncluded = columnValue.includes(filterText.toLowerCase());
        }

        i += 1;
      }

      return isElementIncluded;
    });
  }

  return filteredData;
};

exports.filterData = filterData;

var paginateData = function paginateData(rowsPerPage, currentPage, data) {
  var paginatedData = data;

  if (rowsPerPage !== undefined) {
    var startRow = (currentPage - 1) * rowsPerPage;
    var endRow = currentPage * rowsPerPage;
    paginatedData = data.slice(startRow, endRow);
  }

  return paginatedData;
};

exports.paginateData = paginateData;