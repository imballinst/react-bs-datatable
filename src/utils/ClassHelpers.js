import React from 'react';

const getLastChildren = reactElement => {
  const isReactElement = React.isValidElement(reactElement);

  return isReactElement
    ? getLastChildren(reactElement.props.children)
    : reactElement;
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
  let sortedData = [...data];

  if (sortedProp.prop !== undefined) {
    const { prop, isAscending } = sortedProp;
    const sortMultiplier = isAscending ? 1 : -1;

    sortedData = sortedData.sort((a, b) => {
      const quantifiedValue1 = getLastChildren(a[prop]);
      const quantifiedValue2 = getLastChildren(b[prop]);

      // if onSort use the onSort[prop] function
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

const filterData = (tableHeader, filterText, onFilter, data) => {
  let filteredData = [...data];

  if (filterText !== '') {
    filteredData = filteredData.filter(element => {
      let isElementIncluded = false;
      let i = 0;

      const elementProps = Object.keys(element);
      const elementPropLength = elementProps.length;

      while (!isElementIncluded && i < elementPropLength) {
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
          isElementIncluded = columnValue.includes(filterText.toLowerCase());
        }

        i += 1;
      }

      return isElementIncluded;
    });
  }

  return filteredData;
};

const paginateData = (rowsPerPage, currentPage, data) => {
  let paginatedData = [...data];

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
  paginateData
};
