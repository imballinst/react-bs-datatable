/// <reference types="react" />
import { LabelType, TableClasses } from './helpers/types';
declare type PaginationOptsGroupProps = {
    labels: LabelType;
    value?: number;
    options: number[];
    onChange: any;
    classes: TableClasses;
};
export declare function PaginationOptsGroup({ classes, labels, value, onChange, options }: PaginationOptsGroupProps): JSX.Element;
export declare type PaginationOptsGroupFunctionComponent = (props: PaginationOptsGroupProps) => JSX.Element;
declare type PaginationOptsProps = {
    labels: LabelType;
    rowsPerPage?: number;
    rowsPerPageOption?: number[];
    onRowsPerPageChange: any;
    classes: TableClasses;
    CustomPaginationOptsGroup?: PaginationOptsGroupFunctionComponent;
};
export default function PaginationOpts({ labels, rowsPerPage, rowsPerPageOption, onRowsPerPageChange, classes, CustomPaginationOptsGroup }: PaginationOptsProps): JSX.Element | null;
export {};
