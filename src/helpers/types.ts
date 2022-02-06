import { CSSProperties, MutableRefObject, ReactNode } from 'react';

export interface SortType {
  prop: string;
  order: 'asc' | 'desc';
}

export interface CheckboxState {
  selected: Set<string>;
  state: 'none-selected' | 'some-selected' | 'all-selected';
}

export type CheckboxOnChange = (params: {
  column: string;
  nextCheckboxState: CheckboxState;
  checkboxRefs: MutableRefObject<Record<string, HTMLInputElement>>;
}) => void;

export interface TableColumnType<T> {
  prop: keyof T;
  title?: string;
  headerCell?: (icon: ReactNode, sortedProp: SortType) => ReactNode;
  cell?: (row: T) => ReactNode;
  cellProps?: {
    className?: string | ((row: T) => string);
    style?: CSSProperties | ((row: T) => CSSProperties);
  };
  isFilterable?: boolean;
  isSortable?: boolean;
  checkbox?: { idProp: string; className?: string };
  alignment?: {
    // TODO(imballinst): consider if we need vertical alignment as well or not.
    horizontal?: 'left' | 'right' | 'center';
  };
}

export type TableRowType<T = any> = Record<string, T>;

export type ColumnProcessObj<TColumnType, TReturnType = string> = Partial<
  Record<keyof TColumnType, (column: string | number) => TReturnType>
>;
