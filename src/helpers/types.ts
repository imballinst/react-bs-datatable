import { CSSProperties, ReactNode } from 'react';

export interface SortType {
  prop: string;
  order: 'asc' | 'desc';
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
}

export type TableRowType<T = any> = Record<string, T>;
export type ColumnProcessObj<T> = Partial<
  Record<keyof T, (row: T) => string | number>
>;
