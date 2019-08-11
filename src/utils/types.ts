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
  filterCol?: string;
  filter?: string;
  paginationOptsCol?: string;
  paginationOpts?: string;
  paginationCol?: string;
  pagination?: string;
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
