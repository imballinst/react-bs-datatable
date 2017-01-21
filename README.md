# React Bootstrap Datatable

Inspired by [react-data-components](https://github.com/carlosrocha/react-data-components). This library uses [react-bootstrap](http://react-bootstrap.github.io/) stylesheets and javascripts. In addition, this library also uses [font-awesome](http://fontawesome.io/) for the table header, clear filter, and other stuffs.

## Key features

1. Sorting
2. Filter
3. Pagination

## Props

* tableHeader **(Required)**: Array of objects, consists of `title` and `prop`. Title is used to render text inside `th` and prop is used to match the body column with the header column.
* tableBody **(Required)**: Array of objects, consists of `props` and `their value`. Each object will be rendered to the matching column.
* keyName **(Required)**: String. Required to label the key of children elements inside the component.
* rowsPerPage: Integer. Initial rows per page. Default: `5`.
* rowsPerPageOption: Array of integer, consists of pagination options. Default: `[5]`.
* sortable: Boolean. Will determine whether the table will be sortable or not. Default: `false`.
* filterable: Boolean. Will determine whether the table will be filterable or not. Default: `false`.
* initialSort: OBject, consists of `sortedProp` and `isAscending`. Default: `undefined`.

## How to use

```
import React from 'react';
import { render } from 'react-dom';
import 'Datatable' from 'react-bs-datatable';

const tableHeader = [
  { title: 'Username', prop: 'userID'  },
  { title: 'Person Name', prop: 'name' },
];

const tableBody = [
  { userID: "i-am-tyler", name: "Tyler Olfson"},
  { userID: "sir-bobby", name: "Bobby Charly"}
];

render(
  <Datatable
    tableHeader={tableHeader}
    tableBody={tableBody}
    keyName="userTable"
    rowsPerPage={5}
    rowsPerPageOption={[5, 10, 15, 20]}
    sortable
    filterable
    initialSort={{sortedProp: userID, isAscending: true}}
  />,
  document.getElementById('test-datatable')
);
```

## License

Copyright (C) 2017 Try Ajitiono

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
