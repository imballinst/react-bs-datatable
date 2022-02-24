import React from 'react';
import {
  getNextCheckboxState,
  GetNextCheckboxStateParams
} from '../helpers/checkbox';
import { CheckboxOnChange, CheckboxState } from '../helpers/types';
import { useDatatableWrapper } from './DatatableWrapper';

/**
 * This is an interface for customizing the classes for
 * the `BulkCheckboxControl` component.
 */
export interface BulkCheckboxControlClasses {
  /**
   * The class for the "Select all" or "Deselect all" text.
   * This defaults to `link-primary text-decoration-none`.
   */
  selectRemoveAllText?: string;
}

/**
 * This is an interface for `BulkCheckboxControl` component props.
 */
export interface BulkCheckboxControlProps {
  /** Props to make the component controlled. */
  controlledProps?: {
    /**
     * A record, which key is the column prop name and the value
     * is of type `CheckboxState`.
     */
    checkboxState?: Record<string, CheckboxState>;
    /** The function fired when any checkbox in the table changes. */
    onCheckboxChange?: CheckboxOnChange;
    /**
     * The filtered data length. When not using filter control,
     * then this should equal to the table body's length.
     */
    filteredDataLength?: number;
  };
  /** Custom classes for the component. */
  classes?: BulkCheckboxControlClasses;
}

/**
 * Renders a control for selection or deselection of all rows. This is
 * only useful when pagination and checkbox are both enabled. When only
 * some (or none) of the rows are checked, then this will render the
 * number of checked rows, as well as the "Select all" button.
 * On the other hand, when all rows are selected, then it will
 * change to "Deselect all" button.
 */
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

  const buttonClassName =
    classes?.selectRemoveAllText || 'text-primary p-0 border-0 bg-transparent';

  if (state === 'all-selected') {
    rendered = (
      <>
        All {filteredDataLength} rows selected.{' '}
        <button
          type="button"
          tabIndex={0}
          onClick={() => onClick('remove')}
          className={buttonClassName}
        >
          Deselect all rows
        </button>
      </>
    );
  } else if (state === 'some-selected') {
    rendered = (
      <>
        {previouslyUpdatedCheckbox?.selected.size} rows selected.{' '}
        <button
          type="button"
          tabIndex={0}
          onClick={() => onClick('add')}
          className={buttonClassName}
        >
          Select all rows
        </button>
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
