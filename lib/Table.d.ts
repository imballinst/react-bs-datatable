/// <reference types="react" />
import { SortType, LabelType, HeaderType, RowsPerPageType, RowsPerPageOptionType } from './utils/types';
declare type AsyncProps = {
    onSort: any;
    onFilter: any;
    onPaginate: any;
};
declare type DatatableProps = {
    /** Initial sort of the table. */
    tableHeaders: HeaderType[];
    tableBody: any[];
    initialSort?: SortType;
    onSort?: any;
    onFilter?: any;
    async?: AsyncProps;
    rowsPerPage?: RowsPerPageType;
    rowsPerPageOption?: RowsPerPageOptionType;
    tableBsClass?: string;
    labels?: LabelType;
};
declare type DatatableState = {
    sortedProp: SortType;
    rowsPerPage: RowsPerPageType;
    currentPage: number;
    filterText: string;
};
/**
 * Datatable lifecycle convenient function.
 * It will be used when we are extending the table.
 **/
export declare function useDatatableLifecycle({ initialSort, onSort, onFilter, rowsPerPage, rowsPerPageOption, async, tableHeaders, tableBody, tableBsClass, labels }: DatatableProps): {
    data: any[];
    state: DatatableState;
    rowsPerPageOption: number[];
    tableHeaders: HeaderType[];
    onChangeFilter: (text: string) => void;
    onPageNavigate: (nextPage: number) => () => void;
    onRowsPerPageChange: (numOfPage: number | undefined) => () => void;
    onSortChange: (nextProp: string) => () => void;
    tableBody: any[];
    tableClass: string;
    labels: LabelType;
};
/** Datatable Component. */
export default function Datatable(props: DatatableProps): JSX.Element;
export {};
