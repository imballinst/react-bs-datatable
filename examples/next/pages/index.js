import React, { useState } from 'react';
import moment from 'moment';
import Datatable from 'react-bs-datatable';

const header = [
  {
    title: 'Username (filterable)',
    prop: 'username',
    sortable: true,
    filterable: true
  },
  {
    title: 'Score',
    prop: 'score',
    sortable: true,
    // Add classes and styles by objects and strings.
    cellProps: {
      style: { background: 'blue', color: '#fff' },
      className: 'realname-class'
    }
  },
  {
    title: 'Location',
    prop: 'location',
    // Add classes and styles by function.
    cellProps: {
      style: row =>
        row.location === 'Mars' ? { background: '#fafafa' } : undefined,
      className: row => (row.location === 'Saturn' ? 'saturn-class' : undefined)
    }
  },
  { title: 'Last Updated', prop: 'date', sortable: true }
];

const body = Array.from(new Array(57), () => {
  const rd = Number((Math.random() * 10).toFixed(2));

  if (rd > 0.5) {
    return {
      username: 'i-am-billy',
      score: rd,
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

function onRowClick(data) {
  console.log(`You clicked on the row ${data.username} ${data.score}`);
  alert(`You clicked on the row ${data.username} ${data.score}`);
}

export default function App() {
  const [counter, setCounter] = useState(0);

  return (
    <>
      {counter}
      <button onClick={() => setCounter(old => (old += 1))}>Increment</button>
      <hr />
      <Datatable
        tableHeaders={header}
        tableBody={body}
        rowsPerPage={5}
        rowsPerPageOption={[5, 10, 15, 20]}
        initialSort={{ prop: 'username', isAscending: true }}
        onSort={onSortFunction}
        onRowClick={onRowClick}
        classes={{
          table: 'table-striped table-hover custom-table'
        }}
      />
    </>
  );
}
