import React from 'react';
import { TableClasses } from './helpers/types';
declare type FilterGroupProps = {
    filterText: string;
    onChangeFilter: (event: any) => void;
    onClearFilter?: () => void;
    placeholder?: string;
    classes: TableClasses;
};
export declare type FilterGroupFunctionComponent = (props: FilterGroupProps) => JSX.Element;
interface FilterProps extends FilterGroupProps {
    filterable: boolean;
    CustomFilterGroup?: FilterGroupFunctionComponent;
}
export declare function FilterGroup({ classes, filterText, placeholder, onChangeFilter, onClearFilter }: FilterGroupProps): JSX.Element;
declare function Filter({ filterable, filterText, placeholder, onChangeFilter, classes, CustomFilterGroup }: FilterProps): JSX.Element | null;
declare const _default: React.MemoExoticComponent<typeof Filter>;
export default _default;
