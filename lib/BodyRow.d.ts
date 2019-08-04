/// <reference types="react" />
import { HeaderType } from './utils/types';
declare type BodyRowProps = {
    tableHeaders: HeaderType[];
    data: any[];
    rowIdx: number;
};
export default function BodyRow({ tableHeaders, data, rowIdx }: BodyRowProps): JSX.Element;
export {};
