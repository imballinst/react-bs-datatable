import React, { Fragment } from 'react';
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

class Datatable extends React.Component {
  constructor(props) {
    super(props);

    const { tableHeader, initialSort, rowsPerPageOption, rowsPerPage } = props;
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
    this.state = {
      sortedProp: defaultSort,
      rowsPerPage: defaultRowsPerPage,
      currentPage: 1,
      filterText: ''
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      filterText: '',
      currentPage: 1,
      rowsPerPage: newProps.rowsPerPage
    });
  }

  onChangeFilter = text => {
    this.setState({
      filterText: text,
      currentPage: 1
    });
  };

  onPageNavigate = nextPage => () => {
    this.setState({
      currentPage: nextPage
    });
  };

  onRowsPerPageChange = numOfPage => {
    this.setState({
      rowsPerPage: parseInt(numOfPage, 10),
      currentPage: 1
    });
  };

  onSortChange = nextProp => () => {
    const nextSort = this.state.sortedProp;

    if (nextProp !== this.state.sortedProp.prop) {
      nextSort.prop = nextProp;
      nextSort.isAscending = true;
    } else {
      nextSort.isAscending = !this.state.sortedProp.isAscending;
    }

    this.setState({
      sortedProp: nextSort
    });
  };

  processData(tableHeader, tableBody, onSort, onFilter) {
    const { sortedProp, filterText, rowsPerPage, currentPage } = this.state;
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

  render() {
    const { sortedProp, filterText, rowsPerPage, currentPage } = this.state;
    const {
      tableHeader,
      tableBody,
      onSort,
      onFilter,
      keyName,
      tableBsClass,
      labels,
      rowsPerPageOption
    } = this.props;

    const data = this.processData(tableHeader, tableBody, onSort, onFilter);
    const tableClass = classNames(`table-datatable-${keyName}`, tableBsClass);

    return (
      <Fragment>
        <Row className={`controlRow-${keyName}`}>
          <Col xs={12} md={4}>
            <Filter
              tableHeader={tableHeader}
              placeholder={labels.filterPlaceholder}
              onChangeFilter={this.onChangeFilter}
              filterText={filterText}
              keyName={keyName}
            />
          </Col>
          <Col xs={12} md={4}>
            <PaginationOpts
              labels={labels}
              onRowsPerPageChange={this.onRowsPerPageChange}
              rowsPerPage={rowsPerPage}
              rowsPerPageOption={rowsPerPageOption}
              keyName={keyName}
            />
          </Col>
          <Col xs={12} md={4} className="text-right">
            <Pagination
              data={tableBody}
              rowsPerPage={rowsPerPage}
              keyName={keyName}
              currentPage={currentPage}
              onPageNavigate={this.onPageNavigate}
              labels={labels}
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <Table className={tableClass}>
              <TableHeader
                tableHeader={tableHeader}
                keyName={keyName}
                sortedProp={sortedProp}
                onSortChange={this.onSortChange}
              />
              <TableBody
                tableHeader={tableHeader}
                keyName={keyName}
                labels={labels}
                data={data}
              />
            </Table>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

Datatable.propTypes = {
  initialSort: PropTypes.object,
  onSort: PropTypes.object,
  onFilter: PropTypes.object,
  rowsPerPage: PropTypes.number,
  rowsPerPageOption: PropTypes.arrayOf(PropTypes.number),
  tableHeader: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableBody: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableBsClass: PropTypes.string,
  keyName: PropTypes.string,
  labels: PropTypes.object
};

Datatable.defaultProps = {
  initialSort: undefined,
  onSort: undefined,
  onFilter: undefined,
  rowsPerPage: undefined,
  rowsPerPageOption: [],
  tableBsClass: '',
  keyName: 'default',
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
