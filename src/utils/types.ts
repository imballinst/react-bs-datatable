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

export type RowsPerPageType = number | undefined;
export type RowsPerPageOptionType = number[];
