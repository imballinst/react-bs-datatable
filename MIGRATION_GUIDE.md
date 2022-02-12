# Migration guide

This document contains migration guide between major versions.

## `react-bs-datatable@3`

Bumping this library from v2 to v3 requires you to rewrite how the table JSX is written, as well as modifying a lot of dependencies. The changes are as the following.

### Addition, update, and removal of required dependencies

We no longer need to install `font-awesome` and `bootstrap-sass` anymore. On the other hand, for v3, we now lock the `bootstrap` and `react-bootstrap` version to v5 and v2 respectively.

The replacement for `font-awesome` (to get the icons) is to use the Font Awesome SVGs from the `@fortawesome` scope. The advantage of using the SVG React components of Font Awesome is that, we can code-split more properly instead of having to import all of the Font Awesome CSS.

With that said and done, to install the table, we can run the command below. With `npm`:

```bash
npm install --save react-bs-datatable@3 bootstrap@5 react-bootstrap@2 @fortawesome/fontawesome-svg-core@1 @fortawesome/free-solid-svg-icons@5 @fortawesome/react-fontawesome@0
```

With `yarn`:

```
yarn add react-bs-datatable@3 bootstrap@5 react-bootstrap@2 @fortawesome/fontawesome-svg-core@1 @fortawesome/free-solid-svg-icons@5 @fortawesome/react-fontawesome@0
```

### New way to import

Previously, we could just do this:

```ts
import Datatable from 'react-bs-datatable';
// or, if we were extending the table:
import Datatable, { useTableLifecycle } from 'react-bs-datatable';
```

However, now we should import each of the component (if we want to render all controls), including the ones from `react-bootstrap`, for example:

```ts
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOpts,
  TableBody,
  TableHeader
} from 'react-bs-datatable';
import { Col, Row, Table } from 'react-bootstrap';
```

### New `DatatableWrapper` context component

We now require to always use `DatatableWrapper` to wrap the entire table. It acts as a "context" so that we don't have to use the previous [`useDatatableLifecycle`](https://github.com/imballinst/react-bs-datatable/blob/14b03cefa652818a28b0c8d0ae3bbe965f243386/src/Table.tsx#L28) anymore.

In this version, to initialize a table with controls (filter/sort/pagination), we need to declare these JSX elements:

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
```

While this is not as simple as the previous one (only `Datatable`), this enables customization out of the box. Starting from the class names for each of the grid to the props of each of the control component. Not having to import `useDatatableLifecycle` and destructure a lot of fields also helps for readability.

### Initial states and custom functions object for uncontrolled table

There are 5 parameters that we can pass to `DatatableWrapper` if we want to customize the initial states or want to tweak the underlying function.

1. [`checkboxProps`](https://github.com/imballinst/react-bs-datatable/blob/main/api/interfaces/components_DatatableWrapper.DatatableWrapperProps.md#checkboxprops)
2. [`filterProps`](https://github.com/imballinst/react-bs-datatable/blob/main/api/interfaces/components_DatatableWrapper.DatatableWrapperProps.md#checkboxprops)
3. [`paginationOptionsProps`](https://github.com/imballinst/react-bs-datatable/blob/main/api/interfaces/components_DatatableWrapper.DatatableWrapperProps.md#paginationoptionsprops)
4. [`paginationProps`](https://github.com/imballinst/react-bs-datatable/blob/main/api/interfaces/components_DatatableWrapper.DatatableWrapperProps.md#paginationprops)
5. [`sortProps`](https://github.com/imballinst/react-bs-datatable/blob/main/api/interfaces/components_DatatableWrapper.DatatableWrapperProps.md#sortprops)

To declare an initial sort state and custom sort function, for example, we can do this:

```tsx
<DatatableWrapper
  body={json}
  headers={headers}
  sortProps={{
    initialState: {
      order: 'desc',
      prop: 'name'
    },
    sortValueObj: {
      date: (date) => parse(`${date}`, 'MMMM dd, yyyy', new Date()).getTime()
    }
  }}
>
  /* ... */
</DatatableWrapper>
```

There are 2 things that the snippet above does:

1. Set the initial state of the table to sort the `name` prop in descending order.
2. Converts the "value" of the date column from string to number. This is because, some formatted dates cannot be sorted correctly.

The complete example can be seen in this [Storybook story example](https://github.com/imballinst/react-bs-datatable/blob/main/src/__stories__/00-Uncontrolled.stories.tsx#L241-L251).

### Controlling a controlled table

The `async` prop was removed as of v3. Moving forward, to control components of the table, you can define `controlledProps` in each of the components. The example below shows how to render a controlled table with filter, sort, and pagination:

```tsx
<DatatableWrapper body={data} headers={headers}>
  <Row className="mb-4">
    <Col
      xs={12}
      lg={4}
      className="d-flex flex-col justify-content-end align-items-end"
    >
      <Filter controlledProps={{ filter, onFilter }} />
    </Col>
    <Col
      xs={12}
      sm={6}
      lg={4}
      className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
    >
      <PaginationOptions
        controlledProps={{
          filteredDataLength,
          onRowsPerPageChange,
          rowsPerPageOptions: rowsPerPageOptionsProp,
          rowsPerPage
        }}
      />
    </Col>
    <Col
      xs={12}
      sm={6}
      lg={4}
      className="d-flex flex-col justify-content-end align-items-end"
    >
      <Pagination
        controlledProps={{ currentPage, maxPage, onPaginationChange }}
      />
    </Col>
  </Row>
  <Table>
    <TableHeader
      controlledProps={{
        sortState,
        onSortChange,
        filteredDataLength
      }}
    />
    <TableBody />
  </Table>
</DatatableWrapper>
```

The complete example can be seen in this [Storybook story component](https://github.com/imballinst/react-bs-datatable/blob/main/src/__stories__/01-Controlled.stories.tsx#L147-L180).

### More composable table classes

In v2, all table classes are centralized in the `classes` object of the `Datatable` component. Now, all exported components (except `DatatableWrapper`) have their own `classes` prop. For example, to add custom classnames to `Filter` component, we can do this:

```tsx
<Filter
  classes={{
    inputGroup: 'input-group-classname',
    input: 'input-classname',
    clearButton: 'clear-button-classname'
  }}
/>
```

All fields of the `classes` prop are optional, so if you only want to customize the class for `inputGroup` only, that's completely fine. The same is also applied for other components.

### Drop support for integration with other UI component libraries

Previously, this library allowed integration/customization with other UI component libraries, such as Material UI. As of v3, this library will **only** support Bootstrap.
