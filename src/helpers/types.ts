import { CSSProperties } from 'react';

export interface SortType {
  prop?: string;
  isAscending?: boolean;
}

export interface HeaderType {
  prop: string;
  title?: string;
  headerCell?: (icon: React.ReactNode, sortedProp: SortType) => React.ReactNode;
  cell?: (row: any) => React.ReactNode;
  cellProps?: {
    className?: string | ((row: any) => string);
    style?: CSSProperties | ((row: any) => CSSProperties);
  };
  filterable?: boolean;
  sortable?: boolean;
}

export interface TableLabels {
  /** Change the label when there are no results, be it be from normal data or from filter text. */
  noResults?: string;
}

export interface AsyncProps {
  filterText: string;
  sortedProp: SortType;
  rowsPerPage: number;
  currentPage: number;
  maxPage: number;
  onSort: (nextProp: string) => void;
  onPaginate: (nextPage: number) => void;
  onFilter: (text: string) => void;
  onRowsPerPageChange: (numOfPage: number) => void;
}

export interface DatatableProps {
  /** Initial sort of the table. */
  tableHeaders: HeaderType[];
  /** Table data. */
  tableBody: any[];
  /** Initial sort of the table. */
  initialSort?: SortType;
  /** Custom onSort data modifier. */
  onSort?: any;
  /** Custom onFilter data modifier. */
  onFilter?: any;
  /** Handler for asynchronous filter, sort, and pagination. */
  async?: AsyncProps;
  /** Initial rows per page. */
  rowsPerPage?: number;
  /** Rows per page option. */
  rowsPerPageOption?: number[];
  /** Labels/placeholders of the table components. */
  labels?: TableLabels;
  /** On row click event. */
  onRowClick?: (value: any) => void;
}

export interface DatatableState {
  filterable: boolean;
  sortedProp: SortType;
  rowsPerPage?: number;
  currentPage: number;
  filterText: string;
}

export interface Dictionary<DictionaryValue = string> {
  [index: string]: DictionaryValue;
}
