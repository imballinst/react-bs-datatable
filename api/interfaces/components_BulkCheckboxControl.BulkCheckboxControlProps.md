[react-bs-datatable](../README.md) / [components/BulkCheckboxControl](../modules/components_BulkCheckboxControl.md) / BulkCheckboxControlProps

# Interface: BulkCheckboxControlProps

[components/BulkCheckboxControl](../modules/components_BulkCheckboxControl.md).BulkCheckboxControlProps

This is an interface for `BulkCheckboxControl` component props.

## Table of contents

### Properties

- [classes](components_BulkCheckboxControl.BulkCheckboxControlProps.md#classes)
- [controlledProps](components_BulkCheckboxControl.BulkCheckboxControlProps.md#controlledprops)

## Properties

### classes

• `Optional` **classes**: [`BulkCheckboxControlClasses`](components_BulkCheckboxControl.BulkCheckboxControlClasses.md)

Custom classes for the component.

#### Defined in

[components/BulkCheckboxControl.tsx:41](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/components/BulkCheckboxControl.tsx#L41)

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

[components/BulkCheckboxControl.tsx:26](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/components/BulkCheckboxControl.tsx#L26)
