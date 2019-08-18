/// <reference types="react" />
import { LabelType, RowsPerPageType, TableClasses } from './helpers/types';
declare type PaginationProps = {
    rowsPerPage: RowsPerPageType;
    currentPage: number;
    maxPage?: number;
    onPageNavigate: any;
    labels: LabelType;
    classes: TableClasses;
};
export default function Pagination({ rowsPerPage, currentPage, onPageNavigate, labels, maxPage, classes }: PaginationProps): JSX.Element | null;
export {};
