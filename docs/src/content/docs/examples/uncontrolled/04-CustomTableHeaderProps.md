---
title: Custom Table Header Props
description: Sample code on using custom table header props
---

<!--SNIPSTART CustomTableHeaderProps-->
```tsx
export function CustomTableHeaderPropsStoryComponent({
  thClassName
}: {
  thClassName: string;
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
      thProps: {
        className: thClassName
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
