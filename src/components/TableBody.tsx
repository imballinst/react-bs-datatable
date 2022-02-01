import React from 'react';

import { TableColumnType, TableRowType } from '../helpers/types';
import { makeClasses } from '../helpers/object';
import { useDatatableWrapper } from './DatatableWrapper';

interface TableBodyClasses {
  tbody?: string;
  td?: string;
  tr?: string;
}

interface TableBodyProps<TTableRowType extends TableRowType> {
  /** Labels/placeholders of the table components. */
  labels?: {
    noResults?: string;
  };
  classes?: TableBodyClasses;
  /** On row click event. */
  onRowClick?: (row: TTableRowType) => void;
}

export default function TableBody<TTableRowType extends TableRowType>({
  labels,
  classes,
  onRowClick
}: TableBodyProps<TTableRowType>) {
  const { data, headers } = useDatatableWrapper();
  const body = [];
  const dataLength = data.length;

  if (dataLength > 0) {
    for (let i = 0; i < dataLength; i += 1) {
      body.push(
        <BodyRow
          key={`row-${i}`}
          classes={classes}
          headers={headers}
          data={data}
          onClick={onRowClick}
          rowIdx={i}
        />
      );
    }
  } else {
    body.push(
      <tr key={`row-zero-length`} className="tbody-tr">
        <td className="tbody-td" colSpan={headers.length}>
          {labels?.noResults || 'No results to be shown.'}
        </td>
      </tr>
    );
  }

  return <tbody className={makeClasses('tbody', classes?.tbody)}>{body}</tbody>;
}

// Helper components.
// Body row is only used for this file, so it's better to localize it
// in the same file.
type BodyRowProps<TTableRowType extends TableRowType> = {
  headers: TableColumnType<TTableRowType>[];
  data: TTableRowType[];
  rowIdx: number;
  classes?: TableBodyClasses;
  onClick?: (row: TTableRowType) => void;
};

function BodyRow<TTableRowType extends TableRowType>({
  headers,
  data,
  rowIdx,
  classes,
  onClick
}: BodyRowProps<TTableRowType>) {
  const row = [];

  for (let i = 0; i < headers.length; i += 1) {
    const { cell, cellProps = {} } = headers[i];
    let value: React.ReactNode = '';

    if (cell === undefined) {
      value = data[rowIdx][headers[i].prop];
    } else {
      value = cell(data[rowIdx]);
    }

    row.push(
      <td
        key={`col-${rowIdx}${i}`}
        className={makeClasses(
          'tbody-td',
          classes?.td,
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
      </td>
    );
  }

  function onRowClick() {
    if (typeof onClick === 'function') {
      onClick(data[rowIdx]);
    }
  }

  return (
    <tr className={makeClasses('tbody-tr', classes?.tr)} onClick={onRowClick}>
      {row}
    </tr>
  );
}
