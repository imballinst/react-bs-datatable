import { SortType } from '../../helpers/types';

export interface StoryBodyType {
  name: string;
  username: string;
  date: string;
  score: number;
  location: string;
}

export interface FetchParams {
  filter: string;
  sortState: SortType;
  currentPage: number;
  rowsPerPage: number;
}

export interface FetchResponse<T> {
  data: T[];
  maxPage: number;
  filteredDataLength: number;
}
