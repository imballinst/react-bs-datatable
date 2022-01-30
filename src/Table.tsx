import React, { useEffect, useState, useCallback } from 'react';

import { sortData, filterData, paginateData } from './helpers/data';
import Pagination from './Pagination';
import PaginationOpts from './PaginationOpts';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Filter from './Filter';
import {
  DatatableProps,
  DatatableState,
  TableComponents
} from './helpers/types';
import { makeClasses, customJoin, shouldTableUpdate } from './helpers/object';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import FontAwesome from './components/FontAwesome';
import { useDatatableWrapper } from './components/DatatableWrapper';

/**
 * Datatable lifecycle convenient function.
 * It will be used when we are extending the table.
 **/

export function useDatatableLifecycle({
  initialSort,
  onSort,
  onFilter,
  rowsPerPage,
  rowsPerPageOption,
  async,
  tableHeaders,
  classes,
  tableBody,
  labels,
  Components,
  onRowClick
}: DatatableProps) {
  useEffect(() => {
    // If in development, warn if async and onSort/onFilter are both passed.
    if (process.env.NODE_ENV === 'development') {
      if (async !== undefined) {
        // Warn if onSort and/or onFilter is/are also passed down.
        let str: string[] = [];

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
    let filterable = async !== undefined && async.onFilter !== undefined;
    let defaultSort = {};

    tableHeaders.forEach((header) => {
      if (header.prop === sortObj.prop) {
        if (header.sortable) {
          defaultSort = {
            isAscending: true,
            prop: header.prop
          };
        }
      }

      if (header.filterable && async === undefined && !filterable) {
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
      setState((oldState) => ({
        ...oldState,
        filterText: '',
        currentPage: 1,
        rowsPerPage: rowsPerPage
      }));
    }
  }, [tableBody, rowsPerPage]);

  const onChangeFilter = useCallback(
    (text: string) => {
      if (async && async.onFilter) {
        async.onFilter(text);
      } else {
        setState((oldState) => ({
          ...oldState,
          filterText: text,
          currentPage: 1
        }));
      }
    },
    [async]
  );

  const onPageNavigate = useCallback(
    (nextPage: number) => {
      if (async && async.onPaginate) {
        async.onPaginate(nextPage);
      } else {
        setState((oldState) => ({
          ...oldState,
          currentPage: nextPage
        }));
      }
    },
    [async]
  );

  const onRowsPerPageChange = useCallback(
    (numOfPage: number) => {
      if (async && async.onRowsPerPageChange) {
        async.onRowsPerPageChange(numOfPage);
      } else {
        setState((oldState) => ({
          ...oldState,
          rowsPerPage: numOfPage,
          currentPage: 1
        }));
      }
    },
    [async]
  );

  const onSortChange = useCallback(
    (nextProp: string) => {
      if (async && async.onSort) {
        async.onSort(nextProp);
      } else {
        setState((oldState) => {
          const nextSort = oldState.sortedProp;

          if (nextProp !== oldState.sortedProp.prop) {
            nextSort.prop = nextProp;
            nextSort.isAscending = true;
          } else {
            nextSort.isAscending = !oldState.sortedProp.isAscending;
          }

          return {
            ...oldState,
            sortedProp: nextSort
          };
        });
      }
    },
    [async]
  );

  let data = tableBody;
  let maxPage;

  if (async === undefined) {
    data = filterData(tableBody, tableHeaders, state.filterText, onFilter);
    data = sortData(data, state.sortedProp, onSort);

    if (state.rowsPerPage) {
      // Pagination needs.
      data = paginateData(data, state.currentPage, state.rowsPerPage);
      maxPage = Math.ceil(tableBody.length / state.rowsPerPage);
    }
  } else {
    maxPage = async.maxPage;
  }

  const tableClass = makeClasses(`table-datatable__root`, classes?.table);

  // Default components.
  // If context has keys, then use context. Instead, use Components props.
  const context = useDatatableWrapper();
  const passedComponents =
    Object.keys(context?.Components || {}).length > 0
      ? context?.Components
      : Components;

  let usedComponents: TableComponents = {
    // Global.
    Row,
    Col,
    Button,
    // Table.
    Table,
    TableHead: 'thead',
    TableBody: 'tbody',
    TableRow: 'tr',
    TableCell: 'td',
    // Filter.
    FilterGroup: undefined,
    // Pagination.
    ButtonGroup,
    // Pagination options.
    PaginationOptsGroup: undefined,
    // ICons.
    SortIcon: FontAwesome
  };

  if (passedComponents !== undefined) {
    const keys = Object.keys(passedComponents) as Array<keyof TableComponents>;
    for (const key of keys) {
      // Replace usedComponent fields with the passedComponents fields.
      usedComponents[key] = passedComponents[key];
    }
  }

  return {
    data,
    tableHeaders,
    onChangeFilter,
    onPageNavigate,
    classes,
    onRowsPerPageChange,
    onSortChange,
    tableClass,
    labels,
    rowsPerPageOption,
    Components: usedComponents,
    onRowClick,
    // States.
    filterable: state.filterable,
    filterText: async ? async.filterText : state.filterText,
    rowsPerPage: async ? async.rowsPerPage : state.rowsPerPage,
    currentPage: async ? async.currentPage : state.currentPage,
    sortedProp: async ? async.sortedProp : state.sortedProp,
    maxPage
  };
}

/** Datatable Component. */
function Datatable(props: DatatableProps) {
  const {
    data,
    rowsPerPageOption,
    tableHeaders,
    onChangeFilter,
    onPageNavigate,
    classes,
    onRowsPerPageChange,
    onSortChange,
    tableClass,
    labels,
    filterable,
    filterText,
    rowsPerPage,
    currentPage,
    sortedProp,
    maxPage,
    Components,
    onRowClick
  } = useDatatableLifecycle(props);

  return (
    <>
      <Components.Row
        className={makeClasses('controlRow__root', classes?.controlRow)}
      >
        <Components.Col
          xs={12}
          lg={4}
          className={makeClasses(
            'd-flex justify-content-start align-items-end mb-xs-2 mb-sm-2 mb-md-2 mb-lg-0',
            classes?.filterCol
          )}
        >
          <Filter
            filterable={filterable}
            classes={classes}
            placeholder={labels?.filter?.filterPlaceholder}
            onChangeFilter={onChangeFilter}
            filterText={filterText}
            CustomFilterGroup={Components.FilterGroup}
          />
        </Components.Col>
        <Components.Col
          xs={12}
          sm={4}
          lg={4}
          className={makeClasses(
            'd-flex justify-content-lg-center justify-content-xs-start align-items-end',
            classes?.paginationOptsCol
          )}
        >
          <PaginationOpts
            classes={classes}
            labels={labels}
            onRowsPerPageChange={onRowsPerPageChange}
            rowsPerPage={rowsPerPage}
            rowsPerPageOption={rowsPerPageOption}
            CustomPaginationOptsGroup={Components.PaginationOptsGroup}
          />
        </Components.Col>
        <Components.Col
          xs={12}
          sm={8}
          lg={4}
          className={makeClasses(
            'd-flex justify-content-end align-items-end',
            classes?.paginationCol
          )}
        >
          <Pagination
            maxPage={maxPage}
            classes={classes}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            onPageNavigate={onPageNavigate}
            labels={labels}
            components={{
              Button: Components.Button,
              ButtonGroup: Components.ButtonGroup
            }}
          />
        </Components.Col>
      </Components.Row>
      <Components.Row>
        <Components.Col xs={12}>
          <Table className={tableClass}>
            <TableHeader
              classes={classes}
              tableHeaders={tableHeaders}
              sortedProp={sortedProp}
              onSortChange={onSortChange}
              components={{
                TableHead: Components.TableHead,
                TableCell: Components.TableCell,
                TableRow: Components.TableRow
              }}
            />
            <TableBody
              classes={classes}
              tableHeaders={tableHeaders}
              labels={labels}
              data={data}
              components={{
                TableBody: Components.TableBody,
                TableCell: Components.TableCell,
                TableRow: Components.TableRow
              }}
              onRowClick={onRowClick}
            />
          </Table>
        </Components.Col>
      </Components.Row>
    </>
  );
}

// Only update if rowsPerPage, rowsPerPageOption, and tableBody changes.
export default React.memo(Datatable, shouldTableUpdate);
