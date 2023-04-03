[react-bs-datatable](../README.md) / components/TableBody

# Module: components/TableBody

## Table of contents

### Interfaces

- [EmptyTablePlaceholderProps](../interfaces/components_TableBody.EmptyTablePlaceholderProps.md)
- [TableBodyClasses](../interfaces/components_TableBody.TableBodyClasses.md)
- [TableBodyControlledProps](../interfaces/components_TableBody.TableBodyControlledProps.md)
- [TableBodyLabels](../interfaces/components_TableBody.TableBodyLabels.md)
- [TableBodyProps](../interfaces/components_TableBody.TableBodyProps.md)
- [TableRowProps](../interfaces/components_TableBody.TableRowProps.md)

### Type aliases

- [HtmlTrProps](components_TableBody.md#htmltrprops)

### Functions

- [EmptyTablePlaceholder](components_TableBody.md#emptytableplaceholder)
- [TableBody](components_TableBody.md#tablebody)
- [TableRow](components_TableBody.md#tablerow)

## Type aliases

### HtmlTrProps

Ƭ **HtmlTrProps**: `Omit`<`React.DetailedHTMLProps`<`React.HTMLAttributes`<`HTMLTableRowElement`\>, `HTMLTableRowElement`\>, ``"onClick"``\>

#### Defined in

[components/TableBody.tsx:48](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/TableBody.tsx#L48)

## Functions

### EmptyTablePlaceholder

▸ **EmptyTablePlaceholder**(`param0`): `Element`

`EmptyTablePlaceholder` is a component used to indicate that a table is empty, or doesn't
have matching search results.

#### Parameters

| Name | Type |
| :------ | :------ |
| `param0` | [`EmptyTablePlaceholderProps`](../interfaces/components_TableBody.EmptyTablePlaceholderProps.md) |

#### Returns

`Element`

#### Defined in

[components/TableBody.tsx:343](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/TableBody.tsx#L343)

___

### TableBody

▸ **TableBody**<`TTableRowType`\>(`__namedParameters`): `Element`

Renders the table body, which is a `tbody` tag along with the rest of the elements,
such as `tr` and `td` tags.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTableRowType` | extends [`TableRowType`](helpers_types.md#tablerowtype)<`any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`TableBodyProps`](../interfaces/components_TableBody.TableBodyProps.md)<`TTableRowType`\> |

#### Returns

`Element`

#### Defined in

[components/TableBody.tsx:84](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/TableBody.tsx#L84)

___

### TableRow

▸ **TableRow**<`TTableRowType`\>(`__namedParameters`): `Element`

`TableRow` component, as its name suggests, is a component to render a row of a table.
This component is exported so it is possible to compose the rows further. For example:

```
<TableBody>
  {
    data.map((row, rowIdx) => (
      row.isLoading ? (
        <tr><td colSpan={headers.length}><Loading /></td></tr>
      ) : (
        <TableRow rowData={row} rowIdx={rowIdx} />
      )
    ))
  }
</TableBody>
```

The above snippet will render loading indicator for rows that don't have sufficient data to store yet.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTableRowType` | extends [`TableRowType`](helpers_types.md#tablerowtype)<`any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`TableRowProps`](../interfaces/components_TableBody.TableRowProps.md)<`TTableRowType`\> |

#### Returns

`Element`

#### Defined in

[components/TableBody.tsx:185](https://github.com/imballinst/react-bs-datatable/blob/master/src/components/TableBody.tsx#L185)
