'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    row.push(_react2.default.createElement(
      'td',
      { key: keyName + '-col-' + rowIdx + i, className: 'tbody-td-default' },
      value
    ));
  }

  return _react2.default.createElement(
    'tr',
    { className: 'tbody-tr-default' },
    row
  );
};

BodyRow.propTypes = {
  tableHeader: _propTypes2.default.array.isRequired,
  keyName: _propTypes2.default.string.isRequired,
  data: _propTypes2.default.array.isRequired,
  rowIdx: _propTypes2.default.number.isRequired
};

exports.default = BodyRow;