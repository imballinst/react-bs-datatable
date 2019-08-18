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
export declare type RowsPerPageType = number | undefined;
export declare type RowsPerPageOptionType = number[];
