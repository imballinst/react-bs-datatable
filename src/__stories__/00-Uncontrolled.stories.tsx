import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Col, Row, Table } from 'react-bootstrap';
import { parse } from 'date-fns';

import json from './resources/story-data.json';
import {
  StoryBodyType,
  STORY_HEADERS,
  STORY_PROP_TO_OPTION_NAME
} from './resources/types';
import TableHeader from '../components/TableHeader';
import TableBody, { TableBodyProps } from '../components/TableBody';
import {
  DatatableWrapper,
  DatatableWrapperProps
} from '../components/DatatableWrapper';
import { Filter } from '../components/Filter';
import PaginationOpts from '../components/PaginationOpts';
import Pagination from '../components/Pagination';

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
FilterSortPagination.storyName = 'Filter, sort, pagination';
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
    name: 'Always show pagination',
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

export const RowOnClick = Template.bind({});
RowOnClick.storyName = 'Adding row on click event';
RowOnClick.argTypes = {
  rowOnClickText: {
    name: 'Text shown when row is clicked',
    type: 'string',
    defaultValue: 'Hello, world'
  }
};

// Components.
const SORT_PROPS: DatatableWrapperProps<StoryBodyType>['sortProps'] = {
  sortValueObj: {
    date: (row) => parse(row.date, 'MMMM dd, yyyy', new Date()).getTime()
  }
};

function StoryTable({
  sortableFields,
  filterableFields,
  rowsPerPage = -1,
  rowsPerPageOptions = [],
  alwaysShowPagination = true,
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
  // For on click row event.
  rowOnClickText
}: {
  sortableFields: string[];
  filterableFields: string[];
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  alwaysShowPagination?: boolean;
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
  // For on click row event.
  rowOnClickText?: string;
}) {
  const headers = STORY_HEADERS.map((header) => ({
    ...header,
    isSortable: sortableFields?.includes(
      STORY_PROP_TO_OPTION_NAME[header.prop]
    ),
    isFilterable: filterableFields?.includes(
      STORY_PROP_TO_OPTION_NAME[header.prop]
    )
  }));
  let rowOnClick: TableBodyProps<StoryBodyType>['onRowClick'];

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
  }

  return (
    <DatatableWrapper
      body={json}
      headers={headers}
      sortProps={SORT_PROPS}
      paginationOptionsProps={{
        initialState: {
          rowsPerPage,
          options: rowsPerPageOptions
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
          className="d-flex flex-col justify-content-center align-items-center"
        >
          <PaginationOpts
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
      </Row>
      <Table>
        <TableHeader tableHeaders={headers} />
        <TableBody onRowClick={rowOnClick} />
      </Table>
    </DatatableWrapper>
  );
}
