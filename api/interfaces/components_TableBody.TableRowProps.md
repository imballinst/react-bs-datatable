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
- [rowIdx](components_TableBody.TableRowProps.md#rowidx)
- [rowProps](components_TableBody.TableRowProps.md#rowprops)

### Methods

- [onRowClick](components_TableBody.TableRowProps.md#onrowclick)

## Properties

### classes

• `Optional` **classes**: `Omit`<[`TableBodyClasses`](components_TableBody.TableBodyClasses.md), ``"tbody"``\>

Classes for the rows and columns.

#### Defined in

[components/TableBody.tsx:158](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/TableBody.tsx#L158)

___

### controlledProps

• `Optional` **controlledProps**: `TableBodyControlledProps`

Props to make the component controlled.

#### Defined in

[components/TableBody.tsx:160](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/TableBody.tsx#L160)

___

### rowData

• **rowData**: `TTableRowType`

The row data.

#### Defined in

[components/TableBody.tsx:149](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/TableBody.tsx#L149)

___

### rowIdx

• **rowIdx**: `number`

The row index.

#### Defined in

[components/TableBody.tsx:151](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/TableBody.tsx#L151)

___

### rowProps

• `Optional` **rowProps**: [`HtmlTrProps`](../modules/components_TableBody.md#htmltrprops) \| (`row`: `TTableRowType`) => [`HtmlTrProps`](../modules/components_TableBody.md#htmltrprops)

Props to the `tr` element.

#### Defined in

[components/TableBody.tsx:162](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/TableBody.tsx#L162)

## Methods

### onRowClick

▸ `Optional` **onRowClick**(`row`, `event`): `void`

Optional row on click event.

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `TTableRowType` |
| `event` | `MouseEvent`<`HTMLTableRowElement`, `MouseEvent`\> |

#### Returns

`void`

#### Defined in

[components/TableBody.tsx:153](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/TableBody.tsx#L153)
