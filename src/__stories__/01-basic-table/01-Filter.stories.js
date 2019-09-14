import React from 'react';
import { storiesOf } from '@storybook/react';
import { categoryName } from './_base';

import moment from 'moment';
// In your setup, replace "../../" with "react-bs-datatable".
import Datatable from '../../';

const header = [
  { title: 'Username (filterable)', prop: 'username', filterable: true },
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

storiesOf(categoryName, module).add('Filter', () => (
  <Datatable
    tableHeaders={header}
    tableBody={body}
    tableClass="striped hover responsive"
  />
));
