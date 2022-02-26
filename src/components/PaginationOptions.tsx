import React from 'react';
import { Form } from 'react-bootstrap';

import { makeClasses } from '../helpers/object';
import { RowsPerPageOnChange } from '../helpers/types';
import { useDatatableWrapper } from './DatatableWrapper';

/** This is an interface to customize the pagination options labels. */
export interface PaginationOptionsLabels {
  /**
   * Change the label that is shown before the select input.
   * Defaults to "Rows per page".
   */
  beforeSelect?: string;
  /**
   * Change the label that is shown after the select input.
   * Defaults to `undefined`. This probably should be used if the form group
   * is a horizontal form instead of vertical (e.g. using `flex-direction: row`).
   */
  afterSelect?: string;
}

/**
 * This is an interface for customizing the classes for
 * the `PaginationOptions` component.
 */
export interface PaginationOptionsClasses {
  /**
   * The class for the pagination options group, which covers
   * the `beforeSelect` label, the select input, and the `afterSelect` text.
   */
  formGroup?: string;
  /** The class for the `beforeSelect` and `afterSelect` labels. */
  formText?: string;
  /** The class for the select input. */
  formControl?: string;
}

/**
 * This is an interface for `PaginationOptions` component props.
 */
export interface PaginationOptionsProps {
  /** Customize the labels of the `PaginationOptions` component. */
  labels?: PaginationOptionsLabels;
  /** Customize the classes of the `PaginationOptions` component. */
  classes?: PaginationOptionsClasses;
  /**
   * Determine whether the pagination button group should be always visible or not.
   * When set to `false`, the pagination will be hidden when there is only 1 page.
   * To prevent layout shifts, `visibility: hidden` will be applied instead of
   * `display: none` style. Defaults to `true`.
   */
  alwaysShowPagination?: boolean;
  /** Props to make the component controlled. */
  controlledProps?: {
    /** Number of rows shown per page. */
    rowsPerPage?: number;
    /** Number of rows shown per page options. */
    rowsPerPageOptions?: number[];
    /**
     * The filtered data length. When not using filter control,
     * then this should equal to the table body's length.
     */
    filteredDataLength?: number;
    /** The function fired when any of the pagination option is changed. */
    onRowsPerPageChange?: RowsPerPageOnChange;
  };
}

/**
 * Renders a control for the pagination options. It will show a form group, consisting of
 * a select input, as well as a label/text before and after the input. By default,
 * it renders "Rows per page" as a label, which refers to the select input. There is no
 * text after the select input, unless specified in the `labels.afterSelect` prop.
 *
 * The options available in the select input are the ones specified from the `DatatableWrapper`,
 * or the ones passed in this component's prop `controlledProps.rowsPerPageOptions`.
 *
 * When `alwaysShowPagination` is set to `false`, then this component will be visually hidden.
 */
export function PaginationOptions({
  labels,
  classes,
  alwaysShowPagination = true,
  controlledProps
}: PaginationOptionsProps) {
  const {
    onRowsPerPageChange: onRowsPerPageChangeContext,
    rowsPerPageOptions: rowsPerPageOptionsContext,
    rowsPerPageState: rowsPerPageStateContext,
    filteredDataLength: filteredDataLengthContext
  } = useDatatableWrapper();

  // Controlled has the bigger priority.
  const rowsPerPageOptions =
    controlledProps?.rowsPerPageOptions || rowsPerPageOptionsContext;
  const rowsPerPageState =
    controlledProps?.rowsPerPage || rowsPerPageStateContext;
  const filteredDataLength =
    controlledProps?.filteredDataLength || filteredDataLengthContext;
  const onRowsPerPageChange =
    controlledProps?.onRowsPerPageChange || onRowsPerPageChangeContext;

  // Hide pagination if pagination is meant to not always be shown or
  // if the filtered data length is less than the minimum rows per page option.
  const hidePaginationOptions =
    !alwaysShowPagination &&
    filteredDataLength <= Math.min(...rowsPerPageOptions);

  return (
    <Form.Group
      controlId="formGroupPagination"
      className={makeClasses('paginationOpts__root', classes?.formGroup, {
        invisible: hidePaginationOptions
      })}
    >
      <Form.Label className={classes?.formText}>
        {labels?.beforeSelect || 'Rows per page'}
      </Form.Label>
      <Form.Select
        name="table-pagination-options"
        value={rowsPerPageState}
        as="select"
        placeholder="select"
        onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
        className={classes?.formControl}
      >
        {rowsPerPageOptions.map((option: number) => {
          const optionProps = {
            key: `page-opt-${option}`,
            value: option
          };

          return <option {...optionProps}>{option}</option>;
        })}
      </Form.Select>
      {labels?.afterSelect && (
        <Form.Text className={classes?.formText}>
          {labels?.afterSelect}
        </Form.Text>
      )}
    </Form.Group>
  );
}
