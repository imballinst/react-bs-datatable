/// <reference types="react" />
import { TableClasses } from './helpers/types';
declare type FilterProps = {
    filterable: boolean;
    filterText: string;
    onChangeFilter: any;
    placeholder?: string;
    classes: TableClasses;
};
export default function Filter({ filterable, filterText, placeholder, onChangeFilter, classes }: FilterProps): JSX.Element | null;
export {};
