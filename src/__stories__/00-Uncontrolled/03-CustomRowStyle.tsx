import React from 'react';
import { Table } from 'react-bootstrap';
import { DatatableWrapper } from '../../components/DatatableWrapper';
import { TableBody } from '../../components/TableBody';
import { TableHeader } from '../../components/TableHeader';
import { TableColumnType } from '../../helpers/types';
import { StoryColumnType } from '../resources/types';
import TABLE_DATA from '../resources/story-data.json';

// @@@SNIPSTART CustomRowStyle
export function CustomRowStyleStoryComponent() {
  const headers: TableColumnType<StoryColumnType>[] = [
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

  return (
    <DatatableWrapper body={TABLE_DATA} headers={headers}>
      <Table>
        <TableHeader />
        <TableBody
          rowProps={(row: StoryColumnType) => ({
            style: { background: `rgba(128, 0, 0, ${row.score / 200})` }
          })}
        />
      </Table>
    </DatatableWrapper>
  );
}
// @@@SNIPEND
