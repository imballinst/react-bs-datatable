import React from 'react';
import { TableComponents } from '../helpers/types';
declare type TableContextProviderProps = {
    children: React.ReactNode;
    Components: TableComponents;
};
export declare function useComponentProvider(): {};
export declare function TableComponentsProvider({ children, Components }: TableContextProviderProps): JSX.Element;
export {};
