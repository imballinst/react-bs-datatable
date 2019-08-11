import { sortData, filterData, paginateData } from './utils/data';
import Pagination from './Pagination';
import PaginationOpts from './PaginationOpts';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Filter from './Filter';
import Table, { useDatatableLifecycle } from './Table';

export default Table;
export {
  sortData,
  filterData,
  paginateData,
  Pagination,
  PaginationOpts,
  TableHeader,
  TableBody,
  Filter,
  useDatatableLifecycle
};
