/// <reference types="react" />
import { HeaderType, LabelType, TableClasses } from './helpers/types';
declare type TableBodyProps = {
    tableHeaders: HeaderType[];
    labels: LabelType;
    data: any[];
    classes: TableClasses;
};
export default function TableBody({ tableHeaders, labels, data, classes }: TableBodyProps): JSX.Element;
export {};
