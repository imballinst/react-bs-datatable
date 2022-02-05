import {
  ColumnProcessObj,
  TableColumnType,
  SortType,
  TableRowType
} from './types';

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
      quantifiedValue1 = sortFn(`${quantifiedValue1}`);
      quantifiedValue2 = sortFn(`${quantifiedValue2}`);
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

export function filterData<TTableRowType extends TableRowType>(
  data: TTableRowType[],
  tableHeaders: Record<string, TableColumnType<TTableRowType>>,
  filterText: string,
  filterValueObj?: ColumnProcessObj<TTableRowType>
) {
  if (filterText === '') {
    return data;
  }

  const lowercased = filterText.toLowerCase();

  return data.filter((element) => {
    let isElementIncluded = false;
    let i = 0;

    const elementProps = Object.keys(element);
    const elementPropLength = elementProps.length;

    while (!isElementIncluded && i < elementPropLength) {
      const prop = elementProps[i];
      const filterFn = filterValueObj?.[prop];

      if (tableHeaders[prop].isFilterable) {
        let columnValue = element[prop];

        if (filterFn) {
          columnValue = filterFn(columnValue);
        } else if (typeof columnValue !== 'string') {
          // Convert to string if it is not a string
          columnValue = columnValue.toString();
        }

        columnValue = columnValue.toLowerCase();
        isElementIncluded = columnValue.includes(lowercased);

        if (isElementIncluded) {
          break;
        }
      }

      i += 1;
    }

    return isElementIncluded;
  });
}

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
