import React, { useCallback, useEffect, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { categoryName } from './_base';

import moment from 'moment';
// In your setup, replace "../../" with "react-bs-datatable".
import Datatable from '../../';
import { sortData } from '../../helpers/data';

const header = [
  {
    title: 'Username (filterable)',
    prop: 'username'
  },
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

const onSortColumns = {
  sortDate(columnValue) {
    // Convert the string date format to UTC timestamp
    // So the table could sort it by number instead of by string
    return moment(columnValue, 'Do MMMM YYYY').valueOf();
  }
};

function AsyncTable() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortedProp, setSortedProp] = useState({
    prop: 'realname',
    isAscending: true
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [maxPage, setMaxPage] = useState(1);

  const onFilter = useCallback(text => {
    setFilter(text);
  }, []);

  const onSort = useCallback(nextProp => {
    setSortedProp(oldState => {
      const nextSort = { ...oldState };

      if (nextProp !== oldState.prop) {
        nextSort.prop = nextProp;
        nextSort.isAscending = true;
      } else {
        nextSort.isAscending = !oldState.isAscending;
      }

      return nextSort;
    });
  }, []);

  const onPageNavigate = useCallback(nextPage => {
    setCurrentPage(nextPage);
  }, []);

  const onRowsPerPageChange = useCallback(rowsPerPage => {
    setRowsPerPage(rowsPerPage);
  }, []);

  // Simulate API hit.
  useEffect(() => {
    setTimeout(() => {
      let newData = body;
      let newMaxPage = 1;

      // Filter the data.
      if (filter !== '') {
        newData = newData.filter(({ username }) =>
          username.toLowerCase().includes(filter.toLowerCase())
        );
      }

      // Paginate the data.
      newMaxPage = Math.ceil(newData.length / rowsPerPage);
      newData = newData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      );

      // Sort the data using a helper function.
      newData = sortData(newData, sortedProp, onSortColumns);

      // Usually, API will come with this form: { data: [Object], maxPage: number }.
      setData(newData);
      setMaxPage(newMaxPage);
    }, 500);
  }, [filter, sortedProp, currentPage, rowsPerPage]);

  return (
    <Datatable
      tableHeaders={header}
      tableBody={data}
      tableClass="striped hover responsive"
      rowsPerPageOption={[5, 10, 15, 20]}
      async={{
        currentPage,
        filterText: filter,
        maxPage,
        onFilter,
        onSort,
        onPaginate: onPageNavigate,
        onRowsPerPageChange,
        rowsPerPage,
        sortedProp: { prop: 'username', isAscending: true }
      }}
    />
  );
}

storiesOf(categoryName, module).add('Asynchronous table', () => <AsyncTable />);
