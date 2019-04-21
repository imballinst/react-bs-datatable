import React from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';

function PaginationOpts({
  labels,
  rowsPerPage,
  keyName,
  rowsPerPageOption,
  onRowsPerPageChange
}) {
  function rowChangeHandler(e) {
    onRowsPerPageChange(e.target.value);
  }

  let selectOption = [];
  let renderedElements = null;

  if (rowsPerPage !== undefined) {
    selectOption.push(rowsPerPage);

    // Make sure there are no duplicates being pushed.
    rowsPerPageOption.forEach(opt => {
      if (!selectOption.includes(opt) && typeof opt === 'number') {
        selectOption.push(opt);
      }
    });

    // Order the pagination options ascending.
    selectOption = selectOption.sort((a, b) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      }

      return 0;
    });

    // Replace the numbers with array of React elements.
    selectOption.forEach((option, idx) => {
      const optionProps = {
        key: `${keyName}-page-opt-${option}`,
        value: option
      };

      selectOption[idx] = <option {...optionProps}>{option}</option>;
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

PaginationOpts.propTypes = {
  keyName: PropTypes.string.isRequired,
  labels: PropTypes.object.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  rowsPerPageOption: PropTypes.array,
  rowsPerPage: PropTypes.number
};

PaginationOpts.defaultProps = {
  rowsPerPage: undefined,
  rowsPerPageOption: undefined
};

export default PaginationOpts;
