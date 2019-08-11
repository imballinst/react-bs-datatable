import React from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

import FontAwesome from './modules/FontAwesome';
import { HeaderType } from './utils/types';

type FilterProps = {
  tableHeaders: HeaderType[];
  filterText: string;
  onChangeFilter: any;
  placeholder?: string;
};

export default function Filter({
  tableHeaders,
  filterText,
  placeholder = 'Enter tezt...',
  onChangeFilter
}: FilterProps) {
  // Event handlers.
  function onInputChange(e: any) {
    onChangeFilter(e.target.value);
  }

  function onClearFilter() {
    onChangeFilter('');
  }

  let filterRender = null;
  let i = 0;
  let filterable = false;

  while (!filterable && i < tableHeaders.length) {
    if (tableHeaders[i].filterable === true) {
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
