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
    filteredDataLength: number;
  };
  classes?: {
    selectRemoveAll?: string;
  };
}

export function BulkCheckboxControl({
  controlledProps,
  classes
}: BulkCheckboxControlProps) {
  const {
    checkboxState: checkboxStateContext,
    onCheckboxChange: onCheckboxChangeContext,
    filteredDataLength: filteredDataLengthContext,
    previouslyModifiedCheckbox,
    checkboxRefs,
    body
  } = useDatatableWrapper();

  const checkboxState = controlledProps?.checkboxState || checkboxStateContext;
  const onCheckboxChange =
    controlledProps?.onCheckboxChange || onCheckboxChangeContext;
  const filteredDataLength =
    controlledProps?.filteredDataLength || filteredDataLengthContext;

  const previouslyUpdatedCheckbox =
    checkboxState[previouslyModifiedCheckbox.prop];
  const state = previouslyUpdatedCheckbox?.state;
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

  const linkClasses =
    classes?.selectRemoveAll || 'link-primary text-decoration-none';

  if (state === 'all-selected') {
    rendered = (
      <>
        All {filteredDataLength} rows selected.{' '}
        <a
          role="button"
          onClick={() => onClick('remove')}
          className={linkClasses}
        >
          Deselect all rows
        </a>
      </>
    );
  } else if (state === 'some-selected') {
    rendered = (
      <>
        {previouslyUpdatedCheckbox?.selected.size} rows selected.{' '}
        <a
          role="button"
          onClick={() => onClick('add-all')}
          className={linkClasses}
        >
          Select all rows
        </a>
      </>
    );
  } else {
    // Zero-width space.
    rendered = <span>&#8203;</span>;
  }

  return (
    <div className={rendered === undefined ? 'invisible' : undefined}>
      {rendered}
    </div>
  );
}
