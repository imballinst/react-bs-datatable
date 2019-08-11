/// <reference types="react" />
import { HeaderType, SortType } from './utils/types';
declare type TableHeaderProps = {
    tableHeaders: HeaderType[];
    sortedProp: SortType;
    onSortChange: any;
};
export default function TableHeader({ tableHeaders, sortedProp, onSortChange }: TableHeaderProps): JSX.Element;
export {};
