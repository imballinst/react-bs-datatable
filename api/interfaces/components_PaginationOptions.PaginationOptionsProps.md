[react-bs-datatable](../README.md) / [components/PaginationOptions](../modules/components_PaginationOptions.md) / PaginationOptionsProps

# Interface: PaginationOptionsProps

[components/PaginationOptions](../modules/components_PaginationOptions.md).PaginationOptionsProps

This is an interface for `PaginationOptions` component props.

## Table of contents

### Properties

- [alwaysShowPagination](components_PaginationOptions.PaginationOptionsProps.md#alwaysshowpagination)
- [classes](components_PaginationOptions.PaginationOptionsProps.md#classes)
- [controlledProps](components_PaginationOptions.PaginationOptionsProps.md#controlledprops)
- [labels](components_PaginationOptions.PaginationOptionsProps.md#labels)

## Properties

### alwaysShowPagination

• `Optional` **alwaysShowPagination**: `boolean`

Determine whether the pagination button group should be always visible or not.
When set to `false`, the pagination will be hidden when there is only 1 page.
To prevent layout shifts, `visibility: hidden` will be applied instead of
`display: none` style. Defaults to `true`.

#### Defined in

[components/PaginationOptions.tsx:53](https://github.com/imballinst/react-bs-datatable/blob/798f739/src/components/PaginationOptions.tsx#L53)

___

### classes

• `Optional` **classes**: [`PaginationOptionsClasses`](components_PaginationOptions.PaginationOptionsClasses.md)

Customize the classes of the `PaginationOptions` component.

#### Defined in

[components/PaginationOptions.tsx:46](https://github.com/imballinst/react-bs-datatable/blob/798f739/src/components/PaginationOptions.tsx#L46)

___

### controlledProps

• `Optional` **controlledProps**: `Object`

Props to make the component controlled.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `filteredDataLength?` | `number` | The filtered data length. When not using filter control, then this should equal to the table body's length. |
| `onRowsPerPageChange?` | [`RowsPerPageOnChange`](../modules/helpers_types.md#rowsperpageonchange) | The function fired when any of the pagination option is changed. |
| `rowsPerPage?` | `number` | Number of rows shown per page. |
| `rowsPerPageOptions?` | `number`[] | Number of rows shown per page options. |

#### Defined in

[components/PaginationOptions.tsx:55](https://github.com/imballinst/react-bs-datatable/blob/798f739/src/components/PaginationOptions.tsx#L55)

___

### labels

• `Optional` **labels**: [`PaginationOptionsLabels`](components_PaginationOptions.PaginationOptionsLabels.md)

Customize the labels of the `PaginationOptions` component.

#### Defined in

[components/PaginationOptions.tsx:44](https://github.com/imballinst/react-bs-datatable/blob/798f739/src/components/PaginationOptions.tsx#L44)
