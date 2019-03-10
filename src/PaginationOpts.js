import React from 'react';
import PropTypes from 'prop-types';

import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';

class PaginationOpts extends React.Component {
  onRowsPerPageChange = e => {
    this.props.onRowsPerPageChange(e.target.value);
  };

  render() {
    const { labels, rowsPerPage, keyName, rowsPerPageOption } = this.props;
    let selectOption = [];
    let renderedElements = null;

    if (rowsPerPage !== undefined) {
      selectOption.push(rowsPerPage);

      // Make sure there are no duplicates being pushed
      rowsPerPageOption.forEach(opt => {
        if (!selectOption.includes(opt) && typeof opt === 'number') {
          selectOption.push(opt);
        }
      });

      // Order the pagination options ascending
      selectOption = selectOption.sort();

      // Push to array of React Elements
      selectOption.forEach(option => {
        const optionProps = {
          key: `${keyName}-page-opt-${option}`,
          value: option
        };

        selectOption.push(<option {...optionProps}>{option}</option>);
      });

      renderedElements = (
        <Form inline>
          <FormGroup controlId="formGroupPagination">
            {labels.show || 'Show'}{' '}
            <FormControl
              name="form-control-pagination"
              defaultValue={rowsPerPage}
              componentClass="select"
              placeholder="select"
              onChange={this.onRowsPerPageChange}
            >
              {selectOption}
            </FormControl>{' '}
            {labels.entries || 'entries'}
          </FormGroup>
        </Form>
      );
    }

    return renderedElements;
  }
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
