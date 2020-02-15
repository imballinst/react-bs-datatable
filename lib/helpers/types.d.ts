/// <reference types="react" />
import { FilterGroupFunctionComponent } from '../Filter';
import { PaginationOptsGroupFunctionComponent } from '../PaginationOpts';
export declare type SortType = {
    prop?: string;
    isAscending?: boolean;
};
export declare type HeaderType = {
    prop: string;
    title?: string;
    cell?: any;
    filterable?: boolean;
    sortable?: boolean;
};
export declare type OnRowClick = (value: any) => void;
export declare type LabelType = {
    first?: string;
    last?: string;
    prev?: string;
    next?: string;
    show?: string;
    entries?: string;
    noResults?: string;
    filterPlaceholder?: string;
};
export declare type TableClasses = {
    controlRow?: string;
    filterCol?: string;
    filterInputGroup?: string;
    filterFormControl?: string;
    filterClearButton?: string;
    paginationOptsCol?: string;
    paginationOptsForm?: string;
    paginationOptsFormGroup?: string;
    paginationOptsFormText?: string;
    paginationOptsFormControl?: string;
    paginationCol?: string;
    paginationButtonGroup?: string;
    paginationButton?: string;
    table?: string;
    thead?: string;
    theadRow?: string;
    theadCol?: string;
    tbody?: string;
    tbodyRow?: string;
    tbodyCol?: string;
};
declare type TableComponentType = React.ElementType<any> | string;
export declare type TableComponents = {
    Row: TableComponentType;
    Col: TableComponentType;
    Button: TableComponentType;
    Table: TableComponentType;
    TableHead: TableComponentType;
    TableBody: TableComponentType;
    TableRow: TableComponentType;
    TableCell: TableComponentType;
    FilterGroup?: FilterGroupFunctionComponent;
    ButtonGroup: TableComponentType;
    PaginationOptsGroup?: PaginationOptsGroupFunctionComponent;
    SortIcon: TableComponentType;
};
export declare type RowsPerPageType = number | undefined;
export declare type RowsPerPageOptionType = number[];
export declare type AsyncProps = {
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
export declare type DatatableProps = {
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
    /** Custom table components. */
    Components?: TableComponents;
    /** On row click event. */
    onRowClick?: OnRowClick;
};
export declare type DatatableState = {
    filterable: boolean;
    sortedProp: SortType;
    rowsPerPage: RowsPerPageType;
    currentPage: number;
    filterText: string;
};
export {};
