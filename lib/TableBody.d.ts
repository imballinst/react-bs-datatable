/// <reference types="react" />
import { HeaderType, LabelType } from './utils/types';
declare type TableBodyProps = {
    tableHeaders: HeaderType[];
    labels: LabelType;
    data: any[];
};
export default function TableBody({ tableHeaders, labels, data }: TableBodyProps): JSX.Element;
export {};
