[react-bs-datatable](../README.md) / [components/DatatableWrapper](../modules/components_DatatableWrapper.md) / TableSortParameters

# Interface: TableSortParameters<TTableRowType\>

[components/DatatableWrapper](../modules/components_DatatableWrapper.md).TableSortParameters

This is the additional parameters for the filter function.
Only applicable for uncontrolled table mode.

## Type parameters

| Name |
| :------ |
| `TTableRowType` |

## Table of contents

### Properties

- [initialState](components_DatatableWrapper.TableSortParameters.md#initialstate)
- [sortValueObj](components_DatatableWrapper.TableSortParameters.md#sortvalueobj)

## Properties

### initialState

• `Optional` **initialState**: [`SortType`](helpers_types.SortType.md)

The initial states for the table.

#### Defined in

[components/DatatableWrapper.tsx:74](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/components/DatatableWrapper.tsx#L74)

___

### sortValueObj

• `Optional` **sortValueObj**: `Partial`<`Record`<keyof `TTableRowType`, (`column`: `TTableRowType`) => `number`\>\>

An object with the key being the table columns' prop and
the value being the value converter for the column.
This is most useful when we want to sort something by number
instead of by text.

For example, we want to convert a date format
as the following: "Jan 22, 2022". Since string sorting will result
in a wrong result, then we need to convert it first, e.g. using `date-fns`.
After we parse the column's formatted date, only then we can get its
number value.

```ts
{
  sortValueObject: {
    date: (column: string) => parse(column).getTime()
  }
}
```

The object above will cause all rows in the `date` column to be sorted
by number (milliseconds) instead of by formatted date string.

#### Defined in

[components/DatatableWrapper.tsx:72](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/components/DatatableWrapper.tsx#L72)
