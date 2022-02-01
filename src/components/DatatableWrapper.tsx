import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { filterData, paginateData, sortData } from '../helpers/data';
import { convertArrayToRecord } from '../helpers/object';
import { createCtx } from '../helpers/react';
import { ColumnProcessObj, SortType } from '../helpers/types';
import { TableColumnType } from '../helpers/types';

interface FilterProps<TTableRowType> {
  // Uncontrolled.
  filterValueObj?: ColumnProcessObj<TTableRowType>;
  // Controlled.
  state?: {
    filter: string;
  };
  asyncFn?: (nextState: string) => void;
}

interface SortProps<TTableRowType> {
  // Uncontrolled.
  sortValueObj?: ColumnProcessObj<TTableRowType>;
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
interface DatatableWrapperContextType<TTableRowType> {
  // Things passed to other components.
  headers: TableColumnType<TTableRowType>[];
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
  filteredDataLength: number;
  data: TTableRowType[];
}

const [useCtx, Provider] = createCtx<DatatableWrapperContextType<any>>();

export const useDatatableWrapper = useCtx;

// Main wrapper.
export interface DatatableWrapperProps<TTableRowType> {
  children: ReactNode;
  headers: TableColumnType<TTableRowType>[];
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
  const [state, setState] = useState<DatatableState>(
    getDefaultDatatableState({
      filterProps,
      headers,
      sortProps,
      paginationProps,
      paginationOptionsProps
    })
  );
  const tableHeadersRecordRef = useRef(convertArrayToRecord(headers, 'prop'));
  // Store this in a ref because we might need it in case `headers` change.
  // Though, we don't want to put these into `useEffect` because they most likely
  // change over time.
  const controlPropsRef = useRef({
    filterProps,
    sortProps,
    paginationProps,
    paginationOptionsProps
  });

  useEffect(() => {
    // Resets the table if the headers passed down is different.
    if (headers !== undefined) {
      // Re-set the ref.
      tableHeadersRecordRef.current = convertArrayToRecord(headers, 'prop');
      // Re-set the initial state.
      setState(
        getDefaultDatatableState({
          filterProps: controlPropsRef.current.filterProps,
          headers,
          sortProps: controlPropsRef.current.sortProps,
          paginationProps: controlPropsRef.current.paginationProps,
          paginationOptionsProps: controlPropsRef.current.paginationOptionsProps
        })
      );
    }
  }, [headers]);

  useEffect(() => {
    // Resets the table if the data passed down is different.
    if (body !== undefined) {
      setState((oldState) => ({
        ...oldState,
        filter: '',
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
          filter: text,
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
          pagination: {
            ...oldState.pagination,
            currentPage: nextPage
          }
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
          pagination: {
            ...oldState.pagination,
            rowsPerPage: numOfPage,
            currentPage: 1
          }
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
  let filteredDataLength = data.length;
  let maxPage = 1;

  if (paginationProps?.state?.maxPage === undefined) {
    const { filter, sort, pagination } = state;

    if (state.isFilterable) {
      data = filterData(
        body,
        tableHeadersRecordRef.current,
        filter,
        filterProps?.filterValueObj
      );
      filteredDataLength = data.length;
    }

    data = sortData(data, sort, sortProps?.sortValueObj);

    if (pagination.rowsPerPage !== -1) {
      // Pagination needs.
      maxPage = Math.ceil(data.length / pagination.rowsPerPage);
      data = paginateData(data, pagination.currentPage, pagination.rowsPerPage);
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
        filteredDataLength,
        data
      }}
    >
      {children}
    </Provider>
  );
}

// Helper functions.
function getDefaultDatatableState<TTableRowType>({
  filterProps,
  paginationOptionsProps,
  paginationProps,
  sortProps,
  headers
}: Pick<
  DatatableWrapperProps<TTableRowType>,
  | 'filterProps'
  | 'paginationOptionsProps'
  | 'paginationProps'
  | 'sortProps'
  | 'headers'
>) {
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
}
