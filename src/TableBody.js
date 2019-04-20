import React from 'react';
import PropTypes from 'prop-types';

import BodyRow from './BodyRow';

const TableBody = ({ tableHeader, keyName, labels, data }) => {
  const body = [];

  if (data.length !== 0) {
    for (let i = 0; i < data.length; i += 1) {
      body.push(
        <BodyRow
          key={`${keyName}-row-${i}`}
          tableHeader={tableHeader}
          keyName={keyName}
          data={data}
          rowIdx={i}
        />
      );
    }
  } else {
    body.push(
      <tr key={`${keyName}-row-zero-length`} className="tbody-tr-default">
        <td className="tbody-td-default" colSpan={tableHeader.length}>
          {labels.noResults || 'No results to be shown.'}
        </td>
      </tr>
    );
  }

  return <tbody className="tbody-default">{body}</tbody>;
};

TableBody.propTypes = {
  tableHeader: PropTypes.array.isRequired,
  keyName: PropTypes.string.isRequired,
  labels: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
};

export default TableBody;
