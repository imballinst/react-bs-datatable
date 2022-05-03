[react-bs-datatable](../README.md) / [components/TableBody](../modules/components_TableBody.md) / TableRowProps

# Interface: TableRowProps<TTableRowType\>

[components/TableBody](../modules/components_TableBody.md).TableRowProps

The props for the `TableRow` component.

## Type parameters

| Name | Type |
| :------ | :------ |
| `TTableRowType` | extends [`TableRowType`](../modules/helpers_types.md#tablerowtype) |

## Table of contents

### Properties

- [classes](components_TableBody.TableRowProps.md#classes)
- [controlledProps](components_TableBody.TableRowProps.md#controlledprops)
- [rowData](components_TableBody.TableRowProps.md#rowdata)
- [rowProps](components_TableBody.TableRowProps.md#rowprops)

### Methods

- [onRowClick](components_TableBody.TableRowProps.md#onrowclick)

## Properties

### classes

• `Optional` **classes**: `Omit`<[`TableBodyClasses`](components_TableBody.TableBodyClasses.md), ``"tbody"``\>

Classes for the rows and columns.

#### Defined in

[components/TableBody.tsx:245](https://github.com/imballinst/react-bs-datatable/blob/798f739/src/components/TableBody.tsx#L245)

___

### controlledProps

• `Optional` **controlledProps**: `TableBodyControlledProps`

Props to make the component controlled.

#### Defined in

[components/TableBody.tsx:247](https://github.com/imballinst/react-bs-datatable/blob/798f739/src/components/TableBody.tsx#L247)

___

### rowData

• **rowData**: `TTableRowType`

The row data.

#### Defined in

[components/TableBody.tsx:241](https://github.com/imballinst/react-bs-datatable/blob/798f739/src/components/TableBody.tsx#L241)

___

### rowProps

• `Optional` **rowProps**: [`HtmlTrProps`](../modules/components_TableBody.md#htmltrprops) \| (`row`: `TTableRowType`) => [`HtmlTrProps`](../modules/components_TableBody.md#htmltrprops)

Props to the `tr` element.

#### Defined in

[components/TableBody.tsx:249](https://github.com/imballinst/react-bs-datatable/blob/798f739/src/components/TableBody.tsx#L249)

## Methods

### onRowClick

▸ `Optional` **onRowClick**(`row`): `void`

Optional row on click event.

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `TTableRowType` |

#### Returns

`void`

#### Defined in

[components/TableBody.tsx:243](https://github.com/imballinst/react-bs-datatable/blob/798f739/src/components/TableBody.tsx#L243)
