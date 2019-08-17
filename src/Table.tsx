import React, { useEffect, useState } from 'react';

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
  RowsPerPageOptionType,
  TableClasses
} from './utils/types';
import { makeClasses, customJoin } from './utils/object';

type AsyncProps = {
  filterText: string;
  rowsPerPage: number;
  currentPage: number;
  sortedProp: SortType;
  onSort: (nextProp: string) => {};
  onPaginate: (nextPage: number) => {};
  onFilter: (text: string) => {};
  onRowsPerPageChange: (numOfPage: RowsPerPageType) => {};
};

type DatatableProps = {
  /** Initial sort of the table. */
  tableHeaders: HeaderType[];
  /** Table data. */
  tableBody: any[];
  /** Initial sort of the table. */
  initialSort?: SortType;
  /** Custom onSort data modifier. */
  onSort?: any;
  /** Custom onFilter data modifier. */
  onFilter?: any;
  /** Custom classes of the table components. */
  classes?: TableClasses;
  /** Handler for asynchronous filter, sort, and pagination. */
  async?: AsyncProps;
  /** Initial rows per page. */
  rowsPerPage?: RowsPerPageType;
  /** Rows per page option. */
  rowsPerPageOption?: RowsPerPageOptionType;
  /** Labels/placeholders of the table components. */
  labels?: LabelType;
};

type DatatableState = {
  filterable: boolean;
  sortedProp: SortType;
  rowsPerPage: RowsPerPageType;
  currentPage: number;
  filterText: string;
};

/**
 * Datatable lifecycle convenient function.
 * It will be used when we are extending the table.
 **/

export function useDatatableLifecycle({
  initialSort,
  onSort,
  onFilter,
  rowsPerPage = 5,
  rowsPerPageOption = [],
  async,
  tableHeaders,
  classes = {},
  tableBody,
  labels = {}
}: DatatableProps) {
  useEffect(() => {
    // If in development, warn if async and onSort/onFilter are both passed.
    if (process.env.NODE_ENV === 'development') {
      if (async !== undefined) {
        // Warn if onSort and/or onFilter is/are also passed down.
        let str = [];

        if (onSort !== undefined) {
          str.push('[onSort]');
        }

        if (onFilter !== undefined) {
          str.push('[onFilter]');
        }

        if (str.length > 0) {
          console.warn(
            `You are passing [async] props along with ${customJoin(
              str,
              ' and '
            )}. When [async] is enabled, you should not pass onFilter or onSort.`
          );
        }

        // Warn if all async options are not passed.
        str = [];

        if (async.onFilter === undefined) {
          str.push('[async.onFilter]');
        }

        if (async.onSort === undefined) {
          str.push('[async.onSort]');
        }

        if (async.onPaginate === undefined) {
          str.push('[async.onPaginate]');
        }

        if (str.length > 0) {
          console.warn(
            `These async props are missing: ${customJoin(str, ', ', 'and ')}`
          );
        }
      }
    }
  }, []);

  const [state, setState] = useState<DatatableState>(() => {
    const sortObj = initialSort || {};
    let filterable = async !== undefined;
    let defaultSort = {};

    tableHeaders.forEach(header => {
      if (header.prop === sortObj.prop) {
        if (header.sortable) {
          defaultSort = {
            isAscending: true,
            prop: header.prop
          };
        }
      }

      if (header.filterable && !filterable) {
        filterable = true;
      }
    });

    // Define initial state.
    return {
      sortedProp: defaultSort,
      filterable,
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
    if (async && async.onFilter) {
      async.onFilter(text);
    } else {
      setState(oldState => ({
        ...oldState,
        filterText: text,
        currentPage: 1
      }));
    }
  }

  function onPageNavigate(nextPage: number) {
    if (async && async.onPaginate) {
      async.onPaginate(nextPage);
    } else {
      setState(oldState => ({
        ...oldState,
        currentPage: nextPage
      }));
    }
  }

  function onRowsPerPageChange(numOfPage: RowsPerPageType) {
    if (async && async.onRowsPerPageChange) {
      async.onRowsPerPageChange(numOfPage);
    } else {
      setState(oldState => ({
        ...oldState,
        rowsPerPage: numOfPage,
        currentPage: 1
      }));
    }
  }

  function onSortChange(nextProp: string) {
    if (async && async.onSort) {
      async.onSort(nextProp);
    } else {
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
    }
  }

  let data = tableBody;

  if (async === undefined) {
    data = filterData(tableBody, tableHeaders, state.filterText, onFilter);
    data = sortData(data, state.sortedProp, onSort);
    data = paginateData(data, state.currentPage, state.rowsPerPage);
  }

  const tableClass = makeClasses(`table-datatable__root`, classes.table);

  return {
    data,
    tableHeaders,
    onChangeFilter,
    onPageNavigate,
    classes,
    onRowsPerPageChange,
    onSortChange,
    tableBody,
    async,
    tableClass,
    labels,
    rowsPerPageOption,
    // States.
    filterable: state.filterable,
    filterText: async ? async.filterText : state.filterText,
    rowsPerPage: async ? async.rowsPerPage : state.rowsPerPage,
    currentPage: async ? async.currentPage : state.currentPage,
    sortedProp: async ? async.sortedProp : state.sortedProp
  };
}

/** Datatable Component. */
export default function Datatable(props: DatatableProps) {
  const {
    data,
    rowsPerPageOption,
    tableHeaders,
    onChangeFilter,
    onPageNavigate,
    classes,
    onRowsPerPageChange,
    onSortChange,
    tableBody,
    tableClass,
    labels,
    filterable,
    filterText,
    rowsPerPage,
    currentPage,
    sortedProp
  } = useDatatableLifecycle(props);

  return (
    <>
      <Row className="controlRow__root">
        <Col xs={12} md={4}>
          <Filter
            filterable={filterable}
            classes={classes}
            placeholder={labels.filterPlaceholder}
            onChangeFilter={onChangeFilter}
            filterText={filterText}
          />
        </Col>
        <Col xs={12} md={3}>
          <PaginationOpts
            classes={classes}
            labels={labels}
            onRowsPerPageChange={onRowsPerPageChange}
            rowsPerPage={rowsPerPage}
            rowsPerPageOption={rowsPerPageOption}
          />
        </Col>
        <Col xs={12} md={5} className="text-right">
          <Pagination
            classes={classes}
            data={tableBody}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            onPageNavigate={onPageNavigate}
            labels={labels}
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <Table className={tableClass}>
            <TableHeader
              classes={classes}
              tableHeaders={tableHeaders}
              sortedProp={sortedProp}
              onSortChange={onSortChange}
            />
            <TableBody
              classes={classes}
              tableHeaders={tableHeaders}
              labels={labels}
              data={data}
            />
          </Table>
        </Col>
      </Row>
    </>
  );
}
