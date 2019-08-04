/// <reference types="react" />
import { LabelType, RowsPerPageType } from './utils/types';
declare type PaginationProps = {
    data: any[];
    rowsPerPage: RowsPerPageType;
    currentPage: number;
    onPageNavigate: any;
    labels: LabelType;
};
export default function Pagination({ data, rowsPerPage, currentPage, onPageNavigate, labels }: PaginationProps): JSX.Element | null;
export {};
