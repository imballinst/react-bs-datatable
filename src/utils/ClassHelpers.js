import React from 'react';
import _filter from 'lodash/filter';
import _orderBy from 'lodash/orderBy';
import _includes from 'lodash/includes';
import _keys from 'lodash/keys';

const getLastChildren = (reactElement) => {
  const isReactElement = React.isValidElement(reactElement);

  return isReactElement ? getLastChildren(reactElement.props.children) : reactElement;
};

const isPropFilterable = (tableHeader, prop) => {
  let i = 0;
  let found = false;
  let isFilterable = false;

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

const sortData = (sortedProp, onSort, data) => {
  let sortedData = data;

  if (sortedProp !== {}) {
    const { prop, isAscending } = sortedProp;
    const sortMultiplier = (isAscending) ? 'asc' : 'desc';

    sortedData = _orderBy(sortedData, (value) => {
      let quantifiedValue = getLastChildren(value[prop]);

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

const filterData = (tableHeader, filterText, onFilter, data) => {
  let filteredData = data;

  if (filterText !== '') {
    filteredData = _filter(filteredData, (element) => {
      let isElementIncluded = false;
      let i = 0;

      const elementProps = _keys(element);
      const elementPropLength = elementProps.length;

      while (!isElementIncluded && (i < elementPropLength)) {
        const prop = elementProps[i];

        if (isPropFilterable(tableHeader, prop)) {
          let columnValue = element[prop];

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
          isElementIncluded = _includes(columnValue, filterText.toLowerCase());
        }

        i += 1;
      }

      return isElementIncluded;
    });
  }

  return filteredData;
};

const paginateData = (rowsPerPage, currentPage, data) => {
  let paginatedData = data;

  if (rowsPerPage !== undefined) {
    const startRow = (currentPage - 1) * rowsPerPage;
    const endRow = currentPage * rowsPerPage;

    paginatedData = data.slice(startRow, endRow);
  }

  return paginatedData;
};

export {
  getLastChildren,
  isPropFilterable,
  sortData,
  filterData,
  paginateData,
};
