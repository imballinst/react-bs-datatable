import React, { useCallback, useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Col, Row, Table } from 'react-bootstrap';

import { FetchParams, FetchResponse, StoryColumnType } from './resources/types';
import {
  CONTROLLED_HEADERS,
  fetchControlledMockData
} from './resources/shared-controlled';
import { TableHeader } from '../components/TableHeader';
import {
  EmptyTablePlaceholder,
  TableBody,
  TableRow
} from '../components/TableBody';
import { DatatableWrapper } from '../components/DatatableWrapper';
import { Filter } from '../components/Filter';
import { PaginationOptions } from '../components/PaginationOptions';
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
const AsyncTemplate: ComponentStory<typeof AsyncStoryTable> = (args) => (
  <AsyncStoryTable
    {...args}
    fetchFn={fetchControlledMockData}
    headers={CONTROLLED_HEADERS}
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

const ControlledComposedTableRowTemplate: ComponentStory<
  typeof AsyncStoryTable
> = ({
  rowOnClickFn,
  rowsPerPage: rowsPerPageProp = 8,
  rowsPerPageOptions = [8, 16, 24, 32]
}) => {
  const [data, setData] = useState<StoryColumnType[]>([]);
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
    setSortState(nextProp);
  }, []);

  const onPaginationChange = useCallback((nextPage) => {
    setCurrentPage(nextPage);
  }, []);

  const onRowsPerPageChange = useCallback((rowsPerPage) => {
    setRowsPerPage(rowsPerPage);
    setCurrentPage(1);
  }, []);

  const onRowClick = (row: StoryColumnType) => {
    alert(`Clicked row containing name ${row.name}.`);

    if (rowOnClickFn) {
      rowOnClickFn(row.name);
    }
  };

  // Simulate API hit.
  useEffect(() => {
    async function getData() {
      const response = await fetchControlledMockData({
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
    <DatatableWrapper headers={CONTROLLED_HEADERS} body={data} isControlled>
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
          <PaginationOptions
            controlledProps={{
              filteredDataLength,
              onRowsPerPageChange,
              rowsPerPageOptions,
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
        <TableBody<StoryColumnType>>
          {data.length === 0 ? (
            <EmptyTablePlaceholder />
          ) : (
            data.map((rowData) =>
              rowData.status === 'unknown' ? (
                <tr key={rowData.username}>
                  <td colSpan={CONTROLLED_HEADERS.length}>
                    Row status unknown
                  </td>
                </tr>
              ) : (
                <TableRow
                  key={rowData.username}
                  rowData={rowData}
                  onRowClick={onRowClick}
                  controlledProps={{ filteredDataLength }}
                />
              )
            )
          )}
        </TableBody>
      </Table>
    </DatatableWrapper>
  );
};

export const ControlledComposedTableRow =
  ControlledComposedTableRowTemplate.bind({});
ControlledComposedTableRowTemplate.storyName = 'Composed table row';

// Components.
const DEFAULT_ROWS_PER_PAGE = 10;
const DEFAULT_ROWS_PER_PAGE_OPTIONS = [5, 10, 15, 20];

function AsyncStoryTable<TTableRowType = any>({
  fetchFn,
  headers = [],
  rowsPerPage: rowsPerPageProp = DEFAULT_ROWS_PER_PAGE,
  rowsPerPageOptions: rowsPerPageOptionsProp = DEFAULT_ROWS_PER_PAGE_OPTIONS
}: {
  fetchFn: (params: FetchParams) => Promise<FetchResponse<TTableRowType>>;
  headers?: TableColumnType<TTableRowType>[];
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  rowOnClickFn?: (name: string) => void;
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
    <DatatableWrapper headers={headers} body={data} isControlled>
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
          <PaginationOptions
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
