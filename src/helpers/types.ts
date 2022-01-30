import { CSSProperties, ReactNode } from 'react';

export interface SortType {
  prop: string;
  order: 'asc' | 'desc';
}

export interface HeaderType<T> {
  prop: string;
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

export type TableRow<T = any> = Record<string, T>;
export type ColumnProcessObj<T> = Record<string, T>;
