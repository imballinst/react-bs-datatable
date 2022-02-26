[react-bs-datatable](../README.md) / [components/DatatableWrapper](../modules/components_DatatableWrapper.md) / DatatableWrapperProps

# Interface: DatatableWrapperProps<TTableRowType\>

[components/DatatableWrapper](../modules/components_DatatableWrapper.md).DatatableWrapperProps

The props that can be passed to the `DatatableWrapper` component.

## Type parameters

| Name |
| :------ |
| `TTableRowType` |

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

[components/DatatableWrapper.tsx:173](https://github.com/imballinst/react-bs-datatable/blob/eac35b9/src/components/DatatableWrapper.tsx#L173)

___

### checkboxProps

• `Optional` **checkboxProps**: [`TableCheckboxParameters`](components_DatatableWrapper.TableCheckboxParameters.md)

#### Defined in

[components/DatatableWrapper.tsx:180](https://github.com/imballinst/react-bs-datatable/blob/eac35b9/src/components/DatatableWrapper.tsx#L180)

___

### children

• **children**: `ReactNode`

The rest of the table, including its controls.

#### Defined in

[components/DatatableWrapper.tsx:171](https://github.com/imballinst/react-bs-datatable/blob/eac35b9/src/components/DatatableWrapper.tsx#L171)

___

### filterProps

• `Optional` **filterProps**: [`TableFilterParameters`](components_DatatableWrapper.TableFilterParameters.md)

#### Defined in

[components/DatatableWrapper.tsx:176](https://github.com/imballinst/react-bs-datatable/blob/eac35b9/src/components/DatatableWrapper.tsx#L176)

___

### headers

• **headers**: [`TableColumnType`](helpers_types.TableColumnType.md)<`TTableRowType`\>[]

#### Defined in

[components/DatatableWrapper.tsx:172](https://github.com/imballinst/react-bs-datatable/blob/eac35b9/src/components/DatatableWrapper.tsx#L172)

___

### isControlled

• `Optional` **isControlled**: `boolean`

When set to `true`, the table will "skip" all uncontrolled processes.

#### Defined in

[components/DatatableWrapper.tsx:175](https://github.com/imballinst/react-bs-datatable/blob/eac35b9/src/components/DatatableWrapper.tsx#L175)

___

### paginationOptionsProps

• `Optional` **paginationOptionsProps**: [`TablePaginationOptionsParameters`](components_DatatableWrapper.TablePaginationOptionsParameters.md)

#### Defined in

[components/DatatableWrapper.tsx:179](https://github.com/imballinst/react-bs-datatable/blob/eac35b9/src/components/DatatableWrapper.tsx#L179)

___

### paginationProps

• `Optional` **paginationProps**: [`TablePaginationParameters`](components_DatatableWrapper.TablePaginationParameters.md)

#### Defined in

[components/DatatableWrapper.tsx:178](https://github.com/imballinst/react-bs-datatable/blob/eac35b9/src/components/DatatableWrapper.tsx#L178)

___

### sortProps

• `Optional` **sortProps**: [`TableSortParameters`](components_DatatableWrapper.TableSortParameters.md)<`TTableRowType`\>

#### Defined in

[components/DatatableWrapper.tsx:177](https://github.com/imballinst/react-bs-datatable/blob/eac35b9/src/components/DatatableWrapper.tsx#L177)

___

### tableEventsRef

• `Optional` **tableEventsRef**: `MutableRefObject`<`undefined` \| [`UncontrolledTableEvents`](components_DatatableWrapper.UncontrolledTableEvents.md)\>

#### Defined in

[components/DatatableWrapper.tsx:181](https://github.com/imballinst/react-bs-datatable/blob/eac35b9/src/components/DatatableWrapper.tsx#L181)
