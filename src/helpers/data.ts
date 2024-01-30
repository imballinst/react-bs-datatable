import {
  ColumnValueProcessor,
  SortType,
  TableColumnType,
  TableRowType
} from './types';
import { el } from 'date-fns/locale';

/**
 * @internal
 *
 * This is the sort function used in the uncontrolled table mode.
 */
export function sortData<TTableRowType extends TableRowType>(
  data: TTableRowType[],
  sortedProp: SortType,
  columnValueProcessor?: ColumnValueProcessor<TTableRowType>
) {
  const sortedData = [...data];

  const { prop, order } = sortedProp;
  const sortMultiplier = order === 'asc' ? 1 : -1;

  const sortFnFromObject =
    typeof columnValueProcessor === 'object'
      ? columnValueProcessor?.[prop]
      : undefined;
  const sortFnFromFn =
    typeof columnValueProcessor === 'function'
      ? (value: any) => columnValueProcessor(prop, value)
      : undefined;

  sortedData.sort((a, b) => {
    let quantifiedValue1 = extractValueFromObject(prop, a);
    let quantifiedValue2 = extractValueFromObject(prop, b);

    if (sortFnFromObject) {
      quantifiedValue1 = sortFnFromObject(quantifiedValue1);
      quantifiedValue2 = sortFnFromObject(quantifiedValue2);
    } else if (sortFnFromFn) {
      quantifiedValue1 = sortFnFromFn(a);
      quantifiedValue2 = sortFnFromFn(b);
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

export function extractValueFromObject(prop: string, rowData:any) {
  return prop.split('.').reduce((a, b) => {
    if (a) {
      return a[b];
    }
    return undefined;
  }, rowData);
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
        let columnValue = extractValueFromObject(header.prop,element);

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
