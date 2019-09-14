/// <reference types="react" />
import { HeaderType, TableClasses, TableComponents } from './helpers/types';
declare type BodyRowProps = {
    tableHeaders: HeaderType[];
    data: any[];
    rowIdx: number;
    classes: TableClasses;
    components: {
        TableRow: TableComponents['TableRow'];
        TableCell: TableComponents['TableCell'];
    };
};
export default function BodyRow({ tableHeaders, data, rowIdx, classes, components }: BodyRowProps): JSX.Element;
export {};
