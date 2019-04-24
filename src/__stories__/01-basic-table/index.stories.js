import { storiesOf } from '@storybook/react';

import Basic from './00-Basic';
import Filter from './01-Filter';
import Sort from './02-Sort';
import Pagination from './03-Pagination';
import Combination from './04-Combination';
import CustomLabels from './05-CustomLabels';
import CustomCell from './06-CustomCell';

storiesOf('Getting Started', module)
  .add(Basic.name, Basic.story)
  .add(Filter.name, Filter.story)
  .add(Sort.name, Sort.story)
  .add(Pagination.name, Pagination.story)
  .add(Combination.name, Combination.story)
  .add(CustomLabels.name, CustomLabels.story)
  .add(CustomCell.name, CustomCell.story);
