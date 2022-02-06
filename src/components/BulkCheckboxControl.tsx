import React from 'react';
import {
  getNextCheckboxState,
  GetNextCheckboxStateParams
} from '../helpers/checkbox';
import { CheckboxOnChange, CheckboxState } from '../helpers/types';
import { useDatatableWrapper } from './DatatableWrapper';

export interface BulkCheckboxControlProps {
  controlledProps?: {
    checkboxState: Record<string, CheckboxState>;
    onCheckboxChange: CheckboxOnChange;
  };
}

export function BulkCheckboxControl({
  controlledProps
}: BulkCheckboxControlProps) {
  const {
    checkboxState: checkboxStateContext,
    onCheckboxChange: onCheckboxChangeContext,
    filteredDataLength,
    previouslyModifiedCheckbox,
    checkboxRefs,
    body
  } = useDatatableWrapper();

  const checkboxState = controlledProps?.checkboxState || checkboxStateContext;
  const onCheckboxChange =
    controlledProps?.onCheckboxChange || onCheckboxChangeContext;

  const state = checkboxState[previouslyModifiedCheckbox.prop]?.state;
  let rendered;

  function onClick(type: GetNextCheckboxStateParams['type']) {
    onCheckboxChange({
      prop: previouslyModifiedCheckbox.prop,
      idProp: previouslyModifiedCheckbox.idProp,
      checkboxRefs,
      nextCheckboxState: getNextCheckboxState({
        checkboxState,
        data: body,
        filteredDataLength,
        idProp: previouslyModifiedCheckbox.idProp,
        prop: previouslyModifiedCheckbox.prop,
        type
      })
    });
  }

  if (state === 'all-selected') {
    rendered = (
      <>
        All {filteredDataLength} rows selected.{' '}
        <a role="button" onClick={() => onClick('remove-all')}>
          Deselect all
        </a>
        .
      </>
    );
  } else if (state === 'some-selected') {
    rendered = (
      <>
        {filteredDataLength} rows selected.{' '}
        <a role="button" onClick={() => onClick('add-all')}>
          Select all rows
        </a>
        .
      </>
    );
  }

  return (
    <div className={rendered === undefined ? 'invisible' : undefined}>
      {rendered}
    </div>
  );
}
