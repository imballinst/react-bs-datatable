import React from 'react';
import { Table } from 'react-bootstrap';
import {
  DatatableWrapper,
  DatatableWrapperProps
} from '../../components/DatatableWrapper';
import { TableBody, TableBodyProps } from '../../components/TableBody';
import { TableHeader } from '../../components/TableHeader';
import { TableColumnType } from '../../helpers/types';
import { StoryColumnType } from '../resources/types';
import TABLE_DATA from '../resources/story-data.json';

// @@@SNIPSTART RowOnClick
export function RowOnClickStoryComponent({
  rowOnClickText,
  rowOnClickFn,
  validRowClickTagNames,
  customHeaders
}: {
  customHeaders?: TableColumnType<StoryColumnType>[];
  rowOnClickText?: string;
  rowOnClickFn?: TableBodyProps<any>['onRowClick'];
  validRowClickTagNames?: TableBodyProps<any>['validRowClickTagNames'];
}) {
  const headers: TableColumnType<StoryColumnType>[] = customHeaders ?? [
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
        <TableBody<StoryColumnType>
          validRowClickTagNames={validRowClickTagNames}
          onRowClick={(row, event) => {
            rowOnClickFn?.(row, event);
            alert(
              `Clicked row containing name ${
                row.name
              }.\n\nYou inputted the text: ${rowOnClickText}. Clicked on element: ${
                (event.target as any).tagName
              }.`
            );
          }}
        />
      </Table>
    </DatatableWrapper>
  );
}
// @@@SNIPEND
