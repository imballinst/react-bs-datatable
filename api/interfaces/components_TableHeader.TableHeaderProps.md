[react-bs-datatable](../README.md) / [components/TableHeader](../modules/components_TableHeader.md) / TableHeaderProps

# Interface: TableHeaderProps<T\>

[components/TableHeader](../modules/components_TableHeader.md).TableHeaderProps

This is an interface for `TableHeader` component props.

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

- [classes](components_TableHeader.TableHeaderProps.md#classes)
- [controlledProps](components_TableHeader.TableHeaderProps.md#controlledprops)
- [headers](components_TableHeader.TableHeaderProps.md#headers)

## Properties

### classes

• `Optional` **classes**: [`TableHeaderClasses`](components_TableHeader.TableHeaderClasses.md)

Customize the classes of the `TableHeader` component.

#### Defined in

[components/TableHeader.tsx:39](https://github.com/imballinst/react-bs-datatable/blob/86aa7e0/src/components/TableHeader.tsx#L39)

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
| `sortState?` | [`SortType`](helpers_types.SortType.md) | The current sort state of the table. |
| `onSortChange?` | (`nextSort`: [`SortType`](helpers_types.SortType.md)) => `void` | The function fired when the table sort state changes. |

#### Defined in

[components/TableHeader.tsx:41](https://github.com/imballinst/react-bs-datatable/blob/86aa7e0/src/components/TableHeader.tsx#L41)

___

### headers

• **headers**: [`TableColumnType`](helpers_types.TableColumnType.md)<`T`\>[]

The list of table headers that are going to be rendered.

#### Defined in

[components/TableHeader.tsx:37](https://github.com/imballinst/react-bs-datatable/blob/86aa7e0/src/components/TableHeader.tsx#L37)
