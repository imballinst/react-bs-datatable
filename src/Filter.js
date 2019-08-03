import React from 'react';
import PropTypes from 'prop-types';

import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

import FontAwesome from './modules/FontAwesome';

function Filter({ tableHeader, filterText, placeholder, onChangeFilter }) {
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
      <InputGroup>
        <FormControl
          type="text"
          value={filterText}
          placeholder={placeholder}
          onChange={onInputChange}
        />
        <InputGroup.Append>
          <Button onClick={onClearFilter}>
            <FontAwesome icon="times" additionalClass="fa-fw" />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }

  return filterRender;
}

Filter.propTypes = {
  tableHeader: PropTypes.array.isRequired,
  filterText: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

Filter.defaultProps = {
  placeholder: 'Enter text'
};

export default Filter;
