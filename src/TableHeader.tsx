import React from 'react';

import FontAwesome from './components/FontAwesome';
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
  classes?: TableClasses;
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
      className: makeClasses(thClass, classes?.theadCol)
    };
    let sortIcon = 'sort';
    let sortIconRender = null;

    if (tableHeaders[i].sortable === true) {
      if (sortedProp.prop && sortedProp.prop === tableHeaders[i].prop) {
        if (sortedProp.isAscending) {
          sortIcon = 'sort-asc';
        } else {
          sortIcon = 'sort-desc';
        }
      }

      sortIconRender = <FontAwesome icon={sortIcon} additionalClass="fa-fw" />;
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

    headings.push(<TableCell {...thProps}>{rendered}</TableCell>);
  }

  return (
    <TableHead className={makeClasses('thead', classes?.thead)}>
      <TableRow className={makeClasses('thead-tr', classes?.theadRow)}>
        {headings}
      </TableRow>
    </TableHead>
  );
}
