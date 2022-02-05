import React from 'react';
import { useDatatableWrapper } from './DatatableWrapper';

import FontAwesome from './FontAwesome';
import { makeClasses } from '../helpers/object';
import { TableColumnType, SortType, TableRowType } from '../helpers/types';

export interface TableHeaderClasses {
  th?: string;
  thead?: string;
  tr?: string;
}

export interface TableHeaderProps<T> {
  tableHeaders: TableColumnType<T>[];
  classes?: TableHeaderClasses;
  controlledProps?: {
    onSortChange: (nextSort: SortType) => void;
    sortState: SortType;
  };
}

export function TableHeader<T extends TableRowType>({
  tableHeaders,
  classes,
  controlledProps
}: TableHeaderProps<T>) {
  const headings = [];
  const { onSortChange: onSortChangeContext, sortState: sortStateContext } =
    useDatatableWrapper();

  const onSortChange = controlledProps?.onSortChange || onSortChangeContext;
  const sortState = controlledProps?.sortState || sortStateContext;

  for (let i = 0; i < tableHeaders.length; i += 1) {
    const { isSortable, prop, title, headerCell } = tableHeaders[i];
    const thClass = makeClasses({
      'thead-th': true,
      sortable: isSortable === true
    });
    const nextSort: SortType = { order: 'asc', prop: prop.toString() };
    const isCurrentSort = sortState.prop === prop;
    let sortIcon: 'sort' | 'sortUp' | 'sortDown' = 'sort';
    let sortIconRender = null;

    if (isSortable) {
      if (sortState.prop && isCurrentSort) {
        if (sortState.order === 'asc') {
          sortIcon = 'sortUp';
          nextSort.order = 'desc';
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

    const thProps: Record<string, any> = {
      key: `th-${i}`,
      className: makeClasses(thClass, classes?.th)
    };

    if (isSortable) {
      thProps.onClick = () => onSortChange(nextSort);
      thProps.role = 'button';

      if (isCurrentSort) {
        thProps['data-sort-order'] = sortState.order;
      }
    }

    headings.push(<th {...thProps}>{rendered}</th>);
  }

  return (
    <thead className={makeClasses('thead', classes?.thead)}>
      <tr className={makeClasses('thead-tr', classes?.tr)}>{headings}</tr>
    </thead>
  );
}
