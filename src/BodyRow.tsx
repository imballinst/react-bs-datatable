import React from 'react';
import {
  HeaderType,
  TableClasses,
  TableComponents,
  OnRowClick
} from './helpers/types';
import { makeClasses } from './helpers/object';

type BodyRowProps = {
  tableHeaders: HeaderType[];
  data: any[];
  rowIdx: number;
  classes: TableClasses;
  components: {
    TableRow: TableComponents['TableRow'];
    TableCell: TableComponents['TableCell'];
  };
  onClick?: OnRowClick;
};

export default function BodyRow({
  tableHeaders,
  data,
  rowIdx,
  classes,
  components,
  onClick
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

  function onRowClick() {
    if (typeof onClick === 'function') {
      onClick(data[rowIdx]);
    }
  }

  return (
    <components.TableRow
      className={makeClasses('tbody-tr', classes.tbodyRow)}
      onClick={onRowClick}
    >
      {row}
    </components.TableRow>
  );
}
