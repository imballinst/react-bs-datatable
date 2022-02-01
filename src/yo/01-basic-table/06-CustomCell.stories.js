import React from 'react';
import { storiesOf } from '@storybook/react';
import { categoryName } from './_base';

import moment from 'moment';
// In your setup, replace "../../" with "react-bs-datatable".
import Datatable from '../../';

const header = [
  {
    title: 'Username (filterable)',
    prop: 'username',
    sortable: true,
    filterable: true
  },
  {
    prop: 'realname',
    sortable: true,
    headerCell: (icon, sortedProp) => {
      // icon is the actual icon.
      // sortedProp is the currently sortedProp -- in case we want to access it.
      const isActive = sortedProp.prop === 'realname';
      const order = sortedProp.isAscending ? 'asc' : 'desc';

      return (
        <>
          {`Name ${isActive ? `(Active ${order})` : '(Inactive)'}`}
          <span className="pull-right">{icon}</span>
        </>
      );
    }
  },
  {
    title: 'Name Uppercased',
    prop: 'realnameuppercase',
    cell: row => row.realname.toUpperCase()
  },
  { title: 'Location', prop: 'location' },
  { title: 'Last Updated', prop: 'date', sortable: true }
];

const body = Array.from(new Array(57), () => {
  const rd = (Math.random() * 10).toFixed(1);

  if (rd > 0.5) {
    return {
      username: 'i-am-billy',
      realname: `Billy ${rd}`,
      location: 'Mars',
      date: moment()
        .subtract(1, 'days')
        .format('Do MMMM YYYY')
    };
  }

  return {
    username: 'john-nhoj',
    realname: `John ${rd}`,
    location: 'Saturn',
    date: moment()
      .subtract(2, 'days')
      .format('Do MMMM YYYY')
  };
});

const onSortFunction = {
  date(columnValue) {
    // Convert the string date format to UTC timestamp
    // So the table could sort it by number instead of by string
    return moment(columnValue, 'Do MMMM YYYY').valueOf();
  }
};

const customLabels = {
  first: '<<',
  last: '>>',
  prev: '<',
  next: '>',
  show: 'Display',
  entries: 'rows',
  noResults: 'There is no data to be displayed'
};

storiesOf(categoryName, module).add('Custom Cell Representation', () => (
  <Datatable
    tableHeaders={header}
    tableBody={body}
    rowsPerPage={5}
    rowsPerPageOption={[5, 10, 15, 20]}
    initialSort={{ prop: 'username', isAscending: true }}
    onSort={onSortFunction}
    labels={customLabels}
  />
));
