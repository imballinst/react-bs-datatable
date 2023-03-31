import React from 'react';
import {
  getNextCheckboxState,
  GetNextCheckboxStateParams
} from '../helpers/checkbox';
import { useCreateCheckboxHandlers } from '../helpers/hooks';
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
 *
 * This is only fit for an uncontrolled table.
 */
export function BulkCheckboxControl({ classes }: BulkCheckboxControlProps) {
  const {
    checkboxState: checkboxStateContext,
    onCheckboxChange: onCheckboxChangeContext,
    filteredDataLength: filteredDataLengthContext,
    previouslyModifiedCheckbox: previouslyModifiedCheckboxContext,
    data
  } = useDatatableWrapper();

  const checkboxState = checkboxStateContext;
  const filteredDataLength = filteredDataLengthContext;
  // Not sure why TypeScript is classifying this as non-nullable `CheckboxState` if we specify type by not using `as`.
  const previouslyModifiedCheckbox = checkboxState[
    previouslyModifiedCheckboxContext.current.checkboxProp
  ] as CheckboxState | undefined;
  const onCheckboxChange = onCheckboxChangeContext;

  const state = previouslyModifiedCheckbox?.state;
  let rendered;

  const { createBulkCheckboxClickHandler } = useCreateCheckboxHandlers({
    checkboxState,
    data,
    filteredDataLength,
    onCheckboxChange
  });
  const onClick = createBulkCheckboxClickHandler();

  const buttonClassName =
    classes?.selectRemoveAllText || 'text-primary p-0 border-0 bg-transparent';

  if (state === 'all-selected') {
    rendered = (
      <>
        All {filteredDataLength} {pluralize('row', filteredDataLength)}{' '}
        selected.
        <button
          type="button"
          tabIndex={0}
          onClick={onClick}
          className={buttonClassName}
        >
          Deselect all rows
        </button>
      </>
    );
  } else if (state === 'some-selected') {
    const selectedSize = previouslyModifiedCheckbox?.selected.size!;

    rendered = (
      <>
        {selectedSize} {pluralize('row', selectedSize)} selected.{' '}
        <button
          type="button"
          tabIndex={0}
          onClick={onClick}
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

// Helper functions.
function pluralize(word: string, length: number) {
  if (length === 1) return word;
  return `${word}s`;
}
