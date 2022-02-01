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
import { SortType } from '../helpers/types';
import { filterData, sortData } from '../helpers/data';
import { convertArrayToRecord } from '../helpers/object';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Async',
  component: StoryTable
} as ComponentMeta<typeof StoryTable>;

const Template: ComponentStory<typeof StoryTable> = () => <StoryTable />;

export const FilterSortPagination = Template.bind({});
FilterSortPagination.storyName = 'Filter, sort, pagination';
FilterSortPagination.argTypes = {
  sortableFields: {
    name: 'Sortable Fields',
    options: ['Name', 'Username', 'Location', 'Last Update', 'Score'],
    defaultValue: ['Name', 'Username', 'Last Update', 'Score'],
    control: {
      type: 'inline-check'
    }
  },
  filterableFields: {
    name: 'Filterable fields',
    options: ['Name', 'Username', 'Location', 'Last Update', 'Score'],
    defaultValue: ['Name', 'Username', 'Location'],
    control: {
      type: 'inline-check'
    }
  },
  alwaysShowPagination: {
    name: 'Always show pagination',
    defaultValue: true,
    type: 'boolean'
  },
  rowsPerPage: {
    name: 'Rows per page',
    defaultValue: 10,
    type: 'number'
  },
  rowsPerPageOptions: {
    name: 'Rows per page options',
    defaultValue: [5, 10, 15, 20],
    options: [5, 10, 15, 20],
    control: {
      type: 'inline-check'
    }
  }
};

// Components.
const SORT_PROPS: DatatableWrapperProps<StoryBodyType>['sortProps'] = {
  sortValueObj: {
    date: (row) => parse(row.date, 'MMMM dd, yyyy', new Date()).getTime()
  }
};

const SORTABLE_FIELDS = ['Name', 'Username', 'Last Update', 'Score'];
const FILTERABLE_FIELDS = ['Name', 'Username', 'Location'];

const HEADERS = STORY_HEADERS.map((header) => ({
  ...header,
  isSortable: SORTABLE_FIELDS.includes(STORY_PROP_TO_OPTION_NAME[header.prop]),
  isFilterable: FILTERABLE_FIELDS.includes(
    STORY_PROP_TO_OPTION_NAME[header.prop]
  )
}));
const HEADERS_DICTIONARY = convertArrayToRecord(HEADERS, 'prop');

function StoryTable() {
  const [data, setData] = useState(json);
  const [filteredDataLength, setFilteredDataLength] = useState(json.length);
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

      // Usually, API will come with this form: { data: [Object], maxPage: number }.
      setFilteredDataLength(newFilteredDataLength);
      setData(newData);
      setMaxPage(newMaxPage);
    }, 500);
  }, [filter, sortState, currentPage, rowsPerPage]);

  return (
    <DatatableWrapper body={data} headers={HEADERS}>
      <Row className="mb-4">
        <Col className="d-flex flex-col justify-content-end align-items-end">
          <Filter controlledProps={{ filter, onFilter }} />
        </Col>
        <Col>
          <PaginationOpts
            controlledProps={{
              filteredDataLength,
              onRowsPerPageChange,
              rowsPerPageOptions: [5, 10, 15, 20],
              rowsPerPage
            }}
          />
        </Col>
        <Col className="d-flex flex-col justify-content-end align-items-end">
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
