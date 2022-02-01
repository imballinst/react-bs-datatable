import {
  ColumnProcessObj,
  TableColumnType,
  SortType,
  TableRowType
} from './types';

export function sortData<TTableRowType extends TableRowType>(
  data: TTableRowType[],
  sortedProp: SortType,
  sortValueObj?: ColumnProcessObj<(row: TTableRowType) => number | string>
) {
  const sortedData = [...data];

  const { prop, order } = sortedProp;
  const sortMultiplier = order === 'asc' ? 1 : -1;

  sortedData.sort((a, b) => {
    let quantifiedValue1 = a[prop];
    let quantifiedValue2 = b[prop];

    if (sortValueObj?.[prop]) {
      quantifiedValue1 = sortValueObj[prop](quantifiedValue1);
      quantifiedValue2 = sortValueObj[prop](quantifiedValue2);
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
  filterValueObj?: ColumnProcessObj<(row: TTableRowType) => number | string>
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

      if (tableHeaders[prop].isFilterable) {
        let columnValue = element[prop];

        if (filterValueObj?.[prop]) {
          columnValue = filterValueObj[prop](columnValue);
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
