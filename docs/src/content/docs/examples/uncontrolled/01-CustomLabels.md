---
title: Custom Labels
description: Sample code on using custom labels
---

<!--SNIPSTART CustomLabels-->
```tsx
export function CustomLabelsStoryComponent({
  filterPlaceholder,
  afterSelect,
  beforeSelect,
  firstPage,
  lastPage,
  nextPage,
  prevPage
}: {
  filterPlaceholder: string;
  afterSelect: string;
  beforeSelect: string;
  firstPage: string;
  lastPage: string;
  nextPage: string;
  prevPage: string;
}) {
  const headers: TableColumnType<StoryColumnType>[] = [
    {
      prop: 'name',
      title: 'Name',
      isSortable: true,
      isFilterable: true
    },
    {
      prop: 'username',
      title: 'Username',
      isSortable: true,
      isFilterable: true
    },
    {
      prop: 'location',
      title: 'Location'
    },
    {
      prop: 'date',
      title: 'Last Update',
      isSortable: true,
      isFilterable: true
    },
    {
      prop: 'score',
      title: 'Score',
      isSortable: true,
      isFilterable: true
    },
    {
      prop: 'checkbox',
      checkbox: { idProp: 'name', className: 'table-checkbox' },
      alignment: { horizontal: 'center' }
    }
  ];

  return (
    <DatatableWrapper
      body={TABLE_DATA}
      headers={headers}
      sortProps={{
        sortValueObj: {
          date: (date) =>
            parse(`${date}`, 'MMMM dd, yyyy', new Date()).getTime()
        }
      }}
      paginationOptionsProps={{
        initialState: {
          rowsPerPage: 10,
          options: [5, 10, 15, 20]
        }
      }}
    >
      <Row className="mb-4">
        <Col
          xs={12}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Filter placeholder={filterPlaceholder} />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
        >
          <PaginationOptions
            alwaysShowPagination
            labels={{ afterSelect, beforeSelect }}
          />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Pagination
            alwaysShowPagination
            paginationRange={3}
            labels={{ firstPage, lastPage, nextPage, prevPage }}
          />
        </Col>
        <Col xs={12} className="mt-2">
          <BulkCheckboxControl />
        </Col>
      </Row>
      <Table>
        <TableHeader />
        <TableBody />
      </Table>
    </DatatableWrapper>
  );
}
```
<!--SNIPEND-->
