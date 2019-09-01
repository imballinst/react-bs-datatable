import React from 'react';

import {
  LabelType,
  RowsPerPageType,
  RowsPerPageOptionType,
  TableClasses,
  TableComponents
} from './helpers/types';
import { makeClasses } from './helpers/object';

type PaginationOptsProps = {
  labels: LabelType;
  rowsPerPage?: RowsPerPageType;
  rowsPerPageOption?: RowsPerPageOptionType;
  onRowsPerPageChange: any;
  classes: TableClasses;
  components: {
    Form: TableComponents['Form'];
    FormGroup: TableComponents['FormGroup'];
    FormControl: TableComponents['FormControl'];
  };
};

export default function PaginationOpts({
  labels,
  rowsPerPage,
  rowsPerPageOption,
  onRowsPerPageChange,
  classes,
  components: { Form, FormGroup, FormControl }
}: PaginationOptsProps) {
  function onRowsPerPageChangeHandler(e: any) {
    onRowsPerPageChange(Number(e.target.value));
  }

  let selectOption: React.ReactNode[] = [];
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

    // Replace the numbers with array of React elements.
    selectOption = opts.map((option: number | undefined, idx: number) => {
      const optionProps = {
        key: `page-opt-${option}`,
        value: option
      };

      return <option {...optionProps}>{option}</option>;
    });

    renderedElements = (
      <Form
        inline
        className={makeClasses(
          'paginationOpts__root',
          classes.paginationOptsForm
        )}
      >
        <FormGroup
          controlId="formGroupPagination"
          className={classes.paginationOptsFormGroup}
        >
          <span className={classes.paginationOptsFormText}>
            {labels.show || 'Show'}{' '}
          </span>
          <FormGroup
            name="form-control-pagination"
            defaultValue={rowsPerPage}
            as="select"
            placeholder="select"
            onChange={onRowsPerPageChangeHandler}
            className={classes.paginationOptsFormControl}
          >
            {selectOption}
          </FormGroup>
          <span className={classes.paginationOptsFormText}>
            {' '}
            {labels.entries || 'entries'}
          </span>
        </FormGroup>
      </Form>
    );
  }

  return renderedElements;
}
