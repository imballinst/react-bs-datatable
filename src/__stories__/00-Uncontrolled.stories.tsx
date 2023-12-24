import { StoryFn } from '@storybook/react';

import { StoryColumnType } from './resources/types';
import { FilterSortPaginationStoryComponent } from './00-Uncontrolled/00-FilterSortPagination';
import { CustomLabelsStoryComponent } from './00-Uncontrolled/01-CustomLabels';
import { CustomCellStyleStoryComponent } from './00-Uncontrolled/02-CustomCellStyle';
import { CustomRowStyleStoryComponent } from './00-Uncontrolled/03-CustomRowStyle';
import { CustomTableHeaderPropsStoryComponent } from './00-Uncontrolled/04-CustomTableHeaderProps';
import { RowOnClickStoryComponent } from './00-Uncontrolled/05-RowOnClick';
import { MutatingTableStateStoryComponent } from './00-Uncontrolled/06-MutatingTableState';
import { ComposedTableStoryComponent } from './00-Uncontrolled/07-ComposedTable';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Uncontrolled'
};

// Filter, sort, pagination, checkbox.
const FilterSortPaginationTemplate: StoryFn<
  typeof FilterSortPaginationStoryComponent
> = FilterSortPaginationStoryComponent;

export const FilterSortPagination = FilterSortPaginationTemplate.bind({});
FilterSortPagination.storyName = 'Filter, sort, pagination, checkbox';
FilterSortPagination.parameters = {
  docs: {
    source: 'helloworld'
  }
};

// Custom labels.
const CustomLabelsStoryComponentTemplate: StoryFn<
  typeof CustomLabelsStoryComponent
> = CustomLabelsStoryComponent;

export const CustomLabels = CustomLabelsStoryComponentTemplate.bind({});
CustomLabels.storyName = 'Custom labels';
CustomLabels.argTypes = {
  filterPlaceholder: {
    name: 'Filter placeholder',
    type: 'string'
  },
  afterSelect: {
    name: 'Text after pagination options',
    type: 'string'
  },
  beforeSelect: {
    name: 'Text before pagination options',
    type: 'string'
  },
  firstPage: {
    name: 'First page label',
    type: 'string'
  },
  lastPage: {
    name: 'Last page label',
    type: 'string'
  },
  nextPage: {
    name: 'Next page label',
    type: 'string'
  },
  prevPage: {
    name: 'Previous page label',
    type: 'string'
  }
};
CustomLabels.args = {
  filterPlaceholder: 'Filter text...',
  beforeSelect: 'Number of rows shown',
  firstPage: '<<',
  lastPage: '>>',
  nextPage: '>',
  prevPage: '<'
};

// Custom cell style.
const CustomCellStyleStoryComponentTemplate: StoryFn<
  typeof CustomCellStyleStoryComponent
> = CustomCellStyleStoryComponent;

export const CustomCellStyle = CustomCellStyleStoryComponentTemplate.bind({});
CustomCellStyle.storyName = 'Custom cell style';
CustomCellStyle.argTypes = {
  scoreCellColumnColor: {
    name: 'Score cell column color if score is lower than 50',
    type: 'string',
    controls: {
      type: 'color'
    }
  }
};
CustomCellStyle.args = {
  scoreCellColumnColor: '#cf8a8a'
};

// Custom table row style.
const CustomRowStyleStoryComponentTemplate: StoryFn<
  typeof CustomRowStyleStoryComponent
> = CustomRowStyleStoryComponent;

export const CustomRowStyleProps = CustomRowStyleStoryComponentTemplate.bind(
  {}
);
CustomRowStyleProps.storyName = 'Custom row props depending depending on score';
CustomRowStyleProps.args = {
  rowProps: (row: StoryColumnType) => ({
    style: { background: `rgba(128, 0, 0, ${row.score / 200})` }
  })
};

// Custom table header props.
const CustomTableHeaderPropsStoryComponentTemplate: StoryFn<
  typeof CustomTableHeaderPropsStoryComponent
> = CustomTableHeaderPropsStoryComponent;

export const CustomTableHeaderProps =
  CustomTableHeaderPropsStoryComponentTemplate.bind({});
CustomTableHeaderProps.storyName = 'Custom "score" table header classname';
CustomTableHeaderProps.argTypes = {
  thClassName: {
    name: '"Score" table header classname',
    type: 'string'
  }
};
CustomTableHeaderProps.args = {
  thClassName: '#hello-world'
};

// Custom row on click.
const RowOnClickTemplate: StoryFn<typeof RowOnClickStoryComponent> =
  RowOnClickStoryComponent;

export const RowOnClick = RowOnClickTemplate.bind({});
RowOnClick.storyName = 'Adding row on click event';
RowOnClick.argTypes = {
  rowOnClickText: {
    name: 'Text shown when row is clicked',
    type: 'string'
  }
};
RowOnClick.args = {
  rowOnClickText: 'Hello, world'
};

// Control table from outside.
const MutatingTableStateStoryComponentTemplate: StoryFn<
  typeof MutatingTableStateStoryComponent
> = MutatingTableStateStoryComponent;

export const MutatingTableState = MutatingTableStateStoryComponentTemplate.bind(
  {}
);
MutatingTableState.storyName = "Mutating uncontrolled table's state";

// Composed table.
const ComposedTableStoryComponentTemplate: StoryFn<
  typeof ComposedTableStoryComponent
> = ComposedTableStoryComponent;

export const ComposedTable = ComposedTableStoryComponentTemplate.bind({});
ComposedTable.storyName = 'Composed table';
