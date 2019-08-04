import React, { Fragment, useEffect, useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import { sortData, filterData, paginateData } from './utils/data';
import Pagination from './Pagination';
import PaginationOpts from './PaginationOpts';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Filter from './Filter';
import {
  SortType,
  LabelType,
  HeaderType,
  RowsPerPageType,
  RowsPerPageOptionType
} from './utils/types';
import { makeClasses } from './utils/object';

type DatatableProps = {
  /** Initial sort of the table. */
  tableHeaders: HeaderType[];
  tableBody: any[];
  initialSort?: SortType;
  onSort?: any;
  onFilter?: any;
  rowsPerPage?: RowsPerPageType;
  rowsPerPageOption?: RowsPerPageOptionType;
  tableBsClass?: string;
  labels?: LabelType;
};

type DatatableState = {
  sortedProp: SortType;
  rowsPerPage: RowsPerPageType;
  currentPage: number;
  filterText: string;
};

/** Datatable Component. */
export default function Datatable({
  initialSort,
  onSort,
  onFilter,
  rowsPerPage = 5,
  rowsPerPageOption = [],
  tableHeaders,
  tableBody,
  tableBsClass = '',
  labels = {}
}: DatatableProps) {
  const [state, setState] = useState<DatatableState>(() => {
    let defaultSort = {};

    if (initialSort !== undefined) {
      let found = false;
      let i = 0;

      while (!found && i < tableHeaders.length) {
        if (tableHeaders[i].prop === initialSort.prop) {
          found = true;

          if (tableHeaders[i].sortable === true) {
            defaultSort = initialSort;
          }
        }

        i += 1;
      }
    }

    // Define initial state.
    return {
      sortedProp: defaultSort,
      rowsPerPage,
      currentPage: 1,
      filterText: ''
    };
  });

  useEffect(() => {
    // Resets the table if the data passed down is different.
    if (tableBody !== undefined) {
      setState(oldState => ({
        ...oldState,
        filterText: '',
        currentPage: 1,
        rowsPerPage: rowsPerPage
      }));
    }
  }, [tableBody, rowsPerPage]);

  function onChangeFilter(text: string) {
    setState(oldState => ({
      ...oldState,
      filterText: text,
      currentPage: 1
    }));
  }

  function onPageNavigate(nextPage: number) {
    return () => {
      setState(oldState => ({
        ...oldState,
        currentPage: nextPage
      }));
    };
  }

  function onRowsPerPageChange(numOfPage: RowsPerPageType) {
    return () => {
      setState(oldState => ({
        ...oldState,
        rowsPerPage: numOfPage,
        currentPage: 1
      }));
    };
  }

  function onSortChange(nextProp: string) {
    return () => {
      const nextSort = state.sortedProp;

      if (nextProp !== state.sortedProp.prop) {
        nextSort.prop = nextProp;
        nextSort.isAscending = true;
      } else {
        nextSort.isAscending = !state.sortedProp.isAscending;
      }

      setState(oldState => ({
        ...oldState,
        sortedProp: nextSort
      }));
    };
  }

  const filteredData = filterData(
    tableBody,
    tableHeaders,
    state.filterText,
    onFilter
  );
  const sortedData = sortData(filteredData, state.sortedProp, onSort);
  const data = paginateData(sortedData, state.currentPage, state.rowsPerPage);

  const tableClass = makeClasses(`table-datatable`, tableBsClass);

  return (
    <Fragment>
      <Row className="controlRow">
        <Col xs={12} md={4}>
          <Filter
            tableHeaders={tableHeaders}
            placeholder={labels.filterPlaceholder}
            onChangeFilter={onChangeFilter}
            filterText={state.filterText}
          />
        </Col>
        <Col xs={12} md={4}>
          <PaginationOpts
            labels={labels}
            onRowsPerPageChange={onRowsPerPageChange}
            rowsPerPage={state.rowsPerPage}
            rowsPerPageOption={rowsPerPageOption}
          />
        </Col>
        <Col xs={12} md={4} className="text-right">
          <Pagination
            data={tableBody}
            rowsPerPage={state.rowsPerPage}
            currentPage={state.currentPage}
            onPageNavigate={onPageNavigate}
            labels={labels}
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <Table className={tableClass}>
            <TableHeader
              tableHeaders={tableHeaders}
              sortedProp={state.sortedProp}
              onSortChange={onSortChange}
            />
            <TableBody
              tableHeaders={tableHeaders}
              labels={labels}
              data={data}
            />
          </Table>
        </Col>
      </Row>
    </Fragment>
  );
}

// Re-export these variables.
// TODO(imballinst): alternatively, we can just put them separately in a index.ts file.
export {
  sortData,
  filterData,
  paginateData,
  Pagination,
  PaginationOpts,
  TableHeader,
  TableBody,
  Filter
};
