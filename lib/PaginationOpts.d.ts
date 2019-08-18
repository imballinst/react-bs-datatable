/// <reference types="react" />
import { LabelType, RowsPerPageType, RowsPerPageOptionType, TableClasses } from './helpers/types';
declare type PaginationOptsProps = {
    labels: LabelType;
    rowsPerPage?: RowsPerPageType;
    rowsPerPageOption?: RowsPerPageOptionType;
    onRowsPerPageChange: any;
    classes: TableClasses;
};
export default function PaginationOpts({ labels, rowsPerPage, rowsPerPageOption, onRowsPerPageChange, classes }: PaginationOptsProps): JSX.Element | null;
export {};
