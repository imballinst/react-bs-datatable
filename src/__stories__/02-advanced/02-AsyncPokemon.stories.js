import React, { useCallback, useEffect, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { categoryName } from './_base';
// In your setup, replace "../../" with "react-bs-datatable".
import Datatable from '../../';

const header = [
  {
    title: 'Pokemon Name',
    prop: 'name'
  },
  {
    title: 'URL',
    prop: 'url',
    cell: row => (
      <a href={row.url} target="_blank">
        {row.url}
      </a>
    )
  }
];

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
    async function getPokemons() {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${rowsPerPage}&offset=${(currentPage -
          1) *
          rowsPerPage}`
      );
      const json = await response.json();
      const newData = json.results;
      const newMaxPage = Math.ceil(json.count / rowsPerPage);

      setData(newData);
      setMaxPage(newMaxPage);
    }

    getPokemons();
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
        onSort,
        onPaginate: onPageNavigate,
        onRowsPerPageChange,
        rowsPerPage,
        sortedProp: { prop: 'username', isAscending: true }
      }}
    />
  );
}

storiesOf(categoryName, module).add('Asynchronous table - Pokemon API', () => (
  <AsyncTable />
));
