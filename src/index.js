import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Table from 'react-bootstrap/lib/Table';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Form from 'react-bootstrap/lib/Form';

// Import Lodash used functions
import _filter from 'lodash/filter';
import _forEach from 'lodash/forEach';
import _orderBy from 'lodash/orderBy';
import _includes from 'lodash/includes';
import _keys from 'lodash/keys';

import classNames from 'classnames/bind';

import SelectFilter from './utils/SelectFilter';
import FontAwesome from './utils/FontAwesome';

class Datatable extends React.Component {
  constructor(props) {
    super(props);

    let defaultSort = {};

    if (props.initialSort !== undefined) {
      let found = false;
      let i = 0;

      while (!found && i < props.tableHeader.length) {
        if (props.tableHeader[i].prop === props.initialSort.prop) {
          found = true;

          if (props.tableHeader[i].sortable === true) {
            defaultSort = props.initialSort;
          }
        }

        i += 1;
      }
    }

    this.state = {
      sortedProp: defaultSort,
      rowsPerPage: props.rowsPerPage,
      currentPage: 1,
      filterText: '',
    };
  }

  componentWillReceiveProps() {
    this.setState({
      filterText: '',
      currentPage: 1,
    });
  }

  onChangeFilter = (text) => {
    this.setState({
      filterText: text,
      currentPage: 1,
    });
  }

  onPageNavigate = nextPage => (e) => {
    e.preventDefault();

    this.setState({
      currentPage: nextPage,
    });
  }

  onRowsPerPageChange = (e) => {
    e.preventDefault();

    this.setState({
      rowsPerPage: e.target.value,
      currentPage: 1,
    });
  }

  onSortChange = nextProp => (e) => {
    e.preventDefault();

    const nextSort = this.state.sortedProp;

    if (nextProp !== this.state.sortedProp.prop) {
      nextSort.prop = nextProp;
      nextSort.isAscending = true;
    } else {
      nextSort.isAscending = !this.state.sortedProp.isAscending;
    }

    this.setState({
      sortedProp: nextSort,
    });
  }

  getLastChildren(reactElement) {
    return React.isValidElement(reactElement) ?
      this.getLastChildren(reactElement.props.children) : reactElement;
  }

  isPropFilterable(prop) {
    let i = 0;
    let found = false;
    let isFilterable = false;

    while (!found && i < this.props.tableHeader.length) {
      if (this.props.tableHeader[i].prop === prop) {
        found = true;

        if (this.props.tableHeader[i].filterable === true) {
          isFilterable = true;
        }
      }

      i += 1;
    }

    return isFilterable;
  }

  sortData(data) {
    let sortedData = data;

    if (this.state.sortedProp !== {}) {
      const { prop: sortedProp, isAscending } = this.state.sortedProp;
      const onSort = this.props.onSort;

      const sortMultiplier = (isAscending) ? 'asc' : 'desc';

      sortedData = _orderBy(sortedData, (value) => {
        let quantifiedValue = this.getLastChildren(value[sortedProp]);

        // if onSort use the onSort[sortedProp] function
        // this is a handler for custom objects, such as moment
        if (onSort && typeof onSort[sortedProp] === 'function') {
          quantifiedValue = onSort[sortedProp](quantifiedValue);
        }

        return quantifiedValue;
      }, sortMultiplier);
    }

    return sortedData;
  }

  filterData(data) {
    let filteredData = data;

    if (this.state.filterText !== '') {
      filteredData = _filter(filteredData, (element) => {
        let isElementIncluded = false;
        let i = 0;

        const elementProps = _keys(element);
        const elementPropLength = elementProps.length;

        while (!isElementIncluded && (i < elementPropLength)) {
          if (this.isPropFilterable(elementProps[i])) {
            let columnValue = element[elementProps[i]];

            // Get last children and fill columnValue with empty string if undefined
            if (React.isValidElement(columnValue)) {
              columnValue = this.getLastChildren(columnValue) || '';
            }

            // Convert to string if it is a number
            if (typeof columnValue === 'number') {
              columnValue = columnValue.toString();
            }

            columnValue = columnValue.toLowerCase();

            // If filterText is string/substring of columnValue
            isElementIncluded = _includes(columnValue, this.state.filterText.toLowerCase());
          }

          i += 1;
        }

        return isElementIncluded;
      });
    }

    return filteredData;
  }

  paginateData(data) {
    let paginatedData = data;

    if (this.props.rowsPerPage !== undefined) {
      const startRow = (this.state.currentPage - 1) * this.state.rowsPerPage;
      const endRow = this.state.currentPage * this.state.rowsPerPage;

      paginatedData = data.slice(startRow, endRow);
    }

    return paginatedData;
  }

  generateFirstPrevButtons(minPage, currentPage, hasPrev) {
    const buttons = [];
    const firstPageProps = {
      key: `${this.props.keyName}-page-first`,
      disabled: !hasPrev,
      onClick: this.onPageNavigate(minPage),
    };
    const prevPageProps = {
      key: `${this.props.keyName}-page-prev`,
      disabled: !hasPrev,
      onClick: this.onPageNavigate(currentPage - 1),
    };

    buttons.push(
      <Button {...firstPageProps}>
        {this.props.labels.first || 'First'}
      </Button>,
      <Button {...prevPageProps}>
        {this.props.labels.prev || 'Prev'}
      </Button>,
    );

    return buttons;
  }

  generateNextLastButtons(maxPage, currentPage, hasNext) {
    const buttons = [];
    const nextPageProps = {
      key: `${this.props.keyName}-page-next`,
      disabled: !hasNext,
      onClick: this.onPageNavigate(currentPage + 1),
    };
    const lastPageProps = {
      key: `${this.props.keyName}-page-last`,
      disabled: !hasNext,
      onClick: this.onPageNavigate(maxPage),
    };

    buttons.push(
      <Button {...nextPageProps}>
        {this.props.labels.next || 'Next'}
      </Button>,
      <Button {...lastPageProps}>
        {this.props.labels.last || 'Last'}
      </Button>,
    );

    return buttons;
  }

  renderPagination(data) {
    let renderedElements = null;

    if (this.props.rowsPerPage !== undefined) {
      const dataLength = data.length;
      const numberOfPages = Math.ceil(dataLength / this.state.rowsPerPage);
      const buttons = [];

      let startNumber;
      let i = 0;
      let hasPrev = true;
      let hasNext = true;

      if (this.state.currentPage === 1) {
        startNumber = 1;
        hasPrev = false;
        hasNext = (numberOfPages > 1);
      } else if (this.state.currentPage === numberOfPages && numberOfPages !== 1) {
        startNumber = (numberOfPages - 2 > 0) ? this.state.currentPage - 2 : 1;
        hasNext = false;
      } else {
        startNumber = this.state.currentPage - 1;
      }

      buttons.push(this.generateFirstPrevButtons(1, this.state.currentPage, hasPrev));

      while (i < 3 && startNumber <= numberOfPages) {
        const pageBtnProps = {
          key: `${this.props.keyName}-page-btn-${startNumber}`,
          onClick: this.onPageNavigate(startNumber),
          active: this.state.currentPage === startNumber,
        };

        buttons.push(
          <Button {...pageBtnProps}>
            {startNumber}
          </Button>,
        );

        i += 1;
        startNumber += 1;
      }

      buttons.push(this.generateNextLastButtons(numberOfPages, this.state.currentPage, hasNext));

      renderedElements = (
        <ButtonGroup className="btn-group-page-nav">
          {buttons}
        </ButtonGroup>
      );
    }

    return renderedElements;
  }

  renderFilterOption() {
    let filterRender = null;
    let i = 0;
    let filterable = false;

    while (!filterable && i < this.props.tableHeader.length) {
      if (this.props.tableHeader[i].filterable === true) {
        filterable = true;
      }

      i += 1;
    }

    if (filterable) {
      filterRender = (
        <SelectFilter
          onChangeFilter={this.onChangeFilter}
          filterText={this.state.filterText}
          keyName={this.props.keyName}
        />
      );
    }

    return filterRender;
  }

  renderPaginationOption() {
    const selectOption = [];
    const defaultRowsPerPage = this.props.rowsPerPage;
    let renderedElements = null;

    if (defaultRowsPerPage !== undefined) {
      let arrayOfOptions = [];
      arrayOfOptions.push(defaultRowsPerPage);

      // Make sure there are no duplicates being pushed
      _forEach(this.props.rowsPerPageOption, (opt) => {
        if (!_includes(arrayOfOptions, opt) && typeof(opt) === 'number') {
          arrayOfOptions.push(opt);
        }
      });

      arrayOfOptions = _orderBy(arrayOfOptions, undefined, 'asc');

      _forEach(arrayOfOptions, (option) => {
        const optionProps = {
          key: `${this.props.keyName}-page-opt-${option}`,
          value: option,
        };

        selectOption.push(
          <option {...optionProps}>{option}</option>,
        );
      });

      renderedElements = (
        <Form inline>
          <FormGroup controlId="formGroupPagination">
            {this.props.labels.show || 'Show'}{' '}
            <FormControl
              name="form-control-pagination"
              defaultValue={this.state.rowsPerPage}
              componentClass="select"
              placeholder="select"
              onChange={this.onRowsPerPageChange}
            >
              {selectOption}
            </FormControl>
            {' '}{this.props.labels.entries || 'entries'}
          </FormGroup>
        </Form>
      );
    }

    return renderedElements;
  }

  renderTableHeader() {
    const headings = [];

    for (let i = 0; i < this.props.tableHeader.length; i += 1) {
      const thClass = classNames({
        'thead-th-default': true,
        sortable: this.props.tableHeader[i].sortable === true,
      });
      const thProps = {
        key: `${this.props.keyName}-th-${i}`,
        onClick: this.props.tableHeader[i].sortable === true ?
                 this.onSortChange(this.props.tableHeader[i].prop) : undefined,
        className: thClass,
      };
      let sortIcon = 'sort';
      let sortIconRender = null;

      if (this.props.tableHeader[i].sortable === true) {
        if (this.state.sortedProp !== {} &&
            this.state.sortedProp.prop === this.props.tableHeader[i].prop) {
          if (this.state.sortedProp.isAscending) {
            sortIcon = 'sort-asc';
          } else {
            sortIcon = 'sort-desc';
          }
        }

        sortIconRender = (
          <FontAwesome icon={sortIcon} additionalClass="fa-fw" />
        );
      }

      headings.push(
        <th {...thProps}>
          {this.props.tableHeader[i].title}
          <span className="pull-right">{sortIconRender}</span>
        </th>,
      );
    }

    return headings;
  }

  renderTableBody(filteredData) {
    const body = [];

    if (filteredData.length !== 0) {
      for (let i = 0; i < filteredData.length; i += 1) {
        body.push(
          <tr key={`${this.props.keyName}-row-${i}`} className="tbody-tr-default" >
            {this.renderSingleRow(filteredData, i)}
          </tr>,
        );
      }
    } else {
      body.push(
        <tr key={`${this.props.keyName}-row-zero-length`} className="tbody-tr-default">
          <td className="tbody-td-default" colSpan={this.props.tableHeader.length}>
            {this.props.labels.no_results || 'No results to be shown.'}
          </td>
        </tr>,
      );
    }

    return body;
  }

  renderSingleRow(data, rowIdx) {
    const row = [];

    for (let i = 0; i < this.props.tableHeader.length; i += 1) {
      row.push(
        <td key={`${this.props.keyName}-col-${rowIdx}${i}`} className="tbody-td-default">
          {data[rowIdx][this.props.tableHeader[i].prop]}
        </td>,
      );
    }

    return row;
  }

  render() {
    const filteredData = this.filterData(this.props.tableBody);
    const sortedData = this.sortData(filteredData);

    const paginatedData = this.paginateData(sortedData);
    const pagination = this.renderPagination(sortedData);

    const customClass = this.props.tableClass;
    const tableClass = classNames({
      'table-datatable': true,
      [`${customClass}`]: true,
    });

    return (
      <Row>
        <Col xs={12} md={4}>
          {this.renderFilterOption()}
        </Col>
        <Col xs={12} md={4}>
          {this.renderPaginationOption()}
        </Col>
        <Col xs={12} md={4} className="text-right">
          {pagination}
        </Col>
        <Col xs={12}>
          <Table className={tableClass}>
            <thead className="thead-default">
              <tr className="thead-tr-default">
                {this.renderTableHeader()}
              </tr>
            </thead>
            <tbody className="tbody-default">
              {this.renderTableBody(paginatedData)}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

Datatable.propTypes = {
  initialSort: PropTypes.object,
  keyName: PropTypes.string.isRequired,
  onSort: PropTypes.object,
  rowsPerPage: PropTypes.number,
  rowsPerPageOption: PropTypes.arrayOf(PropTypes.number),
  tableHeader: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableBody: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableClass: PropTypes.string,
  labels: PropTypes.object,
};

Datatable.defaultProps = {
  initialSort: undefined,
  onSort: undefined,
  rowsPerPage: undefined,
  rowsPerPageOption: undefined,
  tableClass: '',
  labels: {},
};

export default Datatable;
