import { TableColumnType } from '../../helpers/types';
import { StoryColumnType } from './types';

export const STORY_PROP_TO_OPTION_NAME: Record<keyof StoryColumnType, string> =
  {
    name: 'Name',
    username: 'Username',
    location: 'Location',
    date: 'Last Update',
    status: '',
    score: 'Score',
    checkbox: ''
  };

export const STORY_HEADERS: TableColumnType<StoryColumnType>[] = [
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
