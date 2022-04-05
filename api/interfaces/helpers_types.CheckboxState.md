[react-bs-datatable](../README.md) / [helpers/types](../modules/helpers_types.md) / CheckboxState

# Interface: CheckboxState

[helpers/types](../modules/helpers_types.md).CheckboxState

The checkbox used as a value of the record used in the states.

## Table of contents

### Properties

- [selected](helpers_types.CheckboxState.md#selected)
- [state](helpers_types.CheckboxState.md#state)

## Properties

### selected

• **selected**: `Set`<`string`\>

A `Set` type containing strings inferred from the
`header.checkbox.idProp` field. These are always unique, as is
the behavior of the `Set` type.

#### Defined in

[helpers/types.ts:25](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/helpers/types.ts#L25)

___

### state

• **state**: ``"none-selected"`` \| ``"some-selected"`` \| ``"all-selected"``

The checkbox states. This is useful to determine the "Select all" and
"Deselect all", as well as the table header's `indeterminate` state.

#### Defined in

[helpers/types.ts:30](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/helpers/types.ts#L30)
