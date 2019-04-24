import React from 'react'; // Import React
import { storiesOf } from '@storybook/react';

import moment from 'moment'; // Example for onSort prop
import Datatable from '../../Table'; // Import this package

const header = [
  { title: 'Username', prop: 'username', sortable: true },
  { title: 'Name', prop: 'realname', sortable: true },
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

storiesOf('Table', module).add('Sort', () => (
  <Datatable
    tableHeader={header}
    tableBody={body}
    tableClass="striped hover responsive"
    initialSort={{ prop: 'username', isAscending: true }}
    onSort={onSortFunction}
  />
));
