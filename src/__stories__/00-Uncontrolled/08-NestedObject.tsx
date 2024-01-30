import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { DatatableWrapper } from '../../components/DatatableWrapper';
import { TableColumnType } from '../../helpers/types';
import { StoryColumnType } from '../resources/types';
import NESTED_TABLE_DATA from '../resources/nested-story-data.json';
import { TableHeader } from '../../components/TableHeader';
import { TableBody } from '../../components/TableBody';
import { Filter } from '../../components/Filter';

// @@@SNIPSTART NestedObject
export function NestedObjectComponent() {
  const headers: TableColumnType<StoryColumnType>[] = [
    {
      prop: 'name',
      title: 'Name',
      isSortable: true
    },
    {
      title: 'Rocket name',
      prop: 'rocket.name',
      isSortable: true,
      isFilterable: true
    },
    {
      title: 'Rocket company',
      prop: 'rocket.company',
      isSortable: true,
      isFilterable: true
    },
    {
      title: 'Rocket engine',
      prop: 'rocket.engine.name',
      isSortable: true,
      isFilterable: true
    },
    {
      title: 'Rocket engine company',
      prop: 'rocket.engine.company',
      isSortable: true,
      isFilterable: true
    }
  ];

  return (
    <DatatableWrapper body={NESTED_TABLE_DATA} headers={headers}>
      <Row className="mb-4">
        <Col
          xs={12}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Filter />
        </Col>
      </Row>
      <Table>
        <TableHeader />
        <TableBody />
      </Table>
    </DatatableWrapper>
  );
}

// @@@SNIPEND
