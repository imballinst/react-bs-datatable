[react-bs-datatable](../README.md) / components/BulkCheckboxControl

# Module: components/BulkCheckboxControl

## Table of contents

### Interfaces

- [BulkCheckboxControlClasses](../interfaces/components_BulkCheckboxControl.BulkCheckboxControlClasses.md)
- [BulkCheckboxControlProps](../interfaces/components_BulkCheckboxControl.BulkCheckboxControlProps.md)

### Functions

- [BulkCheckboxControl](components_BulkCheckboxControl.md#bulkcheckboxcontrol)

## Functions

### BulkCheckboxControl

▸ **BulkCheckboxControl**(`__namedParameters`): `Element`

Renders a control for selection or deselection of all rows. This is
only useful when pagination and checkbox are both enabled. When only
some (or none) of the rows are checked, then this will render the
number of checked rows, as well as the "Select all" button.
On the other hand, when all rows are selected, then it will
change to "Deselect all" button.

This is only fit for an uncontrolled table.

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`BulkCheckboxControlProps`](../interfaces/components_BulkCheckboxControl.BulkCheckboxControlProps.md) |

#### Returns

`Element`

#### Defined in

[components/BulkCheckboxControl.tsx:40](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/BulkCheckboxControl.tsx#L40)
