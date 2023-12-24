---
title: Custom Row On Click
description: Sample code on using custom row on click
---

<!--SNIPSTART RowOnClick-->
```tsx
export function RowOnClickStoryComponent({
  rowOnClickText
}: {
  rowOnClickText: string;
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
      title: 'Score'
    }
  ];

  return (
    <DatatableWrapper body={TABLE_DATA} headers={headers}>
      <Table>
        <TableHeader />
        <TableBody<StoryColumnType>
          onRowClick={(row, event) => {
            alert(
              `Clicked row containing name ${
                row.name
              }.\n\nYou inputted the text: ${rowOnClickText}. Clicked on element: ${
                (event.target as any).tagName
              }.`
            );
          }}
        />
      </Table>
    </DatatableWrapper>
  );
}
```
<!--SNIPEND-->
