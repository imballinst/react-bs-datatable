import { TableColumnType } from '../../helpers/types';

export interface StoryBodyType {
  name: string;
  username: string;
  date: string;
  score: number;
  location: string;
}

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
