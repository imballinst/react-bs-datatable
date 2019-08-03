import React from 'react';
import PropTypes from 'prop-types';

function BodyRow({ tableHeader, data, rowIdx }) {
  const row = [];

  for (let i = 0; i < tableHeader.length; i += 1) {
    const cell = tableHeader[i].cell;
    let value = '';

    if (cell === undefined) {
      value = data[rowIdx][tableHeader[i].prop];
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

BodyRow.propTypes = {
  tableHeader: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  rowIdx: PropTypes.number.isRequired
};

export default BodyRow;
