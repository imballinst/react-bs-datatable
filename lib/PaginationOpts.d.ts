/// <reference types="react" />
import { LabelType, RowsPerPageType, RowsPerPageOptionType, TableClasses } from './helpers/types';
declare type PaginationOptsGroupProps = {
    labels: LabelType;
    value: RowsPerPageType;
    options: RowsPerPageOptionType;
    onChange: any;
    classes: TableClasses;
};
export declare function PaginationOptsGroup({ classes, labels, value, onChange, options }: PaginationOptsGroupProps): JSX.Element;
export declare type PaginationOptsGroupFunctionComponent = (props: PaginationOptsGroupProps) => JSX.Element;
declare type PaginationOptsProps = {
    labels: LabelType;
    rowsPerPage?: RowsPerPageType;
    rowsPerPageOption?: RowsPerPageOptionType;
    onRowsPerPageChange: any;
    classes: TableClasses;
    CustomPaginationOptsGroup?: PaginationOptsGroupFunctionComponent;
};
export default function PaginationOpts({ labels, rowsPerPage, rowsPerPageOption, onRowsPerPageChange, classes, CustomPaginationOptsGroup }: PaginationOptsProps): JSX.Element | null;
export {};
