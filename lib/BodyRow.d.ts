/// <reference types="react" />
import { HeaderType, TableClasses, TableComponents, OnRowClick } from './helpers/types';
declare type BodyRowProps = {
    tableHeaders: HeaderType[];
    data: any[];
    rowIdx: number;
    classes: TableClasses;
    components: {
        TableRow: TableComponents['TableRow'];
        TableCell: TableComponents['TableCell'];
    };
    onClick?: OnRowClick;
};
export default function BodyRow({ tableHeaders, data, rowIdx, classes, components, onClick }: BodyRowProps): JSX.Element;
export {};
