# React Bootstrap Datatable

[![Build Status](https://travis-ci.org/Imballinst/react-bs-datatable.svg?branch=master)](https://travis-ci.org/Imballinst/react-bs-datatable)
[![npm version](https://badge.fury.io/js/react-bs-datatable.svg)](https://badge.fury.io/js/react-bs-datatable)

[![NPM](https://nodei.co/npm/react-bs-datatable.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-bs-datatable/)

Inspired by [react-data-components](https://github.com/carlosrocha/react-data-components). This library uses [react-bootstrap](http://react-bootstrap.github.io/) stylesheets and javascripts. In addition, this library also uses [font-awesome](http://fontawesome.io/) for the table header, clear filter, and other stuffs.

## Table of Contents
* [Key Features](#key-features)
* [Props](#props)
* [Styling](#styling)
* [Example Usage](#example-usage)
* [Extending the Table](#extending-the-table)
* [Next Features or Improvements](#next-features-or-improvements)
* [Contributing](#contributing)

## Key features

1. Sort
2. Filter
3. Pagination
4. Custom Labels
5. Presentational and raw data separation

## Props

* tableHeader **(Required)**: Array of objects, each consists of: 
    * `title`: String. Text for the header column.
    * `prop` **(Required)**: String. Column name for the table body.
    * `filterable`: Boolean. Enable/disable filtering on the column.
    * `sortable`: Boolean. Enable/disable sorting on the column.
    * `cell`: Function. Returns a React Component for the table to be rendered.
* tableBody **(Required)**: Array of objects, each consists of `propNames` and `propValues`, depends on how many columns you define in the header.
* tableClass: String. Classes used in `<table>` element tag. Default: `''`.
* keyName **(Required)**: String. It is used to prepend the key property of children elements.
* rowsPerPage: Integer. Initial rows per page. If this and `rowsPerPageOption` are provided but `rowsPerPage` is not a member of `rowsPerPageOption`, then `rowsPerPageOption[0]` will be chosen as the property instead. If not provided, then no pagination options will be rendered. Default: `undefined`.
* rowsPerPageOption: Array of integers for pagination options. Default: `undefined`.
* initialSort: Object, consists of `prop` (String) and `isAscending` (Boolean). Default: `undefined`.
* onSort: Object, consists of keys and values. Key is the prop name and value is the quantifier function. Default: `undefined`.
* labels: Object, consists of keys and values. Default: `{}`. Used to modify tabel labels such as:
    * `first`: String. First page label button.
    * `last`: String. Last page label button.
    * `prev`: String. Previous page label button.
    * `next`: String. Next page label button.
    * `show`: String. The text before select option of `rowsPerPageOption`.
    * `entries`: String. The text after select option of `rowsPerPageOption`.
    * `noResults`: String. Displayed text if table has empty `tableBody` or `[]`.

## Styling

This package doesn't include Bootstrap stylesheets. If you want to include it, you could do so by importing its CSS in your HTML **or** its SCSS [bootstrap-sass](https://github.com/twbs/bootstrap-sass) in your SCSS. You can also style the table by defining it in your SCSS.

```
.table-datatable {
  .thead-default {
    .thead-tr-default {
      .thead-th-default {
        &.sortable { // If and only if a column is sortable
          &:hover {
            background: #000; // Your color of choice
            cursor: pointer; // Changes the cursor into a pointer on hover
          }
        }
      }
    }
  }

  .tbody-default {
    .tbody-tr-default {
      .tbody-td-default {
        // do what you want
      }
    }
  }
}
```

## Example usage

```
import moment from 'moment'; // Example for onSort prop
import React from 'react'; // Import React
import { render } from 'react-dom'; // Import render method
import Datatable from 'react-bs-datatable'; // Import this package

const header = [
  { title: 'Username', prop: 'username', sortable: true, filterable: true },
  { title: 'Name', prop: 'realname', sortable: true },
  { title: 'Name Uppercased', prop: 'realnameuppercase', cell: (row) => row.realname.toUpperCase() },
  { title: 'Location', prop: 'location' },
  { title: 'Last Updated', prop: 'date', sortable: true },
];

const body = [
  { 
    username: 'i-am-billy', 
    realname: 'Billy', 
    location: 'Mars', 
    date: moment().subtract(1, 'days').format('Do MMMM YYYY'),
  },
  { 
    username: 'john-nhoj', 
    realname: 'John', 
    location: 'Saturn',
    date: moment().subtract(2, 'days').format('Do MMMM YYYY'),
  }
];

const onSortFunction = {
  date(columnValue) {
    // Convert the string date format to UTC timestamp
    // So the table could sort it by number instead of string
    return moment(columnValue, 'Do MMMM YYYY').valueOf();
  },
};

const customLabels = {
  first: '<<',
  last: '>>',
  prev: '<',
  next: '>',
  show: 'Display',
  entries: 'rows',
  noResults: 'There is no data to be displayed',
};

render(
  <Datatable
    tableHeader={header}
    tableBody={body}
    keyName="userTable"
    tableClass="striped hover responsive"
    rowsPerPage={5}
    rowsPerPageOption={[5, 10, 15, 20]}
    initialSort={{prop: "username", isAscending: true}}
    onSort={onSortFunction}
    labels={customLabels}
  />,
  document.getElementById('react-test')
);
```

## Extending the Table
You can extend the table if you want to create your own layout (position the text filter to the top right, etc). You'll have to import the components from `react-bs-datatable/lib` folder.
```
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Table from 'react-bootstrap/lib/Table';
import classNames from 'classnames';
import Datatable from 'react-bs-datatable';

import {
  sortData,
  filterData,
  paginateData,
} from 'react-bs-datatable/lib/utils/ClassHelpers';
import Pagination from 'react-bs-datatable/lib/Pagination';
import PaginationOpts from 'react-bs-datatable/lib/PaginationOpts';
import TableHeader from 'react-bs-datatable/lib/TableHeader';
import TableBody from 'react-bs-datatable/lib/TableBody';
import Filter from 'react-bs-datatable/lib/Filter';

class CustomTable extends Datatable {
  render() {
    const { sortedProp, filterText, rowsPerPage, currentPage } = this.state;
    const {
      tableHeader,
      tableBody,
      onSort,
      tableClass: customClass,
      keyName,
      labels,
      rowsPerPageOption,
    } = this.props;

    const filteredData = filterData(tableHeader, filterText, tableBody);
    const sortedData = sortData(sortedProp, onSort, filteredData);

    const paginatedData = paginateData(rowsPerPage, currentPage, sortedData);

    const tableClass = classNames({
      'table-datatable': true,
      [`${customClass}`]: true,
    });

    return (
      <Row>
        <Col xs={12} md={4}>
          <PaginationOpts
            labels={labels}
            onRowsPerPageChange={this.onRowsPerPageChange}
            rowsPerPage={rowsPerPage}
            rowsPerPageOption={rowsPerPageOption}
            keyName={keyName}
          />
        </Col>
        <Col xs={12} md={4}>
          <Pagination
            data={sortedData}
            rowsPerPage={rowsPerPage}
            keyName={keyName}
            currentPage={currentPage}
            onPageNavigate={this.onPageNavigate}
            labels={labels}
          />
        </Col>
        <Col xs={12} md={4} className="text-right">
          <Filter
            tableHeader={tableHeader}
            onChangeFilter={this.onChangeFilter}
            filterText={filterText}
            keyName={keyName}
          />
        </Col>
        <Col xs={12}>
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
              paginatedData={paginatedData}
            />
          </Table>
        </Col>
      </Row>
    );
  }
}
```

## Next Features or Improvements

- [x] Sortable props for each column instead of globally
- [x] Custom sort function (eg. date is ordered by timestamp not by string)
- [x] Filterable props for each column instead of globally
- [x] Custom table classes (it's fixed to striped, responsive, and hover at the moment)
- [x] More extensive unit testing
- [x] Custom labels
- [x] Option to separate presentational and raw data (by using `cell` property in `tableHeader`)
- [ ] Lazy loading for big data (virtualization, asynchronous pagination)

## Contributing

Feel free to contribute by creating issues and/or pull requests. I will do my best to address them as fast as I can.
