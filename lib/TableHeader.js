import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import FontAwesome from './modules/FontAwesome';

var TableHeader = function TableHeader(_ref) {
  var tableHeader = _ref.tableHeader,
      keyName = _ref.keyName,
      sortedProp = _ref.sortedProp,
      onSortChange = _ref.onSortChange;

  var headings = [];

  for (var i = 0; i < tableHeader.length; i += 1) {
    var thClass = classNames({
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

      sortIconRender = React.createElement(FontAwesome, { icon: sortIcon, additionalClass: 'fa-fw' });
    }

    headings.push(React.createElement(
      'th',
      thProps,
      tableHeader[i].title,
      React.createElement(
        'span',
        { className: 'pull-right' },
        sortIconRender
      )
    ));
  }

  return React.createElement(
    'thead',
    { className: 'thead-default' },
    React.createElement(
      'tr',
      { className: 'thead-tr-default' },
      headings
    )
  );
};

TableHeader.propTypes = {
  tableHeader: PropTypes.array.isRequired,
  keyName: PropTypes.string.isRequired,
  sortedProp: PropTypes.object.isRequired,
  onSortChange: PropTypes.func.isRequired
};

export default TableHeader;