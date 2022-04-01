import React, { MutableRefObject, ReactNode, useRef } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Col, Row, Table } from 'react-bootstrap';
import { parse } from 'date-fns';

import json from './resources/story-data.json';
import { StoryColumnType } from './resources/types';
import { STORY_HEADERS, STORY_PROP_TO_OPTION_NAME } from './resources/shared';
import { TableHeader } from '../components/TableHeader';
import {
  TableRowProps,
  TableBody,
  TableBodyProps
} from '../components/TableBody';
import {
  DatatableWrapper,
  DatatableWrapperProps,
  UncontrolledTableEvents,
  useDatatableWrapper
} from '../components/DatatableWrapper';
import { Filter } from '../components/Filter';
import { PaginationOptions } from '../components/PaginationOptions';
import { Pagination } from '../components/Pagination';
import { TableColumnType } from '../helpers/types';
import { BulkCheckboxControl } from '../components/BulkCheckboxControl';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Uncontrolled',
  component: StoryTable
} as ComponentMeta<typeof StoryTable>;

const Template: ComponentStory<typeof StoryTable> = (args) => (
  <StoryTable {...args} />
);

export const FilterSortPagination = Template.bind({});
FilterSortPagination.storyName = 'Filter, sort, pagination, checkbox';
FilterSortPagination.argTypes = {
  sortableFields: {
    name: 'Sortable Fields',
    options: ['Name', 'Username', 'Location', 'Last Update', 'Score'],
    defaultValue: ['Name', 'Username', 'Last Update', 'Score'],
    control: {
      type: 'inline-check'
    }
  },
  filterableFields: {
    name: 'Filterable fields',
    options: ['Name', 'Username', 'Location', 'Last Update', 'Score'],
    defaultValue: ['Name', 'Username', 'Location'],
    control: {
      type: 'inline-check'
    }
  },
  alwaysShowPagination: {
    name: 'Always show pagination?',
    defaultValue: true,
    type: 'boolean'
  },
  hasCheckbox: {
    name: 'Has checkbox?',
    defaultValue: true,
    type: 'boolean'
  },
  rowsPerPage: {
    name: 'Rows per page',
    defaultValue: 10,
    type: 'number'
  },
  rowsPerPageOptions: {
    name: 'Rows per page options',
    defaultValue: [5, 10, 15, 20],
    options: [5, 10, 15, 20],
    control: {
      type: 'inline-check'
    }
  }
};

export const CustomLabels = Template.bind({});
CustomLabels.storyName = 'Custom labels';
CustomLabels.args = {
  sortableFields: ['Name', 'Username', 'Last Update', 'Score'],
  filterableFields: ['Name', 'Username', 'Location'],
  alwaysShowPagination: true,
  rowsPerPage: 10,
  rowsPerPageOptions: [5, 10, 15, 20]
};
CustomLabels.argTypes = {
  filterPlaceholder: {
    name: 'Filter placeholder',
    defaultValue: 'Filter text...',
    type: 'string'
  },
  afterSelect: {
    name: 'Text after pagination options',
    type: 'string'
  },
  beforeSelect: {
    name: 'Text before pagination options',
    defaultValue: 'Number of rows shown',
    type: 'string'
  },
  firstPage: {
    name: 'First page label',
    defaultValue: '<<',
    type: 'string'
  },
  lastPage: {
    name: 'Last page label',
    defaultValue: '>>',
    type: 'string'
  },
  nextPage: {
    name: 'Next page label',
    defaultValue: '>',
    type: 'string'
  },
  prevPage: {
    name: 'Previous page label',
    defaultValue: '<',
    type: 'string'
  }
};

export const CustomCellRender = Template.bind({});
CustomCellRender.storyName = 'Custom cell rendering';
CustomCellRender.argTypes = {
  scoreCellColumnColor: {
    name: 'Score cell column color if score is lower than 50',
    type: 'string',
    defaultValue: '#cf8a8a',
    controls: {
      type: 'color'
    }
  }
};

export const CustomTableRowProps = Template.bind({});
CustomTableRowProps.storyName = 'Custom row props depending depending on score';
CustomTableRowProps.args = {
  rowProps: (row) => ({
    style: { background: `rgba(128, 0, 0, ${row.score / 200})` }
  })
};

export const RowOnClick = Template.bind({});
RowOnClick.storyName = 'Adding row on click event';
RowOnClick.argTypes = {
  rowOnClickText: {
    name: 'Text shown when row is clicked',
    type: 'string',
    defaultValue: 'Hello, world'
  }
};

const RaisedTableContextTemplate: ComponentStory<typeof StoryTable> = (
  args
) => {
  function Children() {
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

  return (
    <StoryTable {...args}>
      <Children />
    </StoryTable>
  );
};

export const RaisedTableContext = RaisedTableContextTemplate.bind({});
RaisedTableContext.storyName =
  'Uncontrolled table with external sort events trigger';
RaisedTableContext.args = {
  sortableFields: ['Name', 'Username', 'Last Update', 'Score'],
  filterableFields: ['Name', 'Username', 'Location'],
  alwaysShowPagination: true,
  rowsPerPage: 10,
  rowsPerPageOptions: [5, 10, 15, 20]
};

// This example is deprecated. Prefer use the `RaisedTableContext` instead.
const RefTemplate: ComponentStory<typeof StoryTable> = (args) => {
  const tableEventsRef = useRef<UncontrolledTableEvents>();
  return (
    <div>
      <button
        onClick={() => tableEventsRef.current?.onSortByPropChange('name')}
      >
        External sort by name
      </button>
      <button
        onClick={() => tableEventsRef.current?.onSortByPropChange('username')}
      >
        External sort by username
      </button>
      <StoryTable {...args} tableEventsRef={tableEventsRef} />
    </div>
  );
};

export const UncontrolledWithRefEvents = RefTemplate.bind({});
UncontrolledWithRefEvents.storyName =
  'Uncontrolled table with external sort events trigger (deprecated)';
UncontrolledWithRefEvents.args = {
  sortableFields: ['Name', 'Username', 'Last Update', 'Score'],
  filterableFields: ['Name', 'Username', 'Location'],
  alwaysShowPagination: true,
  rowsPerPage: 10,
  rowsPerPageOptions: [5, 10, 15, 20]
};

// Components.
const SORT_PROPS: DatatableWrapperProps<StoryColumnType>['sortProps'] = {
  sortValueObj: {
    date: (date) => parse(`${date}`, 'MMMM dd, yyyy', new Date()).getTime()
  }
};

function StoryTable({
  sortableFields,
  filterableFields,
  rowsPerPage = -1,
  rowsPerPageOptions = [],
  alwaysShowPagination = true,
  hasCheckbox,
  // Custom labels.
  filterPlaceholder,
  afterSelect,
  beforeSelect,
  firstPage,
  lastPage,
  nextPage,
  prevPage,
  // For custom rendering of score column.
  scoreCellColumnColor,
  // For custom props of row depending on score column.
  rowProps,
  // For on click row event.
  rowOnClickText,
  rowOnClickFn,
  tableEventsRef,
  children
}: {
  sortableFields?: string[];
  filterableFields?: string[];
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  alwaysShowPagination?: boolean;
  hasCheckbox?: boolean;
  // Custom labels.
  filterPlaceholder?: string;
  afterSelect?: string;
  beforeSelect?: string;
  firstPage?: string;
  lastPage?: string;
  nextPage?: string;
  prevPage?: string;
  // For custom rendering of score column.
  scoreCellColumnColor?: string;
  // For custom props of row depending on score column.
  rowProps?: TableRowProps | ((row: any) => TableRowProps);
  // For on click row event.
  rowOnClickText?: string;
  rowOnClickFn?: (name: string) => void;
  // Set this to `true` if we want to control the table events from outside,
  // but keep the table uncontrolled.
  tableEventsRef?: MutableRefObject<UncontrolledTableEvents | undefined>;
  children?: ReactNode;
}) {
  const headers: TableColumnType<StoryColumnType>[] = STORY_HEADERS.map(
    (header) => ({
      ...header,
      isSortable: sortableFields?.includes(
        STORY_PROP_TO_OPTION_NAME[header.prop]
      ),
      isFilterable: filterableFields?.includes(
        STORY_PROP_TO_OPTION_NAME[header.prop]
      )
    })
  );
  let rowOnClick: TableBodyProps<StoryColumnType>['onRowClick'];
  let checkboxControl;

  if (hasCheckbox) {
    headers.push({
      prop: 'checkbox',
      checkbox: { idProp: 'name', className: 'table-checkbox' },
      alignment: { horizontal: 'center' }
    });
    checkboxControl = <BulkCheckboxControl />;
  }

  if (scoreCellColumnColor) {
    const header = headers.find((h) => h.prop === 'score');

    if (header) {
      header.cellProps = {
        style: (row) => ({
          background: row.score >= 50 ? 'unset' : scoreCellColumnColor
        })
      };
    }
  }

  if (rowOnClickText) {
    rowOnClick = (row) => {
      alert(
        `Clicked row containing name ${row.name}.\n\nYou inputted the text: ${rowOnClickText}.`
      );
    };
  } else if (rowOnClickFn) {
    rowOnClick = (row) => rowOnClickFn(row.name);
  }

  return (
    <DatatableWrapper
      body={json}
      headers={headers}
      sortProps={SORT_PROPS}
      tableEventsRef={tableEventsRef}
      paginationOptionsProps={{
        initialState: {
          rowsPerPage,
          options: rowsPerPageOptions
        }
      }}
    >
      {children}
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
            alwaysShowPagination={alwaysShowPagination}
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
            alwaysShowPagination={alwaysShowPagination}
            labels={{ firstPage, lastPage, nextPage, prevPage }}
          />
        </Col>
        <Col xs={12} className="mt-2">
          {checkboxControl}
        </Col>
      </Row>
      <Table>
        <TableHeader />
        <TableBody onRowClick={rowOnClick} rowProps={rowProps} />
      </Table>
    </DatatableWrapper>
  );
}
