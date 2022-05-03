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

## Properties

### alwaysShowPagination

• `Optional` **alwaysShowPagination**: `boolean`

Determine whether the pagination button group should be always visible or not.
When set to `false`, the pagination will be hidden when there is only 1 page.
To prevent layout shifts, `visibility: hidden` will be applied instead of
`display: none` style. Defaults to `true`.

#### Defined in

[components/Pagination.tsx:45](https://github.com/imballinst/react-bs-datatable/blob/798f739/src/components/Pagination.tsx#L45)

___

### classes

• `Optional` **classes**: [`PaginationClasses`](components_Pagination.PaginationClasses.md)

Customize the classes of the `Pagination` component.

#### Defined in

[components/Pagination.tsx:38](https://github.com/imballinst/react-bs-datatable/blob/798f739/src/components/Pagination.tsx#L38)

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

[components/Pagination.tsx:47](https://github.com/imballinst/react-bs-datatable/blob/798f739/src/components/Pagination.tsx#L47)

___

### labels

• `Optional` **labels**: [`PaginationLabels`](components_Pagination.PaginationLabels.md)

Customize the labels of the `Pagination` component.

#### Defined in

[components/Pagination.tsx:36](https://github.com/imballinst/react-bs-datatable/blob/798f739/src/components/Pagination.tsx#L36)
