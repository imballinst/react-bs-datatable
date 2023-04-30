import React, { MutableRefObject, ReactNode, useRef } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Col, Row, Table } from 'react-bootstrap';
import { parse } from 'date-fns';

import json from './resources/story-data.json';
import { StoryColumnType } from './resources/types';
import { STORY_HEADERS, STORY_PROP_TO_OPTION_NAME } from './resources/shared';
import { TableHeader } from '../components/TableHeader';
import {
  EmptyTablePlaceholder,
  HtmlTrProps,
  TableBody,
  TableBodyProps,
  TableRow
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
import { CheckboxOnChange, TableColumnType } from '../helpers/types';
import { BulkCheckboxControl } from '../components/BulkCheckboxControl';
import { useCreateCheckboxHandlers } from '../helpers/hooks';

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
  paginationRange: {
    name: 'Pagination range',
    defaultValue: 3,
    type: 'number'
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
    defaultValue: ['5', '10', '15', '20'],
    options: ['5', '10', '15', '20'],
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
  rowProps: (row: StoryColumnType) => ({
    style: { background: `rgba(128, 0, 0, ${row.score / 200})` }
  })
};

// TODO(imballinst): migrate all stories so they are composable like this,
// instead of adding all to StoryTable props which can result in unmaintainability.
export const CustomThProps = (() => {
  function CustomThPropsTemplate({ thClassName }: { thClassName?: string }) {
    const headers: TableColumnType<StoryColumnType>[] = STORY_HEADERS.map(
      (header) => ({
        ...header,
        thProps:
          header.prop === 'score'
            ? {
                className: thClassName
              }
            : undefined
      })
    );

    return (
      <DatatableWrapper body={json} headers={headers}>
        <Table>
          <TableHeader />
          <TableBody />
        </Table>
      </DatatableWrapper>
    );
  }

  return CustomThPropsTemplate as ComponentStory<typeof CustomThPropsTemplate>;
})();
CustomThProps.storyName = 'Custom "score" table header classname';
CustomThProps.argTypes = {
  thClassName: {
    name: '"Score" table header classname',
    type: 'string',
    defaultValue: 'hello-world'
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

const ComposedTableRowTemplate: ComponentStory<typeof StoryTable> = ({
  rowOnClickFn,
  sortableFields,
  filterableFields,
  onCheckboxChange: onCheckboxChangeProp,
  rowsPerPage = 10,
  rowsPerPageOptions = [5, 10, 15, 20],
  alwaysShowPagination
}) => {
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
  const checkboxControl = <BulkCheckboxControl />;
  headers.push({
    prop: 'checkbox',
    checkbox: { idProp: 'name', className: 'table-checkbox' },
    alignment: { horizontal: 'center' }
  });

  const header = headers.find((h) => h.prop === 'score');
  if (header) {
    header.cellProps = {
      style: (row) => ({
        background: row.score >= 50 ? 'unset' : '#fafafa'
      })
    };
  }

  const onRowClick = (
    row: StoryColumnType,
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    alert(`Clicked row containing name ${row.name}.`);

    if (rowOnClickFn) {
      rowOnClickFn(row.name, event);
    }
  };
  const modifiedJson = [...json];
  modifiedJson[3].status = 'unknown';

  // Render a random button that'll render a reset selection button at the bottom of the table.
  function StrayResetSelectionButton() {
    const { createBulkCheckboxClickHandler } = useCreateCheckboxHandlers();

    return (
      <>
        <button
          onClick={createBulkCheckboxClickHandler('add', {
            checkboxProp: 'checkbox',
            idProp: 'name'
          })}
        >
          Add all to selection
        </button>
        <button
          onClick={createBulkCheckboxClickHandler('remove', {
            checkboxProp: 'checkbox',
            idProp: 'name'
          })}
        >
          Reset selection
        </button>
      </>
    );
  }
  const onCheckboxChange: CheckboxOnChange = (result, event) => {
    onCheckboxChangeProp?.(result, event);
    console.debug(result, event);
  };

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
      checkboxProps={{
        onCheckboxChange
      }}
    >
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
          className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
        >
          <PaginationOptions alwaysShowPagination={alwaysShowPagination} />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Pagination alwaysShowPagination={alwaysShowPagination} />
        </Col>
        <Col xs={12} className="mt-2">
          {checkboxControl}
        </Col>
      </Row>
      <Table>
        <TableHeader />
        <TableBody<StoryColumnType>>
          {(rows) =>
            rows.length === 0 ? (
              <EmptyTablePlaceholder />
            ) : (
              rows.map((rowData, rowIdx) =>
                rowData.status === 'unknown' ? (
                  <tr key={rowData.username}>
                    <td colSpan={headers.length}>Row status unknown</td>
                  </tr>
                ) : (
                  <TableRow
                    key={rowData.username}
                    rowData={rowData}
                    rowIdx={rowIdx}
                    onRowClick={onRowClick}
                  />
                )
              )
            )
          }
        </TableBody>
      </Table>

      <Row>
        <Col xs={12}>
          <StrayResetSelectionButton />
        </Col>
      </Row>
    </DatatableWrapper>
  );
};

export const ComposedTableRow = ComposedTableRowTemplate.bind({});
ComposedTableRow.storyName = 'Composed table rows';
ComposedTableRow.args = {
  sortableFields: ['Name', 'Username', 'Last Update', 'Score'],
  filterableFields: ['Name', 'Username', 'Location'],
  alwaysShowPagination: true,
  rowsPerPage: 10,
  rowsPerPageOptions: [5, 10, 15, 20]
};

// TODO(imballinst): this story example is deprecated and should be removed
// in the next major update.
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
  paginationRange = 3,
  // Checkbox stuff.
  hasCheckbox,
  onCheckboxChange,
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
  children,
  // Additional sort props.
  sortProps = {}
}: {
  sortableFields?: string[];
  filterableFields?: string[];
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  alwaysShowPagination?: boolean;
  paginationRange?: number;
  // Checkbox stuff.
  hasCheckbox?: boolean;
  onCheckboxChange?: CheckboxOnChange;
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
  rowProps?: HtmlTrProps | ((row: any) => HtmlTrProps);
  // For on click row event.
  rowOnClickText?: string;
  rowOnClickFn?: (
    name: string,
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void;
  // Set this to `true` if we want to control the table events from outside,
  // but keep the table uncontrolled.
  tableEventsRef?: MutableRefObject<UncontrolledTableEvents | undefined>;
  children?: ReactNode;
  // Additional sort props.
  sortProps?: DatatableWrapperProps<StoryColumnType>['sortProps'];
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
    rowOnClick = (
      row,
      event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
    ) => {
      alert(
        `Clicked row containing name ${
          row.name
        }.\n\nYou inputted the text: ${rowOnClickText}. Clicked on element: ${
          (event.target as any).tagName
        }.`
      );
    };
  } else if (rowOnClickFn) {
    rowOnClick = (row, event) => rowOnClickFn(row.name, event);
  }

  return (
    <DatatableWrapper
      body={json}
      headers={headers}
      sortProps={{
        ...SORT_PROPS,
        ...sortProps
      }}
      tableEventsRef={tableEventsRef}
      paginationOptionsProps={{
        initialState: {
          rowsPerPage,
          options: rowsPerPageOptions
        }
      }}
      checkboxProps={{
        onCheckboxChange
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
            paginationRange={paginationRange}
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
