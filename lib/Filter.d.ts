/// <reference types="react" />
import { HeaderType } from './utils/types';
declare type FilterProps = {
    tableHeaders: HeaderType[];
    filterText: string;
    onChangeFilter: any;
    placeholder?: string;
};
export default function Filter({ tableHeaders, filterText, placeholder, onChangeFilter }: FilterProps): JSX.Element | null;
export {};
