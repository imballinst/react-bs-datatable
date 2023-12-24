import React from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import {
  DatatableWrapper,
  DatatableWrapperProps
} from '../../components/DatatableWrapper';
import { Filter } from '../../components/Filter';
import { PaginationOptions } from '../../components/PaginationOptions';
import { TableBody } from '../../components/TableBody';
import { TableHeader } from '../../components/TableHeader';
import { TableColumnType } from '../../helpers/types';
import { StoryColumnType } from '../resources/types';
import { Pagination } from '../../components/Pagination';
import { parse } from 'date-fns';
import TABLE_DATA from '../resources/story-data.json';
import { BulkCheckboxControl } from '../../components/BulkCheckboxControl';

// @@@SNIPSTART FilterSortPagination
export function FilterSortPaginationStoryComponent({
  sortProps,
  paginationRange = 3,
  rowsPerPage = 10,
  rowsPerPageOption = [5, 10, 15, 20],
  alwaysShowPagination,
  customHeaders
}: {
  sortProps?: DatatableWrapperProps<any>['sortProps'];
  paginationRange?: number;
  rowsPerPage?: number;
  rowsPerPageOption?: number[];
  alwaysShowPagination?: boolean;
  customHeaders?: TableColumnType<StoryColumnType>[];
}) {
  const headers: TableColumnType<StoryColumnType>[] = customHeaders ?? [
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

  return (
    <DatatableWrapper
      body={TABLE_DATA}
      headers={headers}
      sortProps={{
        sortValueObj: {
          date: (date) =>
            parse(`${date}`, 'MMMM dd, yyyy', new Date()).getTime()
        },
        ...sortProps
      }}
      paginationOptionsProps={{
        initialState: {
          rowsPerPage,
          options: rowsPerPageOption
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
            paginationRange={paginationRange}
          />
        </Col>
        <Col xs={12} className="mt-2">
          <BulkCheckboxControl />
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
