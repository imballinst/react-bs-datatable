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
  initialState?: {
    filter: string;
  };
}

interface SortProps<TTableRowType> {
  // Uncontrolled.
  sortValueObj?: ColumnProcessObj<TTableRowType, number>;
  initialState?: SortType;
}

interface PaginationProps {
  // Uncontrolled.
  initialState?: {
    page?: number;
    maxPage?: number;
  };
}

interface PaginationOptionsProps {
  // Uncontrolled.
  initialState?: {
    rowsPerPage: number;
    options: number[];
  };
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
  headers,
  body,
  filterProps,
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
        pagination: {
          ...oldState.pagination,
          currentPage: 1
        }
      }));
    }
  }, [body]);

  const onFilterChange = useCallback((text: string) => {
    setState((oldState) => ({
      ...oldState,
      filter: text,
      pagination: {
        ...oldState.pagination,
        currentPage: 1
      }
    }));
  }, []);

  const onPaginationChange = useCallback((nextPage: number) => {
    setState((oldState) => ({
      ...oldState,
      pagination: {
        ...oldState.pagination,
        currentPage: nextPage
      }
    }));
  }, []);

  const onRowsPerPageChange = useCallback((numOfPage: number) => {
    setState((oldState) => ({
      ...oldState,
      pagination: {
        ...oldState.pagination,
        rowsPerPage: numOfPage,
        currentPage: 1
      }
    }));
  }, []);

  const onSortChange = useCallback((nextSort: SortType) => {
    setState((oldState) => ({
      ...oldState,
      sort: nextSort
    }));
  }, []);

  const { filter, sort, pagination } = state;
  let data = body;
  let filteredDataLength = data.length;
  let maxPage = 1;

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
    // Set the default sort header.
    if (
      // If the sorted prop is still "empty", then we assign it with the current header.
      (defaultSort.prop === '' && header.isSortable) ||
      // Or, if the header prop matches the initial state, then set it as well.
      header.prop === sortProps?.initialState?.prop
    ) {
      defaultSort.prop = header.prop.toString();
    }

    if (header.isFilterable) {
      isFilterable = true;
    }
  }

  // Define initial state.
  return {
    isFilterable,
    filter: filterProps?.initialState?.filter || '',
    sort: defaultSort,
    pagination: {
      currentPage: paginationProps?.initialState?.page || 1,
      rowsPerPage: paginationOptionsProps?.initialState?.rowsPerPage || -1,
      rowsPerPageOptions: paginationOptionsProps?.initialState?.options || []
    }
  };
}
