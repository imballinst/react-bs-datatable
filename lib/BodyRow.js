import React from 'react';
import PropTypes from 'prop-types';

var BodyRow = function BodyRow(_ref) {
  var tableHeader = _ref.tableHeader,
      keyName = _ref.keyName,
      data = _ref.data,
      rowIdx = _ref.rowIdx;

  var row = [];

  for (var i = 0; i < tableHeader.length; i += 1) {
    var cell = tableHeader[i].cell;
    var value = '';

    if (cell === undefined) {
      value = data[rowIdx][tableHeader[i].prop];
    } else {
      value = cell(data[rowIdx]);
    }

    row.push(React.createElement(
      'td',
      { key: keyName + '-col-' + rowIdx + i, className: 'tbody-td-default' },
      value
    ));
  }

  return React.createElement(
    'tr',
    { className: 'tbody-tr-default' },
    row
  );
};

BodyRow.propTypes = {
  tableHeader: PropTypes.array.isRequired,
  keyName: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  rowIdx: PropTypes.number.isRequired
};

export default BodyRow;