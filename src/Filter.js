import React from 'react';
import PropTypes from 'prop-types';

import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

import FontAwesome from './modules/FontAwesome';

class Filter extends React.Component {
  onInputChange = (e) => {
    this.props.onChangeFilter(e.target.value);
  }

  onClearFilter = () => {
    this.props.onChangeFilter('');
  }

  render() {
    const { tableHeader, filterText, keyName } = this.props;
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

    return filterRender;
  }
}

Filter.propTypes = {
  tableHeader: PropTypes.array.isRequired,
  keyName: PropTypes.string.isRequired,
  filterText: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
