import {
  ColumnProcessObj,
  SortType,
  TableColumnType,
  TableRowType
} from './types';

/**
 * @internal
 *
 * This is the sort function used in the uncontrolled table mode.
 */
export function sortData<TTableRowType extends TableRowType>(
  data: TTableRowType[],
  sortedProp: SortType,
  sortValueObj?: ColumnProcessObj<TTableRowType, number>
) {
  const sortedData = [...data];

  const { prop, order } = sortedProp;
  const sortMultiplier = order === 'asc' ? 1 : -1;
  const sortFn = sortValueObj?.[prop];

  sortedData.sort((a, b) => {
    let quantifiedValue1 = a[prop];
    let quantifiedValue2 = b[prop];

    if (sortFn) {
      quantifiedValue1 = sortFn(quantifiedValue1);
      quantifiedValue2 = sortFn(quantifiedValue2);
    }

    if (quantifiedValue1 < quantifiedValue2) {
      return -1 * sortMultiplier;
    } else if (quantifiedValue1 > quantifiedValue2) {
      return 1 * sortMultiplier;
    }

    return 0;
  });

  return sortedData;
}

/**
 * @internal
 *
 * This is the filter function used in the uncontrolled table mode.
 */
export function filterData<TTableRowType extends TableRowType>(
  data: TTableRowType[],
  headers: Record<string, TableColumnType<TTableRowType>>,
  filterText: string
) {
  if (filterText === '') {
    return data;
  }

  const lowercased = filterText.toLowerCase();

  return data.filter((element) => {
    let isElementIncluded = false;

    for (const key in headers) {
      const header = headers[key];

      if (header.isFilterable) {
        let columnValue = element[header.prop];

        // Only process non-null values.
        if (columnValue !== null && columnValue !== undefined) {
          if (typeof columnValue !== 'string') {
            // Convert to string if it is not a string.
            columnValue = columnValue.toString();
          }

          columnValue = columnValue.toLowerCase();
          isElementIncluded = columnValue.includes(lowercased);

          if (isElementIncluded) {
            break;
          }
        }
      }
    }

    return isElementIncluded;
  });
}

/**
 * @internal
 *
 * This is the paginate function used in the uncontrolled table mode.
 */
export function paginateData<TTableRowType extends TableRowType>(
  data: TTableRowType[],
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

/**
 * @internal
 *
 * This is a helper function to get the next sort state.
 */
export function getNextSortState(oldSort: SortType, sortedProp: string) {
  const nextSort: SortType = { order: 'asc', prop: sortedProp };
  if (sortedProp === oldSort.prop) {
    nextSort.order = oldSort.order === 'asc' ? 'desc' : 'asc';
  }

  return nextSort;
}
