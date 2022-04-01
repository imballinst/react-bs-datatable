[react-bs-datatable](../README.md) / components/PaginationOptions

# Module: components/PaginationOptions

## Table of contents

### Interfaces

- [PaginationOptionsClasses](../interfaces/components_PaginationOptions.PaginationOptionsClasses.md)
- [PaginationOptionsLabels](../interfaces/components_PaginationOptions.PaginationOptionsLabels.md)
- [PaginationOptionsProps](../interfaces/components_PaginationOptions.PaginationOptionsProps.md)

### Functions

- [PaginationOptions](components_PaginationOptions.md#paginationoptions)

## Functions

### PaginationOptions

▸ **PaginationOptions**(`__namedParameters`): `Element`

Renders a control for the pagination options. It will show a form group, consisting of
a select input, as well as a label/text before and after the input. By default,
it renders "Rows per page" as a label, which refers to the select input. There is no
text after the select input, unless specified in the `labels.afterSelect` prop.

The options available in the select input are the ones specified from the `DatatableWrapper`,
or the ones passed in this component's prop `controlledProps.rowsPerPageOptions`.

When `alwaysShowPagination` is set to `false`, then this component will be visually hidden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`PaginationOptionsProps`](../interfaces/components_PaginationOptions.PaginationOptionsProps.md) |

#### Returns

`Element`

#### Defined in

[components/PaginationOptions.tsx:81](https://github.com/imballinst/react-bs-datatable/blob/e17bad5/src/components/PaginationOptions.tsx#L81)
