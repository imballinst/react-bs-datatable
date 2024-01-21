import React from 'react';
import { Table } from 'react-bootstrap';
import { DatatableWrapper } from '../../components/DatatableWrapper';
import { TableColumnType } from '../../helpers/types';
import { StoryColumnType } from '../resources/types';
import NESTED_TABLE_DATA from '../resources/nested-story-data.json';
import { TableHeader } from '../../components/TableHeader';
import { TableBody } from '../../components/TableBody';

// @@@SNIPSTART NestedObject
export function NestedObjectComponent() {
  const headers: TableColumnType<StoryColumnType>[] = [
    {
      prop: 'name',
      title: 'Name'
    },
    {
      title: 'Rocket name',
      prop: 'rocket.name',
    },
    {
      title: 'Rocket company',
      prop: 'rocket.company'
    },
    {
      title: 'Rocket engine',
      prop: 'rocket.engine.name'
    }
  ];

  return (
    <DatatableWrapper body={NESTED_TABLE_DATA} headers={headers}>
      <Table>
        <TableHeader />
        <TableBody />
      </Table>
    </DatatableWrapper>
  );
}

// @@@SNIPEND
