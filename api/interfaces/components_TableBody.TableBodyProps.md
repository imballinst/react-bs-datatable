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

- [children](components_TableBody.TableBodyProps.md#children)
- [classes](components_TableBody.TableBodyProps.md#classes)
- [controlledProps](components_TableBody.TableBodyProps.md#controlledprops)
- [labels](components_TableBody.TableBodyProps.md#labels)
- [rowProps](components_TableBody.TableBodyProps.md#rowprops)

### Methods

- [onRowClick](components_TableBody.TableBodyProps.md#onrowclick)

## Properties

### children

• `Optional` **children**: `Element` \| (`rows`: `TTableRowType`[]) => `Element` \| `Element`[] \| `Element`[]

The function to customize the table rows.

#### Defined in

[components/TableBody.tsx:68](https://github.com/imballinst/react-bs-datatable/blob/798f739/src/components/TableBody.tsx#L68)

___

### classes

• `Optional` **classes**: [`TableBodyClasses`](components_TableBody.TableBodyClasses.md)

Customize the classes of the `TableBody` component.

#### Defined in

[components/TableBody.tsx:60](https://github.com/imballinst/react-bs-datatable/blob/798f739/src/components/TableBody.tsx#L60)

___

### controlledProps

• `Optional` **controlledProps**: `TableBodyControlledProps`

Props to make the component controlled.

#### Defined in

[components/TableBody.tsx:66](https://github.com/imballinst/react-bs-datatable/blob/798f739/src/components/TableBody.tsx#L66)

___

### labels

• `Optional` **labels**: [`TableBodyLabels`](components_TableBody.TableBodyLabels.md)

Customize the labels of the `TableBody` component.

#### Defined in

[components/TableBody.tsx:58](https://github.com/imballinst/react-bs-datatable/blob/798f739/src/components/TableBody.tsx#L58)

___

### rowProps

• `Optional` **rowProps**: [`HtmlTrProps`](../modules/components_TableBody.md#htmltrprops) \| (`row`: `TTableRowType`) => [`HtmlTrProps`](../modules/components_TableBody.md#htmltrprops)

The props passed to the table rows under `tbody`.

#### Defined in

[components/TableBody.tsx:62](https://github.com/imballinst/react-bs-datatable/blob/798f739/src/components/TableBody.tsx#L62)

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

[components/TableBody.tsx:64](https://github.com/imballinst/react-bs-datatable/blob/798f739/src/components/TableBody.tsx#L64)
