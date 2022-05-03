[react-bs-datatable](../README.md) / components/Pagination

# Module: components/Pagination

## Table of contents

### Interfaces

- [PaginationClasses](../interfaces/components_Pagination.PaginationClasses.md)
- [PaginationLabels](../interfaces/components_Pagination.PaginationLabels.md)
- [PaginationProps](../interfaces/components_Pagination.PaginationProps.md)

### Functions

- [Pagination](components_Pagination.md#pagination)

## Functions

### Pagination

▸ **Pagination**(`__namedParameters`): `Element`

Renders a control for the pagination. It consists of "First", "Prev",
"Next", and "Last" buttons. Additionally, between the "Prev" and "Next" buttons,
there will be at maximum 3 numbered buttons, indicating the pages to navigate.

The currently active page will always be disabled, as well as the "First" or "Last"
buttons if the `currentPage` represents the first page and last page, respectively.

When `alwaysShowPagination` is set to `false`, then this component will be visually hidden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`PaginationProps`](../interfaces/components_Pagination.PaginationProps.md) |

#### Returns

`Element`

#### Defined in

[components/Pagination.tsx:71](https://github.com/imballinst/react-bs-datatable/blob/798f739/src/components/Pagination.tsx#L71)
