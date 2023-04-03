import React, { useEffect, useRef } from 'react';
import { useDatatableWrapper } from '../components/DatatableWrapper';
import { getNextCheckboxState, GetNextCheckboxStateParams } from './checkbox';
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

/**
 * The optional object passed to the `useCreateCheckboxHandlers` function.
 * Pass the object if you are using controlled table.
 */
export interface useCreateCheckboxHandlersParameter {
  checkboxState: Record<string, CheckboxState>;
  onCheckboxChange: CheckboxOnChange;
  filteredDataLength: number;
  data: any[];
}

/**
 * A hook containing functions to create table checkbox event handlers.
 * As library users, most likely you'll most likely be using `createBulkCheckboxClickHandler`. Example usage:
 *
 * ```
 * const { createBulkCheckboxClickHandler } = useCreateCheckboxHandlers();
 * const onClick = createBulkCheckboxClickHandler('add', {
 *   checkboxProp: 'checkbox',
 *   idProp: 'name'
 * })
 *
 * <button onClick={onClick}>Add all to selection</button>
 * ```
 */
export function useCreateCheckboxHandlers(
  param?: useCreateCheckboxHandlersParameter
) {
  const {
    checkboxState: checkboxStateContext,
    onCheckboxChange: onCheckboxChangeContext,
    filteredDataLength: filteredDataLengthContext,
    previouslyModifiedCheckbox,
    data: dataContext,
    body
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

  // Whenever we change checkbox, we should update the table header's column representation as well.
  function onCheckboxChangeEffectForHeaderColumn({
    idProp,
    checkboxProp
  }: {
    idProp: string;
    checkboxProp: string;
  }) {
    previouslyModifiedCheckbox.current = { checkboxProp, idProp };
  }

  // TODO: refactor to be an object parameter in the next major version.

  /**
   * Creates a bulk checkbox click handler. There are 2 ways to use this function:
   *
   * 1. Specify explicitly: `createBulkCheckboxClickHandler("add")` or `createBulkCheckboxClickHandler("remove")`.
   *    This will create a handler that will alwaays either add all to selection or remove all from selection.
   * 2. Don't pass an argument: `createBulkCheckboxClickHandler()`. Using this, the action will be "computed"
   *    by this function internals.
   */
  function createBulkCheckboxClickHandler(
    type?: GetNextCheckboxStateParams['type'],
    checkboxInfo?: {
      idProp: string;
      checkboxProp: string;
    },
    checkboxStateOverrider?: (prev: CheckboxState) => CheckboxState
  ) {
    const checkboxProp =
      checkboxInfo?.checkboxProp ||
      previouslyModifiedCheckbox.current.checkboxProp;
    const idProp =
      checkboxInfo?.idProp || previouslyModifiedCheckbox.current.idProp;
    let effectiveType = type;

    if (!effectiveType) {
      const previouslyUpdatedCheckbox = checkboxState[checkboxProp];
      const state = previouslyUpdatedCheckbox?.state;

      if (state === 'all-selected') {
        effectiveType = 'remove';
      } else if (state === 'some-selected') {
        effectiveType = 'add';
      }
    }

    return (event: React.MouseEvent<HTMLElement>) => {
      if (!effectiveType) return;

      let nextCheckboxState = getNextCheckboxState({
        checkboxState,
        data: body,
        filteredDataLength,
        idProp,
        checkboxProp,
        type: effectiveType
      });
      if (checkboxStateOverrider) {
        nextCheckboxState = checkboxStateOverrider(nextCheckboxState);
      }

      const params = [
        {
          checkboxProp,
          nextCheckboxState
        },
        {
          others: event
        }
      ] as const;

      onCheckboxChange(...params);
      onCheckboxChangeEffectForHeaderColumn({
        checkboxProp,
        idProp
      });
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
      const nextCheckboxState = getNextCheckboxState({
        checkboxState,
        data: data[rowIdx],
        idProp,
        filteredDataLength,
        checkboxProp,
        type: isSelected ? 'remove' : 'add'
      });

      const params = [
        {
          checkboxProp,
          nextCheckboxState
        },
        {
          checkbox: event
        }
      ] as const;

      onCheckboxChange(...params);
      onCheckboxChangeEffectForHeaderColumn({
        checkboxProp,
        idProp
      });
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

      const nextCheckboxState = getNextCheckboxState({
        checkboxState,
        data,
        idProp,
        filteredDataLength,
        checkboxProp,
        type: nextCheckboxType
      });

      const params = [
        {
          checkboxProp,
          nextCheckboxState
        },
        {
          checkbox: event
        }
      ] as const;

      onCheckboxChange(...params);
      onCheckboxChangeEffectForHeaderColumn({
        checkboxProp,
        idProp
      });
    };
  }

  return {
    createBulkCheckboxClickHandler,
    createColumnCheckboxClickHandler,
    createHeaderCheckboxClickHandler
  };
}
