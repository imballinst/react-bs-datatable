[react-bs-datatable](../README.md) / [components/Pagination](../modules/components_Pagination.md) / PaginationProps

# Interface: PaginationProps

[components/Pagination](../modules/components_Pagination.md).PaginationProps

This is an interface for `Pagination` component props.

## Table of contents

### Properties

- [alwaysShowPagination](components_Pagination.PaginationProps.md#alwaysshowpagination)
- [classes](components_Pagination.PaginationProps.md#classes)
- [controlledProps](components_Pagination.PaginationProps.md#controlledprops)
- [labels](components_Pagination.PaginationProps.md#labels)
- [paginationRange](components_Pagination.PaginationProps.md#paginationrange)

## Properties

### alwaysShowPagination

• `Optional` **alwaysShowPagination**: `boolean`

Determine whether the pagination button group should be always visible or not.
When set to `false`, the pagination will be hidden when there is only 1 page.
To prevent layout shifts, `visibility: hidden` will be applied instead of
`display: none` style. Defaults to `true`.

#### Defined in

[components/Pagination.tsx:49](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/Pagination.tsx#L49)

___

### classes

• `Optional` **classes**: [`PaginationClasses`](components_Pagination.PaginationClasses.md)

Customize the classes of the `Pagination` component.

#### Defined in

[components/Pagination.tsx:42](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/Pagination.tsx#L42)

___

### controlledProps

• `Optional` **controlledProps**: `Object`

Props to make the component controlled.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `currentPage?` | `number` | The currently active page. |
| `maxPage?` | `number` | This is used to determine * the last numbered button in the pagination button group. This also determines the next page number when the "Last" button is clicked. |
| `onPaginationChange?` | [`PaginationOnChange`](../modules/helpers_types.md#paginationonchange) | The function fired when any of the pagination buttons is clicked. |

#### Defined in

[components/Pagination.tsx:57](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/Pagination.tsx#L57)

___

### labels

• `Optional` **labels**: [`PaginationLabels`](components_Pagination.PaginationLabels.md)

Customize the labels of the `Pagination` component.

#### Defined in

[components/Pagination.tsx:40](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/Pagination.tsx#L40)

___

### paginationRange

• `Optional` **paginationRange**: `number`

The pagination range that shows between the "First"/"Prev" and "Next"/"Last" buttons.
Defaults to 3, for example: First, Prev, 1, 2, 3, Next, Last.
When set to 5, for example: First, Prev, 1, 2, 3, 4, 5 Next, Last.

#### Defined in

[components/Pagination.tsx:55](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/Pagination.tsx#L55)
