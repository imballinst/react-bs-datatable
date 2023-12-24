import React, { useState, useCallback, useEffect } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { DatatableWrapper } from '../../components/DatatableWrapper';
import { Filter } from '../../components/Filter';
import { PaginationOptions } from '../../components/PaginationOptions';
import { TableBody } from '../../components/TableBody';
import { TableHeader } from '../../components/TableHeader';
import { TableColumnType, SortType } from '../../helpers/types';
import { FetchParams, FetchResponse } from '../resources/types';
import { Pagination } from '../../components/Pagination';

interface PokemonBodyType {
  name: string;
  url: string;
}

const TABLE_HEADERS: TableColumnType<PokemonBodyType>[] = [
  {
    prop: 'name',
    title: 'Name'
  },
  {
    prop: 'url',
    title: 'URL',
    cell: (row) => (
      <a target="_blank" rel="noopener">
        {row.url}
      </a>
    )
  }
];

export function AsyncPokemonStoryComponent() {
  const [data, setData] = useState<PokemonBodyType[]>([]);
  const [filteredDataLength, setFilteredDataLength] = useState(0);
  const [filter, setFilter] = useState('');
  const [sortState, setSortState] = useState<SortType>({
    prop: 'name',
    order: 'asc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [maxPage, setMaxPage] = useState(1);

  const onFilterChange = useCallback((text) => {
    setFilter(text);
    setCurrentPage(1);
  }, []);

  const onSortChange = useCallback((nextProp: SortType) => {
    setSortState(nextProp);
  }, []);

  const onPaginationChange = useCallback((nextPage) => {
    setCurrentPage(nextPage);
  }, []);

  const onRowsPerPageChange = useCallback((rowsPerPage) => {
    setRowsPerPage(rowsPerPage);
    setCurrentPage(1);
  }, []);

  // Simulate API hit.
  useEffect(() => {
    async function getData() {
      const response = await fetchPokemonData({
        filter,
        sortState,
        currentPage,
        rowsPerPage
      });

      setFilteredDataLength(response.filteredDataLength);
      setData(response.data);
      setMaxPage(response.maxPage);
    }

    getData();
  }, [filter, sortState, currentPage, rowsPerPage]);

  return (
    <DatatableWrapper headers={TABLE_HEADERS} body={data}>
      <Row className="mb-4">
        <Col
          xs={12}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Filter controlledProps={{ filter, onFilterChange }} />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
        >
          <PaginationOptions
            controlledProps={{
              filteredDataLength,
              onRowsPerPageChange,
              rowsPerPageOptions: [5, 10, 15, 20],
              rowsPerPage
            }}
          />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Pagination
            controlledProps={{ currentPage, maxPage, onPaginationChange }}
          />
        </Col>
      </Row>
      <Table>
        <TableHeader
          controlledProps={{
            sortState,
            onSortChange,
            filteredDataLength
          }}
        />
        <TableBody
          controlledProps={{
            filteredDataLength
          }}
        />
      </Table>
    </DatatableWrapper>
  );
}

// Helper functions.
// Mock data but using Pokémon API.
async function fetchPokemonData({
  rowsPerPage,
  currentPage
}: FetchParams): Promise<FetchResponse<PokemonBodyType>> {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${rowsPerPage}&offset=${
      (currentPage - 1) * rowsPerPage
    }`
  );
  const json = await response.json();

  return {
    data: json.results,
    maxPage: Math.ceil(json.count / rowsPerPage),
    filteredDataLength: json.count
  };
}
