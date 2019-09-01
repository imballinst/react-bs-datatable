import React from 'react';

import BodyRow from './BodyRow';
import { HeaderType, LabelType, TableClasses } from './helpers/types';
import { makeClasses } from './helpers/object';
import { useTableContext } from './modules/TableContext';

type TableBodyProps = {
  tableHeaders: HeaderType[];
  labels: LabelType;
  data: any[];
  classes: TableClasses;
};

export default function TableBody({
  tableHeaders,
  labels,
  data,
  classes
}: TableBodyProps) {
  const body = [];
  const dataLength = data.length;
  const { TableRow = 'tr', TableCell = 'td' } = useTableContext();

  if (dataLength !== 0) {
    for (let i = 0; i < dataLength; i += 1) {
      body.push(
        <BodyRow
          key={`row-${i}`}
          classes={classes}
          components={{
            TableRow,
            TableCell
          }}
          tableHeaders={tableHeaders}
          data={data}
          rowIdx={i}
        />
      );
    }
  } else {
    body.push(
      <TableRow key={`row-zero-length`} className="tbody-tr">
        <TableCell className="tbody-td" colSpan={tableHeaders.length}>
          {labels.noResults || 'No results to be shown.'}
        </TableCell>
      </TableRow>
    );
  }

  return <tbody className={makeClasses('tbody', classes.tbody)}>{body}</tbody>;
}
