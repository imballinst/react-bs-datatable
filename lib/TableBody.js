import React from 'react';
import PropTypes from 'prop-types';

import BodyRow from './BodyRow';

var TableBody = function TableBody(_ref) {
  var tableHeader = _ref.tableHeader,
      keyName = _ref.keyName,
      labels = _ref.labels,
      paginatedData = _ref.paginatedData;

  var body = [];

  if (paginatedData.length !== 0) {
    for (var i = 0; i < paginatedData.length; i += 1) {
      body.push(React.createElement(BodyRow, {
        key: keyName + '-row-' + i,
        tableHeader: tableHeader,
        keyName: keyName,
        data: paginatedData,
        rowIdx: i
      }));
    }
  } else {
    body.push(React.createElement(
      'tr',
      { key: keyName + '-row-zero-length', className: 'tbody-tr-default' },
      React.createElement(
        'td',
        { className: 'tbody-td-default', colSpan: tableHeader.length },
        labels.noResults || 'No results to be shown.'
      )
    ));
  }

  return React.createElement(
    'tbody',
    { className: 'tbody-default' },
    body
  );
};

TableBody.propTypes = {
  tableHeader: PropTypes.array.isRequired,
  keyName: PropTypes.string.isRequired,
  labels: PropTypes.object.isRequired,
  paginatedData: PropTypes.array.isRequired
};

export default TableBody;