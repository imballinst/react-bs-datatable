---
title: Custom Cell Style
description: Sample code on using custom cell style
---

<!--SNIPSTART CustomCellStyle-->
```tsx
export function CustomCellStyleStoryComponent({
  scoreCellColumnColor
}: {
  scoreCellColumnColor: string;
}) {
  const headers: TableColumnType<StoryColumnType>[] = [
    {
      prop: 'name',
      title: 'Name'
    },
    {
      prop: 'username',
      title: 'Username'
    },
    {
      prop: 'location',
      title: 'Location'
    },
    {
      prop: 'date',
      title: 'Last Update'
    },
    {
      prop: 'score',
      title: 'Score',
      cellProps: {
        style: (row) => ({
          background: row.score >= 50 ? 'unset' : scoreCellColumnColor
        })
      }
    }
  ];

  return (
    <DatatableWrapper body={TABLE_DATA} headers={headers}>
      <Table>
        <TableHeader />
        <TableBody />
      </Table>
    </DatatableWrapper>
  );
}
```
<!--SNIPEND-->
