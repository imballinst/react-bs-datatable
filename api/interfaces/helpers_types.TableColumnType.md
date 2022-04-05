[react-bs-datatable](../README.md) / [helpers/types](../modules/helpers_types.md) / TableColumnType

# Interface: TableColumnType<T\>

[helpers/types](../modules/helpers_types.md).TableColumnType

The data structure of a table column, which will be used for the `headers`
prop of the `DatatableWrapper` props, as well as the `TableHeader` props.

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

- [alignment](helpers_types.TableColumnType.md#alignment)
- [cellProps](helpers_types.TableColumnType.md#cellprops)
- [checkbox](helpers_types.TableColumnType.md#checkbox)
- [isFilterable](helpers_types.TableColumnType.md#isfilterable)
- [isSortable](helpers_types.TableColumnType.md#issortable)
- [prop](helpers_types.TableColumnType.md#prop)
- [title](helpers_types.TableColumnType.md#title)

### Methods

- [cell](helpers_types.TableColumnType.md#cell)
- [headerCell](helpers_types.TableColumnType.md#headercell)

## Properties

### alignment

• `Optional` **alignment**: `Object`

Determines the cell alignment. This is a "shortcut" for aligning items instead
of having to use `cellProps.className` or `cellProps.style` to achieve
the same thing.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `horizontal?` | ``"left"`` \| ``"right"`` \| ``"center"`` | Sets the horizontal alignment of the cell. |

#### Defined in

[helpers/types.ts:90](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/helpers/types.ts#L90)

___

### cellProps

• `Optional` **cellProps**: `Object`

The props passed to the table columns under `tbody`.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `className?` | `string` \| (`row`: `T`) => `string` | Set a custom `className` to the cell. This can be a raw string or a function with the row data as parameter. |
| `style?` | `CSSProperties` \| (`row`: `T`) => `CSSProperties` | Set a custom `style` to the cell. This can be a raw object or a function with the row data as parameter. |

#### Defined in

[helpers/types.ts:53](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/helpers/types.ts#L53)

___

### checkbox

• `Optional` **checkbox**: `Object`

Determines whether the column is a checkbox or not. When set, then
the column will be a checkbox, both the headers and the rest of the rows.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `className?` | `string` | The custom `className` for the checkbox input. |
| `idProp` | `string` | The prop of the other headers that should be used as the unique ID. |

#### Defined in

[helpers/types.ts:79](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/helpers/types.ts#L79)

___

### isFilterable

• `Optional` **isFilterable**: `boolean`

Determines whether the column should be filterable or not.
When no headers include `isFilterable: true`, then the filter control
will not be rendered.

#### Defined in

[helpers/types.ts:70](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/helpers/types.ts#L70)

___

### isSortable

• `Optional` **isSortable**: `boolean`

Determines whether the column is sortable or not.

#### Defined in

[helpers/types.ts:74](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/helpers/types.ts#L74)

___

### prop

• **prop**: keyof `T`

The prop name for the header. This prop should exist in the table body's data
so that the column can render a non-empty cell. Moreover, each header should
have unique `prop` field.

#### Defined in

[helpers/types.ts:43](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/helpers/types.ts#L43)

___

### title

• `Optional` **title**: `string`

The title for the header.

#### Defined in

[helpers/types.ts:45](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/helpers/types.ts#L45)

## Methods

### cell

▸ `Optional` **cell**(`row`): `ReactNode`

Custom render the table body cell. This is a function with the row data as parameter.

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `T` |

#### Returns

`ReactNode`

#### Defined in

[helpers/types.ts:51](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/helpers/types.ts#L51)

___

### headerCell

▸ `Optional` **headerCell**(`icon`, `sortedProp`): `ReactNode`

Custom render the table header cell.

#### Parameters

| Name | Type |
| :------ | :------ |
| `icon` | `ReactNode` |
| `sortedProp` | [`SortType`](helpers_types.SortType.md) |

#### Returns

`ReactNode`

#### Defined in

[helpers/types.ts:47](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/helpers/types.ts#L47)
