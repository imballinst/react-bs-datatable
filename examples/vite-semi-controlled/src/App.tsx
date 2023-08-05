import { useEffect, useState } from 'react';
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  SortType,
  TableBody,
  TableColumnType,
  TableHeader,
  useDatatableWrapper
} from 'react-bs-datatable';
import { Col, Row, Table } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

// Create table headers consisting of 4 columns.
const headers: TableColumnType<{
  username: string;
  realname: string;
  location: string;
}>[] = [
  { title: 'Username', prop: 'username', isFilterable: true, isSortable: true },
  { title: 'Name', prop: 'realname' },
  { title: 'Location', prop: 'location' }
];

// Randomize data of the table columns.
// Note that the fields are all using the `prop` field of the headers.
const body = Array.from(new Array(57), () => {
  const rd = Math.random() * 10;

  if (rd > 0.5) {
    return {
      username: 'i-am-billy',
      realname: `Billy ${rd.toFixed(1)}`,
      location: 'Mars'
    };
  }

  return {
    username: 'john-nhoj',
    realname: `John ${rd.toFixed(1)}`,
    location: 'Saturn'
  };
});

// Then, use it in a component.
function TableController({
  filter,
  sortState
}: {
  filter: string;
  sortState: SortType;
}) {
  const { onFilterChange, onSortChange } = useDatatableWrapper();

  useEffect(() => {
    onFilterChange(filter);
  }, [filter, onFilterChange]);

  useEffect(() => {
    onSortChange(sortState);
  }, [sortState, onSortChange]);

  return null;
}

export default function App() {
  const [filter, setFilter] = useState('');
  const [sortState, setSortState] = useState<SortType>({
    order: 'asc',
    prop: 'username'
  });

  return (
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />

      <button
        onClick={() =>
          setSortState((prev) => ({
            ...prev,
            order: prev.order === 'asc' ? 'desc' : 'asc'
          }))
        }
      >
        Toggle order
      </button>

      <DatatableWrapper body={body} headers={headers}>
        <TableController filter={filter} sortState={sortState} />

        <Row className="mb-4">
          <Col
            xs={12}
            lg={4}
            className="d-flex flex-col justify-content-end align-items-end"
          >
            <Filter />
          </Col>
          <Col
            xs={12}
            sm={6}
            lg={4}
            className="d-flex flex-col justify-content-center align-items-center"
          >
            <PaginationOptions />
          </Col>
          <Col
            xs={12}
            sm={6}
            lg={4}
            className="d-flex flex-col justify-content-end align-items-end"
          >
            <Pagination />
          </Col>
        </Row>
        <Table>
          <TableHeader />
          <TableBody />
        </Table>
      </DatatableWrapper>
    </div>
  );
}
