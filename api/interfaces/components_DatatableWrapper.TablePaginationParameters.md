[react-bs-datatable](../README.md) / [components/DatatableWrapper](../modules/components_DatatableWrapper.md) / TablePaginationParameters

# Interface: TablePaginationParameters

[components/DatatableWrapper](../modules/components_DatatableWrapper.md).TablePaginationParameters

This is the additional parameters for the filter function.
Only applicable for uncontrolled table mode.

## Table of contents

### Properties

- [initialState](components_DatatableWrapper.TablePaginationParameters.md#initialstate)

## Properties

### initialState

• `Optional` **initialState**: `Object`

The initial states for the table.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `maxPage` | `number` | The initial maximum page. This is used to determine the last numbered button in the pagination button group. This also determines the next page number when the "Last" button is clicked. |
| `page` | `number` | The initial currently active page. |

#### Defined in

[components/DatatableWrapper.tsx:83](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/components/DatatableWrapper.tsx#L83)
