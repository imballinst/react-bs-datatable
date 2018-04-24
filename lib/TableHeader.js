'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FontAwesome = require('./modules/FontAwesome');

var _FontAwesome2 = _interopRequireDefault(_FontAwesome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableHeader = function TableHeader(_ref) {
  var tableHeader = _ref.tableHeader,
      keyName = _ref.keyName,
      sortedProp = _ref.sortedProp,
      onSortChange = _ref.onSortChange;

  var headings = [];

  for (var i = 0; i < tableHeader.length; i += 1) {
    var thClass = (0, _classnames2.default)({
      'thead-th-default': true,
      sortable: tableHeader[i].sortable === true
    });
    var thProps = {
      key: keyName + '-th-' + i,
      onClick: tableHeader[i].sortable === true ? onSortChange(tableHeader[i].prop) : undefined,
      className: thClass
    };
    var sortIcon = 'sort';
    var sortIconRender = null;

    if (tableHeader[i].sortable === true) {
      if (sortedProp !== {} && sortedProp.prop === tableHeader[i].prop) {
        if (sortedProp.isAscending) {
          sortIcon = 'sort-asc';
        } else {
          sortIcon = 'sort-desc';
        }
      }

      sortIconRender = _react2.default.createElement(_FontAwesome2.default, { icon: sortIcon, additionalClass: 'fa-fw' });
    }

    headings.push(_react2.default.createElement(
      'th',
      thProps,
      tableHeader[i].title,
      _react2.default.createElement(
        'span',
        { className: 'pull-right' },
        sortIconRender
      )
    ));
  }

  return _react2.default.createElement(
    'thead',
    { className: 'thead-default' },
    _react2.default.createElement(
      'tr',
      { className: 'thead-tr-default' },
      headings
    )
  );
};

TableHeader.propTypes = {
  tableHeader: _propTypes2.default.array.isRequired,
  keyName: _propTypes2.default.string.isRequired,
  sortedProp: _propTypes2.default.object.isRequired,
  onSortChange: _propTypes2.default.func.isRequired
};

exports.default = TableHeader;