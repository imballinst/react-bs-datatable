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

```
# With NPM.
npm install --save react-bs-datatable bootstrap-sass font-awesome

# With Yarn.
yarn add react-bs-datatable bootstrap-sass font-awesome
```

## Props

- tableHeaders **(Required)**: `Object[]`, each consists of:
  - `prop` **(Required)**: `string`. Column name for the table body.
  - `cell`: `function`. Returns a React Component for the table to be rendered.
  - `filterable`: `boolean`. Enable/disable filtering on the column.
  - `sortable`: `boolean`. Enable/disable sorting on the column.
  - `title`: `string`. Text for the header column.
- tableBody **(Required)**: `Object[]`, each consists of `propNames` and `propValues`, depends on how many columns you define in the header.
- initialSort: `Object`, consists of `prop` (`string`) and `isAscending` (`boolean`). Default: `undefined`.
- onSort: `Object`. Used to customize sort functions, e.g. sorting dates. `{ propName: (propValue) => {}`. Default: `undefined`.
- onFilter: see `onSort`.
- classes: `Object`. Used to add custom styles. Default: `{}`.
  - `controlRow`: `string`. Class\[es\] for the control row (filter, pagination options, and pagination).
  - `filterCol`: `string`. Class\[es\] for the filter column.
  - `filterInputGroup`: `string`. Class\[es\] for the filter `Input.Group`.
  - `filterFormControl`: `string`. Class\[es\] for the filter `Form.Control`.
  - `filterClearButton`: `string`. Class\[es\] for the filter `Button`.
  - `paginationOptsCol`: `string`. Class\[es\] for the pagination options column.
  - `paginationOptsForm`: `string`. Class\[es\] for the pagination options `Form`.
  - `paginationOptsFormGroup`: `string`. Class\[es\] for the pagination options `Form.Group`.
  - `paginationOptsFormText`: `string`. Class\[es\] for the pagination options form text, e.g. the "Show ... rows".
  - `paginationOptsFormControl`: `string`. Class\[es\] for the pagination options `Form.Control`.
  - `paginationCol`: `string`. Class\[es\] for the pagination column.
  - `paginationButtonGroup`: `string`. Class\[es\] for the pagination `ButtonGroup`.
  - `paginationButton`: `string`. Class\[es\] for the pagination `Button`.
  - `table`: `string`. Class\[es\] for the `table` element.
  - `thead`: `string`. Class\[es\] for the `thead` element.
  - `theadRow`: `string`. Class\[es\] for the `tr` element.
  - `theadCol`: `string`. Class\[es\] for the `th` element.
  - `tbody`: `string`. Class\[es\] for the `tbody` element.
  - `tbodyRow`: `string`. Class\[es\] for the `tr` element.
  - `tbodyCol`: `string`. Class\[es\] for the `td` element.
- async: `Object`. When using `async`, you are the one who "controls" the table state. Default: `undefined`.
  - `filterText`: `string`, the value of the filter input field.
  - `sortedProp`: see `initialSort`.
  - `rowsPerPage`: `number`, the value of the rows per page
  - `currentPage`: `number`, the value of the current page shown.
  - `maxPage`: `number`, the maximum number of page.
  - `onSort`: `(`nextProp`: string) => {}`. You will modify `sortedProp` inside the function.
  - `onPaginate`: `(`nextPage`: number) => {}`. You will modify `currentPage` inside the function.
  - `onFilter`: `(`text`: string) => {}`. You will modify `filterText` inside the function.
  - `onRowsPerPageChange`: `(numOfPage: RowsPerPageType) => {}`. You will modify `rowsPerPage` inside the function.
- labels: `Object` used to customize the labels inside the table. Default: `{}`.
  - `first`: `string`. First page label button.
  - `last`: `string`. Last page label button.
  - `prev`: `string`. Previous page label button.
  - `next`: `string`. Next page label button.
  - `show`: `string`. The text before select option of `rowsPerPageOption`.
  - `entries`: `string`. The text after select option of `rowsPerPageOption`.
  - `noResults`: `string`. Displayed text if table has empty `tableBody` or `[]`.
  - `filterPlaceholder`: `string`. Placeholder text for filter input field.
- tableClass: `string`. Classes used in `<table>` element tag. Default: `''`.
- rowsPerPage: `number`. Initial rows per page. Default: `undefined`.
- rowsPerPageOption: `number[]` for pagination options. Default: `undefined`.
- onRowClick: `(data: any) => void` for row on click event, where `data` contains the data of the row being clicked. Default: `undefined`.

## Next Features or Improvements

- [ ] Automated documentation change on code updates
- [ ] Analyze code size

## Contributing

Feel free to contribute by creating issues and/or pull requests. I will do my best to address them as fast as I can.
