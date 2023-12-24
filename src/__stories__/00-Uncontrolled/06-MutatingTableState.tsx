import { Col, Row, Table } from 'react-bootstrap';
import {
  DatatableWrapper,
  useDatatableWrapper
} from '../../components/DatatableWrapper';
import { TableBody } from '../../components/TableBody';
import { TableHeader } from '../../components/TableHeader';
import { TableColumnType } from '../../helpers/types';
import { StoryColumnType } from '../resources/types';
import TABLE_DATA from '../resources/story-data.json';

export function MutatingTableStateStoryComponent() {
  const headers: TableColumnType<StoryColumnType>[] = [
    {
      prop: 'name',
      title: 'Name',
      isSortable: true
    },
    {
      prop: 'username',
      title: 'Username',
      isSortable: true
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
      <Row>
        <Col xs={12}>
          <TableController />
        </Col>
      </Row>
      <Table>
        <TableHeader />
        <TableBody />
      </Table>
    </DatatableWrapper>
  );
}

function TableController() {
  const { onSortByPropChange, sortState } = useDatatableWrapper();

  return (
    <div>
      <label>Sort state</label>
      <pre>{JSON.stringify(sortState)}</pre>

      <button onClick={() => onSortByPropChange('name')}>
        External sort by name
      </button>
      <button onClick={() => onSortByPropChange('username')}>
        External sort by username
      </button>
    </div>
  );
}
