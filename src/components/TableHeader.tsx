import React from 'react';
import { useDatatableWrapper } from './DatatableWrapper';

import FontAwesome from './FontAwesome';
import { makeClasses } from '../helpers/object';
import { HeaderType, SortType } from '../helpers/types';

export interface TableHeaderClasses {
  th?: string;
  thead?: string;
  tr?: string;
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
  const { onSortChange, sortState } = useDatatableWrapper();

  for (let i = 0; i < tableHeaders.length; i += 1) {
    const { isSortable, prop, title, headerCell } = tableHeaders[i];
    const thClass = makeClasses({
      'thead-th': true,
      sortable: isSortable === true
    });
    const nextSort: SortType = { order: 'asc', prop: prop };
    let sortIcon: 'sort' | 'sortUp' | 'sortDown' = 'sort';
    let sortIconRender = null;

    if (isSortable) {
      if (sortState.prop && sortState.prop === prop) {
        if (sortState.order === 'asc') {
          sortIcon = 'sortUp';
          nextSort.prop = 'desc';
        } else {
          sortIcon = 'sortDown';
        }
      }

      sortIconRender = <FontAwesome icon={sortIcon} className="fa-fw" />;
    }

    let rendered;

    if (headerCell) {
      rendered = headerCell(sortIconRender, sortState);
    } else {
      rendered = (
        <>
          {title}
          <span>{sortIconRender}</span>
        </>
      );
    }

    const thProps = {
      key: `th-${i}`,
      onClick: isSortable ? () => onSortChange(nextSort) : undefined,
      className: makeClasses(thClass, classes?.th)
    };

    headings.push(<th {...thProps}>{rendered}</th>);
  }

  return (
    <thead className={makeClasses('thead', classes?.thead)}>
      <tr className={makeClasses('thead-tr', classes?.tr)}>{headings}</tr>
    </thead>
  );
}
