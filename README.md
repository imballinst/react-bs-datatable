# React Bootstrap Datatable

[![Build Status](https://travis-ci.org/Imballinst/react-bs-datatable.svg?branch=master)](https://travis-ci.org/Imballinst/react-bs-datatable)
[![npm version](https://badge.fury.io/js/react-bs-datatable.svg)](https://badge.fury.io/js/react-bs-datatable)

[![NPM](https://nodei.co/npm/react-bs-datatable.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-bs-datatable/)

Inspired by [react-data-components](https://github.com/carlosrocha/react-data-components). This library uses [react-bootstrap](http://react-bootstrap.github.io/) stylesheets and javascripts. In addition, this library also uses [font-awesome](http://fontawesome.io/) for the table header, clear filter, and other stuffs.

## Key features

1. Sorting
2. Filter
3. Pagination

## Props

* tableHeader **(Required)**: Array of objects, each consists of: 
    * `title`: String. Text for the header column.
    * `prop` **(Required)**: String. Column name for the table body.
    * `filterable`: Boolean. Enable/disable filtering on the column.
    * `sortable`: Boolean. Enable/disable sorting on the column.
* tableBody **(Required)**: Array of objects, each consists of `propNames` and `propValues`, depends on how many columns you define in the header.
* tableClass: String. Classes used in <table> element tag.
* keyName **(Required)**: String. It is used to prepend the key property of children elements.
* rowsPerPage: Integer. Initial rows per page. Default: `5`.
* rowsPerPageOption: Array of integer, each consists of pagination options. Default: `[5]`.
* initialSort: Object, each consists of `prop` (String) and `isAscending` (Boolean). Default: `undefined`.

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
import React from 'react'; // Import React
import { render } from 'react-dom'; // Import render method
import { Grid, Row, Col } from 'react-bootstrap'; // Import react-bootstrap scripts
import Datatable from 'react-bs-datatable'; // Import this package

const header = [
  { title: 'Username', prop: 'username', sortable: true, filterable: true },
  { title: 'Name', prop: 'realname', sortable: true },
  { title: 'Location', prop: 'location' }
];

let body = [
  { username: 'i-am-billy', realname: 'Billy', location: 'Mars' },
  { username: 'john-nhoj', realname: 'John', location: 'Saturn' }
];

render(
  <Datatable
    tableHeader={header}
    tableBody={body}
    keyName="userTable"
    tableClass="striped hover responsive"
    rowsPerPage={5}
    rowsPerPageOption={[5, 10, 15, 20]}
    initialSort={{prop: "username", isAscending: true}}
  />,
  document.getElementById('react-test')
);
```

## Next features/improvements

- [x] Sortable props for each column instead of globally
- [x] Filterable props for each column instead of globally
- [ ] Checkbox for each row (for bulk action)
- [ ] Language diversity
- [x] Custom table classes (it's fixed to striped, responsive, and hover at the moment)
- [ ] More extensive unit testing
- [ ] Custom position for filter input field, pagination options, and page navigation
- [ ] Lazy loading for big data

## Changelog

* 1.1.0
  * Updated README.md
  * Renamed table, thead (incl. its tr+th), tbody (incl. its tr+th) default className
  * Added customizable table class
  
* 1.0.0
  * Removed global sortable prop, added sortable prop to each header object
  * Removed global filterable prop, added filterable prop to each header object
  * Fixed pagination bug when viewing on page 2 or more
  * Improved pagination button, instead of arrows, now text
  * Added validation of initialSort prop on the columns that isn't sortable

## Contributing

Feel free to contribute by creating issues and/or pull requests. I will do my best to address them as fast as I can.
