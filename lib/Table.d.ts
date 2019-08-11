/// <reference types="react" />
import { SortType, LabelType, HeaderType, RowsPerPageType, RowsPerPageOptionType } from './utils/types';
declare type DatatableProps = {
    /** Initial sort of the table. */
    tableHeaders: HeaderType[];
    tableBody: any[];
    initialSort?: SortType;
    onSort?: any;
    onFilter?: any;
    rowsPerPage?: RowsPerPageType;
    rowsPerPageOption?: RowsPerPageOptionType;
    tableBsClass?: string;
    labels?: LabelType;
};
/** Datatable Component. */
export default function Datatable({ initialSort, onSort, onFilter, rowsPerPage, rowsPerPageOption, tableHeaders, tableBody, tableBsClass, labels }: DatatableProps): JSX.Element;
export {};
