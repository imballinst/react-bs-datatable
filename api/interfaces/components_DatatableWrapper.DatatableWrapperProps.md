[react-bs-datatable](../README.md) / [components/DatatableWrapper](../modules/components_DatatableWrapper.md) / DatatableWrapperProps

# Interface: DatatableWrapperProps<TTableRowType\>

[components/DatatableWrapper](../modules/components_DatatableWrapper.md).DatatableWrapperProps

The props that can be passed to the `DatatableWrapper` component.

## Type parameters

| Name | Type |
| :------ | :------ |
| `TTableRowType` | extends [`TableRowType`](../modules/helpers_types.md#tablerowtype) |

## Table of contents

### Properties

- [body](components_DatatableWrapper.DatatableWrapperProps.md#body)
- [checkboxProps](components_DatatableWrapper.DatatableWrapperProps.md#checkboxprops)
- [children](components_DatatableWrapper.DatatableWrapperProps.md#children)
- [filterProps](components_DatatableWrapper.DatatableWrapperProps.md#filterprops)
- [headers](components_DatatableWrapper.DatatableWrapperProps.md#headers)
- [isControlled](components_DatatableWrapper.DatatableWrapperProps.md#iscontrolled)
- [paginationOptionsProps](components_DatatableWrapper.DatatableWrapperProps.md#paginationoptionsprops)
- [paginationProps](components_DatatableWrapper.DatatableWrapperProps.md#paginationprops)
- [sortProps](components_DatatableWrapper.DatatableWrapperProps.md#sortprops)
- [tableEventsRef](components_DatatableWrapper.DatatableWrapperProps.md#tableeventsref)

## Properties

### body

• **body**: `TTableRowType`[]

#### Defined in

[components/DatatableWrapper.tsx:181](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/DatatableWrapper.tsx#L181)

___

### checkboxProps

• `Optional` **checkboxProps**: [`TableCheckboxParameters`](components_DatatableWrapper.TableCheckboxParameters.md)

#### Defined in

[components/DatatableWrapper.tsx:193](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/DatatableWrapper.tsx#L193)

___

### children

• **children**: `ReactNode`

The rest of the table, including its controls.

#### Defined in

[components/DatatableWrapper.tsx:179](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/DatatableWrapper.tsx#L179)

___

### filterProps

• `Optional` **filterProps**: [`TableFilterParameters`](components_DatatableWrapper.TableFilterParameters.md)

#### Defined in

[components/DatatableWrapper.tsx:189](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/DatatableWrapper.tsx#L189)

___

### headers

• **headers**: [`TableColumnType`](helpers_types.TableColumnType.md)<`TTableRowType`\>[]

#### Defined in

[components/DatatableWrapper.tsx:180](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/DatatableWrapper.tsx#L180)

___

### isControlled

• `Optional` **isControlled**: `boolean`

**`deprecated`**

This prop is deprecated; now the table is automatically set as controlled
when any of the child components is provided `controlledProps`.

#### Defined in

[components/DatatableWrapper.tsx:188](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/DatatableWrapper.tsx#L188)

___

### paginationOptionsProps

• `Optional` **paginationOptionsProps**: [`TablePaginationOptionsParameters`](components_DatatableWrapper.TablePaginationOptionsParameters.md)

#### Defined in

[components/DatatableWrapper.tsx:192](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/DatatableWrapper.tsx#L192)

___

### paginationProps

• `Optional` **paginationProps**: [`TablePaginationParameters`](components_DatatableWrapper.TablePaginationParameters.md)

#### Defined in

[components/DatatableWrapper.tsx:191](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/DatatableWrapper.tsx#L191)

___

### sortProps

• `Optional` **sortProps**: [`TableSortParameters`](components_DatatableWrapper.TableSortParameters.md)<`TTableRowType`\>

#### Defined in

[components/DatatableWrapper.tsx:190](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/DatatableWrapper.tsx#L190)

___

### tableEventsRef

• `Optional` **tableEventsRef**: `MutableRefObject`<`undefined` \| [`UncontrolledTableEvents`](components_DatatableWrapper.UncontrolledTableEvents.md)\>

**`deprecated`**

Usage of `tableEventsRef` is deprecated. Consider using `useDatatableWrapper`
and raising the `DatatableWrapper` a bit higher in the structure instead.

#### Defined in

[components/DatatableWrapper.tsx:200](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/DatatableWrapper.tsx#L200)
