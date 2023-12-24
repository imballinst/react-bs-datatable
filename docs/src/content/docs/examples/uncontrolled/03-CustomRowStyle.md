---
title: Custom Row Style
description: Sample code on using custom row style
---

<!--SNIPSTART CustomRowStyle-->
```tsx
export function CustomRowStyleStoryComponent() {
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
      title: 'Score'
    }
  ];

  return (
    <DatatableWrapper body={TABLE_DATA} headers={headers}>
      <Table>
        <TableHeader />
        <TableBody
          rowProps={(row: StoryColumnType) => ({
            style: { background: `rgba(128, 0, 0, ${row.score / 200})` }
          })}
        />
      </Table>
    </DatatableWrapper>
  );
}
```
<!--SNIPEND-->
