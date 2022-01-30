import React from 'react';

import {
  HeaderType,
  LabelType,
  TableClasses,
  TableComponents
} from './helpers/types';
import { makeClasses } from './helpers/object';

interface TableBodyProps<T> {
  tableBody: T[];
  /** Labels/placeholders of the table components. */
  labels?: {
    noResults?: string;
  };
  /** On row click event. */
  onRowClick?: (value: any) => void;
}

type TableBodyProps = {
  tableHeaders: HeaderType[];
  labels?: LabelType;
  data: any[];
  classes?: TableClasses;
  components: {
    TableBody: TableComponents['TableBody'];
    TableRow: TableComponents['TableRow'];
    TableCell: TableComponents['TableCell'];
  };
  onRowClick?: (row: any) => void;
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
          {labels?.noResults || 'No results to be shown.'}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableBody className={makeClasses('tbody', classes?.tbody)}>
      {body}
    </TableBody>
  );
}

// Helper components.
// Body row is only used for this file, so it's better to localize it
// in the same file.
type BodyRowProps = {
  tableHeaders: HeaderType[];
  data: any[];
  rowIdx: number;
  classes?: TableClasses;
  components: {
    TableRow: TableComponents['TableRow'];
    TableCell: TableComponents['TableCell'];
  };
  onClick?: (prop: any) => void;
};

function BodyRow({
  tableHeaders,
  data,
  rowIdx,
  classes,
  components,
  onClick
}: BodyRowProps) {
  const row = [];

  for (let i = 0; i < tableHeaders.length; i += 1) {
    const { cell, cellProps = {} } = tableHeaders[i];
    let value: React.ReactNode = '';

    if (cell === undefined) {
      value = data[rowIdx][tableHeaders[i].prop];
    } else {
      value = cell(data[rowIdx]);
    }

    row.push(
      <components.TableCell
        key={`col-${rowIdx}${i}`}
        className={makeClasses(
          'tbody-td',
          classes?.tbodyCol,
          typeof cellProps.className === 'function'
            ? cellProps.className(data[rowIdx])
            : cellProps.className
        )}
        style={
          typeof cellProps.style === 'function'
            ? cellProps.style(data[rowIdx])
            : cellProps.style
        }
      >
        {value}
      </components.TableCell>
    );
  }

  function onRowClick() {
    if (typeof onClick === 'function') {
      onClick(data[rowIdx]);
    }
  }

  return (
    <components.TableRow
      className={makeClasses('tbody-tr', classes?.tbodyRow)}
      onClick={onRowClick}
    >
      {row}
    </components.TableRow>
  );
}
