import React from 'react';
import { HeaderType, SortType, RowsPerPageType } from './types';
export declare function getLastChildren(reactElement: React.ReactElement): React.ReactElement;
export declare function isPropFilterable(tableHeaders: HeaderType[], prop: string): boolean;
export declare function sortData(data: any[], sortedProp: SortType, onSort?: any): any[];
export declare function filterData(data: any[], tableHeaders: HeaderType[], filterText: string, onFilter?: any): any[];
export declare function paginateData(data: any[], currentPage: number, rowsPerPage?: RowsPerPageType): any[];
