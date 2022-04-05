[react-bs-datatable](../README.md) / [components/TableBody](../modules/components_TableBody.md) / TableBodyProps

# Interface: TableBodyProps<TTableRowType\>

[components/TableBody](../modules/components_TableBody.md).TableBodyProps

This is an interface for `TableBody` component props.

## Type parameters

| Name | Type |
| :------ | :------ |
| `TTableRowType` | extends [`TableRowType`](../modules/helpers_types.md#tablerowtype) |

## Table of contents

### Properties

- [classes](components_TableBody.TableBodyProps.md#classes)
- [controlledProps](components_TableBody.TableBodyProps.md#controlledprops)
- [labels](components_TableBody.TableBodyProps.md#labels)
- [rowProps](components_TableBody.TableBodyProps.md#rowprops)

### Methods

- [onRowClick](components_TableBody.TableBodyProps.md#onrowclick)

## Properties

### classes

• `Optional` **classes**: [`TableBodyClasses`](components_TableBody.TableBodyClasses.md)

Customize the classes of the `TableBody` component.

#### Defined in

[components/TableBody.tsx:47](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/components/TableBody.tsx#L47)

___

### controlledProps

• `Optional` **controlledProps**: `Object`

Props to make the component controlled.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `checkboxState?` | `Record`<`string`, [`CheckboxState`](helpers_types.CheckboxState.md)\> | A record, which key is the column prop name and the value is of type `CheckboxState`. |
| `filteredDataLength?` | `number` | The filtered data length. When not using filter control, then this should equal to the table body's length. |
| `onCheckboxChange?` | [`CheckboxOnChange`](../modules/helpers_types.md#checkboxonchange) | The function fired when any checkbox in the table changes. |

#### Defined in

[components/TableBody.tsx:53](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/components/TableBody.tsx#L53)

___

### labels

• `Optional` **labels**: [`TableBodyLabels`](components_TableBody.TableBodyLabels.md)

Customize the labels of the `TableBody` component.

#### Defined in

[components/TableBody.tsx:45](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/components/TableBody.tsx#L45)

___

### rowProps

• `Optional` **rowProps**: [`TableRowProps`](../modules/components_TableBody.md#tablerowprops) \| (`row`: `TTableRowType`) => [`TableRowProps`](../modules/components_TableBody.md#tablerowprops)

The props passed to the table rows under `tbody`.

#### Defined in

[components/TableBody.tsx:49](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/components/TableBody.tsx#L49)

## Methods

### onRowClick

▸ `Optional` **onRowClick**(`row`): `void`

The function fired when any of the rows is clicked.

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `TTableRowType` |

#### Returns

`void`

#### Defined in

[components/TableBody.tsx:51](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/components/TableBody.tsx#L51)
