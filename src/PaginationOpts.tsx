import React from 'react';

import {
  LabelType,
  RowsPerPageType,
  RowsPerPageOptionType,
  TableClasses
} from './helpers/types';
import { makeClasses } from './helpers/object';
import Form from 'react-bootstrap/Form';

type PaginationOptsGroupProps = {
  labels: LabelType;
  value: RowsPerPageType;
  options: RowsPerPageOptionType;
  onChange: any;
  classes: TableClasses;
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
      inline
      className={makeClasses(
        'paginationOpts__root',
        classes.paginationOptsForm
      )}
    >
      <Form.Group
        controlId="formGroupPagination"
        className={classes.paginationOptsFormGroup}
      >
        <span className={classes.paginationOptsFormText}>
          {labels.show || 'Show'}{' '}
        </span>
        <Form.Control
          name="form-control-pagination"
          defaultValue={value}
          as="select"
          placeholder="select"
          onChange={onChange}
          className={classes.paginationOptsFormControl}
        >
          {options.map((option: number | undefined, idx: number) => {
            const optionProps = {
              key: `page-opt-${option}`,
              value: option
            };

            return <option {...optionProps}>{option}</option>;
          })}
        </Form.Control>
        <span className={classes.paginationOptsFormText}>
          {' '}
          {labels.entries || 'entries'}
        </span>
      </Form.Group>
    </Form>
  );
}

export type PaginationOptsGroupFunctionComponent = (
  props: PaginationOptsGroupProps
) => JSX.Element;

type PaginationOptsProps = {
  labels: LabelType;
  rowsPerPage?: RowsPerPageType;
  rowsPerPageOption?: RowsPerPageOptionType;
  onRowsPerPageChange: any;
  classes: TableClasses;
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
  function onRowsPerPageChangeHandler(e: any) {
    onRowsPerPageChange(Number(e.target.value));
  }

  let renderedElements = null;

  if (rowsPerPage !== undefined) {
    let opts: RowsPerPageOptionType = [rowsPerPage];

    // Make sure there are no duplicates being pushed.
    if (rowsPerPageOption !== undefined) {
      rowsPerPageOption.forEach(opt => {
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
          onChange={onRowsPerPageChangeHandler}
          options={opts}
          value={rowsPerPage}
        />
      );
    }
  }

  return renderedElements;
}
