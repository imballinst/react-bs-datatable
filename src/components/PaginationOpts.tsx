import React from 'react';
import { Form } from 'react-bootstrap';

import { makeClasses } from '../helpers/object';
import { useDatatableWrapper } from './DatatableWrapper';

export interface PaginationOptionsClasses {
  form?: string;
  formGroup?: string;
  formText?: string;
  formControl?: string;
}

/** These are the labels related to the pagination options. */
export interface PaginationOptionsLabels {
  /** Change the label that is shown before the select input. */
  beforeSelect?: string;
  /** Change the label that is shown after the select input. */
  afterSelect?: string;
}

export interface PaginationOptsProps {
  labels?: PaginationOptionsLabels;
  classes?: PaginationOptionsClasses;
  alwaysShowPagination?: boolean;
  controlledProps?: {
    rowsPerPage: number;
    rowsPerPageOptions: number[];
    filteredDataLength: number;
    onRowsPerPageChange: (nextRowsPerPage: number) => void;
  };
}

export function PaginationOpts({
  labels,
  classes,
  alwaysShowPagination = true,
  controlledProps
}: PaginationOptsProps) {
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
    !alwaysShowPagination ||
    filteredDataLength <= Math.min(...rowsPerPageOptions);

  return (
    <Form
      className={makeClasses('paginationOpts__root', classes?.form, {
        invisible: hidePaginationOptions
      })}
    >
      <Form.Group
        controlId="formGroupPagination"
        className={classes?.formGroup}
      >
        <Form.Label className={classes?.formText}>
          {labels?.beforeSelect || 'Rows per page'}
        </Form.Label>
        <Form.Select
          name="form-control-pagination"
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
    </Form>
  );
}
