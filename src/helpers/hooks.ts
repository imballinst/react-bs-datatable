import React, { useEffect, useRef } from 'react';
import { useDatatableWrapper } from '../components/DatatableWrapper';
import {
  CONTROLLED_TABLE_SELECTED_ALL,
  getNextCheckboxState,
  GetNextCheckboxStateParams
} from './checkbox';
import { CheckboxOnChange, CheckboxState } from './types';

export function useControlledStateSetter<ControlledPropsType extends object>(
  controlledProps: ControlledPropsType | undefined
) {
  // Make this only run once.
  const { setIsControlled } = useDatatableWrapper();
  const ref = useRef(controlledProps);
  useEffect(() => {
    if (ref.current !== undefined) {
      setIsControlled(true);
    }
  }, []);
}

export interface UseTableCheckboxStateParameter {
  checkboxState?: Record<string, CheckboxState>;
  onCheckboxChange?: CheckboxOnChange;
  filteredDataLength?: number;
  data?: any[];
}

export function useTableCheckboxState(param?: UseTableCheckboxStateParameter) {
  const {
    checkboxState: checkboxStateContext,
    onCheckboxChange: onCheckboxChangeContext,
    filteredDataLength: filteredDataLengthContext,
    previouslyModifiedCheckbox,
    checkboxRefs,
    data: dataContext,
    body,
    isControlled
  } = useDatatableWrapper();

  const {
    checkboxState: checkboxStateProp,
    onCheckboxChange: onCheckboxChangeProp,
    filteredDataLength: filteredDataLengthProp,
    data: dataProp
  } = param || {};

  const checkboxState = checkboxStateProp || checkboxStateContext;
  const onCheckboxChange = onCheckboxChangeProp || onCheckboxChangeContext;
  const filteredDataLength =
    filteredDataLengthProp || filteredDataLengthContext;
  const data = dataProp || dataContext;

  /**
   * Creates a bulk checkbox click handler. There are 2 ways to use this function:
   *
   * 1. Specify explicitly: `createBulkCheckboxClickHandler("add")` or `createBulkCheckboxClickHandler("remove")`.
   *    This will create a handler that will alwaays either add all to selection or remove all from selection.
   * 2. Don't pass an argument: `createBulkCheckboxClickHandler("add")`. Using this, the action will be "computed"
   *    by this function internals.
   */
  function createBulkCheckboxClickHandler(
    type?: GetNextCheckboxStateParams['type']
  ) {
    let effectiveType = type;

    if (!effectiveType) {
      const previouslyUpdatedCheckbox =
        checkboxState[previouslyModifiedCheckbox.checkboxProp];
      const state = previouslyUpdatedCheckbox?.state;

      if (state === 'all-selected') {
        effectiveType = 'remove';
      } else if (state === 'some-selected') {
        effectiveType = 'add';
      }
    }

    return (event: React.MouseEvent<HTMLElement>) => {
      if (!effectiveType) return;

      const params = [
        {
          checkboxProp: previouslyModifiedCheckbox.checkboxProp,
          idProp: previouslyModifiedCheckbox.idProp,
          checkboxRefs,
          nextCheckboxState: getNextCheckboxState({
            checkboxState,
            data:
              effectiveType === 'add' && isControlled
                ? CONTROLLED_TABLE_SELECTED_ALL
                : body,
            filteredDataLength,
            idProp: previouslyModifiedCheckbox.idProp,
            checkboxProp: previouslyModifiedCheckbox.checkboxProp,
            type: effectiveType
          })
        },
        {
          others: event
        }
      ] as const;

      onCheckboxChange(params[0], params[1]);
    };
  }

  /**
   * Creates a table body column checkbox click handler. This will be mostly used in the library's internals.
   */
  function createColumnCheckboxClickHandler({
    checkboxProp,
    idProp,
    rowIdx
  }: {
    checkboxProp: string;
    idProp: string;
    rowIdx: number;
  }) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const isSelected = checkboxState[checkboxProp].selected.has(
        data[rowIdx][idProp]
      );
      const params = [
        {
          checkboxProp,
          idProp,
          nextCheckboxState: getNextCheckboxState({
            checkboxState,
            data,
            idProp,
            filteredDataLength,
            checkboxProp,
            type: isSelected ? 'remove' : 'add'
          }),
          checkboxRefs
        },
        {
          checkbox: event
        }
      ] as const;

      onCheckboxChange(...params);
    };
  }

  /**
   * Creates a table header column checkbox click handler. This will be mostly used in the library's internals.
   */
  function createHeaderCheckboxClickHandler({
    checkboxProp,
    idProp
  }: {
    checkboxProp: string;
    idProp: string;
  }) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      let numberOfSelectedRowsInCurrentPage = 0;
      let nextCheckboxType: GetNextCheckboxStateParams['type'];

      for (const row of data) {
        if (checkboxState[checkboxProp].selected.has(row[idProp])) {
          numberOfSelectedRowsInCurrentPage += 1;
        }
      }

      if (numberOfSelectedRowsInCurrentPage === data.length) {
        nextCheckboxType = 'remove';
      } else {
        nextCheckboxType = 'add';
      }

      const params = [
        {
          checkboxProp,
          idProp,
          nextCheckboxState: getNextCheckboxState({
            checkboxState,
            data,
            idProp,
            filteredDataLength,
            checkboxProp,
            type: nextCheckboxType
          }),
          checkboxRefs
        },
        {
          checkbox: event
        }
      ] as const;

      onCheckboxChange(...params);
    };
  }

  return {
    createBulkCheckboxClickHandler,
    createColumnCheckboxClickHandler,
    createHeaderCheckboxClickHandler
  };
}
