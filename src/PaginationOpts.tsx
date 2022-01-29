import React from 'react';

import { LabelType, TableClasses } from './helpers/types';
import { makeClasses } from './helpers/object';
import Form from 'react-bootstrap/Form';

export type PaginationOptsGroupProps = {
  labels?: LabelType;
  value?: number;
  options: number[];
  onChange: any;
  classes?: TableClasses;
};

export function PaginationOptsGroup({
  classes,
  labels,
  value,
  onChange,
  options
}: PaginationOptsGroupProps) {
  return (
    <Form
      className={makeClasses(
        'paginationOpts__root',
        classes?.paginationOptsForm
      )}
    >
      <Form.Group
        controlId="formGroupPagination"
        className={classes?.paginationOptsFormGroup}
      >
        <Form.Label className={classes?.paginationOptsFormText}>
          {labels?.paginationOptions?.beforeSelect || 'Rows per page'}
        </Form.Label>
        <Form.Select
          name="form-control-pagination"
          defaultValue={value}
          as="select"
          placeholder="select"
          onChange={onChange}
          className={classes?.paginationOptsFormControl}
        >
          {options.map((option: number) => {
            const optionProps = {
              key: `page-opt-${option}`,
              value: option
            };

            return <option {...optionProps}>{option}</option>;
          })}
        </Form.Select>
        {labels?.paginationOptions?.afterSelect && (
          <Form.Text className={classes?.paginationOptsFormText}>
            {labels?.paginationOptions?.afterSelect}
          </Form.Text>
        )}
      </Form.Group>
    </Form>
  );
}

export type PaginationOptsGroupFunctionComponent = (
  props: PaginationOptsGroupProps
) => JSX.Element;

type PaginationOptsProps = {
  labels?: LabelType;
  rowsPerPage?: number;
  rowsPerPageOption?: number[];
  onRowsPerPageChange: any;
  classes?: TableClasses;
  CustomPaginationOptsGroup?: PaginationOptsGroupFunctionComponent;
};

export default function PaginationOpts({
  labels,
  rowsPerPage,
  rowsPerPageOption,
  onRowsPerPageChange,
  classes,
  CustomPaginationOptsGroup
}: PaginationOptsProps) {
  let renderedElements = null;

  if (rowsPerPage !== undefined) {
    let opts: number[] = [rowsPerPage];

    // Make sure there are no duplicates being pushed.
    if (rowsPerPageOption !== undefined) {
      rowsPerPageOption.forEach((opt) => {
        if (!opts.includes(opt) && typeof opt === 'number') {
          opts.push(opt);
        }
      });

      // Order the pagination options ascending.
      opts = opts.sort((a, b) => {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        }

        return 0;
      });
    }

    // Only render option if the length is more than 1.
    if (opts.length > 1) {
      const UsedPaginationOpts =
        CustomPaginationOptsGroup || PaginationOptsGroup;

      renderedElements = (
        <UsedPaginationOpts
          classes={classes}
          labels={labels}
          onChange={(e: any) => onRowsPerPageChange(Number(e.target.value))}
          options={opts}
          value={rowsPerPage}
        />
      );
    }
  }

  return renderedElements;
}
