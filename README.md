# React Bootstrap Datatable

[![Build Status](https://travis-ci.org/Imballinst/react-bs-datatable.svg?branch=master)](https://travis-ci.org/Imballinst/react-bs-datatable)
[![npm version](https://badge.fury.io/js/react-bs-datatable.svg)](https://badge.fury.io/js/react-bs-datatable)

[![NPM](https://nodei.co/npm/react-bs-datatable.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-bs-datatable/)

Inspired by [react-data-components](https://github.com/carlosrocha/react-data-components). This library uses [react-bootstrap](http://react-bootstrap.github.io/) stylesheets and javascripts. In addition, this library also uses [font-awesome](http://fontawesome.io/) for the table header, clear filter, and other stuffs.

## What's new in v2?

1. TypeScript! The Table comes out with the `*.d.ts` files. You should be more type-safe now.
2. Async capability for huge amount of data. Filtering, sorting, and pagination all support this feature.
3. Custom table components. Tired of using Bootstrap? I know the lib name is Bootstrap, but maybe you want to change it to something else!
4. Of course, there may be some breaking changes. Please see the updated docs and Storybook demo for the most up-to-date usages.

## Storybook Demo.

Head to https://imballinst.github.io/react-bs-datatable to see the list of the features in actions.

1. Sort
2. Filter
3. Pagination
4. Custom Labels
5. Presentational and raw data separation
6. Custom column sort and column filter function
7. Custom classes
8. Create your own table by extending the existing features
9. Async
10. Custom Table Components (e.g. using Material UI Components)

## Table of Contents

- [Installation](#installation)
- [Props](#props)
- [Next Features or Improvements](#next-features-or-improvements)
- [Contributing](#contributing)

## Installation

```bash
# With NPM.
npm install --save react-bs-datatable bootstrap-sass font-awesome

# With Yarn.
yarn add react-bs-datatable bootstrap-sass font-awesome
```

## Props

| Prop                | Type                  | Description                                                                | Default |
| ------------------- | --------------------- | -------------------------------------------------------------------------- | ------- |
| `tableHeaders*`     | `Array`               | Table headers. See [tableHeaders prop](#tableHeaders).                     | -       |
| `tableBody*`        | `Array`               | Table body. See [tableBody prop](#tableBody).                              | -       |
| `initialSort`       | `Object`              | Initial sort. See [initialSort prop](#initialSort).                        | -       |
| `onSort`            | `Object`              | Object containing custom sort functions. See [onSort prop](#onSort).       | -       |
| `onFilter`          | `Object`              | Object containing custom filter functions. See [onFilter prop](#onFilter). | -       |
| `classes`           | `Object`              | Custom classes. See [classes prop](#classes).                              | -       |
| `async`             | `Object`              | Enable asynchronous actions. See [async prop](#async).                     | -       |
| `labels`            | `Object`              | Custom labels inside the table. See [labels prop](#labels).                | `{}`    |
| `tableClass`        | `string`              | Classes used in `<table>` element tag.                                     | `''`    |
| `rowsPerPage`       | `number`              | Initial rows per page.                                                     | -       |
| `rowsPerPageOption` | `number[]`            | Pagination options.                                                        | -       |
| `onRowClick`        | `(data: any) => void` | Row click event. See [onRowClick prop](#onRowClick).                       | -       |

### tableHeaders

| Field        | Type                                                               | Description                                          |
| ------------ | ------------------------------------------------------------------ | ---------------------------------------------------- |
| `prop*`      | `string`                                                           | Column name for the table body.                      |
| `headerCell` | `(icon: React.ReactNode, sortedProp: SortType) => React.ReactNode` | Render a custom header cell. Overrides `title` prop. |
| `cell`       | `(row: any) => React.ReactNode`                                    | Render a custom column cell.                         |
| `filterable` | `boolean`                                                          | Enable/disable filtering on the column.              |
| `sortable`   | `boolean`                                                          | Enable/disable sorting on the column.                |
| `title`      | `string`                                                           | Text for the header column.                          |

### tableBody

The table body prop consists of key-value mapping of the headers that we already define in `tableHeaders`. For example:

```tsx
const tableHeaders = [
  { prop: 'name', title: 'Name' },
  { prop: 'score', title: 'Score' }
];

// Here, `tableBody` consists of object with the key "name" and "score".
const tableBody = [
  { name: 'Jack', score: 100 },
  { name: 'Sam', score: 55 }
];
```

### initialSort

| Field          | Type      | Description                             |
| -------------- | --------- | --------------------------------------- |
| `prop*`        | `string`  | Currently sorted prop.                  |
| `isAscending*` | `boolean` | `true` if ascending, otherwise `false`. |

### onSort

The `onSort` prop consists of key-value mapping of the headers that we already define in `tableHeaders`, as well. This function is mostly used to sort columns that don't represent its actual value. For example:

```tsx
const tableHeaders = [
  { prop: 'name', title: 'Name' },
  // The format of the date here is, say, dd MMM YYYY.
  { prop: 'date', title: 'Test date' },
  { prop: 'score', title: 'Score' }
];

// Here, `onSort` consists of columns that we want to have a custom filter function.
const onSort = {
  date: (value: any) => {
    // This will convert the string to integer.
    // Otherwise, the date will be sorted by date-month-year instead of year-month-date (in order).
    return moment(value, 'dd MMM YYYY').valueOf();
  }
};
```

### onFilter

`onFilter`'s usage is the same as `onSort`. It allows us to filter columns that don't represent their actual values.

### classes

This prop is used to add custom styles to the table.

| Field                       | Type     | Description                                               |
| --------------------------- | -------- | --------------------------------------------------------- |
| `controlRow`                | `string` | Control row (filter, pagination options, and pagination). |
| `filterCol`                 | `string` | Filter column.                                            |
| `filterInputGroup`          | `string` | Filter `Input.Group`.                                     |
| `filterFormControl`         | `string` | Filter `Form.Control`.                                    |
| `filterClearButton`         | `string` | Filter `Button`.                                          |
| `paginationOptsCol`         | `string` | Pagination options column.                                |
| `paginationOptsForm`        | `string` | Pagination options `Form`.                                |
| `paginationOptsFormGroup`   | `string` | Pagination options `Form.Group`.                          |
| `paginationOptsFormText`    | `string` | Pagination options form text (the "Show ... rows").       |
| `paginationOptsFormControl` | `string` | Pagination options `Form.Control`.                        |
| `paginationCol`             | `string` | Pagination column.                                        |
| `paginationButtonGroup`     | `string` | Pagination `ButtonGroup`.                                 |
| `paginationButton`          | `string` | Pagination `Button`.                                      |
| `table`                     | `string` | `table` element.                                          |
| `thead`                     | `string` | `thead` element.                                          |
| `theadRow`                  | `string` | `tr` element inside `thead`.                              |
| `theadCol`                  | `string` | `th` element.                                             |
| `tbody`                     | `string` | `tbody` element.                                          |
| `tbodyRow`                  | `string` | `tr` element inside `tbody`.                              |
| `tbodyCol`                  | `string` | `td` element.                                             |

### async

| Field                 | Type                                   | Description                               |
| --------------------- | -------------------------------------- | ----------------------------------------- |
| `filterText`          | `string`                               | The value of the filter input field.      |
| `sortedProp`          | `SortType`                             | See [initialSort prop](#initialSort).     |
| `rowsPerPage`         | `number`                               | Value of the rows per page                |
| `currentPage`         | `number`                               | Value of the current page shown.          |
| `maxPage`             | `number`                               | Total numbers of page.                    |
| `onSort`              | `(nextProp: string) => void`           | Event fired when a column is sorted.      |
| `onPaginate`          | `(nextPage: number) => void`           | Event fired when the table page updates.  |
| `onFilter`            | `(text: string) => void`               | Event fired when the filter text updates. |
| `onRowsPerPageChange` | `(numOfPage: RowsPerPageType) => void` | Event fired when rows per page updates.   |

### labels

| Field               | Type     | Description                              |
| ------------------- | -------- | ---------------------------------------- |
| `first`             | `string` | First page label button.                 |
| `last`              | `string` | Last page label button.                  |
| `prev`              | `string` | Previous page label button.              |
| `next`              | `string` | Next page label button.                  |
| `show`              | `string` | The text before rows per page option.    |
| `entries`           | `string` | The text after rows per page option.     |
| `noResults`         | `string` | Displayed text if `tableBody` is `[]`.   |
| `filterPlaceholder` | `string` | Placeholder text for filter input field. |

### onRowClick

When we want to add a click event to the table rows, we can use this prop.

```js
function onRowClick(row) {
  alert(`You clicked on the row ${JSON.stringify(row)}`);
}

// This will trigger an alert, containing the notification text and the JSON string of the row data.
<Datatable onRowClick={onRowClick} />;
```

## Next Features or Improvements

- [ ] Automated documentation change on code updates
- [ ] Analyze code size

## Contributing

Feel free to contribute by creating issues and/or pull requests. I will do my best to address them as fast as I can.
