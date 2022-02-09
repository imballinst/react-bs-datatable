[react-bs-datatable](../README.md) / helpers/types

# Module: helpers/types

## Table of contents

### Interfaces

- [CheckboxState](../interfaces/helpers_types.CheckboxState.md)
- [SortType](../interfaces/helpers_types.SortType.md)
- [TableColumnType](../interfaces/helpers_types.TableColumnType.md)

### Type aliases

- [CheckboxOnChange](helpers_types.md#checkboxonchange)
- [ColumnProcessObj](helpers_types.md#columnprocessobj)
- [TableRowType](helpers_types.md#tablerowtype)

## Type aliases

### CheckboxOnChange

Ƭ **CheckboxOnChange**: (`params`: { `checkboxRefs`: `MutableRefObject`<`Record`<`string`, `HTMLInputElement`\>\> ; `idProp`: `string` ; `nextCheckboxState`: [`CheckboxState`](../interfaces/helpers_types.CheckboxState.md) ; `prop`: `string`  }) => `void`

#### Type declaration

▸ (`params`): `void`

The helper type to declare the checkbox onChange handler safely.

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.checkboxRefs` | `MutableRefObject`<`Record`<`string`, `HTMLInputElement`\>\> |
| `params.idProp` | `string` |
| `params.nextCheckboxState` | [`CheckboxState`](../interfaces/helpers_types.CheckboxState.md) |
| `params.prop` | `string` |

##### Returns

`void`

#### Defined in

[helpers/types.ts:36](https://github.com/imballinst/react-bs-datatable/blob/915e2a8/src/helpers/types.ts#L36)

___

### ColumnProcessObj

Ƭ **ColumnProcessObj**<`TColumnType`, `TReturnType`\>: `Partial`<`Record`<keyof `TColumnType`, (`column`: `string` \| `number`) => `TReturnType`\>\>

This is the object of key/value which is used to transform a column's value
to another form.

At the moment, this is mostly useful for sorting, as for sorting, the most reliable
way is to convert to numbers. While sorting strings is also possible, certain formats
can make the sort result incorrect, e.g. sorting formatted dates.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TColumnType` | `TColumnType` |
| `TReturnType` | `string` |

#### Defined in

[helpers/types.ts:115](https://github.com/imballinst/react-bs-datatable/blob/915e2a8/src/helpers/types.ts#L115)

___

### TableRowType

Ƭ **TableRowType**<`T`\>: `Record`<`string`, `T`\>

This is used for the `extend` keyword in the components.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[helpers/types.ts:122](https://github.com/imballinst/react-bs-datatable/blob/915e2a8/src/helpers/types.ts#L122)
