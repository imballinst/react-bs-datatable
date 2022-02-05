import React, { useCallback, useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Col, Row, Table } from 'react-bootstrap';

import { FetchParams, FetchResponse, StoryBodyType } from './resources/types';
import {
  CONTROLLED_HEADERS,
  fetchControlledMockData
} from './resources/shared-controlled';
import { TableHeader } from '../components/TableHeader';
import { TableBody } from '../components/TableBody';
import { DatatableWrapper } from '../components/DatatableWrapper';
import { Filter } from '../components/Filter';
import { PaginationOpts } from '../components/PaginationOpts';
import { Pagination } from '../components/Pagination';
import { SortType, TableColumnType } from '../helpers/types';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Controlled',
  component: AsyncStoryTable
} as ComponentMeta<typeof AsyncStoryTable>;

// Async.
const AsyncTemplate: ComponentStory<typeof AsyncStoryTable> = ({
  fetchFn,
  headers,
  ...args
}) => (
  <AsyncStoryTable
    fetchFn={fetchFn || fetchControlledMockData}
    headers={headers || CONTROLLED_HEADERS}
    {...args}
  />
);

export const Async = AsyncTemplate.bind({});
Async.storyName = 'Async example (with setTimeout)';

// Async Pokémon.
interface PokemonBodyType {
  name: string;
  url: string;
}

const POKEMON_HEADERS: TableColumnType<PokemonBodyType>[] = [
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

const AsyncPokemonTemplate: ComponentStory<typeof AsyncStoryTable> = () => (
  <AsyncStoryTable fetchFn={fetchPokemonData} headers={POKEMON_HEADERS} />
);

export const AsyncPokemon = AsyncPokemonTemplate.bind({});
AsyncPokemon.storyName = 'Async example (with Pokémon API)';

// Components.
const DEFAULT_ROWS_PER_PAGE = 10;
const DEFAULT_ROWS_PER_PAGE_OPTIONS = [5, 10, 15, 20];

function AsyncStoryTable<TTableRowType = any>({
  fetchFn,
  headers,
  rowsPerPage: rowsPerPageProp = DEFAULT_ROWS_PER_PAGE,
  rowsPerPageOptions: rowsPerPageOptionsProp = DEFAULT_ROWS_PER_PAGE_OPTIONS
}: {
  fetchFn: (params: FetchParams) => Promise<FetchResponse<TTableRowType>>;
  headers: TableColumnType<TTableRowType>[];
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
}) {
  const [data, setData] = useState<TTableRowType[]>([]);
  const [filteredDataLength, setFilteredDataLength] = useState(0);
  const [filter, setFilter] = useState('');
  const [sortState, setSortState] = useState<SortType>({
    prop: 'name',
    order: 'asc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageProp);
  const [maxPage, setMaxPage] = useState(1);

  const onFilter = useCallback((text) => {
    setFilter(text);
    setCurrentPage(1);
  }, []);

  const onSortChange = useCallback((nextProp: SortType) => {
    setSortState((oldState) => {
      const nextSort = { ...oldState };

      if (nextProp.prop !== oldState.prop) {
        nextSort.prop = nextProp.prop;
        nextSort.order = 'asc';
      } else {
        nextSort.order = 'desc';
      }

      return nextSort;
    });
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
      const response = await fetchFn({
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
  }, [fetchFn, filter, sortState, currentPage, rowsPerPage]);

  return (
    <DatatableWrapper body={data} headers={headers}>
      <Row className="mb-4">
        <Col
          xs={12}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Filter controlledProps={{ filter, onFilter }} />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
        >
          <PaginationOpts
            controlledProps={{
              filteredDataLength,
              onRowsPerPageChange,
              rowsPerPageOptions: rowsPerPageOptionsProp,
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
          tableHeaders={CONTROLLED_HEADERS}
          controlledProps={{ sortState, onSortChange }}
        />
        <TableBody />
      </Table>
    </DatatableWrapper>
  );
}

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
