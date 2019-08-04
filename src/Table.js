import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import classNames from 'classnames';

import { sortData, filterData, paginateData } from './utils/ClassHelpers';
import Pagination from './Pagination';
import PaginationOpts from './PaginationOpts';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Filter from './Filter';

/** Datatable Component */
function Datatable({
  initialSort,
  onSort,
  onFilter,
  rowsPerPage,
  rowsPerPageOption,
  tableHeader,
  tableBody,
  tableBsClass,
  labels
}) {
  const [state, setState] = useState(() => {
    let defaultSort = {};

    if (initialSort !== undefined) {
      let found = false;
      let i = 0;

      while (!found && i < tableHeader.length) {
        if (tableHeader[i].prop === initialSort.prop) {
          found = true;

          if (tableHeader[i].sortable === true) {
            defaultSort = initialSort;
          }
        }

        i += 1;
      }
    }

    const isOptionsGiven = rowsPerPageOption.length > 0;
    let defaultRowsPerPage;

    if (isOptionsGiven) {
      if (rowsPerPageOption.includes(rowsPerPage)) {
        defaultRowsPerPage = rowsPerPage;
      } else {
        defaultRowsPerPage = rowsPerPageOption[0];
      }
    }

    // Define initial state
    return {
      sortedProp: defaultSort,
      rowsPerPage: defaultRowsPerPage,
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

  function onChangeFilter(text) {
    setState(oldState => ({
      ...oldState,
      filterText: text,
      currentPage: 1
    }));
  }

  function onPageNavigate(nextPage) {
    return () => {
      setState(oldState => ({
        ...oldState,
        currentPage: nextPage
      }));
    };
  }

  function onRowsPerPageChange(numOfPage) {
    return () => {
      setState(oldState => ({
        ...oldState,
        rowsPerPage: parseInt(numOfPage, 10),
        currentPage: 1
      }));
    };
  }

  function onSortChange(nextProp) {
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

  function processData() {
    const { sortedProp, filterText, rowsPerPage, currentPage } = state;
    const filteredData = filterData(
      tableHeader,
      filterText,
      onFilter,
      tableBody
    );
    const sortedData = sortData(sortedProp, onSort, filteredData);
    const paginatedData = paginateData(rowsPerPage, currentPage, sortedData);

    return paginatedData;
  }

  const data = processData(tableHeader, tableBody, onSort, onFilter);
  const tableClass = classNames(`table-datatable`, tableBsClass);

  return (
    <Fragment>
      <Row className="controlRow">
        <Col xs={12} md={4}>
          <Filter
            tableHeader={tableHeader}
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
              tableHeader={tableHeader}
              sortedProp={state.sortedProp}
              onSortChange={onSortChange}
            />
            <TableBody tableHeader={tableHeader} labels={labels} data={data} />
          </Table>
        </Col>
      </Row>
    </Fragment>
  );
}

Datatable.propTypes = {
  /** Initial sort of the table */
  initialSort: PropTypes.object,
  onSort: PropTypes.object,
  onFilter: PropTypes.object,
  rowsPerPage: PropTypes.number,
  rowsPerPageOption: PropTypes.arrayOf(PropTypes.number),
  tableHeader: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableBody: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableBsClass: PropTypes.string,
  labels: PropTypes.object
};

Datatable.defaultProps = {
  initialSort: undefined,
  onSort: undefined,
  onFilter: undefined,
  rowsPerPage: undefined,
  rowsPerPageOption: [],
  tableBsClass: '',
  labels: {}
};

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
export default Datatable;
