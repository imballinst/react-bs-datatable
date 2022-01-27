import { HeaderType, SortType } from './types';

export function isPropFilterable(tableHeaders: HeaderType[], prop: string) {
  const headersLength = tableHeaders.length;
  let i = 0;
  let found = false;
  let isFilterable = false;

  while (!found && i < headersLength) {
    if (tableHeaders[i].prop === prop) {
      found = true;

      if (tableHeaders[i].filterable === true) {
        isFilterable = true;
      }
    }

    i += 1;
  }

  return isFilterable;
}

export function sortData(data: any[], sortedProp: SortType, onSort?: any) {
  let sortedData = [...data];

  if (sortedProp.prop !== undefined) {
    const { prop, isAscending } = sortedProp;
    const sortMultiplier = isAscending ? 1 : -1;

    sortedData = sortedData.sort((a, b) => {
      let quantifiedValue1 = a[prop];
      let quantifiedValue2 = b[prop];

      // if onSort use the onSort[prop] function
      // this is a handler for custom objects, such as Date.
      if (onSort && typeof onSort[prop] === 'function') {
        quantifiedValue1 = onSort[prop](quantifiedValue1);
        quantifiedValue2 = onSort[prop](quantifiedValue2);
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
}

export function filterData(
  data: any[],
  tableHeaders: HeaderType[],
  filterText: string,
  onFilter?: any
) {
  let filteredData = [...data];

  if (filterText !== '') {
    filteredData = filteredData.filter((element) => {
      let isElementIncluded = false;
      let i = 0;

      const elementProps = Object.keys(element);
      const elementPropLength = elementProps.length;

      while (!isElementIncluded && i < elementPropLength) {
        const prop = elementProps[i];

        if (isPropFilterable(tableHeaders, prop)) {
          let columnValue = element[prop];

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
}

export function paginateData(
  data: any[],
  currentPage: number,
  rowsPerPage?: number
) {
  let paginatedData = [...data];

  if (rowsPerPage !== undefined) {
    const startRow = (currentPage - 1) * rowsPerPage;
    const endRow = currentPage * rowsPerPage;

    paginatedData = data.slice(startRow, endRow);
  }

  return paginatedData;
}
