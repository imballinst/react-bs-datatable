import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { filterData, paginateData, sortData } from '../helpers/data';
import { createCtx } from '../helpers/react';
import { ColumnProcessObj, SortType } from '../helpers/types';
import { HeaderType } from '../helpers/types';

interface FilterProps<TTableRowType> {
  // Uncontrolled.
  filterValueObj?: ColumnProcessObj<(row: TTableRowType) => string>;
  // Controlled.
  state?: {
    filter: string;
  };
  asyncFn?: (nextState: string) => void;
}

interface SortProps<TTableRowType> {
  // Uncontrolled.
  sortValueObj?: ColumnProcessObj<(row: TTableRowType) => string>;
  // Controlled.
  state?: SortType;
  asyncFn?: (nextState: SortType) => void;
}

interface PaginationProps {
  // Controlled.
  state?: {
    page?: number;
    maxPage?: number;
  };
  asyncFn?: (nextState: number) => void;
}

interface PaginationOptionsProps {
  paginationAlwaysVisible?: boolean;
  // Controlled.
  state?: {
    rowsPerPage: number;
    options: number[];
  };
  asyncFn?: (nextState: number) => void;
}

// Context types.
interface DatatableWrapperContextType<TTableRowType> {
  // Things passed to other components.
  headers: HeaderType<TTableRowType>[];
  // Filter.
  isFilterable: boolean;
  filterState: string;
  onFilterChange: (nextState: string) => void;
  // Sort.
  sortState: SortType;
  onSortChange: (nextState: SortType) => void;
  // Pagination.
  currentPageState: number;
  onPaginationChange: (nextState: number) => void;
  // Pagination options.
  rowsPerPageState: number;
  rowsPerPageOptions: number[];
  onRowsPerPageChange: (nextState: number) => void;
  // Data.
  maxPage: number;
  data: TTableRowType[];
}

const [useCtx, Provider] = createCtx<DatatableWrapperContextType<any>>();

export const useDatatableWrapper = useCtx;

// Main wrapper.
export interface DatatableWrapperProps<TTableRowType> {
  children: ReactNode;
  headers: HeaderType<TTableRowType>[];
  body: TTableRowType[];
  filterProps?: FilterProps<TTableRowType>;
  sortProps?: SortProps<TTableRowType>;
  paginationProps?: PaginationProps;
  paginationOptionsProps?: PaginationOptionsProps;
}

interface DatatableState {
  isFilterable: boolean;
  sort: SortType;
  pagination: {
    // If this is -1, it means show all rows.
    rowsPerPage: number;
    currentPage: number;
    rowsPerPageOptions: number[];
  };
  filter: string;
}

export function DatatableWrapper<TTableRowType = any>({
  filterProps,
  headers,
  body,
  sortProps,
  paginationProps,
  paginationOptionsProps,
  children
}: DatatableWrapperProps<TTableRowType>) {
  const [state, setState] = useState<DatatableState>(() => {
    const defaultSort: SortType = { order: 'asc', prop: '' };
    let isFilterable = filterProps !== undefined;

    for (const header of headers) {
      // Get the first table header with the sort attribute.
      if (
        defaultSort.prop === '' &&
        header.prop === sortProps?.state?.prop &&
        header.isSortable
      ) {
        defaultSort.prop = header.prop;
      }

      if (header.isFilterable) {
        isFilterable = true;
      }
    }

    // Define initial state.
    return {
      isFilterable,
      filter: filterProps?.state?.filter || '',
      sort: defaultSort,
      pagination: {
        currentPage: paginationProps?.state?.page || 1,
        rowsPerPage: paginationOptionsProps?.state?.rowsPerPage || -1,
        rowsPerPageOptions: paginationOptionsProps?.state?.options || []
      }
    };
  });

  useEffect(() => {
    // Resets the table if the data passed down is different.
    if (body !== undefined) {
      setState((oldState) => ({
        ...oldState,
        filterText: '',
        currentPage: 1
      }));
    }
  }, [body]);

  const onFilterChange = useCallback(
    (text: string) => {
      if (filterProps?.asyncFn) {
        filterProps.asyncFn(text);
      } else {
        setState((oldState) => ({
          ...oldState,
          filterText: text,
          currentPage: 1
        }));
      }
    },
    [filterProps?.asyncFn]
  );

  const onPaginationChange = useCallback(
    (nextPage: number) => {
      if (paginationProps?.asyncFn) {
        paginationProps.asyncFn(nextPage);
      } else {
        setState((oldState) => ({
          ...oldState,
          currentPage: nextPage
        }));
      }
    },
    [paginationProps?.asyncFn]
  );

  const onRowsPerPageChange = useCallback(
    (numOfPage: number) => {
      if (paginationOptionsProps?.asyncFn) {
        paginationOptionsProps.asyncFn(numOfPage);
      } else {
        setState((oldState) => ({
          ...oldState,
          rowsPerPage: numOfPage,
          currentPage: 1
        }));
      }
    },
    [paginationOptionsProps?.asyncFn]
  );

  const onSortChange = useCallback(
    (nextSort: SortType) => {
      if (sortProps?.asyncFn) {
        sortProps.asyncFn(nextSort);
      } else {
        setState((oldState) => ({
          ...oldState,
          sort: nextSort
        }));
      }
    },
    [sortProps?.asyncFn]
  );

  let data = body;
  let maxPage = 1;

  if (paginationProps?.state?.maxPage === undefined) {
    const { filter, sort, pagination } = state;

    data = filterData(body, headers, filter, filterProps?.filterValueObj);
    data = sortData(data, sort, sortProps?.sortValueObj);

    if (pagination.rowsPerPage !== -1) {
      // Pagination needs.
      data = paginateData(data, pagination.currentPage, pagination.rowsPerPage);
      maxPage = Math.ceil(body.length / pagination.rowsPerPage);
    }
  } else {
    maxPage = paginationProps?.state?.maxPage;
  }

  return (
    <Provider
      value={{
        headers,
        // Filter.
        isFilterable: state.isFilterable,
        filterState: state.filter,
        onFilterChange,
        // Sort.
        sortState: state.sort,
        onSortChange,
        // Pagination.
        currentPageState: state.pagination.currentPage,
        onPaginationChange,
        // Pagination options.
        rowsPerPageState: state.pagination.rowsPerPage,
        rowsPerPageOptions: state.pagination.rowsPerPageOptions,
        onRowsPerPageChange,
        // Data.
        maxPage,
        data
      }}
    >
      {children}
    </Provider>
  );
}
