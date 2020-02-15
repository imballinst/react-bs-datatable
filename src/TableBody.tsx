import React from 'react';

import BodyRow from './BodyRow';
import {
  HeaderType,
  LabelType,
  TableClasses,
  TableComponents,
  OnRowClick
} from './helpers/types';
import { makeClasses } from './helpers/object';

type TableBodyProps = {
  tableHeaders: HeaderType[];
  labels: LabelType;
  data: any[];
  classes: TableClasses;
  components: {
    TableBody: TableComponents['TableBody'];
    TableRow: TableComponents['TableRow'];
    TableCell: TableComponents['TableCell'];
  };
  onRowClick?: OnRowClick;
};

export default function TableBody({
  tableHeaders,
  labels,
  data,
  classes,
  components: { TableBody, TableRow, TableCell },
  onRowClick
}: TableBodyProps) {
  const body = [];
  const dataLength = data.length;

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
          onClick={onRowClick}
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

  return (
    <TableBody className={makeClasses('tbody', classes.tbody)}>
      {body}
    </TableBody>
  );
}
