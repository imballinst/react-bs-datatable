import React, {
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import {
  filterData,
  getNextSortState,
  paginateData,
  sortData
} from '../helpers/data';
import { convertArrayToRecord } from '../helpers/object';
import { createCtx } from '../helpers/react';
import {
  CheckboxOnChange,
  CheckboxState,
  ColumnProcessObj,
  FilterOnChange,
  PaginationOnChange,
  RowsPerPageOnChange,
  SortByPropOnChange,
  SortType,
  TableRowType
} from '../helpers/types';
import { TableColumnType } from '../helpers/types';

/**
 * This is the additional parameters for the filter function.
 * Only applicable for uncontrolled table mode.
 */
export interface TableFilterParameters {
  /** The initial states for the table. */
  initialState?: {
    /** The initial text filter state. */
    filter: string;
  };
}

/**
 * This is the additional parameters for the filter function.
 * Only applicable for uncontrolled table mode.
 */
export interface TableSortParameters<TTableRowType> {
  /**
   * An object with the key being the table columns' prop and
   * the value being the value converter for the column.
   * This is most useful when we want to sort something by number
   * instead of by text.
   *
   * For example, we want to convert a date format
   * as the following: "Jan 22, 2022". Since string sorting will result
   * in a wrong result, then we need to convert it first, e.g. using `date-fns`.
   * After we parse the column's formatted date, only then we can get its
   * number value.
   *
   * ```ts
   * {
   *   sortValueObject: {
   *     date: (column: string) => parse(column).getTime()
   *   }
   * }
   * ```
   *
   * The object above will cause all rows in the `date` column to be sorted
   * by number (milliseconds) instead of by formatted date string.
   */
  sortValueObj?: ColumnProcessObj<TTableRowType, number>;
  /** The initial states for the table. */
  initialState?: SortType;
}

/**
 * This is the additional parameters for the filter function.
 * Only applicable for uncontrolled table mode.
 */
export interface TablePaginationParameters {
  /** The initial states for the table. */
  initialState?: {
    /** The initial currently active page. */
    page: number;
    /**
     * The initial maximum page. This is used to determine
     * the last numbered button in the pagination button group.
     * This also determines the next page number when the
     * "Last" button is clicked.
     */
    maxPage: number;
  };
}

/**
 * This is the additional parameters for the filter function.
 * Only applicable for uncontrolled table mode.
 */
export interface TablePaginationOptionsParameters {
  /** The initial states for the table. */
  initialState?: {
    /** Number of rows per page to be shown. */
    rowsPerPage: number;
    /** Rows per page options that will be shown in the dropdown. */
    options: number[];
  };
}

/**
 * This is the additional parameters for the filter function.
 * Only applicable for uncontrolled table mode.
 */
export interface TableCheckboxParameters {
  /** The initial states for the table. */
  initialState?: Record<string, CheckboxState>;
  /** Change event for the checkboxes state. */
  onCheckboxChange?: CheckboxOnChange;
}

export interface UncontrolledTableEvents {
  onFilterChange: FilterOnChange;
  onSortByPropChange: SortByPropOnChange;
  onPaginationChange: PaginationOnChange;
  onRowsPerPageChange: RowsPerPageOnChange;
  onCheckboxChange: CheckboxOnChange;
}

/**
 * @internal
 *
 * This is the values stored in the `DatatableWrapper` context.
 */
interface DatatableWrapperContextType<TTableRowType> {
  // Things passed to other components.
  headers: TableColumnType<TTableRowType>[];
  isControlled: boolean;
  setIsControlled: React.Dispatch<React.SetStateAction<boolean>>;
  // Filter.
  isFilterable: boolean;
  filterState: string;
  onFilterChange: (nextState: string) => void;
  // Sort.
  sortState: SortType;
  onSortChange: (nextProp: SortType) => void;
  onSortByPropChange: (sortedProp: string) => void;
  // Pagination.
  currentPageState: number;
  onPaginationChange: (nextState: number) => void;
  // Pagination options.
  rowsPerPageState: number;
  rowsPerPageOptions: number[];
  onRowsPerPageChange: (nextState: number) => void;
  // Checkbox.
  checkboxState: Record<string, CheckboxState>;
  /**
   * @internal
   *
   * This is mostly for internal usage.
   */
  previouslyModifiedCheckbox: MutableRefObject<PreviouslyModifiedCheckbox>;
  onCheckboxChange: CheckboxOnChange;
  // Data.
  maxPage: number;
  filteredDataLength: number;
  data: TTableRowType[];
  body: TTableRowType[];
}

const [useCtx, Provider] = createCtx<DatatableWrapperContextType<any>>();

/**
 * @internal
 *
 * This is an internal hook to use in all table components.
 */
export const useDatatableWrapper = useCtx;

/**
 * The props that can be passed to the `DatatableWrapper` component.
 */
export interface DatatableWrapperProps<TTableRowType extends TableRowType> {
  /** The rest of the table, including its controls. */
  children: ReactNode;
  headers: TableColumnType<TTableRowType>[];
  body: TTableRowType[];
  /**
   * @deprecated
   *
   * This prop is deprecated; now the table is automatically set as controlled
   * when any of the child components is provided `controlledProps`.
   */
  isControlled?: boolean;
  filterProps?: TableFilterParameters;
  sortProps?: TableSortParameters<TTableRowType>;
  paginationProps?: TablePaginationParameters;
  paginationOptionsProps?: TablePaginationOptionsParameters;
  checkboxProps?: TableCheckboxParameters;
  /**
   * @deprecated
   *
   * Usage of `tableEventsRef` is deprecated. Consider using `useDatatableWrapper`
   * and raising the `DatatableWrapper` a bit higher in the structure instead.
   */
  tableEventsRef?: MutableRefObject<UncontrolledTableEvents | undefined>;
}

/**
 * @internal
 *
 * This is an interface to represent the previously modified checkbox. This is used
 * for the "Select all" and "Deselect all" interaction.
 *
 * The `idProp` is to indicate the column that are we going to use as the ID,
 * whereas `checkboxProp` is used to indicate the checkbox column.
 *
 * It's pretty rare that we're going to have multiple checkbox columns, but hey,
 * better safe than sorry.
 */
interface PreviouslyModifiedCheckbox {
  idProp: string;
  checkboxProp: string;
}

/**
 * @internal
 *
 * This is an interface to represent the uncontrolled datatable state.
 */
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

export function DatatableWrapper<TTableRowType extends TableRowType>({
  headers,
  body,
  isControlled: isControlledProp,
  filterProps,
  sortProps,
  paginationProps,
  paginationOptionsProps,
  checkboxProps,
  tableEventsRef,
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
  const [isControlled, setIsControlled] = useState(isControlledProp || false);
  const headersRecordRef = useRef(convertArrayToRecord(headers, 'prop'));
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
  const { previouslyModifiedCheckboxRef } = useTableHeaderCheckbox();

  useEffect(() => {
    if (tableEventsRef !== undefined) {
      console.warn(
        'Warning: Usage of `tableEventsRef` is deprecated. Consider using `useDatatableWrapper`' +
          'and raising the `DatatableWrapper` a bit higher in the structure instead.'
      );
    }
  }, [tableEventsRef]);

  useEffect(() => {
    // Resets the table if the headers passed down is different.
    if (headers !== undefined && !isControlled) {
      // Re-set the ref.
      headersRecordRef.current = convertArrayToRecord(headers, 'prop');
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
  }, [headers, isControlled]);

  useEffect(() => {
    // Resets the table if the data passed down is different.
    if (body !== undefined && !isControlled) {
      setState((oldState) => ({
        ...oldState,
        filter: '',
        pagination: {
          ...oldState.pagination,
          currentPage: 1
        }
      }));
    }
  }, [body, isControlled]);

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

  const onSortByPropChange = useCallback((sortedProp: string) => {
    setState((oldState) => ({
      ...oldState,
      sort: getNextSortState(oldState.sort, sortedProp)
    }));
  }, []);

  const onCheckboxChange: CheckboxOnChange = useCallback(
    (result, event) => {
      // This is put here so that if we modify `result`, it'll be taken into account when we destructure it on the following line.
      checkboxProps?.onCheckboxChange?.(result, event);
      const { checkboxProp, nextCheckboxState } = result;

      setState((oldState) => ({
        ...oldState,
        checkbox: {
          ...oldState.checkbox,
          [checkboxProp]: nextCheckboxState
        }
      }));
    },
    [checkboxProps?.onCheckboxChange]
  );

  // Imperative handle.
  // This is if we want to keep the table events controllable from outside,
  // without making the table controlled.
  // TODO(imballinst): rethink about this for the next major version (4.x).
  // https://github.com/imballinst/react-bs-datatable/pull/123#issuecomment-1050582200.
  useImperativeHandle(
    tableEventsRef,
    () => ({
      onFilterChange,
      onPaginationChange,
      onRowsPerPageChange,
      onSortByPropChange,
      onCheckboxChange
    }),
    []
  );

  const { filter, sort, pagination, isFilterable } = state;
  const { data, filteredDataLength, maxPage } = useMemo(() => {
    let newData = body;
    let newFilteredDataLength = newData.length;
    let newMaxPage = 1;

    if (!isControlled) {
      // Only do this in uncontrolled mode.
      if (isFilterable) {
        newData = filterData(body, headersRecordRef.current, filter);
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
    }

    return {
      data: newData,
      maxPage: newMaxPage,
      filteredDataLength: newFilteredDataLength
    };
  }, [isControlled, body, filter, sort, pagination, isFilterable]);

  return (
    <Provider
      value={{
        headers,
        isControlled,
        setIsControlled,
        // Filter.
        isFilterable: isFilterable,
        filterState: filter,
        onFilterChange,
        // Sort.
        sortState: sort,
        onSortChange,
        onSortByPropChange,
        // Pagination.
        currentPageState: pagination.currentPage,
        onPaginationChange,
        // Pagination options.
        rowsPerPageState: pagination.rowsPerPage,
        rowsPerPageOptions: pagination.rowsPerPageOptions,
        onRowsPerPageChange,
        // Checkbox.
        checkboxState: state.checkbox,
        previouslyModifiedCheckbox: previouslyModifiedCheckboxRef,
        onCheckboxChange,
        // Data.
        maxPage,
        filteredDataLength,
        data,
        body
      }}
    >
      {children}
    </Provider>
  );
}

// Helper functions.
function getDefaultDatatableState<TTableRowType extends TableRowType>({
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
>): DatatableState {
  const defaultSort: SortType = sortProps?.initialState || {
    order: 'asc',
    prop: ''
  };
  const checkbox: Record<string, CheckboxState> =
    checkboxProps?.initialState || {};
  let isFilterable = filterProps !== undefined;

  for (const header of headers) {
    const prop = header.prop.toString();

    if (defaultSort.prop === '' && header.isSortable) {
      // If the sorted prop is still "empty", then we assign it with the current header.
      defaultSort.prop = String(header.prop);
    }

    // Set the default checkbox values, if not provided from `checkboxProps`.
    if (header.checkbox && checkboxProps?.initialState === undefined) {
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

function useTableHeaderCheckbox() {
  const previouslyModifiedCheckboxRef = useRef<PreviouslyModifiedCheckbox>({
    checkboxProp: '',
    idProp: ''
  });

  return { previouslyModifiedCheckboxRef };
}
