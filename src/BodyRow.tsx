import React from 'react';
import { HeaderType, TableClasses } from './helpers/types';
import { makeClasses } from './helpers/object';

type BodyRowProps = {
  tableHeaders: HeaderType[];
  data: any[];
  rowIdx: number;
  classes: TableClasses;
};

export default function BodyRow({
  tableHeaders,
  data,
  rowIdx,
  classes
}: BodyRowProps) {
  const row = [];

  for (let i = 0; i < tableHeaders.length; i += 1) {
    const cell = tableHeaders[i].cell;
    let value = '';

    if (cell === undefined) {
      value = data[rowIdx][tableHeaders[i].prop];
    } else {
      value = cell(data[rowIdx]);
    }

    row.push(
      <td
        key={`col-${rowIdx}${i}`}
        className={makeClasses('tbody-td', classes.tbodyCol)}
      >
        {value}
      </td>
    );
  }

  return <tr className={makeClasses('tbody-tr', classes.tbodyRow)}>{row}</tr>;
}
