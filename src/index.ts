import { sortData, filterData, paginateData } from './helpers/data';
import Pagination from './Pagination';
import PaginationOpts from './PaginationOpts';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Filter from './Filter';
import Table, { useDatatableLifecycle } from './Table';
import { DatatableWrapper } from './components/DatatableWrapper';
import { shouldTableUpdate } from './helpers/object';

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
  useDatatableLifecycle,
  DatatableWrapper,
  shouldTableUpdate
};
