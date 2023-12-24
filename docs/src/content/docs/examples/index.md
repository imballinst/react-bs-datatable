---
title: Examples Intro
description: Introduction on using react-bs-datatable
---

To install and use `react-bs-datatable`, follow the steps below.

## Installation

With `npm`:

```bash
npm install --save react-bs-datatable@3 bootstrap@5 react-bootstrap@2 @fortawesome/fontawesome-svg-core@6 @fortawesome/free-solid-svg-icons@6 @fortawesome/react-fontawesome@0
```

With `yarn`:

```bash
yarn add react-bs-datatable@3 bootstrap@5 react-bootstrap@2 @fortawesome/fontawesome-svg-core@6 @fortawesome/free-solid-svg-icons@6 @fortawesome/react-fontawesome@0
```

## Usage

```jsx
import React from 'react';
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOpts,
  TableBody,
  TableHeader
} from 'react-bs-datatable';
import { Col, Row, Table } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

// Create table headers consisting of 4 columns.
const headers = [
  { title: 'Username', prop: 'username' },
  { title: 'Name', prop: 'realname' },
  { title: 'Location', prop: 'location' }
];

// Randomize data of the table columns.
// Note that the fields are all using the `prop` field of the headers.
const body = Array.from(new Array(57), () => {
  const rd = (Math.random() * 10).toFixed(1);

  if (rd > 0.5) {
    return {
      username: 'i-am-billy',
      realname: `Billy ${rd}`,
      location: 'Mars'
    };
  }

  return {
    username: 'john-nhoj',
    realname: `John ${rd}`,
    location: 'Saturn'
  };
});

// Then, use it in a component.
function TableComponent() {
  return (
    <DatatableWrapper body={body} headers={headers}>
      <Table>
        <TableHeader />
        <TableBody />
      </Table>
    </DatatableWrapper>
  );
}
```
