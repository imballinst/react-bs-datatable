import React from 'react';
import { Form } from 'react-bootstrap';

import { makeClasses } from './helpers/object';

export interface PaginationOptionsClasses {
  col?: string;
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
  options: number[];
  onChange: (nextOption: number) => void;
  value: number;
  classes?: PaginationOptionsClasses;
}

export default function PaginationOpts({
  labels,
  options,
  onChange,
  value,
  classes
}: PaginationOptsProps) {
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
          value={value}
          as="select"
          placeholder="select"
          onChange={(e) => onChange(Number(e.target.value))}
          className={classes?.formControl}
        >
          {options.map((option: number) => {
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
