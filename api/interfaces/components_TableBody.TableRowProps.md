[react-bs-datatable](../README.md) / [components/TableBody](../modules/components_TableBody.md) / TableRowProps

# Interface: TableRowProps<TTableRowType\>

[components/TableBody](../modules/components_TableBody.md).TableRowProps

The props for the `TableRow` component.

## Type parameters

| Name | Type |
| :------ | :------ |
| `TTableRowType` | extends [`TableRowType`](../modules/helpers_types.md#tablerowtype) |

## Hierarchy

- `CommonProps`

  ↳ **`TableRowProps`**

## Table of contents

### Properties

- [classes](components_TableBody.TableRowProps.md#classes)
- [controlledProps](components_TableBody.TableRowProps.md#controlledprops)
- [rowData](components_TableBody.TableRowProps.md#rowdata)
- [rowIdx](components_TableBody.TableRowProps.md#rowidx)
- [rowProps](components_TableBody.TableRowProps.md#rowprops)
- [validRowClickTagNames](components_TableBody.TableRowProps.md#validrowclicktagnames)

### Methods

- [onRowClick](components_TableBody.TableRowProps.md#onrowclick)

## Properties

### classes

• `Optional` **classes**: `Omit`<[`TableBodyClasses`](components_TableBody.TableBodyClasses.md), ``"tbody"``\>

Classes for the rows and columns.

#### Defined in

[components/TableBody.tsx:174](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/TableBody.tsx#L174)

___

### controlledProps

• `Optional` **controlledProps**: [`TableBodyControlledProps`](components_TableBody.TableBodyControlledProps.md)

Props to make the component controlled.

#### Defined in

[components/TableBody.tsx:176](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/TableBody.tsx#L176)

___

### rowData

• **rowData**: `TTableRowType`

The row data.

#### Defined in

[components/TableBody.tsx:165](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/TableBody.tsx#L165)

___

### rowIdx

• **rowIdx**: `number`

The row index.

#### Defined in

[components/TableBody.tsx:167](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/TableBody.tsx#L167)

___

### rowProps

• `Optional` **rowProps**: [`HtmlTrProps`](../modules/components_TableBody.md#htmltrprops) \| (`row`: `TTableRowType`) => [`HtmlTrProps`](../modules/components_TableBody.md#htmltrprops)

Props to the `tr` element.

#### Defined in

[components/TableBody.tsx:178](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/TableBody.tsx#L178)

___

### validRowClickTagNames

• `Optional` **validRowClickTagNames**: ``"*"`` \| `string`[]

Customize the tag names that will trigger the row onClick. Defaults to ['TR', 'TD'].
For more information, please visit the [tagName documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName).

Other than an array of tag names, you can also pass a string "*" to indicate that all child elements
will trigger the row on click event.

#### Inherited from

CommonProps.validRowClickTagNames

#### Defined in

[components/TableBody.tsx:26](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/TableBody.tsx#L26)

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

[components/TableBody.tsx:169](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/TableBody.tsx#L169)
