import React, {
  CSSProperties,
  MutableRefObject,
  ReactNode,
  ThHTMLAttributes
} from 'react';

/**
 * The sort type used in the states.
 */
export interface SortType {
  /**
   * The column name.
   * This is the same as `header.prop` from `TableColumnType` interface.
   */
  prop: string;
  /** The sort order. */
  order: 'asc' | 'desc';
}

/**
 * The checkbox used as a value of the record used in the states.
 */
export interface CheckboxState {
  /**
   * A `Set` type containing strings inferred from the
   * `header.checkbox.idProp` field. These are always unique, as is
   * the behavior of the `Set` type.
   */
  selected: Set<string>;
  /**
   * The checkbox states. This is useful to determine the "Select all" and
   * "Deselect all", as well as the table header's `indeterminate` state.
   */
  state: 'none-selected' | 'some-selected' | 'all-selected';
}

/**
 * The data structure of a table column, which will be used for the `headers`
 * prop of the `DatatableWrapper` props, as well as the `TableHeader` props.
 */
export interface TableColumnType<T> {
  /**
   * The prop name for the header. This prop should exist in the table body's data
   * so that the column can render a non-empty cell. Moreover, each header should
   * have unique `prop` field.
   */
  prop: keyof T;
  /** The title for the header. */
  title?: string;
  /** Custom render the table header cell. */
  headerCell?: (icon: ReactNode, sortedProp: SortType) => ReactNode;
  /**
   * Custom render the table body cell. This is a function with the row data as parameter.
   */
  cell?: (row: T) => ReactNode;
  /** The props passed to the table headers under `tbody`. */
  thProps?: ThHTMLAttributes<HTMLTableCellElement>;
  // TODO(imballinst): update `cellProps` to return entire props like `thProps` above.
  /** The props passed to the table columns under `tbody`. */
  cellProps?: {
    /**
     * Set a custom `className` to the cell. This can be a raw string or
     * a function with the row data as parameter.
     */
    className?: string | ((row: T) => string);
    /**
     * Set a custom `style` to the cell. This can be a raw object or
     * a function with the row data as parameter.
     */
    style?: CSSProperties | ((row: T) => CSSProperties);
  };
  /**
   * Determines whether the column should be filterable or not.
   * When no headers include `isFilterable: true`, then the filter control
   * will not be rendered.
   */
  isFilterable?: boolean;
  /**
   * Determines whether the column is sortable or not.
   */
  isSortable?: boolean;
  /**
   * Determines whether the column is a checkbox or not. When set, then
   * the column will be a checkbox, both the headers and the rest of the rows.
   */
  checkbox?: {
    /** The prop of the other headers that should be used as the unique ID. */
    idProp: string;
    /** The custom `className` for the checkbox input. */
    className?: string;
  };
  /**
   * Determines the cell alignment. This is a "shortcut" for aligning items instead
   * of having to use `cellProps.className` or `cellProps.style` to achieve
   * the same thing.
   */
  alignment?: {
    // TODO(imballinst): consider if we need vertical alignment as well or not.
    /** Sets the horizontal alignment of the cell. */
    horizontal?: 'left' | 'right' | 'center';
  };
}

/**
 * This is the object of key/value which is used to transform a column's value
 * to another form.
 *
 * At the moment, this is mostly useful for sorting, as for sorting, the most reliable
 * way is to convert to numbers. While sorting strings is also possible, certain formats
 * can make the sort result incorrect, e.g. sorting formatted dates.
 */
export type ColumnProcessObj<TColumnType, TReturnType = string> = Partial<
  Record<keyof TColumnType, (column: TColumnType) => TReturnType>
>;

/**
 * This is used for the `extend` keyword in the components.
 */
export type TableRowType<T = any> = Record<string, T>;

// Table events.

/**
 * The helper type for the filter change event.
 */
export type FilterOnChange = (nextState: string) => void;

/**
 * The helper type for the sort by next prop change event.
 */
export type SortOnChange = (nextProp: SortType) => void;

/**
 * The helper type for the sort by prop change event.
 */
export type SortByPropOnChange = (sortedProp: string) => void;

/**
 * The helper type for the sort by prop change event.
 */
export type PaginationOnChange = (nextState: number) => void;

/**
 * The helper type for the rows per page change event.
 */
export type RowsPerPageOnChange = (nextState: number) => void;

/**
 * The helper type for the checkbox change eveent.
 */
export type CheckboxOnChange = (
  params: {
    checkboxProp: string;
    nextCheckboxState: CheckboxState;
  },
  event: {
    checkbox?: React.ChangeEvent<HTMLInputElement>;
    others?: React.MouseEvent<HTMLElement>;
  }
) => void;
