/// <reference types="react" />
import { HeaderType, SortType, TableClasses } from './helpers/types';
declare type TableHeaderProps = {
    tableHeaders: HeaderType[];
    sortedProp: SortType;
    onSortChange: any;
    classes: TableClasses;
};
export default function TableHeader({ tableHeaders, sortedProp, onSortChange, classes }: TableHeaderProps): JSX.Element;
export {};
