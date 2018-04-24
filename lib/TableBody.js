'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _BodyRow = require('./BodyRow');

var _BodyRow2 = _interopRequireDefault(_BodyRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableBody = function TableBody(_ref) {
  var tableHeader = _ref.tableHeader,
      keyName = _ref.keyName,
      labels = _ref.labels,
      paginatedData = _ref.paginatedData;

  var body = [];

  if (paginatedData.length !== 0) {
    for (var i = 0; i < paginatedData.length; i += 1) {
      body.push(_react2.default.createElement(_BodyRow2.default, {
        key: keyName + '-row-' + i,
        tableHeader: tableHeader,
        keyName: keyName,
        data: paginatedData,
        rowIdx: i
      }));
    }
  } else {
    body.push(_react2.default.createElement(
      'tr',
      { key: keyName + '-row-zero-length', className: 'tbody-tr-default' },
      _react2.default.createElement(
        'td',
        { className: 'tbody-td-default', colSpan: tableHeader.length },
        labels.noResults || 'No results to be shown.'
      )
    ));
  }

  return _react2.default.createElement(
    'tbody',
    { className: 'tbody-default' },
    body
  );
};

TableBody.propTypes = {
  tableHeader: _propTypes2.default.array.isRequired,
  keyName: _propTypes2.default.string.isRequired,
  labels: _propTypes2.default.object.isRequired,
  paginatedData: _propTypes2.default.array.isRequired
};

exports.default = TableBody;