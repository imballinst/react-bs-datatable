/// <reference types="react" />
import { HeaderType, LabelType, TableClasses, TableComponents, OnRowClick } from './helpers/types';
declare type TableBodyProps = {
    tableHeaders: HeaderType[];
    labels: LabelType;
    data: any[];
    classes: TableClasses;
    components: {
        TableBody: TableComponents['TableBody'];
        TableRow: TableComponents['TableRow'];
        TableCell: TableComponents['TableCell'];
    };
    onRowClick?: OnRowClick;
};
export default function TableBody({ tableHeaders, labels, data, classes, components: { TableBody, TableRow, TableCell }, onRowClick }: TableBodyProps): JSX.Element;
export {};
