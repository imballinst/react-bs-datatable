import React from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import {
  DatatableWrapper,
  TableCheckboxParameters
} from '../../components/DatatableWrapper';
import { Filter } from '../../components/Filter';
import { PaginationOptions } from '../../components/PaginationOptions';
import {
  EmptyTablePlaceholder,
  TableBody,
  TableBodyProps,
  TableRow
} from '../../components/TableBody';
import { TableHeader } from '../../components/TableHeader';
import { TableColumnType } from '../../helpers/types';
import { StoryColumnType } from '../resources/types';
import { Pagination } from '../../components/Pagination';
import { parse } from 'date-fns';
import TABLE_DATA from '../resources/story-data.json';
import { BulkCheckboxControl } from '../../components/BulkCheckboxControl';
import { useCreateCheckboxHandlers } from '../../helpers/hooks';

// @@@SNIPSTART ComposedTable
export function ComposedTableStoryComponent({
  alwaysShowPagination,
  onCheckboxChange,
  rowOnClickFn,
  data = TABLE_DATA
}: {
  alwaysShowPagination?: boolean;
  onCheckboxChange?: TableCheckboxParameters['onCheckboxChange'];
  rowOnClickFn?: TableBodyProps<any>['onRowClick'];
  data?: any[];
}) {
  const headers: TableColumnType<StoryColumnType>[] = [
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
      title: 'Location',
      isFilterable: true
    },
    {
      prop: 'date',
      title: 'Last Update'
    },
    {
      prop: 'score',
      title: 'Score',
      isSortable: true
    },
    {
      prop: 'checkbox',
      checkbox: { idProp: 'name', className: 'table-checkbox' },
      alignment: { horizontal: 'center' }
    }
  ];

  return (
    <DatatableWrapper
      body={data}
      headers={headers}
      checkboxProps={{
        onCheckboxChange
      }}
      sortProps={{
        sortValueObj: {
          date: (date) =>
            parse(`${date}`, 'MMMM dd, yyyy', new Date()).getTime()
        }
      }}
      paginationOptionsProps={{
        initialState: {
          rowsPerPage: 8,
          options: [8, 16, 24, 32]
        }
      }}
    >
      <Row className="mb-4">
        <Col
          xs={12}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Filter />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
        >
          <PaginationOptions alwaysShowPagination={alwaysShowPagination} />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Pagination
            alwaysShowPagination={alwaysShowPagination}
            paginationRange={3}
          />
        </Col>
        <Col xs={12} className="mt-2">
          <BulkCheckboxControl />
        </Col>
      </Row>
      <Table>
        <TableHeader />
        <TableBody<StoryColumnType>>
          {(rows) =>
            rows.length === 0 ? (
              <EmptyTablePlaceholder />
            ) : (
              rows.map((rowData, rowIdx) =>
                rowData.status === 'unknown' ? (
                  <tr key={rowData.username}>
                    <td colSpan={headers.length}>Row status unknown</td>
                  </tr>
                ) : (
                  <TableRow
                    key={rowData.username}
                    rowData={rowData}
                    rowIdx={rowIdx}
                    onRowClick={(row, event) => {
                      alert(`Clicked row containing name ${row.name}.`);
                      rowOnClickFn?.(row, event);
                    }}
                  />
                )
              )
            )
          }
        </TableBody>
      </Table>

      <Row>
        <Col xs={12}>
          <StrayResetSelectionButton />
        </Col>
      </Row>
    </DatatableWrapper>
  );
}

function StrayResetSelectionButton() {
  const { createBulkCheckboxClickHandler } = useCreateCheckboxHandlers();

  return (
    <>
      <button
        onClick={createBulkCheckboxClickHandler('add', {
          checkboxProp: 'checkbox',
          idProp: 'name'
        })}
      >
        Add all to selection
      </button>
      <button
        onClick={createBulkCheckboxClickHandler('remove', {
          checkboxProp: 'checkbox',
          idProp: 'name'
        })}
      >
        Reset selection
      </button>
    </>
  );
}
// @@@SNIPEND
