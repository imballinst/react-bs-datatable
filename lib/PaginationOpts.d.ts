/// <reference types="react" />
import { LabelType, RowsPerPageType, RowsPerPageOptionType } from './utils/types';
declare type PaginationOptsProps = {
    labels: LabelType;
    rowsPerPage?: RowsPerPageType;
    rowsPerPageOption?: RowsPerPageOptionType;
    onRowsPerPageChange: any;
};
export default function PaginationOpts({ labels, rowsPerPage, rowsPerPageOption, onRowsPerPageChange }: PaginationOptsProps): JSX.Element | null;
export {};
