import React, { useMemo } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Col, Row, Table } from 'react-bootstrap';

import json from './resources/story-data.json';
import { StoryHeaderType } from './resources/types';
import TableHeader from '../components/TableHeader';
import TableBody from '../components/TableBody';
import { DatatableWrapper } from '../components/DatatableWrapper';
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
      options: ['name', 'username', 'location', 'date', 'score'],
      defaultValue: [],
      control: {
        type: 'inline-check'
      }
    }
  }
} as ComponentMeta<typeof StoryTable>;

const Template: ComponentStory<typeof StoryTable> = (args) => (
  <StoryTable {...args} />
);

export const Pair = Template.bind({});
Pair.args = {};

// Components.
const HEADERS: TableColumnType<StoryHeaderType>[] = [
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

function StoryTable({ sortableFields }: { sortableFields: string[] }) {
  const headers = useMemo(
    () =>
      HEADERS.map((header) => ({
        ...header,
        isSortable: sortableFields.includes(header.prop)
      })),
    [sortableFields]
  );

  return (
    <DatatableWrapper body={json} headers={headers}>
      <Row>
        <Col>
          <Filter />
        </Col>
        <Col>
          <PaginationOpts alwaysShowPagination={false} />
        </Col>
        <Col>
          <Pagination alwaysShowPagination={false} />
        </Col>
      </Row>
      <Table>
        <TableHeader tableHeaders={headers} />
        <TableBody />
      </Table>
    </DatatableWrapper>
  );
}
