import React, { useCallback, useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Col, Row, Table } from 'react-bootstrap';
import { parse } from 'date-fns';

import json from './resources/story-data.json';
import {
  StoryBodyType,
  STORY_HEADERS,
  STORY_PROP_TO_OPTION_NAME
} from './resources/types';
import TableHeader from '../components/TableHeader';
import TableBody from '../components/TableBody';
import {
  DatatableWrapper,
  DatatableWrapperProps
} from '../components/DatatableWrapper';
import { Filter } from '../components/Filter';
import PaginationOpts from '../components/PaginationOpts';
import Pagination from '../components/Pagination';
import { SortType, TableColumnType } from '../helpers/types';
import { filterData, sortData } from '../helpers/data';
import { convertArrayToRecord } from '../helpers/object';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Controlled',
  component: AsyncStoryTable
} as ComponentMeta<typeof AsyncStoryTable>;

// Async.
const SORTABLE_FIELDS = ['Name', 'Username', 'Last Update', 'Score'];
const FILTERABLE_FIELDS = ['Name', 'Username', 'Location'];

const HEADERS = STORY_HEADERS.map((header) => ({
  ...header,
  isSortable: SORTABLE_FIELDS.includes(STORY_PROP_TO_OPTION_NAME[header.prop]),
  isFilterable: FILTERABLE_FIELDS.includes(
    STORY_PROP_TO_OPTION_NAME[header.prop]
  )
}));

const AsyncTemplate: ComponentStory<typeof AsyncStoryTable> = () => (
  <AsyncStoryTable fetchFn={fetchMockData} headers={HEADERS} />
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
function AsyncStoryTable<TTableRowType = any>({
  fetchFn,
  headers
}: {
  fetchFn: (params: FetchParams) => Promise<FetchResponse<TTableRowType>>;
  headers: TableColumnType<TTableRowType>[];
}) {
  const [data, setData] = useState<TTableRowType[]>([]);
  const [filteredDataLength, setFilteredDataLength] = useState(0);
  const [filter, setFilter] = useState('');
  const [sortState, setSortState] = useState<SortType>({
    prop: 'name',
    order: 'asc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [maxPage, setMaxPage] = useState(1);

  const onFilter = useCallback((text) => {
    setFilter(text);
  }, []);

  const onSortChange = useCallback((nextProp) => {
    setSortState((oldState) => {
      const nextSort = { ...oldState };

      if (nextProp !== oldState.prop) {
        nextSort.prop = nextProp;
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
          className="d-flex flex-col justify-content-center align-items-center"
        >
          <PaginationOpts
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
          tableHeaders={HEADERS}
          controlledProps={{ sortState, onSortChange }}
        />
        <TableBody />
      </Table>
    </DatatableWrapper>
  );
}

// Helper functions.
interface FetchParams {
  filter: string;
  sortState: SortType;
  currentPage: number;
  rowsPerPage: number;
}

interface FetchResponse<T> {
  data: T[];
  maxPage: number;
  filteredDataLength: number;
}

// Mock data.
const SORT_PROPS: DatatableWrapperProps<StoryBodyType>['sortProps'] = {
  sortValueObj: {
    date: (row) => parse(row.date, 'MMMM dd, yyyy', new Date()).getTime()
  }
};
const HEADERS_DICTIONARY = convertArrayToRecord(HEADERS, 'prop');

async function fetchMockData({
  rowsPerPage,
  filter,
  sortState,
  currentPage
}: FetchParams): Promise<FetchResponse<StoryBodyType>> {
  return new Promise((res) => {
    setTimeout(() => {
      let newData = json;
      let newMaxPage = 1;
      let newFilteredDataLength = newData.length;

      // Filter the data.
      if (filter !== '') {
        newData = filterData(newData, HEADERS_DICTIONARY, filter);
        newFilteredDataLength = newData.length;
      }

      // Paginate the data.
      newMaxPage = Math.ceil(newData.length / rowsPerPage);
      newData = newData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      );

      // Sort the data using a helper function.
      newData = sortData(newData, sortState, SORT_PROPS?.sortValueObj);

      res({
        data: newData,
        maxPage: newMaxPage,
        filteredDataLength: newFilteredDataLength
      });
    }, 500);
  });
}

// Mock data but using Pokémon API.
async function fetchPokemonData({
  rowsPerPage,
  currentPage
}: FetchParams): Promise<FetchResponse<PokemonBodyType>> {
  console.log(rowsPerPage, currentPage);
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
