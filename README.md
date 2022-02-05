# React Bootstrap Datatable

[![minzipped size](https://img.shields.io/bundlephobia/minzip/react-bs-datatable)](https://bundlephobia.com/package/react-bs-datatable) [![npm version](https://badge.fury.io/js/react-bs-datatable.svg)](https://badge.fury.io/js/react-bs-datatable) [![downloads per week](https://img.shields.io/npm/dw/react-bs-datatable)](https://www.npmjs.com/package/react-bs-datatable)

Inspired by [react-data-components](https://github.com/carlosrocha/react-data-components). This library uses [react-bootstrap](http://react-bootstrap.github.io/) stylesheets and javascripts. In addition, this library also uses [font-awesome](http://fontawesome.io/) for the table header, clear filter, and other stuffs.

This is the v3 version of the library. To see the v2 version of README, please visit the [v1 branch](https://github.com/imballinst/react-bs-datatable/tree/v1).

## What's new in v3?

- [x] New build and publish system. Previously, this library used Webpack for bundling etc.—now it only uses `tsc` to compile the TypeScript files to output all files to the `lib` folder.
- [x] ESM and CommonJS are now supported. There are 2 new TypeScript configurations in the project, one is used for building ESM and the other is for building CommonJS.
- [x] Updated Storybook. Previously, this library still used `storiesOf`, but now it is using Component Story Format (CSF), which was available starting from Storybook v5.
- [x] Lots of optimizations, bundle size in particular. As reported by [Bundlephobia](https://bundlephobia.com/package/react-bs-datatable@3.0.0-alpha.6) for the Alpha version, the minified size is down to just a quarter of what it was, whereas the minified + gzip is down to a third of what it was.
- [x] Replaced `font-awesome` CSS with the [React components of Font Awesome](https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react). This allowed us to enable tree shaking, which resulted in the optimization point above.
- [x] Drop support for all other libraries. This library will now only support Bootstrap tables.
- [ ] Auto generate component APIs.
- [ ] Migration guide.

To see the current state of `react-bs-datatable` prerelease version, please visit this Sandbox: https://codesandbox.io/s/react-bs-datatable-3-zq7xe.

## Breaking changes

### Bootstrap and React Bootstrap version bump

We are now using Bootstrap v5 and React Bootstrap v2. Older versions are not supported starting from `react-bs-datatable` v3.

### Removal and addition of required dependencies

We no longer need to install `font-awesome` and `bootstrap-sass` anymore. However, these dependencies are now required to make this library function properly:

1. `bootstrap@5`
2. `react-bootstrap@2`
3. `@fortawesome/fontawesome-svg-core@^1`
4. `@fortawesome/free-solid-svg-icons@^5`
5. `@fortawesome/react-fontawesome@^0.1`

The advantages of using the SVG React components of Font Awesome is that, we can code-split more properly instead of having to import all of the Font Awesome CSS.

### Update components API

We now require to always use `DatatableWrapper` to wrap the entire table. It acts as a "context" so that we don't have to use the previous [`useDatatableLifecycle`](https://github.com/imballinst/react-bs-datatable/blob/14b03cefa652818a28b0c8d0ae3bbe965f243386/src/Table.tsx#L28) anymore.

Now, to initialize the simplest table, we need to declare these JSX elements:

```tsx
<DatatableWrapper body={json} headers={headers}>
  <Row className="mb-4">
    <Col
      xs={12}
      lg={4}
      className="d-flex flex-col justify-content-end align-items-end"
    >
      <Filter />
    </Col>
    <Col
      xs={12}
      sm={6}
      lg={4}
      className="d-flex flex-col justify-content-center align-items-center"
    >
      <PaginationOpts />
    </Col>
    <Col
      xs={12}
      sm={6}
      lg={4}
      className="d-flex flex-col justify-content-end align-items-end"
    >
      <Pagination />
    </Col>
  </Row>
  <Table>
    <TableHeader tableHeaders={headers} />
    <TableBody />
  </Table>
</DatatableWrapper>
```

While this is not as simple as the previous one (only `Datatable`), this enables customization out of the box. Starting from the class names for each of the grid to the props of each of the control component. Not having to import `useDatatableLifecycle` and destructure a lot of fields also helps for readability.

Declaring initial states for uncontrolled states was also changed. To provide initial state, we can pass `sortProps`, `paginationOptionsProps`, etc. to `DatatableWrapper`. For controlled states, each control component now accept `controlledProps`, which consists of the states required by the respecting component.

<!-- TODO(imballinst): declare a more comprehensive and structured breaking changes in separate Markdown files. -->

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Storybook Demo](#storybook-demo)
- [Props](#props)
- [Next Features or Improvements](#next-features-or-improvements)
- [Contributing](#contributing)

## Installation

```bash
# With NPM.
npm install --save react-bs-datatable@3 bootstrap@5 react-bootstrap@2 @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome

# With Yarn.
yarn add react-bs-datatable@3 bootstrap@5 react-bootstrap@2 @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
```

## Usage

For more complete examples, please visit this sandbox link (https://codesandbox.io/s/react-bs-datatable-3-zq7xe) or the Storybook demo (https://imballinst.github.io/react-bs-datatable).

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
const header = [
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
      <Row className="mb-4">
        <Col
          xs={12}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Filter />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
        >
          <PaginationOpts />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Pagination />
        </Col>
      </Row>
      <Table>
        <TableHeader tableHeaders={headers} />
        <TableBody />
      </Table>
    </DatatableWrapper>
  );
}
```

## Storybook Demo.

Head to https://imballinst.github.io/react-bs-datatable to see all of the features in action.

## API

Still todo. Need to auto-generate from the TypeScript with typedoc.

## Contributing

Feel free to contribute by creating issues and/or pull requests. I will do my best to address them as fast as I can.
