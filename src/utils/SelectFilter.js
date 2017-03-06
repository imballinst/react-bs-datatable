import React, { PropTypes } from 'react';

// Import React-Bootstrap
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';

import FontAwesome from './FontAwesome';

class SelectFilter extends React.Component {
  onInputChange = (e) => {
    e.preventDefault();

    this.props.onChangeFilter(e.target.value);
  }

  onClearFilter = (e) => {
    e.preventDefault();

    this.props.onChangeFilter('');
  }

  render() {
    return (
      <FormGroup controlId={"select-filter-" + this.props.keyName}>
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
  filterText: PropTypes.string,
  keyName: PropTypes.string,
  onChangeFilter: PropTypes.func
};

export default SelectFilter;
