import { CSSProperties, ReactNode } from 'react';

export interface SortType {
  prop: string;
  order: 'asc' | 'desc';
}

export interface CheckboxState {
  selected: Set<string>;
  state: 'none-selected' | 'some-selected' | 'all-selected';
}

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
  checkbox?: { idProp: string };
}

export type TableRowType<T = any> = Record<string, T>;

export type ColumnProcessObj<TColumnType, TReturnType = string> = Partial<
  Record<keyof TColumnType, (column: string | number) => TReturnType>
>;
