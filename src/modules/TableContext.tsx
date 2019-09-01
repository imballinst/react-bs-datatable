import React, { createContext, useContext } from 'react';

type TableComponents = {
  // Global.
  Row?: React.ComponentType;
  Col?: React.ComponentType;
  Button?: React.ComponentType;
  // Table.
  Table?: React.ComponentType;
  TableHead?: React.ComponentType;
  TableBody?: React.ComponentType;
  TableRow?: React.ComponentType;
  TableCell?: React.ComponentType;
  // Filter.
  InputGroup?: React.ComponentType;
  InputGroupAdornmentAppend?: React.ComponentType;
  // Pagination.
  ButtonGroup?: React.ComponentType;
  // Pagination options.
  Form?: React.ComponentType;
  FormGroup?: React.ComponentType;
  FormControl?: React.ComponentType;
  // ICons.
  ClearIcon?: React.ComponentType;
  SortIcon?: React.ComponentType;
};

const TableContext = createContext({});

export function useTableContext(): TableComponents {
  return useContext(TableContext);
}

type ContextProviderProps = {
  children: React.ReactNode;
  components: TableComponents;
};

export default function TableContextProvider({
  children,
  components
}: ContextProviderProps) {
  return (
    <TableContext.Provider value={components}>{children}</TableContext.Provider>
  );
}
