/// <reference types="react" />
import { HeaderType, TableClasses } from './helpers/types';
declare type BodyRowProps = {
    tableHeaders: HeaderType[];
    data: any[];
    rowIdx: number;
    classes: TableClasses;
};
export default function BodyRow({ tableHeaders, data, rowIdx, classes }: BodyRowProps): JSX.Element;
export {};
