/// <reference types="react" />
import { LabelType, RowsPerPageType, TableClasses, TableComponents } from './helpers/types';
declare type PaginationProps = {
    rowsPerPage: RowsPerPageType;
    currentPage: number;
    maxPage?: number;
    onPageNavigate: any;
    labels: LabelType;
    classes: TableClasses;
    components: {
        Button: TableComponents['Button'];
        ButtonGroup: TableComponents['ButtonGroup'];
    };
};
export default function Pagination({ rowsPerPage, currentPage, onPageNavigate, labels, maxPage, classes, components: { Button, ButtonGroup } }: PaginationProps): JSX.Element | null;
export {};
