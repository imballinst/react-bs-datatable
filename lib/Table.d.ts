/// <reference types="react" />
import { SortType, LabelType, HeaderType, RowsPerPageType, RowsPerPageOptionType, TableClasses } from './helpers/types';
declare type AsyncProps = {
    filterText: string;
    sortedProp: SortType;
    rowsPerPage: number;
    currentPage: number;
    maxPage: number;
    onSort: (nextProp: string) => {};
    onPaginate: (nextPage: number) => {};
    onFilter: (text: string) => {};
    onRowsPerPageChange: (numOfPage: RowsPerPageType) => {};
};
declare type DatatableProps = {
    /** Initial sort of the table. */
    tableHeaders: HeaderType[];
    /** Table data. */
    tableBody: any[];
    /** Initial sort of the table. */
    initialSort?: SortType;
    /** Custom onSort data modifier. */
    onSort?: any;
    /** Custom onFilter data modifier. */
    onFilter?: any;
    /** Custom classes of the table components. */
    classes?: TableClasses;
    /** Handler for asynchronous filter, sort, and pagination. */
    async?: AsyncProps;
    /** Initial rows per page. */
    rowsPerPage?: RowsPerPageType;
    /** Rows per page option. */
    rowsPerPageOption?: RowsPerPageOptionType;
    /** Labels/placeholders of the table components. */
    labels?: LabelType;
};
/**
 * Datatable lifecycle convenient function.
 * It will be used when we are extending the table.
 **/
export declare function useDatatableLifecycle({ initialSort, onSort, onFilter, rowsPerPage, rowsPerPageOption, async, tableHeaders, classes, tableBody, labels }: DatatableProps): {
    data: any[];
    tableHeaders: HeaderType[];
    onChangeFilter: (text: string) => void;
    onPageNavigate: (nextPage: number) => void;
    classes: TableClasses;
    onRowsPerPageChange: (numOfPage: number | undefined) => void;
    onSortChange: (nextProp: string) => void;
    async: AsyncProps | undefined;
    tableClass: string;
    labels: LabelType;
    rowsPerPageOption: number[] | undefined;
    filterable: boolean;
    filterText: string;
    rowsPerPage: number | undefined;
    currentPage: number;
    sortedProp: SortType;
    maxPage: number | undefined;
};
/** Datatable Component. */
export default function Datatable(props: DatatableProps): JSX.Element;
export {};
