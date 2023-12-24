import { useState, useCallback, useEffect } from 'react';
import { useCreateCheckboxHandlers } from '../../helpers/hooks';
import {
  TableColumnType,
  SortType,
  CheckboxState,
  CheckboxOnChange
} from '../../helpers/types';
import {
  FetchParams,
  FetchResponse,
  StoryColumnType
} from '../resources/types';
import { Row, Col, Table } from 'react-bootstrap';
import {
  DatatableWrapper,
  DatatableWrapperProps
} from '../../components/DatatableWrapper';
import { Filter } from '../../components/Filter';
import { PaginationOptions } from '../../components/PaginationOptions';
import {
  TableBody,
  EmptyTablePlaceholder,
  TableRow
} from '../../components/TableBody';
import { TableHeader } from '../../components/TableHeader';
import { Pagination } from '../../components/Pagination';
import { filterData, sortData } from '../../helpers/data';

import TABLE_DATA from '../resources/story-data.json';
import { convertArrayToRecord } from '../../helpers/object';
import { parse } from 'date-fns';

const SORT_PROPS: NonNullable<
  DatatableWrapperProps<StoryColumnType>['sortProps']
> = {
  sortValueObj: {
    date: (date) => parse(`${date}`, 'MMMM dd, yyyy', new Date()).getTime()
  }
};

const TABLE_HEADERS: TableColumnType<StoryColumnType>[] = [
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
const HEADERS_DICTIONARY = convertArrayToRecord(TABLE_HEADERS, 'prop');

export function ControlledComposedTableStoryComponent() {
  const [data, setData] = useState<StoryColumnType[]>([]);
  const [filteredDataLength, setFilteredDataLength] = useState(0);
  const [filter, setFilter] = useState('');
  const [sortState, setSortState] = useState<SortType>({
    prop: 'name',
    order: 'asc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [maxPage, setMaxPage] = useState(1);
  const [checkboxState, setCheckboxState] = useState<
    Record<string, CheckboxState>
  >({
    checkbox: { selected: new Set(), state: 'none-selected' }
  });

  const onFilterChange = useCallback((text) => {
    setFilter(text);
    setCurrentPage(1);
  }, []);

  const onSortChange = useCallback((nextProp: SortType) => {
    setSortState(nextProp);
  }, []);

  const onPaginationChange = useCallback((nextPage) => {
    setCurrentPage(nextPage);
  }, []);

  const onRowsPerPageChange = useCallback((rowsPerPage) => {
    setRowsPerPage(rowsPerPage);
    setCurrentPage(1);
  }, []);

  const onRowClick = (row: StoryColumnType) => {
    alert(`Clicked row containing name ${row.name}.`);
  };

  const onCheckboxChange: CheckboxOnChange = (result, event) => {
    // Manually modifying these below will cause unexpected behavior
    // when we select a checkbox one-by-one in controlled mode.
    result.nextCheckboxState.state =
      result.nextCheckboxState.selected.size === data.length
        ? 'all-selected'
        : 'none-selected';

    setCheckboxState((oldState) => ({
      ...oldState,
      [result.checkboxProp]: result.nextCheckboxState
    }));
  };

  // Simulate API hit.
  useEffect(() => {
    async function getData() {
      const response = await fetchControlledMockData({
        filter,
        sortState,
        currentPage,
        rowsPerPage
      });

      setCheckboxState((oldState) => {
        return {
          ...oldState,
          checkbox: {
            selected: oldState.checkbox.selected,
            state: response.data.every((item) =>
              oldState.checkbox.selected.has(item.name)
            )
              ? 'all-selected'
              : 'none-selected'
          }
        };
      });

      setFilteredDataLength(response.filteredDataLength);
      setData(response.data);
      setMaxPage(response.maxPage);
    }

    getData();
  }, [filter, sortState, currentPage, rowsPerPage]);

  // Render a random button that'll render a reset selection button at the bottom of the table.
  function StrayResetSelectionButton() {
    const { createBulkCheckboxClickHandler } = useCreateCheckboxHandlers({
      checkboxState,
      data,
      filteredDataLength,
      onCheckboxChange
    });

    return (
      <>
        <button
          onClick={createBulkCheckboxClickHandler(
            'remove',
            {
              checkboxProp: 'checkbox',
              idProp: 'name'
            },
            () => ({
              selected: new Set(),
              state: 'none-selected'
            })
          )}
        >
          Reset selection
        </button>
      </>
    );
  }

  return (
    <DatatableWrapper headers={TABLE_HEADERS} body={data}>
      <Row className="mb-4">
        <Col
          xs={12}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Filter controlledProps={{ filter, onFilterChange }} />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
        >
          <PaginationOptions
            controlledProps={{
              filteredDataLength,
              onRowsPerPageChange,
              rowsPerPageOptions: [5, 10, 15, 20],
              rowsPerPage
            }}
          />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Pagination
            controlledProps={{ currentPage, maxPage, onPaginationChange }}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs={12} lg={4}>
          <StrayResetSelectionButton />

          {checkboxState.checkbox.selected.size > 0 && (
            <div>
              {`${checkboxState.checkbox.selected.size} ${
                checkboxState.checkbox.selected.size === 1 ? 'row' : 'rows'
              } selected.`}
            </div>
          )}
        </Col>
      </Row>
      <Table>
        <TableHeader
          controlledProps={{
            sortState,
            onSortChange,
            filteredDataLength,
            checkboxState,
            onCheckboxChange
          }}
        />
        <TableBody<StoryColumnType>>
          {data.length === 0 ? (
            <EmptyTablePlaceholder />
          ) : (
            data.map((rowData, rowIdx) =>
              rowData.status === 'unknown' ? (
                <tr key={rowData.username}>
                  <td colSpan={TABLE_HEADERS.length}>Row status unknown</td>
                </tr>
              ) : (
                <TableRow
                  key={rowData.username}
                  rowData={rowData}
                  rowIdx={rowIdx}
                  onRowClick={onRowClick}
                  controlledProps={{
                    filteredDataLength,
                    checkboxState,
                    onCheckboxChange
                  }}
                />
              )
            )
          )}
        </TableBody>
      </Table>
    </DatatableWrapper>
  );
}

// Helper functions.
async function fetchControlledMockData({
  rowsPerPage,
  filter,
  sortState,
  currentPage
}: FetchParams): Promise<FetchResponse<StoryColumnType>> {
  return new Promise((res) => {
    setTimeout(() => {
      let newData = TABLE_DATA;
      let newMaxPage = 1;
      let newFilteredDataLength = newData.length;

      // Filter the data.
      if (filter !== '') {
        newData = filterData(newData, HEADERS_DICTIONARY, filter);
        newFilteredDataLength = newData.length;
      }

      // Sort the data using a helper function.
      newData = sortData(newData, sortState, SORT_PROPS.sortValueObj);

      // Paginate the data.
      newMaxPage = Math.ceil(newData.length / rowsPerPage);
      newData = newData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      );

      res({
        data: newData,
        maxPage: newMaxPage,
        filteredDataLength: newFilteredDataLength
      });
    }, 200);
  });
}
