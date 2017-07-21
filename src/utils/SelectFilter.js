import React from 'react';
import PropTypes from 'prop-types';

// Import React-Bootstrap
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';

import FontAwesome from './FontAwesome';

class SelectFilter extends React.Component {
  onInputChange = (e) => {
    this.props.onChangeFilter(e.target.value);
  }

  onClearFilter = (e) => {
    e.preventDefault();

    this.props.onChangeFilter('');
  }

  render() {
    return (
      <FormGroup controlId={`select-filter-${this.props.keyName}`}>
        <InputGroup>
          <FormControl
            type="text"
            value={this.props.filterText}
            placeholder="Enter text"
            onChange={this.onInputChange}
          />
          <InputGroup.Button>
            <Button onClick={this.onClearFilter}>
              <FontAwesome icon="times" additionalClass="fa-fw" />
            </Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    );
  }
}

SelectFilter.propTypes = {
  filterText: PropTypes.string.isRequired,
  keyName: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default SelectFilter;
