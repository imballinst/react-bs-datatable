import React, { PropTypes } from 'react';
import { Row, Col, Table, ButtonGroup, Button, FormGroup, FormControl, ControlLabel,
         Form } from 'react-bootstrap';
import classNames from 'classnames/bind';

import SelectFilter from './utils/SelectFilter';
import FontAwesome from './utils/FontAwesome';

class CustomTable extends React.Component {
  constructor(props) {
    super(props);

    const defaultRowsPerPage = props.rowsPerPage !== undefined ? props.rowsPerPage : 5;
    const defaultSort = props.initialSort !== undefined ? props.initialSort : {};

    this.state = {
      sortedProp: defaultSort,
      rowsPerPage: defaultRowsPerPage,
      currentPage: 1,
      filterText: ''
    };
  }

  onChangeFilter = (text) => {
    this.setState({
      filterText: text,
      currentPage: 1
    });
  }

  onPageNavigate = (nextPage) => (e) => {
    this.setState({
      currentPage: nextPage
    });
  }

  onRowsPerPageChange = () => (e) => {
    this.setState({
      rowsPerPage: e.target.value
    });
  }

  onSortChange = (nextProp) => (e) => {
    let nextSort = this.state.sortedProp;

    if (nextProp !== this.state.sortedProp.prop) {
      nextSort.prop = nextProp;
      nextSort.isAscending = true;
    } else {
      nextSort.isAscending = !this.state.sortedProp.isAscending;
    }

    this.setState({
      sortedProp: nextSort
    });
  }

  sortInitialData() {
    let data = this.props.tableBody;

    if (this.state.sortedProp !== {} && this.props.sortable === true) {
      const sortedProp = this.state.sortedProp.prop;
      const descendingMultiplier = (this.state.sortedProp.isAscending) ? 1 : -1;

      data.sort((a, b) => {
        if (a[sortedProp] < b[sortedProp]) {
          return -1 * descendingMultiplier;
        } else if (a[sortedProp] > b[sortedProp]) {
          return 1 * descendingMultiplier;
        } else {
          return 0;
        }
      });
    }

    return data;
  }

  filterSortedData(data) {
    let filteredData = data;

    if (this.state.filterText !== '') {
      filteredData = data.filter((element) => {
        let isElementIncluded = false;
        let i = 0;
        const elementPropLength = Object.keys(element).length;

        while (!isElementIncluded && (i < elementPropLength)) {
          if (element[Object.keys(element)[i]].includes(this.state.filterText)) {
            isElementIncluded = true;
          }

          i++;
        }

        return isElementIncluded;
      });
    }

    return filteredData;
  }

  paginateFilteredData(filteredData) {
    let paginatedData = filteredData;
    const startRow = (this.state.currentPage - 1) * this.state.rowsPerPage,
          endRow = this.state.currentPage * this.state.rowsPerPage;

    paginatedData = paginatedData.slice(startRow, endRow);

    return paginatedData;
  }

  generateFirstPrevButtons(minPage, currentPage, hasPrev) {
    let buttons = [],
        firstPageProps = {
          key: this.props.keyName + "-page-first",
          disabled: !hasPrev,
          onClick: this.onPageNavigate(minPage)
        },
        prevPageProps = {
          key: this.props.keyName + "-page-prev",
          disabled: !hasPrev,
          onClick: this.onPageNavigate(currentPage - 1)
        };

    buttons.push(
      <Button {...firstPageProps}>
        {"<<"}
      </Button>
    );

    buttons.push(
      <Button {...prevPageProps}>
        {"<"}
      </Button>
    );

    return buttons;
  }

  generateNextLastButtons(maxPage, currentPage, hasNext) {
    let buttons = [];
    const nextPageProps = {
      key: this.props.keyName + "-page-next",
      disabled: !hasNext,
      onClick: this.onPageNavigate(currentPage + 1)
    };
    const lastPageProps = {
      key: this.props.keyName + "-page-last",
      disabled: !hasNext,
      onClick: this.onPageNavigate(maxPage)
    };

    buttons.push(
      <Button {...nextPageProps}>
        {">"}
      </Button>
    );

    buttons.push(
      <Button {...lastPageProps}>
        {">>"}
      </Button>
    );

    return buttons;
  }

  renderPagination(filteredData) {
    const dataLength = filteredData.length;
    const numberOfPages = Math.ceil(dataLength / this.state.rowsPerPage);

    let startNumber, i = 0;
    let buttons = [], hasPrev = true, hasNext = true;

    if (this.state.currentPage === 1) {
      startNumber = 1;
      hasPrev = false;
    } else if (this.state.currentPage === numberOfPages) {
      startNumber = (numberOfPages - 2 > 0) ? this.state.currentPage - 2 : 1;
      hasNext = false;
    } else {
      startNumber = this.state.currentPage - 1;
    }

    buttons.push(this.generateFirstPrevButtons(1, this.state.currentPage, hasPrev));

    while (i < 3 && startNumber <= numberOfPages) {
      const pageBtnProps = {
        key: this.props.keyName + "-page-btn-" + startNumber,
        onClick: this.onPageNavigate(startNumber),
        active: this.state.currentPage === startNumber
      };

      buttons.push(
        <Button {...pageBtnProps}>
          {startNumber}
        </Button>
      );

      i++;
      startNumber++;
    }

    buttons.push(this.generateNextLastButtons(numberOfPages, this.state.currentPage, hasNext));

    return (
      <ButtonGroup className="btn-group-page-nav">
        {buttons}
      </ButtonGroup>
    );
  }

  renderFilterOption() {
    let filterRender = null;

    if (this.props.filterable !== undefined && this.props.filterable !== false) {
      filterRender = (
        <SelectFilter
          onChangeFilter={this.onChangeFilter}
          filterText={this.state.filterText}
        />
      );
    }

    return filterRender;
  }

  renderPaginationOption() {
    let arrayOfOptions = [], selectOption = [];

    // Push the defined/default rows per page
    const defaultRowsPerPage = this.props.rowsPerPage !== undefined ? this.props.rowsPerPage : 5;
    arrayOfOptions.push(defaultRowsPerPage);

    // Make sure there are no duplicates being pushed
    if (this.props.rowsPerPageOption !== undefined) {
      this.props.rowsPerPageOption.forEach((opt) => {
        if (!arrayOfOptions.includes(opt)) {
          arrayOfOptions.push(opt);
        }
      });

      arrayOfOptions = arrayOfOptions.sort((a, b) => {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    arrayOfOptions.forEach((option) => {
      const optionProps = {
        key: this.props.keyName + "-page-opt-" + option,
        value: option
      };

      selectOption.push(
        <option {...optionProps}>{option}</option>
      );
    });

    return (
      <Form inline>
        <FormGroup controlId="formControlPagination">
          {"Show "}
          <FormControl
            defaultValue={this.state.rowsPerPage}
            componentClass="select"
            placeholder="select"
            onChange={this.onRowsPerPageChange()}
          >
            {selectOption}
          </FormControl>
          {" options per page"}
        </FormGroup>
      </Form>
    );
  }

  renderTableHeader() {
    let headings = [];

    for (let i = 0; i < this.props.tableHeader.length; i++) {
      let sortIcon = 'sort', sortIconRender = null;
      const thClass = classNames({
        'table-custom-thead-col': true,
        'sortable': this.props.sortable === true
      });
      const thProps = {
        key: this.props.keyName + "-th-" + i,
        onClick: this.onSortChange(this.props.tableHeader[i].prop),
        className: thClass
      };

      if (this.props.sortable === true) {
        if (this.state.sortedProp !== {} && this.state.sortedProp.prop === this.props.tableHeader[i].prop) {
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
        </th>
      );
    }

    return headings;
  }

  renderTableBody(filteredData) {
    let body = [];

    if (filteredData.length !== 0) {
      for (let i = 0; i < filteredData.length; i++) {
        body.push(
          <tr key={this.props.keyName + "-row-" + i}>
            {this.renderSingleRow(filteredData, i)}
          </tr>
        );
      }
    } else {
      body.push(
        <tr key={this.props.keyName + "-row-zero-length"}>
          <td colspan={this.props.tableHeader.length}>
            No results to be shown.
          </td>
        </tr>
      );
    }

    return body;
  }

  renderSingleRow(data, rowIdx) {
    let row = [];

    for (let i = 0; i < this.props.tableHeader.length; i++) {
      row.push(
        <td key={this.props.keyName + "-col-" + rowIdx + i}>
          {data[rowIdx][this.props.tableHeader[i].prop]}
        </td>
      );
    }

    return row;
  }

  render() {
    const data = this.sortInitialData();
    const filteredData = this.filterSortedData(data);
    const paginatedData = this.paginateFilteredData(filteredData);

    const pagination = this.renderPagination(filteredData);

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
          <Table className="table-custom" striped hover responsive>
            <thead className="table-custom-thead">
              <tr>
                {this.renderTableHeader()}
              </tr>
            </thead>
            <tbody>
              {this.renderTableBody(paginatedData)}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

CustomTable.propTypes = {
  tableHeader: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableBody: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowsPerPage: PropTypes.number,
  rowsPerPageOption: PropTypes.arrayOf(PropTypes.number),
  sortable: PropTypes.bool,
  filterable: PropTypes.bool,
  initialSort: PropTypes.object,
  keyName: PropTypes.string.isRequired
};

export default CustomTable;
