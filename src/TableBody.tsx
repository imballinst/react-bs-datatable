import React from 'react';

import BodyRow from './BodyRow';
import { HeaderType, LabelType, TableClasses } from './utils/types';

type TableBodyProps = {
  tableHeaders: HeaderType[];
  labels: LabelType;
  data: any[];
  classes: TableClasses;
};

export default function TableBody({
  tableHeaders,
  labels,
  data
}: TableBodyProps) {
  const body = [];
  const dataLength = data.length;

  if (dataLength !== 0) {
    for (let i = 0; i < dataLength; i += 1) {
      body.push(
        <BodyRow
          key={`row-${i}`}
          tableHeaders={tableHeaders}
          data={data}
          rowIdx={i}
        />
      );
    }
  } else {
    body.push(
      <tr key={`row-zero-length`} className="tbody-tr">
        <td className="tbody-td" colSpan={tableHeaders.length}>
          {labels.noResults || 'No results to be shown.'}
        </td>
      </tr>
    );
  }

  return <tbody className="tbody">{body}</tbody>;
}
