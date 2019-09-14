import React from 'react';

import FontAwesome from './modules/FontAwesome';
import { makeClasses } from './helpers/object';
import {
  HeaderType,
  SortType,
  TableClasses,
  TableComponents
} from './helpers/types';

type TableHeaderProps = {
  tableHeaders: HeaderType[];
  sortedProp: SortType;
  onSortChange: any;
  classes: TableClasses;
  components: {
    TableHead: TableComponents['TableHead'];
    TableRow: TableComponents['TableRow'];
    TableCell: TableComponents['TableCell'];
  };
};

export default function TableHeader({
  tableHeaders,
  sortedProp,
  onSortChange,
  classes,
  components: { TableHead, TableRow, TableCell }
}: TableHeaderProps) {
  function onSortHandler(prop: string) {
    return () => onSortChange(prop);
  }

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
          ? onSortHandler(tableHeaders[i].prop)
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
      <TableCell {...thProps}>
        {tableHeaders[i].title}
        <span className="pull-right">{sortIconRender}</span>
      </TableCell>
    );
  }

  return (
    <TableHead className={makeClasses('thead', classes.thead)}>
      <TableRow className={makeClasses('thead-tr', classes.theadRow)}>
        {headings}
      </TableRow>
    </TableHead>
  );
}
