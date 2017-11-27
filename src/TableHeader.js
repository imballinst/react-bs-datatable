import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import FontAwesome from './modules/FontAwesome';

const TableHeader = ({ tableHeader, keyName, sortedProp, onSortChange }) => {
  const headings = [];

  for (let i = 0; i < tableHeader.length; i += 1) {
    const thClass = classNames({
      'thead-th-default': true,
      sortable: tableHeader[i].sortable === true,
    });
    const thProps = {
      key: `${keyName}-th-${i}`,
      onClick: tableHeader[i].sortable === true ?
               onSortChange(tableHeader[i].prop) : undefined,
      className: thClass,
    };
    let sortIcon = 'sort';
    let sortIconRender = null;

    if (tableHeader[i].sortable === true) {
      if (sortedProp !== {} &&
          sortedProp.prop === tableHeader[i].prop) {
        if (sortedProp.isAscending) {
          sortIcon = 'sort-asc';
        } else {
          sortIcon = 'sort-desc';
        }
      }

      sortIconRender = (
        <FontAwesome icon={sortIcon} additionalClass="fa-fw" />
      );
    }

    headings.push(
      <th {...thProps}>
        {tableHeader[i].title}
        <span className="pull-right">{sortIconRender}</span>
      </th>,
    );
  }

  return (
    <thead className="thead-default">
      <tr className="thead-tr-default">
        {headings}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  tableHeader: PropTypes.array.isRequired,
  keyName: PropTypes.string.isRequired,
  sortedProp: PropTypes.object.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default TableHeader;
