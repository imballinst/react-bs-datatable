import { TableColumnType } from '../../helpers/types';
import { StoryBodyType } from './types';

export const STORY_PROP_TO_OPTION_NAME: Record<keyof StoryBodyType, string> = {
  name: 'Name',
  username: 'Username',
  location: 'Location',
  date: 'Last Update',
  score: 'Score'
};

export const STORY_HEADERS: TableColumnType<StoryBodyType>[] = [
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
