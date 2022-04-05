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
- [FilterOnChange](helpers_types.md#filteronchange)
- [PaginationOnChange](helpers_types.md#paginationonchange)
- [RowsPerPageOnChange](helpers_types.md#rowsperpageonchange)
- [SortByPropOnChange](helpers_types.md#sortbyproponchange)
- [SortOnChange](helpers_types.md#sortonchange)
- [TableRowType](helpers_types.md#tablerowtype)

## Type aliases

### CheckboxOnChange

Ƭ **CheckboxOnChange**: (`params`: { `checkboxRefs`: `MutableRefObject`<`Record`<`string`, `HTMLInputElement`\>\> ; `idProp`: `string` ; `nextCheckboxState`: [`CheckboxState`](../interfaces/helpers_types.CheckboxState.md) ; `prop`: `string`  }) => `void`

#### Type declaration

▸ (`params`): `void`

The helper type for the checkbox change eveent.

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

[helpers/types.ts:144](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/helpers/types.ts#L144)

___

### ColumnProcessObj

Ƭ **ColumnProcessObj**<`TColumnType`, `TReturnType`\>: `Partial`<`Record`<keyof `TColumnType`, (`column`: `TColumnType`) => `TReturnType`\>\>

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

[helpers/types.ts:105](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/helpers/types.ts#L105)

___

### FilterOnChange

Ƭ **FilterOnChange**: (`nextState`: `string`) => `void`

#### Type declaration

▸ (`nextState`): `void`

The helper type for the filter change event.

##### Parameters

| Name | Type |
| :------ | :------ |
| `nextState` | `string` |

##### Returns

`void`

#### Defined in

[helpers/types.ts:119](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/helpers/types.ts#L119)

___

### PaginationOnChange

Ƭ **PaginationOnChange**: (`nextState`: `number`) => `void`

#### Type declaration

▸ (`nextState`): `void`

The helper type for the sort by prop change event.

##### Parameters

| Name | Type |
| :------ | :------ |
| `nextState` | `number` |

##### Returns

`void`

#### Defined in

[helpers/types.ts:134](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/helpers/types.ts#L134)

___

### RowsPerPageOnChange

Ƭ **RowsPerPageOnChange**: (`nextState`: `number`) => `void`

#### Type declaration

▸ (`nextState`): `void`

The helper type for the rows per page change event.

##### Parameters

| Name | Type |
| :------ | :------ |
| `nextState` | `number` |

##### Returns

`void`

#### Defined in

[helpers/types.ts:139](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/helpers/types.ts#L139)

___

### SortByPropOnChange

Ƭ **SortByPropOnChange**: (`sortedProp`: `string`) => `void`

#### Type declaration

▸ (`sortedProp`): `void`

The helper type for the sort by prop change event.

##### Parameters

| Name | Type |
| :------ | :------ |
| `sortedProp` | `string` |

##### Returns

`void`

#### Defined in

[helpers/types.ts:129](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/helpers/types.ts#L129)

___

### SortOnChange

Ƭ **SortOnChange**: (`nextProp`: [`SortType`](../interfaces/helpers_types.SortType.md)) => `void`

#### Type declaration

▸ (`nextProp`): `void`

The helper type for the sort by next prop change event.

##### Parameters

| Name | Type |
| :------ | :------ |
| `nextProp` | [`SortType`](../interfaces/helpers_types.SortType.md) |

##### Returns

`void`

#### Defined in

[helpers/types.ts:124](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/helpers/types.ts#L124)

___

### TableRowType

Ƭ **TableRowType**<`T`\>: `Record`<`string`, `T`\>

This is used for the `extend` keyword in the components.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[helpers/types.ts:112](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/helpers/types.ts#L112)
