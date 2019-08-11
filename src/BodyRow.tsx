import React from 'react';
import { HeaderType } from './utils/types';

type BodyRowProps = {
  tableHeaders: HeaderType[];
  data: any[];
  rowIdx: number;
};

export default function BodyRow({ tableHeaders, data, rowIdx }: BodyRowProps) {
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
      <td key={`col-${rowIdx}${i}`} className="tbody-td">
        {value}
      </td>
    );
  }

  return <tr className="tbody-tr">{row}</tr>;
}
