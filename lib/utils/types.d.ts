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
export declare type RowsPerPageType = number | undefined;
export declare type RowsPerPageOptionType = number[];
