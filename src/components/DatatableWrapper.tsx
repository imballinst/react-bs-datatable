import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import { filterData, paginateData, sortData } from '../helpers/data';
import { HeaderType } from '../TableHeader';

export interface SortType {
  prop: string;
  order: 'asc' | 'desc';
}

interface FilterProps<T> {
  // Uncontrolled.
  filterFn?: (row: T) => boolean;
  // Controlled.
  state?: {
    filter: string;
  };
  asyncFn?: (nextState: string) => void;
}

interface SortProps<T> {
  // Uncontrolled.
  sortFn?: (a: T, b: T) => 0 | -1 | 1;
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
  // Controlled.
  state?: {
    rowsPerPage: number;
    options: number[];
  };
  asyncFn?: (nextState: number) => void;
}

// Context types.
interface DatatableWrapperContextType<T> {
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
  data: T[];
}

const DatatableWrapperContext =
  createContext<DatatableWrapperContextType<any> | undefined>(undefined);

export function useDatatableWrapper() {
  return useContext(DatatableWrapperContext);
}

// Main wrapper.
export interface DatatableWrapperProps<T> {
  children: ReactNode;
  headers: HeaderType<T>[];
  body: T[];
  filterProps?: FilterProps<T>;
  sortProps?: SortProps<T>;
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

export function DatatableWrapper<T = any>({
  filterProps,
  headers,
  body,
  sortProps,
  paginationProps,
  paginationOptionsProps,
  children
}: DatatableWrapperProps<T>) {
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
      if (typeof filterProps?.asyncFn === 'function') {
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
      if (typeof paginationProps?.asyncFn === 'function') {
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
      if (typeof paginationOptionsProps?.asyncFn === 'function') {
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
      if (typeof sortProps?.asyncFn === 'function') {
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
  let maxPage = -1;

  if (paginationProps?.state?.maxPage === undefined) {
    const { filter, sort, pagination } = state;

    data = filterData(body, headers, filter, filterProps?.filterFn);
    data = sortData(data, sort, sortProps?.sortFn);

    if (pagination.rowsPerPage !== -1) {
      // Pagination needs.
      data = paginateData(data, pagination.currentPage, pagination.rowsPerPage);
      maxPage = Math.ceil(body.length / pagination.rowsPerPage);
    }
  } else {
    maxPage = paginationProps?.state?.maxPage;
  }

  return (
    <DatatableWrapperContext.Provider
      value={{
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
    </DatatableWrapperContext.Provider>
  );
}
