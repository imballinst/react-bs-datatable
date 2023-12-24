import React, { useState, useCallback, useEffect } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { DatatableWrapper } from '../../components/DatatableWrapper';
import { Filter } from '../../components/Filter';
import { PaginationOptions } from '../../components/PaginationOptions';
import { TableBody } from '../../components/TableBody';
import { TableHeader } from '../../components/TableHeader';
import { TableColumnType, SortType } from '../../helpers/types';
import {
  FetchParams,
  FetchResponse,
  StoryColumnType
} from '../resources/types';
import { Pagination } from '../../components/Pagination';
import { filterData, sortData } from '../../helpers/data';
import { SORT_PROPS } from '../resources/shared';

import TABLE_DATA from '../resources/story-data.json';
import { convertArrayToRecord } from '../../helpers/object';

const TABLE_HEADERS: TableColumnType<StoryColumnType>[] = [
  {
    prop: 'name',
    title: 'Name',
    isSortable: true,
    isFilterable: true
  },
  {
    prop: 'username',
    title: 'Username',
    isSortable: true,
    isFilterable: true
  },
  {
    prop: 'location',
    title: 'Location'
  },
  {
    prop: 'date',
    title: 'Last Update',
    isSortable: true,
    isFilterable: true
  },
  {
    prop: 'score',
    title: 'Score',
    isSortable: true,
    isFilterable: true
  },
  {
    prop: 'checkbox',
    checkbox: { idProp: 'name', className: 'table-checkbox' },
    alignment: { horizontal: 'center' }
  }
];
const HEADERS_DICTIONARY = convertArrayToRecord(TABLE_HEADERS, 'prop');

export function AsyncTimeoutStoryComponent({
  rowsPerPage: rowsPerPageProp
}: {
  rowsPerPage?: number;
}) {
  const [data, setData] = useState<StoryColumnType[]>([]);
  const [filteredDataLength, setFilteredDataLength] = useState(0);
  const [filter, setFilter] = useState('');
  const [sortState, setSortState] = useState<SortType>({
    prop: 'name',
    order: 'asc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageProp ?? 10);
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
async function fetchControlledMockData({
  rowsPerPage,
  filter,
  sortState,
  currentPage
}: FetchParams): Promise<FetchResponse<StoryColumnType>> {
  return new Promise((res) => {
    setTimeout(() => {
      let newData = TABLE_DATA;
      let newMaxPage = 1;
      let newFilteredDataLength = newData.length;

      // Filter the data.
      if (filter !== '') {
        newData = filterData(newData, HEADERS_DICTIONARY, filter);
        newFilteredDataLength = newData.length;
      }

      // Sort the data using a helper function.
      newData = sortData(newData, sortState, SORT_PROPS?.sortValueObj);

      // Paginate the data.
      newMaxPage = Math.ceil(newData.length / rowsPerPage);
      newData = newData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      );

      res({
        data: newData,
        maxPage: newMaxPage,
        filteredDataLength: newFilteredDataLength
      });
    }, 200);
  });
}
