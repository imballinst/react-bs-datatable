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

export type RowsPerPageType = number | undefined;
export type RowsPerPageOptionType = number[];
