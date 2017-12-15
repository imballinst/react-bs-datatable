import React from 'react';
import _filter from 'lodash/filter';
import _orderBy from 'lodash/orderBy';
import _includes from 'lodash/includes';
import _keys from 'lodash/keys';

var getLastChildren = function getLastChildren(reactElement) {
  var isReactElement = React.isValidElement(reactElement);

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

    sortedData = _orderBy(sortedData, function (value) {
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

var filterData = function filterData(tableHeader, filterText, data) {
  var filteredData = data;

  if (filterText !== '') {
    filteredData = _filter(filteredData, function (element) {
      var isElementIncluded = false;
      var i = 0;

      var elementProps = _keys(element);
      var elementPropLength = elementProps.length;

      while (!isElementIncluded && i < elementPropLength) {
        if (isPropFilterable(tableHeader, elementProps[i])) {
          var columnValue = element[elementProps[i]];

          // Get last children and fill columnValue with empty string if undefined
          columnValue = getLastChildren(columnValue) || '';

          // Convert to string if it is a number
          if (typeof columnValue === 'number') {
            columnValue = columnValue.toString();
          }

          columnValue = columnValue.toLowerCase();

          // If filterText is string/substring of columnValue
          isElementIncluded = _includes(columnValue, filterText.toLowerCase());
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

export { getLastChildren, isPropFilterable, sortData, filterData, paginateData };