[react-bs-datatable](../README.md) / [components/TableBody](../modules/components_TableBody.md) / TableBodyProps

# Interface: TableBodyProps<TTableRowType\>

[components/TableBody](../modules/components_TableBody.md).TableBodyProps

This is an interface for `TableBody` component props.

## Type parameters

| Name | Type |
| :------ | :------ |
| `TTableRowType` | extends [`TableRowType`](../modules/helpers_types.md#tablerowtype) |

## Hierarchy

- `CommonProps`

  ↳ **`TableBodyProps`**

## Table of contents

### Properties

- [children](components_TableBody.TableBodyProps.md#children)
- [classes](components_TableBody.TableBodyProps.md#classes)
- [controlledProps](components_TableBody.TableBodyProps.md#controlledprops)
- [labels](components_TableBody.TableBodyProps.md#labels)
- [rowProps](components_TableBody.TableBodyProps.md#rowprops)
- [validRowClickTagNames](components_TableBody.TableBodyProps.md#validrowclicktagnames)

### Methods

- [onRowClick](components_TableBody.TableBodyProps.md#onrowclick)

## Properties

### children

• `Optional` **children**: `Element` \| (`rows`: `TTableRowType`[]) => `Element` \| `Element`[] \| `Element`[]

The function to customize the table rows.

#### Defined in

[components/TableBody.tsx:88](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/TableBody.tsx#L88)

___

### classes

• `Optional` **classes**: [`TableBodyClasses`](components_TableBody.TableBodyClasses.md)

Customize the classes of the `TableBody` component.

#### Defined in

[components/TableBody.tsx:77](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/TableBody.tsx#L77)

___

### controlledProps

• `Optional` **controlledProps**: [`TableBodyControlledProps`](components_TableBody.TableBodyControlledProps.md)

Props to make the component controlled.

#### Defined in

[components/TableBody.tsx:86](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/TableBody.tsx#L86)

___

### labels

• `Optional` **labels**: [`TableBodyLabels`](components_TableBody.TableBodyLabels.md)

Customize the labels of the `TableBody` component.

#### Defined in

[components/TableBody.tsx:75](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/TableBody.tsx#L75)

___

### rowProps

• `Optional` **rowProps**: [`HtmlTrProps`](../modules/components_TableBody.md#htmltrprops) \| (`row`: `TTableRowType`) => [`HtmlTrProps`](../modules/components_TableBody.md#htmltrprops)

The props passed to the table rows under `tbody`.

#### Defined in

[components/TableBody.tsx:79](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/TableBody.tsx#L79)

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

The function fired when any of the rows is clicked.

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `TTableRowType` |
| `event` | `MouseEvent`<`HTMLTableRowElement`, `MouseEvent`\> |

#### Returns

`void`

#### Defined in

[components/TableBody.tsx:81](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/TableBody.tsx#L81)
