import React from 'react';

import Form from 'react-bootstrap/Form';
import {
  LabelType,
  RowsPerPageType,
  RowsPerPageOptionType
} from './utils/types';

type PaginationOptsProps = {
  labels: LabelType;
  rowsPerPage?: RowsPerPageType;
  rowsPerPageOption?: RowsPerPageOptionType;
  onRowsPerPageChange: any;
};

export default function PaginationOpts({
  labels,
  rowsPerPage,
  rowsPerPageOption,
  onRowsPerPageChange
}: PaginationOptsProps) {
  function rowChangeHandler(e: any) {
    onRowsPerPageChange(e.target.value);
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
      <Form inline>
        <Form.Group controlId="formGroupPagination">
          <span>{labels.show || 'Show'} </span>
          <Form.Control
            name="form-control-pagination"
            defaultValue={rowsPerPage}
            as="select"
            placeholder="select"
            onChange={rowChangeHandler}
          >
            {selectOption}
          </Form.Control>
          <span> {labels.entries || 'entries'}</span>
        </Form.Group>
      </Form>
    );
  }

  return renderedElements;
}
