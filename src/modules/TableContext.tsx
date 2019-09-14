import React, { createContext, useContext } from 'react';
import { TableComponents } from '../helpers/types';

type TableContextProviderProps = {
  children: React.ReactNode;
  Components: TableComponents;
};

const TableContext = createContext({});

export function useComponentProvider() {
  return useContext(TableContext);
}
export function TableComponentsProvider({
  children,
  Components
}: TableContextProviderProps) {
  return (
    <TableContext.Provider value={Components}>{children}</TableContext.Provider>
  );
}
