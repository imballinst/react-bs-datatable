import React from 'react'; // Import React

import moment from 'moment'; // Example for onSort prop
import Datatable from '../../Table'; // Import this package

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

const Filter = {
  name: 'Filter',
  story: () => (
    <Datatable
      tableHeader={header}
      tableBody={body}
      tableClass="striped hover responsive"
    />
  )
};

export default Filter;
