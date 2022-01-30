import React, { CSSProperties, ReactNode } from 'react';

import FontAwesome from './components/FontAwesome';
import { makeClasses } from './helpers/object';
import { SortType } from './helpers/types';

export interface TableHeaderClasses {
  th?: string;
  thead?: string;
  tr?: string;
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

export interface TableHeaderProps<T> {
  tableHeaders: HeaderType<T>[];
  classes?: TableHeaderClasses;
}

export default function TableHeader<T>({
  tableHeaders,
  classes
}: TableHeaderProps<T>) {
  const headings = [];

  for (let i = 0; i < tableHeaders.length; i += 1) {
    const thClass = makeClasses({
      'thead-th': true,
      sortable: tableHeaders[i].sortable === true
    });
    const thProps = {
      key: `th-${i}`,
      onClick:
        tableHeaders[i].sortable === true
          ? () => onSortChange(tableHeaders[i].prop)
          : undefined,
      className: makeClasses(thClass, classes?.th)
    };
    let sortIcon: 'sort' | 'sortUp' | 'sortDown' = 'sort';
    let sortIconRender = null;

    if (tableHeaders[i].sortable === true) {
      if (sortedProp.prop && sortedProp.prop === tableHeaders[i].prop) {
        if (sortedProp.isAscending) {
          sortIcon = 'sortUp';
        } else {
          sortIcon = 'sortDown';
        }
      }

      sortIconRender = <FontAwesome icon={sortIcon} className="fa-fw" />;
    }

    const headerCell = tableHeaders[i].headerCell;
    let rendered;

    if (headerCell) {
      rendered = headerCell(sortIconRender, sortedProp);
    } else {
      rendered = (
        <>
          {tableHeaders[i].title}
          <span>{sortIconRender}</span>
        </>
      );
    }

    headings.push(<th {...thProps}>{rendered}</th>);
  }

  return (
    <thead className={makeClasses('thead', classes?.thead)}>
      <tr className={makeClasses('thead-tr', classes?.tr)}>{headings}</tr>
    </thead>
  );
}
