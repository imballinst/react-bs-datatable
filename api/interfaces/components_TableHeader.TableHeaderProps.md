[react-bs-datatable](../README.md) / [components/TableHeader](../modules/components_TableHeader.md) / TableHeaderProps

# Interface: TableHeaderProps

[components/TableHeader](../modules/components_TableHeader.md).TableHeaderProps

This is an interface for `TableHeader` component props.

## Table of contents

### Properties

- [classes](components_TableHeader.TableHeaderProps.md#classes)
- [controlledProps](components_TableHeader.TableHeaderProps.md#controlledprops)

## Properties

### classes

• `Optional` **classes**: [`TableHeaderClasses`](components_TableHeader.TableHeaderClasses.md)

Customize the classes of the `TableHeader` component.

#### Defined in

[components/TableHeader.tsx:37](https://github.com/imballinst/react-bs-datatable/blob/e17bad5/src/components/TableHeader.tsx#L37)

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
| `onSortChange?` | [`SortOnChange`](../modules/helpers_types.md#sortonchange) | The function fired when the table sort state changes. |
| `sortState?` | [`SortType`](helpers_types.SortType.md) | The current sort state of the table. |

#### Defined in

[components/TableHeader.tsx:39](https://github.com/imballinst/react-bs-datatable/blob/e17bad5/src/components/TableHeader.tsx#L39)
