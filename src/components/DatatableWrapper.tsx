import React, { createContext, useContext } from 'react';
import { TableComponents } from '../helpers/types';

interface DatatableWrapperProps {
  children: React.ReactNode;
  Components: TableComponents;
}

interface DatatableWrapperContextType {
  Components: TableComponents;
}

const DatatableWrapperContext =
  createContext<DatatableWrapperContextType | undefined>(undefined);

// Exported functions.
export function useDatatableWrapper() {
  return useContext(DatatableWrapperContext);
}

export function DatatableWrapper({
  children,
  Components
}: DatatableWrapperProps) {
  return (
    <DatatableWrapperContext.Provider value={{ Components }}>
      {children}
    </DatatableWrapperContext.Provider>
  );
}
