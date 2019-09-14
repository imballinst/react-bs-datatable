/// <reference types="react" />
import { HeaderType, SortType, TableClasses, TableComponents } from './helpers/types';
declare type TableHeaderProps = {
    tableHeaders: HeaderType[];
    sortedProp: SortType;
    onSortChange: any;
    classes: TableClasses;
    components: {
        TableHead: TableComponents['TableHead'];
        TableRow: TableComponents['TableRow'];
        TableCell: TableComponents['TableCell'];
    };
};
export default function TableHeader({ tableHeaders, sortedProp, onSortChange, classes, components: { TableHead, TableRow, TableCell } }: TableHeaderProps): JSX.Element;
export {};
