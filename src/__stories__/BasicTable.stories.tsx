import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Col, Row, Table } from 'react-bootstrap';
import { parse } from 'date-fns';

import json from './resources/story-data.json';
import { StoryBodyType } from './resources/types';
import TableHeader from '../components/TableHeader';
import TableBody from '../components/TableBody';
import {
  DatatableWrapper,
  DatatableWrapperProps
} from '../components/DatatableWrapper';
import { TableColumnType } from '../helpers/types';
import { Filter } from '../components/Filter';
import PaginationOpts from '../components/PaginationOpts';
import Pagination from '../components/Pagination';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Table',
  component: StoryTable,
  argTypes: {
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
  }
} as ComponentMeta<typeof StoryTable>;

const Template: ComponentStory<typeof StoryTable> = (args) => (
  <StoryTable {...args} />
);

export const Basic = Template.bind({});
Basic.storyName = 'Basic';
Basic.args = {};

export const CustomLabels = Template.bind({});
CustomLabels.storyName = 'With labels';
CustomLabels.args = {};

// Components.
const PROP_TO_OPTION_NAME: Record<keyof StoryBodyType, string> = {
  name: 'Name',
  username: 'Username',
  location: 'Location',
  date: 'Last Update',
  score: 'Score'
};

const HEADERS: TableColumnType<StoryBodyType>[] = [
  {
    prop: 'name',
    title: 'Name'
  },
  {
    prop: 'username',
    title: 'Username'
  },
  {
    prop: 'location',
    title: 'Location'
  },
  {
    prop: 'date',
    title: 'Last Update'
  },
  {
    prop: 'score',
    title: 'Score'
  }
];

const SORT_PROPS: DatatableWrapperProps<StoryBodyType>['sortProps'] = {
  sortValueObj: {
    date: (row) => parse(row.date, 'MMMM dd, yyyy', new Date()).getTime()
  }
};

function StoryTable({
  sortableFields,
  filterableFields,
  rowsPerPage = -1,
  rowsPerPageOptions = [],
  alwaysShowPagination = true
}: {
  sortableFields: string[];
  filterableFields: string[];
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  alwaysShowPagination?: boolean;
}) {
  const headers = HEADERS.map((header) => ({
    ...header,
    isSortable: sortableFields?.includes(PROP_TO_OPTION_NAME[header.prop]),
    isFilterable: filterableFields?.includes(PROP_TO_OPTION_NAME[header.prop])
  }));

  return (
    <DatatableWrapper
      body={json}
      headers={headers}
      sortProps={SORT_PROPS}
      paginationOptionsProps={{
        state: {
          rowsPerPage,
          options: rowsPerPageOptions
        }
      }}
    >
      <Row className="mb-4">
        <Col className="d-flex flex-col justify-content-end align-items-end">
          <Filter />
        </Col>
        <Col>
          <PaginationOpts alwaysShowPagination={alwaysShowPagination} />
        </Col>
        <Col className="d-flex flex-col justify-content-end align-items-end">
          <Pagination alwaysShowPagination={alwaysShowPagination} />
        </Col>
      </Row>
      <Table>
        <TableHeader tableHeaders={headers} />
        <TableBody />
      </Table>
    </DatatableWrapper>
  );
}
