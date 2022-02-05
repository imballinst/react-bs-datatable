import React, {
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { filterData, paginateData, sortData } from '../helpers/data';
import { convertArrayToRecord } from '../helpers/object';
import { createCtx } from '../helpers/react';
import {
  CheckboxState,
  ColumnProcessObj,
  SortType,
  TableRowType
} from '../helpers/types';
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

interface CheckboxProps {
  // Uncontrolled.
  initialState?: Record<string, CheckboxState>;
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
  // Checkbox.
  checkboxState: Record<string, CheckboxState>;
  onCheckboxChange: (params: {
    column: string;
    nextCheckboxState: CheckboxState;
    tableHeaderCheckbox: HTMLInputElement;
  }) => void;
  checkboxRefs: MutableRefObject<Record<string, HTMLInputElement>>;
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
  checkboxProps?: CheckboxProps;
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
  checkbox: Record<string, CheckboxState>;
}

export function DatatableWrapper<TTableRowType = any>({
  headers,
  body,
  filterProps,
  sortProps,
  paginationProps,
  paginationOptionsProps,
  checkboxProps,
  children
}: DatatableWrapperProps<TTableRowType>) {
  const [state, setState] = useState<DatatableState>(
    getDefaultDatatableState({
      filterProps,
      headers,
      sortProps,
      paginationProps,
      paginationOptionsProps,
      checkboxProps
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
    paginationOptionsProps,
    checkboxProps
  });
  const checkboxRefs = useTableHeaderCheckbox({
    headers,
    initialStates: checkboxProps?.initialState
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
          paginationOptionsProps:
            controlPropsRef.current.paginationOptionsProps,
          checkboxProps: controlPropsRef.current.checkboxProps
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

  const onCheckboxChange = useCallback(
    ({
      column,
      nextCheckboxState,
      tableHeaderCheckbox
    }: {
      column: string;
      nextCheckboxState: CheckboxState;
      tableHeaderCheckbox: HTMLInputElement;
    }) => {
      // We put this here because it'll be easier to switch between
      // controlled and uncontrolled this way.
      tableHeaderCheckbox.indeterminate =
        nextCheckboxState.state === 'some-selected';

      setState((oldState) => ({
        ...oldState,
        checkbox: {
          ...oldState.checkbox,
          [column]: nextCheckboxState
        }
      }));
    },
    []
  );

  const { filter, sort, pagination, isFilterable } = state;
  const { data, filteredDataLength, maxPage } = useMemo(() => {
    let newData = body;
    let newFilteredDataLength = newData.length;
    let newMaxPage = 1;

    if (isFilterable) {
      newData = filterData(
        body,
        tableHeadersRecordRef.current,
        filter,
        filterProps?.filterValueObj
      );

      newFilteredDataLength = newData.length;
    }

    newData = sortData(newData, sort, sortProps?.sortValueObj);

    if (pagination.rowsPerPage !== -1) {
      // Pagination needs.
      newMaxPage = Math.ceil(newData.length / pagination.rowsPerPage);
      newData = paginateData(
        newData,
        pagination.currentPage,
        pagination.rowsPerPage
      );
    }

    return {
      data: newData,
      maxPage: newMaxPage,
      filteredDataLength: newFilteredDataLength
    };
  }, [body, filter, sort, pagination, isFilterable]);

  return (
    <Provider
      value={{
        headers,
        // Filter.
        isFilterable: isFilterable,
        filterState: filter,
        onFilterChange,
        // Sort.
        sortState: sort,
        onSortChange,
        // Pagination.
        currentPageState: pagination.currentPage,
        onPaginationChange,
        // Pagination options.
        rowsPerPageState: pagination.rowsPerPage,
        rowsPerPageOptions: pagination.rowsPerPageOptions,
        onRowsPerPageChange,
        // Checkbox.
        checkboxState: state.checkbox,
        onCheckboxChange,
        checkboxRefs,
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
function getDefaultDatatableState<TTableRowType = TableRowType>({
  filterProps,
  paginationOptionsProps,
  paginationProps,
  sortProps,
  checkboxProps,
  headers
}: Pick<
  DatatableWrapperProps<TTableRowType>,
  | 'filterProps'
  | 'paginationOptionsProps'
  | 'paginationProps'
  | 'sortProps'
  | 'checkboxProps'
  | 'headers'
>) {
  const defaultSort: SortType = { order: 'asc', prop: '' };
  const checkbox: Record<string, CheckboxState> =
    checkboxProps?.initialState || {};
  let isFilterable = filterProps !== undefined;

  for (const header of headers) {
    const prop = header.prop.toString();

    // Set the default sort header.
    if (
      // If the sorted prop is still "empty", then we assign it with the current header.
      (defaultSort.prop === '' && header.isSortable) ||
      // Or, if the header prop matches the initial state, then set it as well.
      prop === sortProps?.initialState?.prop
    ) {
      defaultSort.prop = prop;
    }

    // Set the default checkbox values, if not provided from `checkboxProps`.
    if (checkboxProps?.initialState === undefined) {
      checkbox[prop] = { state: 'none-selected', selected: new Set() };
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
    },
    checkbox
  };
}

function useTableHeaderCheckbox<TTableColumnType>({
  headers,
  initialStates
}: {
  headers: TableColumnType<TTableColumnType>[];
  initialStates?: Record<string, CheckboxState>;
}) {
  const checkboxRefs = useRef<Record<string, HTMLInputElement>>({});

  useEffect(() => {
    if (initialStates) {
      for (const header of headers) {
        const prop = header.prop.toString();
        const checkbox = checkboxRefs.current[prop];

        if (checkbox !== null) {
          checkbox.indeterminate =
            initialStates[prop].state === 'some-selected';
        }
      }
    }
  }, [headers, initialStates]);

  return checkboxRefs;
}
