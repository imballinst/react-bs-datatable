import { parse } from 'date-fns';

import json from './story-data.json';
import { DatatableWrapperProps } from '../../components/DatatableWrapper';
import { filterData, sortData } from '../../helpers/data';
import { convertArrayToRecord } from '../../helpers/object';
import { STORY_HEADERS, STORY_PROP_TO_OPTION_NAME } from './shared';
import { FetchParams, FetchResponse, StoryColumnType } from './types';
import { TableColumnType } from '../../helpers/types';

const SORTABLE_FIELDS = ['Name', 'Username', 'Last Update', 'Score'];
const FILTERABLE_FIELDS = ['Name', 'Username', 'Location'];

export const CONTROLLED_HEADERS: TableColumnType<StoryColumnType>[] =
  STORY_HEADERS.map((header) => ({
    ...header,
    isSortable: SORTABLE_FIELDS.includes(
      STORY_PROP_TO_OPTION_NAME[header.prop]
    ),
    isFilterable: FILTERABLE_FIELDS.includes(
      STORY_PROP_TO_OPTION_NAME[header.prop]
    )
  }));

const SORT_PROPS: DatatableWrapperProps<StoryColumnType>['sortProps'] = {
  sortValueObj: {
    date: (date) => parse(`${date}`, 'MMMM dd, yyyy', new Date()).getTime()
  }
};
const HEADERS_DICTIONARY = convertArrayToRecord(CONTROLLED_HEADERS, 'prop');

// Mock data.
export async function fetchControlledMockData({
  rowsPerPage,
  filter,
  sortState,
  currentPage
}: FetchParams): Promise<FetchResponse<StoryColumnType>> {
  return new Promise((res) => {
    setTimeout(() => {
      let newData = json;
      let newMaxPage = 1;
      let newFilteredDataLength = newData.length;

      // Filter the data.
      if (filter !== '') {
        newData = filterData(newData, HEADERS_DICTIONARY, filter);
        newFilteredDataLength = newData.length;
      }

      // Sort the data using a helper function.
      newData = sortData(newData, sortState, SORT_PROPS?.sortValueObj);

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
