import React from 'react';

import FontAwesome from './modules/FontAwesome';
import { makeClasses } from './utils/object';
import { HeaderType, SortType, TableClasses } from './utils/types';

type TableHeaderProps = {
  tableHeaders: HeaderType[];
  sortedProp: SortType;
  onSortChange: any;
  classes: TableClasses;
};

export default function TableHeader({
  tableHeaders,
  sortedProp,
  onSortChange,
  classes
}: TableHeaderProps) {
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
          ? onSortChange(tableHeaders[i].prop)
          : undefined,
      className: makeClasses(thClass, classes.theadCol)
    };
    let sortIcon = 'sort';
    let sortIconRender = null;

    if (tableHeaders[i].sortable === true) {
      if (sortedProp !== {} && sortedProp.prop === tableHeaders[i].prop) {
        if (sortedProp.isAscending) {
          sortIcon = 'sort-asc';
        } else {
          sortIcon = 'sort-desc';
        }
      }

      sortIconRender = <FontAwesome icon={sortIcon} additionalClass="fa-fw" />;
    }

    headings.push(
      <th {...thProps}>
        {tableHeaders[i].title}
        <span className="pull-right">{sortIconRender}</span>
      </th>
    );
  }

  return (
    <thead className="thead">
      <tr className="thead-tr">{headings}</tr>
    </thead>
  );
}
