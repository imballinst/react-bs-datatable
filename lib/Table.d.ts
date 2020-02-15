import React from 'react';
import { DatatableProps, TableComponents } from './helpers/types';
/**
 * Datatable lifecycle convenient function.
 * It will be used when we are extending the table.
 **/
export declare function useDatatableLifecycle({ initialSort, onSort, onFilter, rowsPerPage, rowsPerPageOption, async, tableHeaders, classes, tableBody, labels, Components, onRowClick }: DatatableProps): {
    data: any[];
    tableHeaders: import("./helpers/types").HeaderType[];
    onChangeFilter: (text: string) => void;
    onPageNavigate: (nextPage: number) => void;
    classes: import("./helpers/types").TableClasses;
    onRowsPerPageChange: (numOfPage: number | undefined) => void;
    onSortChange: (nextProp: string) => void;
    tableClass: string;
    labels: import("./helpers/types").LabelType;
    rowsPerPageOption: number[] | undefined;
    Components: TableComponents;
    onRowClick: import("./helpers/types").OnRowClick | undefined;
    filterable: boolean;
    filterText: string;
    rowsPerPage: number | undefined;
    currentPage: number;
    sortedProp: import("./helpers/types").SortType;
    maxPage: number | undefined;
};
/** Datatable Component. */
declare function Datatable(props: DatatableProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Datatable>;
export default _default;
