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
}

export default function PaginationOpts({
  labels,
  classes,
  alwaysShowPagination = true
}: PaginationOptsProps) {
  const {
    onRowsPerPageChange,
    rowsPerPageOptions,
    rowsPerPageState,
    filteredDataLength
  } = useDatatableWrapper();

  if (
    !alwaysShowPagination ||
    (rowsPerPageOptions.length &&
      filteredDataLength <= Math.min(...rowsPerPageOptions))
  ) {
    // Hide pagination if pagination is meant to not always be shown and the max page is 1,
    // or if rows per page is -1.
    return null;
  }

  return (
    <Form className={makeClasses('paginationOpts__root', classes?.form)}>
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
