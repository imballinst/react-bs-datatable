import React from 'react'; // Import React
import { storiesOf } from '@storybook/react';
import { categoryName } from './_base';

import moment from 'moment'; // Example for onSort prop
import Datatable from '../../Table'; // Import this package
console.log('react', React);
const header = [
  { title: 'Username', prop: 'username' },
  { title: 'Name', prop: 'realname' },
  { title: 'Location', prop: 'location' },
  { title: 'Last Updated', prop: 'date' }
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

console.log('dtatble', Datatable);
storiesOf(categoryName, module).add('Basic', () => (
  <Datatable
    tableHeaders={header}
    tableBody={body}
    tableClass="striped hover responsive"
  />
));
