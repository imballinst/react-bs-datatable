import React from 'react';
import { HeaderType, TableClasses } from './helpers/types';
import { makeClasses } from './helpers/object';

type BodyRowProps = {
  tableHeaders: HeaderType[];
  data: any[];
  rowIdx: number;
  classes: TableClasses;
  components: {
    TableRow: React.ElementType;
    TableCell: React.ElementType;
  };
};

export default function BodyRow({
  tableHeaders,
  data,
  rowIdx,
  classes,
  components
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
      <components.TableCell
        key={`col-${rowIdx}${i}`}
        className={makeClasses('tbody-td', classes.tbodyCol)}
      >
        {value}
      </components.TableCell>
    );
  }

  return (
    <components.TableRow className={makeClasses('tbody-tr', classes.tbodyRow)}>
      {row}
    </components.TableRow>
  );
}
