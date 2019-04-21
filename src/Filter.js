import React from 'react';
import PropTypes from 'prop-types';

import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';

import FontAwesome from './modules/FontAwesome';

function Filter({ tableHeader, filterText, keyName, placeholder }) {
  // Event handlers.
  function onInputChange(e) {
    onChangeFilter(e.target.value);
  }

  function onClearFilter() {
    onChangeFilter('');
  }

  let filterRender = null;
  let i = 0;
  let filterable = false;

  while (!filterable && i < tableHeader.length) {
    if (tableHeader[i].filterable === true) {
      filterable = true;
    }

    i += 1;
  }

  if (filterable) {
    filterRender = (
      <FormGroup controlId={`select-filter-${keyName}`}>
        <InputGroup>
          <FormControl
            type="text"
            value={filterText}
            placeholder={placeholder}
            onChange={onInputChange}
          />
          <InputGroup.Prepend>
            <Button onClick={onClearFilter}>
              <FontAwesome icon="times" additionalClass="fa-fw" />
            </Button>
          </InputGroup.Prepend>
        </InputGroup>
      </FormGroup>
    );
  }

  return filterRender;
}

Filter.propTypes = {
  tableHeader: PropTypes.array.isRequired,
  keyName: PropTypes.string.isRequired,
  filterText: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

Filter.defaultProps = {
  placeholder: 'Enter text'
};

export default Filter;
