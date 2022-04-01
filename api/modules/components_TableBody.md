[react-bs-datatable](../README.md) / components/TableBody

# Module: components/TableBody

## Table of contents

### Interfaces

- [TableBodyClasses](../interfaces/components_TableBody.TableBodyClasses.md)
- [TableBodyLabels](../interfaces/components_TableBody.TableBodyLabels.md)
- [TableBodyProps](../interfaces/components_TableBody.TableBodyProps.md)

### Type aliases

- [TableRowProps](components_TableBody.md#tablerowprops)

### Functions

- [TableBody](components_TableBody.md#tablebody)

## Type aliases

### TableRowProps

Ƭ **TableRowProps**: `React.DetailedHTMLProps`<`React.HTMLAttributes`<`HTMLTableRowElement`\>, `HTMLTableRowElement`\>

#### Defined in

[components/TableBody.tsx:35](https://github.com/imballinst/react-bs-datatable/blob/e17bad5/src/components/TableBody.tsx#L35)

## Functions

### TableBody

▸ **TableBody**<`TTableRowType`\>(`__namedParameters`): `Element`

Renders the table body, which is a `tbody` tag along with the rest of the elements,
such as `tr` and `td` tags.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTableRowType` | extends [`TableRowType`](helpers_types.md#tablerowtype)<`any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`TableBodyProps`](../interfaces/components_TableBody.TableBodyProps.md)<`TTableRowType`\> |

#### Returns

`Element`

#### Defined in

[components/TableBody.tsx:73](https://github.com/imballinst/react-bs-datatable/blob/e17bad5/src/components/TableBody.tsx#L73)
