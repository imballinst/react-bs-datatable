import { FilterGroupFunctionComponent } from '../Filter';
import { PaginationOptsGroupFunctionComponent } from '../PaginationOpts';

export type SortType = {
  prop?: string;
  isAscending?: boolean;
};

export type HeaderType = {
  prop: string;
  title?: string;
  cell?: any;
  filterable?: boolean;
  sortable?: boolean;
};

export type OnRowClick = (value: any) => void;

export type LabelType = {
  first?: string;
  last?: string;
  prev?: string;
  next?: string;
  show?: string;
  entries?: string;
  noResults?: string;
  filterPlaceholder?: string;
};

export type TableClasses = {
  controlRow?: string;
  // Filter.
  filterCol?: string;
  filterInputGroup?: string;
  filterFormControl?: string;
  filterClearButton?: string;
  // Pagination options.
  paginationOptsCol?: string;
  paginationOptsForm?: string;
  paginationOptsFormGroup?: string;
  paginationOptsFormText?: string;
  paginationOptsFormControl?: string;
  // Pagination.
  paginationCol?: string;
  paginationButtonGroup?: string;
  paginationButton?: string;
  // Table.
  table?: string;
  thead?: string;
  theadRow?: string;
  theadCol?: string;
  tbody?: string;
  tbodyRow?: string;
  tbodyCol?: string;
};

type TableComponentType = React.ElementType<any> | string;
export type TableComponents = {
  // Global.
  Row: TableComponentType;
  Col: TableComponentType;
  Button: TableComponentType;
  // Table.
  Table: TableComponentType;
  TableHead: TableComponentType;
  TableBody: TableComponentType;
  TableRow: TableComponentType;
  TableCell: TableComponentType;
  // Filter.
  FilterGroup?: FilterGroupFunctionComponent;
  // Pagination.
  ButtonGroup: TableComponentType;
  // Pagination options.
  PaginationOptsGroup?: PaginationOptsGroupFunctionComponent;
  // Icons.
  SortIcon: TableComponentType;
};

export type RowsPerPageType = number | undefined;
export type RowsPerPageOptionType = number[];

export type AsyncProps = {
  filterText: string;
  sortedProp: SortType;
  rowsPerPage: number;
  currentPage: number;
  maxPage: number;
  onSort: (nextProp: string) => {};
  onPaginate: (nextPage: number) => {};
  onFilter: (text: string) => {};
  onRowsPerPageChange: (numOfPage: RowsPerPageType) => {};
};

export type DatatableProps = {
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
  /** Custom classes of the table components. */
  classes?: TableClasses;
  /** Handler for asynchronous filter, sort, and pagination. */
  async?: AsyncProps;
  /** Initial rows per page. */
  rowsPerPage?: RowsPerPageType;
  /** Rows per page option. */
  rowsPerPageOption?: RowsPerPageOptionType;
  /** Labels/placeholders of the table components. */
  labels?: LabelType;
  /** Custom table components. */
  Components?: TableComponents;
  /** On row click event. */
  onRowClick?: OnRowClick;
};

export type DatatableState = {
  filterable: boolean;
  sortedProp: SortType;
  rowsPerPage: RowsPerPageType;
  currentPage: number;
  filterText: string;
};
